/* ==========================================================================
   ✦ COUPLE ANIMATION — just below the kolam ✦
   After the temple doors open, the couple (assets/couple-groom.webp and
   assets/couple-bride.webp) walk in from both sides just below the kolam and
   meet — he offers her a rose, with a small golden sparkle. Then your wordings
   appear over them and the couple softly fades into the background.

   To use other pictures, replace those two image files (same names, same size).
   The timing is in couple.css. To switch the couple off, delete the
   <script src="couple.js"> line in index.html.
   (This file also moves the page to the invitation automatically — see below.)
   ========================================================================== */
(function () {
  'use strict';
  var hero = document.getElementById('hero');
  var kolam = hero && hero.querySelector('.hero__kolam');
  if (!hero || !kolam || hero.querySelector('.hero-couple')) return;
  var refresh = function () { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); };

  // styles
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'couple.css';
  css.addEventListener('load', refresh);
  document.head.appendChild(css);

  // the couple sits just below the kolam (inside the kolam's box, so it always moves with it);
  // your wordings are drawn on top of it
  var holder = document.createElement('div');
  holder.innerHTML = "<div class=\"hero-couple\" aria-hidden=\"true\"><div class=\"hero-couple__glow\"></div><div class=\"hero-couple__fig hero-couple__fig--groom\"><img class=\"hero-couple__img\" src=\"assets/couple-groom.webp\" alt=\"\" decoding=\"async\"></div><div class=\"hero-couple__fig hero-couple__fig--bride\"><img class=\"hero-couple__img\" src=\"assets/couple-bride.webp\" alt=\"\" decoding=\"async\"></div><svg class=\"hero-couple__spark\" viewBox=\"-20 -20 40 40\" focusable=\"false\"><defs><radialGradient id=\"cp-spark-glow\"><stop offset=\"0\" stop-color=\"#fff6d6\" stop-opacity=\".95\"/><stop offset=\".4\" stop-color=\"#ffd27a\" stop-opacity=\".45\"/><stop offset=\"1\" stop-color=\"#ffb347\" stop-opacity=\"0\"/></radialGradient></defs><circle r=\"16\" fill=\"url(#cp-spark-glow)\"/><path d=\"M0-13C1.2-3.5 3.5-1.2 13 0 3.5 1.2 1.2 3.5 0 13-1.2 3.5-3.5 1.2-13 0-3.5-1.2-1.2-3.5 0-13Z\" fill=\"#fff8e1\"/></svg></div>";
  var couple = holder.firstChild;
  kolam.appendChild(couple);

  // if a picture is missing, quietly leave the couple out
  Array.prototype.forEach.call(couple.querySelectorAll('img'), function (img) {
    img.addEventListener('error', function () { if (couple.parentNode) couple.parentNode.removeChild(couple); });
  });
  refresh();
})();

/* ==========================================================================
   ✦ AUTO NEXT PAGE ✦
   When the opening has finished (names and wordings shown), the page glides
   down to the invitation by itself, so guests know there is more below.
   It happens once, and never if the guest has already touched or scrolled.
   ========================================================================== */
(function () {
  'use strict';
  var hero = document.getElementById('hero');
  var next = document.getElementById('invitation');
  if (!hero || !next) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var WAIT = 6500;           // ms after your names appear (wordings are fully shown at ~2s)
  var armed = false, cancelled = false, gliding = false;
  var atTop = function () { return (window.pageYOffset || document.documentElement.scrollTop) < 60; };

  function glide() {
    if (cancelled || !atTop() || document.documentElement.classList.contains('is-locked')) return;
    var secret = document.getElementById('secret');
    if (secret && !secret.hidden) return;                     // the hidden-lamp message is open
    var start = window.pageYOffset, end = next.getBoundingClientRect().top + start, t0 = null, dur = 1600;
    gliding = true;
    function step(t) {
      if (!gliding) return;
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;   // ease in-out
      window.scrollTo(0, start + (end - start) * e);
      if (k < 1) requestAnimationFrame(step); else gliding = false;
    }
    requestAnimationFrame(step);
  }
  // the guest is in control: any touch / wheel / key after the opening cancels the automatic move
  // (the tap that opens the doors doesn't count)
  ['touchstart', 'wheel', 'keydown', 'mousedown'].forEach(function (type) {
    window.addEventListener(type, function () { if (armed) { cancelled = true; gliding = false; } }, { passive: true });
  });

  function arm() { armed = true; setTimeout(glide, WAIT); }
  if (hero.classList.contains('names-in')) arm();
  else if ('MutationObserver' in window) {
    var mo = new MutationObserver(function () {
      if (hero.classList.contains('names-in')) { mo.disconnect(); arm(); }
    });
    mo.observe(hero, { attributes: true, attributeFilter: ['class'] });
  }
})();
