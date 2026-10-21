(function () {
  "use strict";

  var dialog = document.getElementById("search-dialog");
  var input = document.getElementById("site-search");
  var resultsContainer = document.getElementById("search-results");
  var hint = document.getElementById("search-hint");
  var openers = Array.prototype.slice.call(document.querySelectorAll("[data-search-open]"));

  if (!dialog || !input || !resultsContainer) {
    return;
  }

  var data = Array.isArray(window.ACTUALPAY_SEARCH) ? window.ACTUALPAY_SEARCH : [];
  var base = document.body.getAttribute("data-base") || "";
  var lastTrigger = null;
  var shouldRestoreFocus = true;
  var activeIndex = -1;
  var defaultHint = hint ? hint.textContent : "";

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function resolveUrl(url) {
    if (!url) {
      return "#";
    }

    if (/^(?:https?:|mailto:|tel:|#)/.test(url)) {
      return url;
    }

    return base + url;
  }

  function getMatches(query) {
    var normalizedQuery = normalize(query).trim();

    if (!normalizedQuery) {
      return data.filter(function (item) {
        return item.featured;
      }).slice(0, 6);
    }

    var terms = normalizedQuery.split(/\s+/).filter(Boolean);
    var matches = [];

    data.forEach(function (item) {
      var title = normalize(item.title);
      var keywords = normalize(item.keywords);
      var description = normalize(item.description);
      var combined = title + " " + keywords + " " + description;
      var hasEveryTerm = terms.every(function (term) {
        return combined.indexOf(term) !== -1;
      });

      if (!hasEveryTerm) {
        return;
      }

      var score = 0;

      terms.forEach(function (term) {
        if (title.indexOf(term) !== -1) {
          score += 6;
        }
        if (keywords.indexOf(term) !== -1) {
          score += 3;
        }
        if (description.indexOf(term) !== -1) {
          score += 1;
        }
      });

      if (title.indexOf(normalizedQuery) !== -1) {
        score += 8;
      }

      matches.push({ item: item, score: score });
    });

    return matches
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .slice(0, 8)
      .map(function (match) {
        return match.item;
      });
  }

  function createResult(item) {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    var title = document.createElement("span");
    var description = document.createElement("span");
    var type = document.createElement("span");

    link.className = "search-result";
    link.href = resolveUrl(item.url);

    title.className = "search-result__title";
    title.textContent = item.title;

    description.className = "search-result__description";
    description.textContent = item.description;

    type.className = "search-result__type";
    type.textContent = item.type || "Page";

    link.appendChild(title);
    link.appendChild(description);
    link.appendChild(type);
    listItem.appendChild(link);

    return listItem;
  }

  function render(query) {
    var matches = getMatches(query);
    var list = document.createElement("ul");

    resultsContainer.textContent = "";
    activeIndex = -1;

    if (!matches.length) {
      var empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "No results for \u201C" + query + "\u201D. Try \u201Cpayroll\u201D, \u201CCIS\u201D or \u201Cpension\u201D.";
      resultsContainer.appendChild(empty);
    } else {
      matches.forEach(function (item) {
        list.appendChild(createResult(item));
      });
      resultsContainer.appendChild(list);
    }

    if (hint) {
      if (normalize(query).trim()) {
        hint.textContent = matches.length + (matches.length === 1 ? " result" : " results") + " for \u201C" + query + "\u201D.";
      } else {
        hint.textContent = defaultHint;
      }
    }
  }

  function cleanupSearch() {
    document.body.classList.remove("search-open");

    if (shouldRestoreFocus && lastTrigger instanceof HTMLElement) {
      lastTrigger.focus();
    }

    shouldRestoreFocus = true;
  }

  function openSearch(trigger) {
    if (dialog.open) {
      input.focus();
      return;
    }

    var mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenu && mobileMenu.open && typeof mobileMenu.close === "function") {
      mobileMenu.close();
    }

    lastTrigger = trigger || document.activeElement;
    shouldRestoreFocus = true;
    input.value = "";
    render("");

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    document.body.classList.add("search-open");

    window.setTimeout(function () {
      input.focus();
    }, 40);
  }

  function closeSearch(restoreFocus) {
    shouldRestoreFocus = restoreFocus !== false;

    if (dialog.open && typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      cleanupSearch();
    }
  }

  openers.forEach(function (opener) {
    opener.addEventListener("click", function () {
      openSearch(opener);
    });
  });

  var closeButton = dialog.querySelector(".dialog-close");

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeSearch(true);
    });
  }

  dialog.addEventListener("close", cleanupSearch);

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch(true);
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeSearch(true);
    }
  });

  input.addEventListener("input", function () {
    render(input.value);
  });

  input.addEventListener("keydown", function (event) {
    var links = resultsContainer.querySelectorAll(".search-result");

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!links.length) {
        return;
      }

      event.preventDefault();

      if (event.key === "ArrowDown") {
        activeIndex = Math.min(activeIndex + 1, links.length - 1);
      } else {
        activeIndex = activeIndex <= 0 ? links.length - 1 : activeIndex - 1;
      }

      links.forEach(function (link, index) {
        link.classList.toggle("is-active", index === activeIndex);
      });

      links[activeIndex].scrollIntoView({ block: "nearest" });
      return;
    }

    if (event.key === "Enter") {
      if (activeIndex >= 0 && links[activeIndex]) {
        event.preventDefault();
        links[activeIndex].click();
      } else if (links.length === 1) {
        event.preventDefault();
        links[0].click();
      }
    }
  });

  resultsContainer.addEventListener("click", function (event) {
    var link = event.target.closest(".search-result");

    if (!link) {
      return;
    }

    shouldRestoreFocus = false;

    if (dialog.open && typeof dialog.close === "function") {
      dialog.close();
    }
  });
})();
