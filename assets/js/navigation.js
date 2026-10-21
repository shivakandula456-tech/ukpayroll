(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navItems = Array.prototype.slice.call(document.querySelectorAll(".nav-item"));
  var hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
  var hoverTimer = null;

  function setDropdown(item, open) {
    var trigger = item.querySelector(".nav-trigger");
    var dropdown = item.querySelector(".dropdown");

    item.classList.toggle("is-open", open);

    if (trigger) {
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (dropdown) {
      dropdown.toggleAttribute("inert", !open);
    }
  }

  function closeAll(except) {
    navItems.forEach(function (item) {
      if (item !== except) {
        setDropdown(item, false);
      }
    });
  }

  if (header) {
    var scrollTicking = false;

    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      scrollTicking = false;
    }

    updateHeader();

    window.addEventListener(
      "scroll",
      function () {
        if (!scrollTicking) {
          window.requestAnimationFrame(updateHeader);
          scrollTicking = true;
        }
      },
      { passive: true }
    );
  }

  navItems.forEach(function (item) {
    var trigger = item.querySelector(".nav-trigger");
    var dropdown = item.querySelector(".dropdown");

    if (!trigger || !dropdown) {
      return;
    }

    trigger.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");
      closeAll(item);
      setDropdown(item, willOpen);
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        closeAll(item);
        setDropdown(item, true);
        var firstLink = dropdown.querySelector("a");
        if (firstLink) {
          window.setTimeout(function () {
            firstLink.focus();
          }, 30);
        }
      }
    });

    item.addEventListener("mouseenter", function () {
      if (!hoverMedia.matches) {
        return;
      }
      window.clearTimeout(hoverTimer);
      closeAll(item);
      setDropdown(item, true);
    });

    item.addEventListener("mouseleave", function () {
      if (!hoverMedia.matches) {
        return;
      }
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(function () {
        if (!item.contains(document.activeElement)) {
          setDropdown(item, false);
        }
      }, 140);
    });

    item.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (!item.contains(document.activeElement)) {
          setDropdown(item, false);
        }
      }, 0);
    });
  });

  document.addEventListener("pointerdown", function (event) {
    if (!event.target.closest(".nav-item")) {
      closeAll();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    navItems.forEach(function (item) {
      if (item.classList.contains("is-open")) {
        var trigger = item.querySelector(".nav-trigger");
        setDropdown(item, false);
        if (trigger) {
          trigger.focus();
        }
      }
    });
  });

  var menu = document.getElementById("mobile-menu");
  var menuOpenButton = document.querySelector(".menu-toggle");
  var menuCloseButton = menu ? menu.querySelector(".mobile-menu__close") : null;
  var desktopMedia = window.matchMedia("(min-width: 1080px)");
  var menuReturnFocus = null;
  var menuRestoreFocus = true;

  function openMenu() {
    if (!menu || menu.open) {
      return;
    }

    menuReturnFocus = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : menuOpenButton;
    closeAll();

    if (typeof menu.showModal === "function") {
      menu.showModal();
    } else {
      menu.setAttribute("open", "");
    }

    document.body.classList.add("menu-open");

    if (menuOpenButton) {
      menuOpenButton.setAttribute("aria-expanded", "true");
    }

    if (menuCloseButton) {
      window.setTimeout(function () {
        menuCloseButton.focus();
      }, 40);
    }
  }

  function closeMenu(restoreFocus) {
    if (!menu) {
      return;
    }

    menuRestoreFocus = restoreFocus !== false;

    if (menu.open && typeof menu.close === "function") {
      menu.close();
    } else {
      menu.removeAttribute("open");
      cleanupMenu();
    }
  }

  function cleanupMenu() {
    document.body.classList.remove("menu-open");

    if (menuOpenButton) {
      menuOpenButton.setAttribute("aria-expanded", "false");
    }

    if (menuRestoreFocus && menuReturnFocus instanceof HTMLElement) {
      menuReturnFocus.focus();
    }
  }

  if (menu && menuOpenButton) {
    menuOpenButton.addEventListener("click", openMenu);

    if (menuCloseButton) {
      menuCloseButton.addEventListener("click", function () {
        closeMenu(true);
      });
    }

    menu.addEventListener("close", function () {
      cleanupMenu();
    });

    menu.addEventListener("click", function (event) {
      if (event.target === menu) {
        closeMenu(true);
        return;
      }

      var link = event.target.closest("a");

      if (link && link.getAttribute("href") && link.getAttribute("href").charAt(0) === "#") {
        closeMenu(true);
      }
    });

    var desktopChange = function (event) {
      if (event.matches && menu.open) {
        closeMenu(false);
      }
    };

    if (typeof desktopMedia.addEventListener === "function") {
      desktopMedia.addEventListener("change", desktopChange);
    } else if (typeof desktopMedia.addListener === "function") {
      desktopMedia.addListener(desktopChange);
    }
  }
})();
