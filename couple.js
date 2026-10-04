/* ==========================================================================
   ✦ COUPLE ANIMATION — just below the kolam ✦
   After the temple doors open, the couple (assets/couple-groom.webp and
   assets/couple-bride.webp) walk in from both sides just below the kolam and
   meet — he offers her a rose, with a small golden sparkle. Then your wordings
   appear over them, and the couple stays fully clear. (On laptop-size screens
   the couple stands beside the kolam, so the text never covers them.)

   To use other pictures, replace those two image files (same names, same size).
   The timing is in couple.css. To switch the couple off, delete the
   <script src="couple.js"> line in index.html.
   (This file also runs the automatic page-by-page tour and keeps the
    phone screen on while the invitation is open — see below.)
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
  css.href = 'couple.css?v=20261005';   // the ?v= makes phones pick up the newest styles
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
   ✦ AUTO TOUR + KEEP SCREEN ON ✦
   After the opening, the whole invitation moves by itself, one screen at a
   time, all the way to the end, stopping on each part long enough to read it.
   The event cards turn over on their own to show the time and venue.
   • If a guest touches or scrolls, the tour waits for them. After a few quiet
     seconds it carries on from wherever they are.
   • While the invitation is playing, the phone screen stays on, so it doesn't
     switch off after 10–15 seconds. (A phone in battery-saver mode may still
     refuse; nothing breaks if it does.)
   • Guests whose phone is set to "reduce motion" get no automatic movement.
     They see the small scroll hint instead.
   Everything can be changed in TOUR below (times: 1000 = 1 second).
   ========================================================================== */
