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
    var heroSection = heroVideo.closest(".hero");
    var mobileViewport = window.matchMedia("(max-width: 767px)");
    var videoFailed = false;

    function updatePoster() {
      var poster = mobileViewport.matches
        ? "assets/images/actualpay-hero-poster-mobile.webp"
        : "assets/images/actualpay-hero-poster.webp";
      heroVideo.setAttribute("poster", poster);
    }

    function attemptHeroPlayback() {
      updatePoster();

      if (videoFailed) return;

      // Owner-requested behaviour: attempt autoplay on every viewport,
      // regardless of reduced-motion or Data Saver preferences.
      heroVideo.autoplay = true;
      heroVideo.muted = true;
      heroVideo.loop = true;
      heroVideo.playsInline = true;

      if (heroVideo.paused) {
        var playPromise = heroVideo.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () {
            // Some browsers may still reject autoplay. Reveal the CSS poster fallback.
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
    });

    // Start the playback attempt immediately; the video source is in the HTML.
    attemptHeroPlayback();

    if (typeof mobileViewport.addEventListener === "function") {
      mobileViewport.addEventListener("change", updatePoster);
    } else if (typeof mobileViewport.addListener === "function") {
      mobileViewport.addListener(updatePoster);
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
