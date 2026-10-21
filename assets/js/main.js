(function () {
  "use strict";

  var yearElements = document.querySelectorAll("[data-current-year]");
  var currentYear = String(new Date().getFullYear());

  yearElements.forEach(function (element) {
    element.textContent = currentYear;
  });

  var heroVideo = document.querySelector(".hero__video");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (heroVideo) {
    var heroSource = heroVideo.querySelector("source[data-src]");
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var heroSection = heroVideo.closest(".hero");
    var mobileViewport = window.matchMedia("(max-width: 767px)");
    var videoFailed = false;

    function shouldPlayVideo() {
      return !reducedMotion.matches && !(connection && connection.saveData);
    }

    function updatePoster() {
      var poster = mobileViewport.matches
        ? "assets/images/actualpay-hero-poster-mobile.webp"
        : "assets/images/actualpay-hero-poster.webp";
      heroVideo.setAttribute("poster", poster);
    }

    function unloadVideo() {
      heroVideo.pause();
      if (heroSource && heroSource.hasAttribute("src")) {
        heroSource.removeAttribute("src");
        heroVideo.load();
      }
    }

    function applyMotionPreference() {
      updatePoster();

      if (!shouldPlayVideo()) {
        unloadVideo();
        return;
      }

      if (videoFailed) return;

      if (heroSource && !heroSource.hasAttribute("src")) {
        heroSource.setAttribute("src", heroSource.getAttribute("data-src"));
        heroVideo.load();
      }

      if (heroVideo.paused) {
        var playPromise = heroVideo.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () {
            // Autoplay may be denied by the browser. Keep the poster visible.
            if (heroSection) heroSection.classList.add("hero--video-fallback");
          });
        }
      }
    }

    heroVideo.addEventListener("playing", function () {
      if (heroSection) heroSection.classList.remove("hero--video-fallback");
    });

    heroVideo.addEventListener("error", function () {
      videoFailed = true;
      heroVideo.pause();
      if (heroSection) heroSection.classList.add("hero--video-fallback");
      // Do not hide the video element: its poster and the hero background are fallbacks.
    });

    applyMotionPreference();

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", applyMotionPreference);
    } else if (typeof reducedMotion.addListener === "function") {
      reducedMotion.addListener(applyMotionPreference);
    }

    if (typeof mobileViewport.addEventListener === "function") {
      mobileViewport.addEventListener("change", updatePoster);
    } else if (typeof mobileViewport.addListener === "function") {
      mobileViewport.addListener(updatePoster);
    }

    if (connection && typeof connection.addEventListener === "function") {
      connection.addEventListener("change", applyMotionPreference);
    }
  }

  var backToTop = document.querySelector("[data-back-to-top]");

  if (backToTop) {
    var backToTopTicking = false;

    function updateBackToTop() {
      backToTop.classList.toggle("is-visible", window.scrollY > 640);
      backToTopTicking = false;
    }

    updateBackToTop();

    window.addEventListener(
      "scroll",
      function () {
        if (!backToTopTicking) {
          window.requestAnimationFrame(updateBackToTop);
          backToTopTicking = true;
        }
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    });
  }
})();