(function () {
  'use strict';
  var TOUR = {
    move: true,           // false = no automatic movement (guests scroll by themselves and see the scroll hint)
    keepScreenOn: true,   // false = the phone's own screen timeout applies
    firstWait: 6000,      // after your names appear: how long the first screen stays
    resumeAfter: 8000,    // after a guest touches or scrolls: how long to wait before moving again
    glideMs: 1500,        // how long each move takes
    step: 0.8,            // inside a long part, how far each move goes (0.8 = 80% of the screen)
    holds: {              // how long each part stays on screen before moving on
      invitation: 6500, story: 5500, countdown: 5000, events: 6000, blessings: 6500, footer: 4000
    },
    defaultHold: 5500,
    cardGap: 2400,        // event cards: time between one card turning over and the next
    awakeAfter: 90000     // the screen stays on until this long after the tour ends (or after the last touch)
  };
  var hero = document.getElementById('hero');
  if (!hero) return;
  var root = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var now = function () { return Date.now(); };
  var opened = function () { return !root.classList.contains('is-locked'); };
  var still = reduce || !TOUR.move;            // no automatic movement for this guest
  if (still) root.classList.add('no-tour');    // couple.css shows the scroll hint again

  /* ---------- keep the screen on (Android Chrome / Samsung Internet, iPhone iOS 16.4+) ---------- */
  var wantAwake = false, lock = null, asking = false, restTimer = 0;
  function keepAwake() {
    if (!TOUR.keepScreenOn) return;
    wantAwake = true;
    clearTimeout(restTimer);
    if (lock || asking || !navigator.wakeLock || document.visibilityState !== 'visible') return;
    asking = true;
    try {
      navigator.wakeLock.request('screen').then(function (l) {
        asking = false;
        if (!wantAwake) { l.release(); return; }
        lock = l;
        l.addEventListener('release', function () { if (lock === l) lock = null; });
      }, function () { asking = false; });     // refused (e.g. battery saver): the page works as normal
    } catch (e) { asking = false; }
  }
  function letSleep() {
    wantAwake = false;
    if (lock) { var l = lock; lock = null; l.release(); }
  }
  function restLater() {                       // after the tour: the phone may sleep once it's been left alone a while
    clearTimeout(restTimer);
    restTimer = setTimeout(letSleep, TOUR.awakeAfter);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && wantAwake) keepAwake();   // phones drop the lock when you switch apps
  });
  ['click', 'touchend'].forEach(function (type) {   // any tap also renews it (some iPhones want a tap after you come back)
    window.addEventListener(type, function () { if (wantAwake && !lock) keepAwake(); }, { passive: true });
  });
  var gateBtn = document.getElementById('gate-open');
  if (gateBtn) gateBtn.addEventListener('click', function () { keepAwake(); if (still) restLater(); });   // the tap on the doors is the go-ahead
  if (opened()) { keepAwake(); if (still) restLater(); }                  // opened without the doors (e.g. a #events link)

  /* ---------- the tour ---------- */
  var sections = ['hero', 'invitation', 'story', 'countdown', 'events', 'blessings']
    .map(function (id) { return document.getElementById(id); })
    .concat([document.querySelector('.footer')])
    .filter(Boolean);
  var started = false, done = still, lastGuest = 0, timer = 0, glideId = 0, expectY = -1;
  var y = function () { return window.pageYOffset || root.scrollTop || 0; };
  var vh = function () { return window.innerHeight || root.clientHeight; };
  var maxY = function () { return Math.max(0, root.scrollHeight - vh()); };
  var topOf = function (el) { return el.getBoundingClientRect().top + y(); };
  function later(fn, ms) { clearTimeout(timer); timer = setTimeout(fn, ms); }

  function busy() {   // the guest has the secret message or the calendar menu open, or the tab is hidden
    var secret = document.getElementById('secret'), cal = document.getElementById('cal-menu');
    return (secret && !secret.hidden) || (cal && !cal.hidden) || !opened() || document.hidden;
  }
  var pad = function (el, side) { return parseFloat(window.getComputedStyle(el)['padding' + side]) || 0; };
  var contentEnd = function (s) { return topOf(s) + s.offsetHeight - pad(s, 'Bottom'); };   // where a part's content ends
  function arriveAt(s, h) {   // a part just a little taller than the screen: stop slightly lower so all of it shows
    var t = topOf(s), c = contentEnd(s) - t;
    return c > h && c <= h + pad(s, 'Top') - 24 ? contentEnd(s) + 24 - h : t;
  }
  function nextStop() {
    var cur = y(), h = vh(), end = maxY(), sec = null, nxt = null, target = null;
    for (var i = 0; i < sections.length; i++) {
      if (topOf(sections[i]) <= cur + 8) sec = sections[i];
      else { nxt = sections[i]; break; }
    }
    if (sec) {
      var rest = contentEnd(sec) - (cur + h);          // how much of this part is still below the screen
      if (rest > Math.max(16, h * .08)) target = rest <= h * TOUR.step ? contentEnd(sec) + 24 - h : cur + h * TOUR.step;
    }
    if (target === null) target = nxt ? arriveAt(nxt, h) : end;   // this part is done: on to the next one
    target = Math.min(Math.round(target), end);
    return target > cur + 4 ? target : null;
  }
  function holdFor(pos) {   // the part that fills most of the screen decides how long to stay
    var h = vh(), best = null, most = 0;
    sections.forEach(function (s) {
      var t = topOf(s), seen = Math.min(t + s.offsetHeight, pos + h) - Math.max(t, pos);
      if (seen > most) { most = seen; best = s; }
    });
    var key = best ? (best.id || (best.classList.contains('footer') ? 'footer' : '')) : '';
    return TOUR.holds[key] || TOUR.defaultHold;
  }
  function glideTo(end, then) {
    var id = ++glideId, from = y(), t0 = null;
    var ms = TOUR.glideMs * Math.max(.5, Math.min(1.15, Math.sqrt(Math.abs(end - from) / (vh() * .8))));   // short moves are quicker
    expectY = from;
    function step(t) {
      if (id !== glideId) return;                                  // the guest took over
      if (Math.abs(y() - expectY) > 3) { onGuest(); return; }     // moved by something else (e.g. dragging the scrollbar)
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / ms);
      var e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;   // gentle start and stop
      window.scrollTo(0, Math.round(from + (end - from) * e));
      expectY = y();
      if (k < 1) requestAnimationFrame(step);
      else then();
    }
    requestAnimationFrame(step);
  }
  function flipCards() {   // turn over the event cards that are fully on screen, one after another
    var at = now(), h = vh();
    var cards = Array.prototype.filter.call(document.querySelectorAll('.flip:not(.is-flipped):not([data-guest-touched])'), function (c) {
      var r = c.getBoundingClientRect();
      return r.height > 0 && r.top >= -10 && r.bottom <= h + 10;
    });
    cards.forEach(function (card, i) {
      setTimeout(function () {
        if (lastGuest > at || card.classList.contains('is-flipped')) return;   // the guest is in charge now
        var front = card.querySelector('.flip__front'), back = card.querySelector('.flip__back');
        card.classList.add('is-flipped');
        if (front) { front.setAttribute('aria-expanded', 'true'); front.tabIndex = -1; }
        if (back) {
          back.setAttribute('aria-hidden', 'false');
          Array.prototype.forEach.call(back.querySelectorAll('a, button'), function (el) { el.tabIndex = 0; });
        }
      }, 800 + i * TOUR.cardGap);
    });
    return cards.length;
  }
  function move() {
    if (done) return;
    var quiet = now() - lastGuest;
    if (quiet < TOUR.resumeAfter) { later(move, TOUR.resumeAfter - quiet + 50); return; }
    if (busy()) { later(move, 1500); return; }
    keepAwake();
    var target = nextStop();
    if (target === null) { finish(); return; }
    var from = y();
    glideTo(target, function () {
      var flips = flipCards();
      var small = Math.abs(y() - from) < vh() * .25;                   // only a little new to read
      later(move, holdFor(y()) * (small ? .6 : 1) + flips * TOUR.cardGap);
    });
  }
  function finish() {
    done = true;
    clearTimeout(timer);
    restLater();
  }
  function onGuest() {
    lastGuest = now();
    glideId++;                                         // stop a move that is under way
    if (started && !done) later(move, TOUR.resumeAfter);
    else if (done && opened()) { keepAwake(); restLater(); }   // after the tour: stay on while they keep reading
  }
  ['touchstart', 'wheel', 'keydown', 'mousedown'].forEach(function (type) {
    window.addEventListener(type, onGuest, { passive: true });
  });
  document.addEventListener('click', function (e) {   // a card the guest opened or closed themselves is left as they put it
    var card = e.target && e.target.closest && e.target.closest('.flip');
    if (card) card.setAttribute('data-guest-touched', '');
  }, true);
  window.addEventListener('scroll', function () {
    if (started && !done && expectY >= 0 && Math.abs(y() - expectY) > 3) onGuest();   // the guest scrolled
  }, { passive: true });

  function arm() {
    if (started || done) return;
    started = true;
    keepAwake();
    later(move, TOUR.firstWait);
  }
  if (still) return;
  if (hero.classList.contains('names-in')) arm();
  else if ('MutationObserver' in window) {
    var mo = new MutationObserver(function () {
      if (hero.classList.contains('names-in')) { mo.disconnect(); arm(); }
    });
    mo.observe(hero, { attributes: true, attributeFilter: ['class'] });
  }
})();
