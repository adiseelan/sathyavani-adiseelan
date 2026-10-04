/* ==========================================================================
   ✦ COUPLE ANIMATION — just below the kolam ✦
   After the temple doors open, the couple (assets/couple-groom.webp and
   assets/couple-bride.webp) walk in from both sides just below the kolam and
   meet — he offers her a rose, with a small golden sparkle. Then your wordings
   appear over them and the couple softly fades into the background.

   To use other pictures, replace those two image files (same names, same size).
   The timing is in couple.css. To switch the couple off, delete the
   <script src="couple.js"> line in index.html.
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
