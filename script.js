/* ==========================================================================
   ✦ EDIT YOUR DETAILS HERE ✦
   Everything a guest reads — names, dates, venues, story, messages — comes
   from this one CONFIG object. Change a value, save, refresh. That's it.

   In any text you can write {groom}, {bride} or {date} and it is filled in
   for you (e.g. 'Dear {groom} & {bride}').

   Dates use ISO format with the India time zone (+05:30), e.g.
   '2027-02-11T07:30:00+05:30'  →  11 Feb 2027, 7:30 AM IST.
   The countdown, calendar file and every formatted date are built from these.

   (The WhatsApp link-preview text lives in index.html <head>, because
    WhatsApp reads it without running this script.)
   ========================================================================== */
const CONFIG = {
  groom: {
    name: 'Adiseelan',
    nameTa: 'ஆதிசீலன்',         // Tamil spelling — please confirm with family
    parents: '',                 // optional, e.g. 'Son of Mr. R. ____ & Mrs. ____'  ('' hides it)
    parentsTa: '',               // optional Tamil line, e.g. 'திரு. ____ – திருமதி. ____ அவர்களின் மகன்'
  },
  bride: {
    name: 'Sathyavani',
    nameTa: 'சத்தியவாணி',          // Tamil spelling — please confirm with family
    parents: '',
    parentsTa: '',
  },

  wedding: {
    titleTa: 'திருமணம்',
    title: 'The Wedding',
    subtitleTa: 'சுப முகூர்த்தம்',
    subtitle: 'Muhurtham',
    start: '2027-02-11T07:30:00+05:30',   // the countdown counts down to this moment
    end: '2027-02-11T09:00:00+05:30',
    venue: 'Vallathamman Kovil',
    address: 'Anumanthai',
    // ⚠ Please replace with the exact pin: open the temple in Google Maps → Share → Copy link → paste here.
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Vallathamman Kovil, Anumanthai'),
    geo: null,                            // optional [latitude, longitude] for calendar apps
  },

  reception: {
    titleTa: 'வரவேற்பு',
    title: 'The Reception',
    subtitleTa: 'திருமண வரவேற்பு',
    subtitle: 'Evening Reception',
    start: '2027-02-11T19:00:00+05:30',
    end: '2027-02-11T22:00:00+05:30',
    venue: 'SLK Mahal',
    address: 'Kirumampakkam, Puducherry 607403',
    // Plus Code RQHM+27C (full code 7J3XRQHM+27C) = 11.827563, 79.783141.
    // This link opens Google Maps straight into directions from the guest's location.
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=11.827563,79.783141',
    geo: [11.827563, 79.783141],
  },

  // Optional Tamil calendar line under the date, e.g. 'பராபவ ஆண்டு, தை மாதம் __ஆம் நாள்'. '' hides it.
  tamilDate: '',

  // "Our Story" timeline — add, remove or reorder freely.
  // icon: 'rasi' | 'tumblers' | 'rings' | 'kalasam'
  story: [
    { icon: 'tumblers', date: '26 Aug 2026', titleTa: 'முதல் சந்திப்பு', title: 'First Meeting',
      text: 'The day we first met and started our conversation — and it hasn’t stopped since.' },
    { icon: 'rings', date: '16 Sep 2026', titleTa: 'நிச்சயதார்த்தம்', title: 'Engagement',
      text: 'Blessed by our elders and surrounded by family, the promise became official.' },
    { icon: 'kalasam', date: '11 Feb 2027', titleTa: 'திருமணம்', title: 'The Wedding',
      text: 'Under an auspicious muhurtham, two lives become one. We would love for you to be there.' },
  ],

  // What the countdown says once it reaches zero (wedding day) and after the celebrations
  countdown: {
    todayTa: 'இன்றே அந்த நன்னாள்!',
    today: 'Today is the day!',
    duringMuhurtham: 'The muhurtham is happening now — thank you for your blessings!',
    beforeReception: 'See you at the reception this evening!',
    duringReception: 'The reception is on — come celebrate with us!',
    afterTa: 'திருமணம் இனிதே நடந்தேறியது',
    after: 'Happily married!',
    afterSub: 'Thank you for every blessing — you made our day.',
  },

  blessings: {
    // Your WhatsApp number with country code, digits only — e.g. '919876543210'.
    // Leave '' and WhatsApp will let the guest choose who to send it to.
    whatsappNumber: '917010912552',
    message:
      '🌸 இனிய திருமண நல்வாழ்த்துகள்! 🌸\n\n' +
      'Dear {groom} & {bride},\n' +
      'Wishing you both a lifetime of love, laughter and togetherness. ' +
      'May your new journey be blessed always! 🙏\n\n' +
      'With love,\n',
  },

  // The hidden-lamp surprise
  secret: {
    titleTa: 'நீங்கள் கண்டுபிடித்துவிட்டீர்கள்!',
    title: 'You found our little lamp!',
    messageTa: 'எங்கள் புதிய வாழ்க்கையின் முதல் தீபத்தை நீங்கள் ஏற்றியுள்ளீர்கள்.',
    message: 'Just like this diya, your love and blessings light up our new beginning. ' +
      'Thank you for being part of our story — we can’t wait to celebrate with you on {date}.',
    signature: '— {groom} & {bride}',
  },

  music: {
    src: 'assets/music.mp3',
    volume: 0.55,                 // 0 – 1
  },

  calendar: {
    fileName: '{groom}-{bride}-Wedding.ics',
  },

  // Your published address (used inside the calendar entries)
  siteUrl: 'https://adiseelan.github.io/sathyavani-adiseelan/',
};

/* ==========================================================================
   You shouldn't need to edit anything below this line.
   Tip: preview any moment by adding ?now=… to the address, e.g.
   index.html?now=2027-02-11T07:29:50+05:30  (watch the countdown hit zero)
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------- helpers ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.prototype.slice.call(root.querySelectorAll(sel));
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IST = 'Asia/Kolkata';
  const vibrate = (p) => { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* not supported */ } };
  const rand = (a, b) => a + Math.random() * (b - a);

  // ?now= lets you preview the countdown states (a '+' in the URL arrives as a space)
  const timeOffset = (() => {
    const q = new URLSearchParams(location.search).get('now');
    if (!q) return 0;
    const t = Date.parse(q.trim().replace(' ', '+'));
    return isNaN(t) ? 0 : t - Date.now();
  })();
  const now = () => Date.now() + timeOffset;

  function fmt(iso, opts, locale) {
    try {
      return new Intl.DateTimeFormat(locale || 'en-GB', Object.assign({ timeZone: IST }, opts)).format(new Date(iso));
    } catch (e) {
      return new Date(iso).toDateString();
    }
  }
  const clock = (iso) => fmt(iso, { hour: 'numeric', minute: '2-digit', hour12: true }, 'en-US').replace(/\u202f|\u00a0/g, ' ');
  function timeRange(a, b) {
    const s = clock(a), e = clock(b);
    return s.slice(-2) === e.slice(-2) ? `${s.slice(0, -3)} – ${e}` : `${s} – ${e}`;
  }
  const dots = (iso) => [fmt(iso, { day: '2-digit' }), fmt(iso, { month: '2-digit' }), fmt(iso, { year: 'numeric' })].join(' · ');

  const W = CONFIG.wedding, R = CONFIG.reception;
  const VIEW = {
    weddingWeekday: fmt(W.start, { weekday: 'long' }),
    weddingDateLong: fmt(W.start, { day: 'numeric', month: 'long', year: 'numeric' }),
    weddingDateShort: fmt(W.start, { day: 'numeric', month: 'short', year: 'numeric' }),
    weddingDateDots: dots(W.start),
    weddingTime: timeRange(W.start, W.end),
    weddingStart: clock(W.start),
    receptionWeekday: fmt(R.start, { weekday: 'long' }),
    receptionDateLong: fmt(R.start, { day: 'numeric', month: 'long', year: 'numeric' }),
    receptionDateShort: fmt(R.start, { day: 'numeric', month: 'short', year: 'numeric' }),
    receptionTime: timeRange(R.start, R.end),
  };

  const tpl = (v) => (typeof v !== 'string' ? v : v
    .replace(/\{groom\}/g, CONFIG.groom.name)
    .replace(/\{bride\}/g, CONFIG.bride.name)
    .replace(/\{date\}/g, VIEW.weddingDateLong));

  /* ---------------- 0. fill the page from CONFIG ---------------- */
  function lookup(path) {
    const parts = path.split('.');
    let obj = parts[0] === 'view' ? VIEW : CONFIG;
    if (parts[0] === 'view') parts.shift();
    for (const p of parts) { if (obj == null) return undefined; obj = obj[p]; }
    return obj;
  }
  function bindAll(scope) {
    $$('[data-bind]', scope).forEach((el) => {
      const v = lookup(el.getAttribute('data-bind'));
      if (v === undefined) return;
      el.textContent = tpl(v);
      if (el.hasAttribute('hidden') || v === '') el.hidden = v === '';
    });
    $$('[data-href]', scope).forEach((el) => {
      const v = lookup(el.getAttribute('data-href'));
      if (v) el.href = v;
    });
  }

  const ICONS = { rasi: 'i-rasi', tumblers: 'i-tumblers', rings: 'i-rings', kalasam: 'i-kalasam' };
  function buildStory() {
    const list = $('#timeline');
    if (!list || !Array.isArray(CONFIG.story) || !CONFIG.story.length) return;
    const template = list.querySelector('.tl-item');
    const diya = $('#secret-diya');
    list.innerHTML = '';
    CONFIG.story.forEach((item) => {
      const li = template.cloneNode(true);
      $('use', li).setAttribute('href', '#' + (ICONS[item.icon] || 'i-kalasam'));
      $('.tl-date', li).textContent = item.date || '';
      $('.tl-title-ta', li).textContent = item.titleTa || '';
      $('.tl-title-en', li).textContent = item.title || '';
      $('.tl-text', li).textContent = item.text || '';
      list.appendChild(li);
    });
    // perch the hidden diya on the second card (or the first if there is only one)
    const cards = $$('.tl-card', list);
    const host = cards[Math.min(1, cards.length - 1)];
    if (diya && host) { host.appendChild(diya); diya.classList.add('is-perched'); }
  }

  bindAll(document);
  buildStory();
  const bgm = $('#bgm');
  if (bgm && CONFIG.music.src && bgm.getAttribute('src') !== CONFIG.music.src) bgm.src = CONFIG.music.src;
  document.title = `${CONFIG.groom.name} ❤ ${CONFIG.bride.name} · Wedding Invitation · ${VIEW.weddingDateShort}`;

  /* ---------------- 3. falling petals ---------------- */
  const petals = (function () {
    const canvas = $('#petals');
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, list = [], sprites = [], raf = 0, running = false, last = 0, target = 0;

    function makeSprite(draw, size) {
      const c = document.createElement('canvas');
      c.width = c.height = Math.ceil(size * 2);
      const g = c.getContext('2d');
      g.scale(2, 2);
      draw(g, size);
      return c;
    }
    function rosePetal(g, s, c1, c2) {
      const grd = g.createLinearGradient(0, 0, s, s);
      grd.addColorStop(0, c1); grd.addColorStop(1, c2);
      g.fillStyle = grd;
      g.beginPath();
      g.moveTo(s * .5, s * .95);
      g.bezierCurveTo(s * .05, s * .7, s * .02, s * .2, s * .32, s * .08);
      g.bezierCurveTo(s * .42, s * .02, s * .5, s * .14, s * .5, s * .2);
      g.bezierCurveTo(s * .5, s * .14, s * .58, s * .02, s * .68, s * .08);
      g.bezierCurveTo(s * .98, s * .2, s * .95, s * .7, s * .5, s * .95);
      g.fill();
      g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = .8;
      g.beginPath(); g.moveTo(s * .5, s * .9); g.quadraticCurveTo(s * .47, s * .5, s * .5, s * .25); g.stroke();
    }
    function jasmine(g, s) {
      g.translate(s / 2, s / 2);
      g.fillStyle = '#fffaf0';
      g.shadowColor = 'rgba(0,0,0,.18)'; g.shadowBlur = 2;
      for (let i = 0; i < 5; i++) {
        g.rotate(Math.PI * 2 / 5);
        g.beginPath(); g.ellipse(0, -s * .24, s * .13, s * .24, 0, 0, Math.PI * 2); g.fill();
      }
      g.shadowBlur = 0;
      g.fillStyle = '#f3d27a'; g.beginPath(); g.arc(0, 0, s * .08, 0, Math.PI * 2); g.fill();
    }
    function bud(g, s) {
      g.translate(s / 2, s / 2);
      const grd = g.createLinearGradient(0, -s * .4, 0, s * .4);
      grd.addColorStop(0, '#ffffff'); grd.addColorStop(1, '#f1e6cf');
      g.fillStyle = grd;
      g.beginPath(); g.ellipse(0, 0, s * .12, s * .38, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#9ccc65'; g.beginPath(); g.ellipse(0, s * .36, s * .07, s * .08, 0, 0, Math.PI * 2); g.fill();
    }
    function buildSprites() {
      sprites = [
        makeSprite((g, s) => rosePetal(g, s, '#e8344e', '#8e0f24'), 26),
        makeSprite((g, s) => rosePetal(g, s, '#ff6b81', '#c2183a'), 24),
        makeSprite((g, s) => rosePetal(g, s, '#c41a32', '#6e0a1b'), 26),
        makeSprite((g, s) => jasmine(g, s), 24),
        makeSprite((g, s) => jasmine(g, s), 20),
        makeSprite((g, s) => bud(g, s), 22),
      ];
    }
    function spawn(p, top) {
      p.sprite = sprites[(Math.random() * sprites.length) | 0];
      p.size = rand(12, 22);
      p.x = rand(-20, w + 20);
      p.y = top ? rand(-h * .15, -20) : rand(-h, h);
      p.vy = rand(26, 58);
      p.swayA = rand(14, 42);
      p.swayF = rand(.35, .9);
      p.phase = rand(0, Math.PI * 2);
      p.rot = rand(0, Math.PI * 2);
      p.vr = rand(-1.2, 1.2);
      p.flipF = rand(.6, 1.8);
      p.alpha = rand(.75, 1);
      return p;
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      target = Math.round(Math.min(44, Math.max(16, (w * h) / 13000)));
    }
    function frame(t) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(.05, (t - last) / 1000 || 0);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.phase += dt * p.swayF * Math.PI * 2;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        const x = p.x + Math.sin(p.phase) * p.swayA;
        if (p.y > h + 30) {
          if (list.length > target) { list.splice(i, 1); continue; }
          spawn(p, true);
          continue;
        }
        const flip = Math.cos(p.phase * p.flipF);
        ctx.globalAlpha = p.alpha;
        ctx.setTransform(dpr * Math.cos(p.rot), dpr * Math.sin(p.rot), -dpr * Math.sin(p.rot) * flip, dpr * Math.cos(p.rot) * flip, x * dpr, p.y * dpr);
        ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
    }
    function play() {
      if (running || document.hidden) return;
      running = true; last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function pause() { running = false; cancelAnimationFrame(raf); }
    return {
      start() {
        if (reduceMotion) return;
        buildSprites(); resize();
        list = [];
        for (let i = 0; i < target; i++) list.push(spawn({}, true));
        play();
        let rt;
        window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
        document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
      },
      burst(n) { // a shower of welcome petals as the doors open
        if (reduceMotion) return;
        for (let i = 0; i < n; i++) {
          const p = spawn({}, true);
          p.y = rand(-h * .5, -10); p.vy = rand(70, 120);
          list.push(p);
        }
      },
    };
  })();

  /* ---------------- fireworks & confetti (one small canvas engine) ---------------- */
  const fx = (function () {
    const canvas = $('#fx');
    const ctx = canvas.getContext('2d');
    const COLORS = ['#ffd76a', '#ffe9a8', '#ffb733', '#fff4d6', '#ff6b81', '#f29a1f', '#ff9ec4', '#9be27a'];
    const CONFETTI = ['#e8c25b', '#f7e3a1', '#c41a32', '#7a1a2c', '#2f8f3e', '#f29a1f', '#fff8ec'];
    let parts = [], rockets = [], flashes = [], raf = 0, last = 0, w = 0, h = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    }
    function burst(x, y, n, speed, palette) {
      const main = (palette || COLORS)[(Math.random() * (palette || COLORS).length) | 0];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rand(-.1, .1);
        const s = speed * rand(.35, 1);
        parts.push({ k: 'spark', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, trail: [],
          decay: rand(.5, .85), color: Math.random() < .75 ? main : COLORS[(Math.random() * COLORS.length) | 0],
          size: rand(1.8, 3.2), twinkle: Math.random() < .3 });
      }
      flashes.push({ x, y, t: 0, r: speed * .55 });
    }
    function launch(tx, ty, delay) {
      setTimeout(() => {
        const g = 980, y0 = h + 12;
        const vy = -Math.sqrt(2 * g * Math.max(80, y0 - ty));
        rockets.push({ x: tx + rand(-24, 24), y: y0, vx: rand(-30, 30), vy, g, trail: [] });
        run();
      }, delay);
    }
    function step(t) {
      const dt = Math.min(.035, (t - last) / 1000 || .016);
      last = t;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'lighter';
      // bloom flashes where a shell bursts
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i]; f.t += dt;
        const k = 1 - f.t / .35;
        if (k <= 0) { flashes.splice(i, 1); continue; }
        const grd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        grd.addColorStop(0, `rgba(255,236,190,${.55 * k})`); grd.addColorStop(1, 'rgba(255,200,120,0)');
        ctx.globalAlpha = 1; ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      }
      // rockets with a glittering tail
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push([r.x, r.y]); if (r.trail.length > 10) r.trail.shift();
        r.vy += r.g * dt; r.x += r.vx * dt; r.y += r.vy * dt;
        ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(255,226,160,.85)'; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(r.trail[0][0], r.trail[0][1]);
        for (const p of r.trail) ctx.lineTo(p[0], p[1]);
        ctx.lineTo(r.x, r.y); ctx.stroke();
        ctx.fillStyle = '#fffbe8'; ctx.beginPath(); ctx.arc(r.x, r.y, 2.6, 0, Math.PI * 2); ctx.fill();
        if (r.vy > -40) { burst(r.x, r.y, (rand(70, 96)) | 0, rand(230, 330)); rockets.splice(i, 1); }
      }
      // sparks + confetti
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        if (p.k === 'spark') {
          p.trail.push([p.x, p.y]); if (p.trail.length > 7) p.trail.shift();
          p.vx *= Math.exp(-1.5 * dt); p.vy = p.vy * Math.exp(-1.5 * dt) + 150 * dt;
          p.x += p.vx * dt; p.y += p.vy * dt;
          p.life -= p.decay * dt;
          if (p.life <= 0) { parts.splice(i, 1); continue; }
          const a = Math.max(0, p.life) * (p.twinkle ? (.55 + .45 * Math.sin(t / 40 + i)) : 1);
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = a * .55; ctx.strokeStyle = p.color; ctx.lineWidth = p.size;
          ctx.beginPath(); ctx.moveTo(p.trail[0][0], p.trail[0][1]);
          for (const q of p.trail) ctx.lineTo(q[0], q[1]);
          ctx.lineTo(p.x, p.y); ctx.stroke();
          ctx.globalAlpha = a; ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * .75, 0, Math.PI * 2); ctx.fill();
        } else {
          p.t += dt;
          p.vy = Math.min(p.vy + 260 * dt, 150);
          p.vx *= Math.exp(-.8 * dt);
          p.x += (p.vx + Math.sin(p.t * p.wob) * 28) * dt; p.y += p.vy * dt;
          p.rot += p.vr * dt;
          if (p.y > h + 30) { parts.splice(i, 1); continue; }
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
          ctx.save();
          ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(Math.cos(p.t * p.flip), 1);
          ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      if (parts.length || rockets.length || flashes.length) raf = requestAnimationFrame(step);
      else { ctx.clearRect(0, 0, w, h); raf = 0; }
    }
    function run() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } }
    return {
      fireworks(x, y) {
        if (reduceMotion) return;
        resize();
        burst(x, y, 90, 300);                     // the lamp itself bursts into sparks first
        const shells = [[.22, .2], [.78, .16], [.5, .1], [.3, .36], [.72, .34], [.5, .26], [.15, .12], [.86, .26]];
        shells.forEach(([fx_, fy], i) => launch(w * fx_, h * fy, 120 + i * 230));
        run();
      },
      confetti() {
        if (reduceMotion) return;
        resize();
        for (let i = 0; i < 170; i++) {
          parts.push({ k: 'conf', x: rand(0, w), y: rand(-h * .7, -10), vx: rand(-60, 60), vy: rand(20, 120),
            rot: rand(0, 6.3), vr: rand(-6, 6), w: rand(6, 10), h: rand(10, 16), t: rand(0, 6), wob: rand(2, 5), flip: rand(3, 8),
            color: CONFETTI[(Math.random() * CONFETTI.length) | 0] });
        }
        burst(w * .3, h * .3, 80, 280); burst(w * .7, h * .26, 80, 280);
        run();
      },
    };
  })();

  /* ---------------- music ---------------- */
  const music = (function () {
    const audio = $('#bgm');
    const btn = $('#music-toggle');
    let wanted = false, pausedByHide = false, fadeRaf = 0, broken = false;
    const vol = Math.max(0, Math.min(1, CONFIG.music.volume || .55));

    function ui() {
      const on = !audio.paused;
      btn.setAttribute('aria-pressed', String(on));
      btn.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
    }
    function fade(to, ms, done) {
      cancelAnimationFrame(fadeRaf);
      const from = audio.volume, t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / ms);
        try { audio.volume = from + (to - from) * k; } catch (e) { /* iOS: volume is read-only */ }
        if (k < 1) fadeRaf = requestAnimationFrame(tick); else if (done) done();
      };
      fadeRaf = requestAnimationFrame(tick);
    }
    function play(fadeIn) {
      if (broken) return;
      cancelAnimationFrame(fadeRaf);       // stop a fade-out that is still running
      wanted = true;
      try { audio.volume = fadeIn ? 0 : vol; } catch (e) { /* ignore */ }
      const p = audio.play();
      if (p && p.then) p.then(() => fadeIn && fade(vol, 2500)).catch(() => { wanted = false; ui(); });
      else if (fadeIn) fade(vol, 2500);
    }
    function stop() { wanted = false; fade(0, 400, () => { audio.pause(); }); }

    audio.addEventListener('play', ui);
    audio.addEventListener('pause', ui);
    audio.addEventListener('error', () => { broken = true; btn.hidden = true; });
    btn.addEventListener('click', () => (audio.paused ? play(false) : stop()));
    // be polite: pause when the guest switches apps, resume when they come back
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (!audio.paused) { pausedByHide = true; audio.pause(); } }
      else if (pausedByHide && wanted) { pausedByHide = false; audio.play().catch(() => {}); }
    });
    return {
      start() { play(true); if (!broken) btn.hidden = false; ui(); },
      showToggle() { if (!broken) btn.hidden = false; ui(); },
    };
  })();

  /* ---------------- 2. kolam drawing + names ---------------- */
  function drawKolam() {
    const svg = $('.kolam');
    const hero = $('#hero');
    hero.classList.add('is-active');
    if (!svg) { hero.classList.add('names-in'); return; }
    const lines = $$('.kolam__lines path', svg);
    const pulli = $$('.kolam__dots circle', svg);
    if (reduceMotion) {
      svg.classList.add('is-drawing', 'dots-in', 'is-drawn');
      hero.classList.add('names-in');
      return;
    }
    lines.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len} ${len}`;
      p.style.strokeDashoffset = String(len);
    });
    pulli.forEach((c, i) => { c.style.transitionDelay = `${Math.round(i * 8)}ms`; });
    svg.classList.add('is-drawing');
    requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.add('dots-in')));

    const DRAW = 4.8;
    const finish = () => {
      svg.classList.add('is-drawn');
      lines.forEach((p) => { p.style.strokeDasharray = 'none'; });
    };
    setTimeout(() => hero.classList.add('names-in'), 650 + (DRAW - .5) * 1000);
    setTimeout(() => {
      if (window.gsap) {
        window.gsap.to(lines, { strokeDashoffset: 0, duration: DRAW, ease: 'power1.inOut', onComplete: finish });
      } else {
        lines.forEach((p) => {
          p.style.transition = `stroke-dashoffset ${DRAW}s cubic-bezier(.45,.05,.55,.95)`;
          p.getBoundingClientRect();
          p.style.strokeDashoffset = '0';
        });
        setTimeout(finish, DRAW * 1000 + 50);
      }
    }, 650);
  }

  /* ---------------- 1. the gate ---------------- */
  const gate = $('#gate');
  let gateOpened = false;
  async function openGate() {
    if (gateOpened || !gate) return;
    gateOpened = true;
    music.start();
    vibrate(18);
    gate.classList.add('is-opening');
    petals.start();
    if (!reduceMotion) setTimeout(() => petals.burst(26), 900);

    await wait(reduceMotion ? 350 : 2050);
    gate.classList.add('is-flooding');
    await wait(reduceMotion ? 0 : 650);
    root.classList.remove('is-locked');
    gate.classList.add('is-gone');
    gate.setAttribute('aria-hidden', 'true');
    drawKolam();
    refreshScroll();
    const heading = $('#hero-title');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    await wait(1300);
    gate.remove();
  }
  if (gate) {
    $('#gate-open').addEventListener('click', openGate);
    if (location.hash && location.hash !== '#') { // deep link (e.g. #events) skips the doors
      gate.classList.add('is-gone');
    }
  }

  /* ---------------- 4/6. scroll animations ---------------- */
  let ST = null;
  function refreshScroll() { if (ST) { ST.refresh(); } }
  function setupScroll() {
    const hasGsap = window.gsap && window.ScrollTrigger;
    if (reduceMotion) return;
    if (!hasGsap) { ioFallback(); return; }
    const gsap = window.gsap;
    ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    const wide = window.matchMedia('(min-width: 860px)').matches;

    $$('[data-reveal]').forEach((el) => {
      gsap.from(el, { y: 34, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    $$('.tl-item').forEach((item, i) => {
      const dir = wide && i % 2 === 0 ? -1 : 1;
      const shift = wide ? 64 : 36;
      const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 84%', once: true } });
      tl.from($('.tl-node', item), { scale: 0, rotation: -120, duration: .7, ease: 'back.out(2.2)' })
        .from($('.tl-card', item), { x: shift * dir, autoAlpha: 0, rotation: 2.5 * dir, duration: 1, ease: 'power3.out' }, '-=.35')
        .from($$('.tl-card > *:not(.secret-diya)', item), { y: 12, autoAlpha: 0, stagger: .07, duration: .55, ease: 'power2.out' }, '-=.6');
    });
    gsap.fromTo('.timeline__fill', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.timeline-wrap', start: 'top 72%', end: 'bottom 62%', scrub: .6 },
    });

    gsap.from('.countdown__lamp', { y: 40, autoAlpha: 0, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: '#countdown', start: 'top 75%', once: true } });
    gsap.from('.cd-unit', { y: 36, autoAlpha: 0, stagger: .12, duration: .9, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.countdown__grid', start: 'top 90%', once: true } });

    gsap.from('.flip', { y: 70, rotationX: -22, autoAlpha: 0, transformPerspective: 900, stagger: .2, duration: 1.1, ease: 'power3.out',
      clearProps: 'transform', scrollTrigger: { trigger: '.events__grid', start: 'top 86%', once: true } });

    gsap.to('.hero__kolam', { yPercent: 14, scale: .92, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshScroll);
    window.addEventListener('load', refreshScroll);
  }
  function ioFallback() {
    if (!('IntersectionObserver' in window)) return;
    root.classList.add('io-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal], .tl-item, .cd-unit, .flip').forEach((el) => io.observe(el));
  }

  /* ---------------- 5. countdown ---------------- */
  function setupCountdown() {
    const section = $('#countdown');
    const start = Date.parse(W.start);
    const dayEnd = Math.max(Date.parse(R.end) || 0, Date.parse(W.start.slice(0, 10) + 'T23:59:59+05:30') || 0, Date.parse(W.end));
    const done = $('#countdown-done');
    const nums = {};
    $$('.cd-num').forEach((el) => { nums[el.dataset.unit] = el; });
    let state = '', confettiPending = false, inView = false;

    function set(el, v, pad) {
      const s = String(v).padStart(pad, '0');
      if (el.textContent === s) return;
      el.textContent = s;
      if (!reduceMotion) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
    }
    function show(next) {
      state = next;
      section.classList.toggle('is-today', next === 'today');
      section.classList.toggle('is-after', next === 'after');
      done.hidden = next === 'before';
      const C = CONFIG.countdown;
      if (next === 'today') {
        $('.countdown__done-ta', done).textContent = C.todayTa;
        $('.countdown__done-en', done).textContent = C.today;
        confettiPending = true; maybeConfetti();
      } else if (next === 'after') {
        $('.countdown__done-ta', done).textContent = C.afterTa;
        $('.countdown__done-en', done).textContent = C.after;
        $('.countdown__done-sub', done).textContent = C.afterSub;
      }
    }
    function maybeConfetti() {
      if (confettiPending && inView && !root.classList.contains('is-locked')) {
        confettiPending = false;
        fx.confetti();
      }
    }
    function render() {
      const t = now();
      const next = t < start ? 'before' : t < dayEnd ? 'today' : 'after';
      if (next !== state) show(next);
      if (next === 'today') {
        const C = CONFIG.countdown;
        const sub = t < Date.parse(W.end) ? C.duringMuhurtham : t < Date.parse(R.start) ? C.beforeReception
          : t < Date.parse(R.end) ? C.duringReception : C.afterSub;
        const el = $('.countdown__done-sub', done);
        if (el.textContent !== sub) el.textContent = sub;
      }
      if (next !== 'before') return;
      let diff = Math.max(0, start - t);
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const hh = Math.floor(diff / 36e5); diff -= hh * 36e5;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1e3);
      set(nums.days, d, d > 99 ? 3 : 2); set(nums.hours, hh, 2); set(nums.minutes, m, 2); set(nums.seconds, s, 2);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        if (inView) maybeConfetti();
      }, { threshold: .35 }).observe(section);
    } else { inView = true; }
    render();
    (function loop() { setTimeout(() => { render(); loop(); }, 1000 - (now() % 1000) + 20); })();
  }

  /* ---------------- 6. flip cards ---------------- */
  function setupFlips() {
    $$('.flip').forEach((card) => {
      const front = $('.flip__front', card);
      const back = $('.flip__back', card);
      const close = $('.flip__close', card);
      const focusables = $$('a, button', back);
      function set(on, fromKeyboard) {
        card.classList.toggle('is-flipped', on);
        front.setAttribute('aria-expanded', String(on));
        back.setAttribute('aria-hidden', String(!on));
        front.tabIndex = on ? -1 : 0;
        focusables.forEach((el) => { el.tabIndex = on ? 0 : -1; });
        if (fromKeyboard) setTimeout(() => (on ? close : front).focus({ preventScroll: true }), 300);
      }
      front.addEventListener('click', (e) => { set(true, e.detail === 0); vibrate(10); });
      close.addEventListener('click', (e) => { e.stopPropagation(); set(false, e.detail === 0); });
      back.addEventListener('click', (e) => { if (!e.target.closest('a, button')) set(false, false); });
      set(false, false);
    });
  }

  /* ---------------- 7. the hidden diya ---------------- */
  function setupSecret() {
    const diya = $('#secret-diya');
    const modal = $('#secret');
    if (!diya || !modal) return;
    let lastFocus = null;
    function open() {
      lastFocus = document.activeElement;
      modal.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('is-open')));
      setTimeout(() => $('.secret__close', modal).focus({ preventScroll: true }), 60);
      document.addEventListener('keydown', onKey);
    }
    function close() {
      modal.classList.remove('is-open');
      document.removeEventListener('keydown', onKey);
      setTimeout(() => { modal.hidden = true; }, reduceMotion ? 0 : 450);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') { e.preventDefault(); $('.secret__close', modal).focus(); }
    }
    diya.addEventListener('click', () => {
      const r = diya.getBoundingClientRect();
      diya.classList.add('is-found');
      vibrate([20, 50, 30]);
      fx.fireworks(r.left + r.width / 2, r.top + r.height / 3);
      $$('[data-hint]').forEach((el) => { el.textContent = 'You found the hidden lamp — thank you! ✨'; el.classList.add('is-found'); });
      setTimeout(open, reduceMotion ? 0 : 1500);
    });
    $$('[data-close]', modal).forEach((el) => el.addEventListener('click', close));
  }

  /* ---------------- 8. blessings on WhatsApp ---------------- */
  function setupBlessings() {
    const btn = $('#bless-btn');
    if (!btn) return;
    const phone = String(CONFIG.blessings.whatsappNumber || '').replace(/\D/g, '');
    btn.href = `https://wa.me/${phone}?text=${encodeURIComponent(tpl(CONFIG.blessings.message))}`;
  }

  /* ---------------- 9. add to calendar ---------------- */
  function setupCalendar() {
    const btn = $('#cal-btn');
    const menu = $('#cal-menu');
    if (!btn || !menu) return;
    const couple = `${CONFIG.groom.name} & ${CONFIG.bride.name}`;
    const events = [
      { id: 'wedding', e: W, title: `${couple} – ${W.title} (${W.subtitle})` },
      { id: 'reception', e: R, title: `${couple} – ${R.title}` },
    ];
    const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
    const enc = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
    function fold(line) { // RFC 5545: max 75 octets per line, never split a multi-byte character
      if (!enc) return line;
      const out = []; let cur = '', bytes = 0;
      for (const ch of line) {
        const b = enc.encode(ch).length;
        if (bytes + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; bytes = 0; }
        cur += ch; bytes += b;
      }
      out.push(cur);
      return out.join('\r\n ');
    }
    function details(ev) {
      return `With joy, we invite you to celebrate with us.\n${ev.e.venue}, ${ev.e.address}\nDirections: ${ev.e.mapsUrl}\nInvitation: ${CONFIG.siteUrl}`;
    }
    function ics() {
      const stamp = utc(new Date().toISOString());
      const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
        `X-WR-CALNAME:${esc(couple)} Wedding`];
      events.forEach((ev) => {
        lines.push('BEGIN:VEVENT',
          `UID:${ev.id}-${utc(ev.e.start)}@${CONFIG.groom.name.toLowerCase()}-${CONFIG.bride.name.toLowerCase()}`,
          `DTSTAMP:${stamp}`, `DTSTART:${utc(ev.e.start)}`, `DTEND:${utc(ev.e.end)}`,
          `SUMMARY:${esc(ev.title)}`, `LOCATION:${esc(`${ev.e.venue}, ${ev.e.address}`)}`,
          `DESCRIPTION:${esc(details(ev))}`, `URL:${ev.e.mapsUrl}`,
          ...(Array.isArray(ev.e.geo) ? [`GEO:${ev.e.geo[0]};${ev.e.geo[1]}`] : []),
          'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(ev.title)}`, 'TRIGGER:-P1D', 'END:VALARM',
          'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(ev.title)}`, 'TRIGGER:-PT2H', 'END:VALARM',
          'END:VEVENT');
      });
      lines.push('END:VCALENDAR');
      return lines.map(fold).join('\r\n') + '\r\n';
    }
    function download() {
      const text = ics();
      try {
        const blob = new Blob([text], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = tpl(CONFIG.calendar.fileName).replace(/[^\w.-]+/g, '-'); a.rel = 'noopener';
        document.body.appendChild(a); a.click();
        setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 4000);
      } catch (e) {
        location.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(text);
      }
    }
    const gcal = (ev) => 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      `&text=${encodeURIComponent(ev.title)}&dates=${utc(ev.e.start)}/${utc(ev.e.end)}` +
      `&details=${encodeURIComponent(details(ev))}&location=${encodeURIComponent(`${ev.e.venue}, ${ev.e.address}`)}&ctz=${IST}`;
    $('[data-cal="google-wedding"]', menu).href = gcal(events[0]);
    $('[data-cal="google-reception"]', menu).href = gcal(events[1]);

    function toggle(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(menu.hidden); });
    $('[data-cal="ics"]', menu).addEventListener('click', () => { download(); toggle(false); });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('click', (e) => { if (!menu.hidden && !e.target.closest('.cal')) toggle(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { toggle(false); btn.focus(); } });
    // exposed for testing in the browser console: copy(window.__weddingICS())
    window.__weddingICS = ics;
  }

  /* ---------------- start ---------------- */
  setupFlips();
  setupSecret();
  setupBlessings();
  setupCalendar();
  setupCountdown();
  setupScroll();

  window.__inviteReady = true;
  if (gate && gate.classList.contains('is-gone')) {      // arrived via a deep link
    root.classList.remove('is-locked');
    gate.remove();
    $('#hero').classList.add('is-active', 'names-in');
    const k = $('.kolam'); if (k) k.classList.add('is-drawing', 'dots-in', 'is-drawn');
    petals.start();
    music.showToggle();
    refreshScroll();
  } else if (window.__earlyOpen) {
    openGate();
  }
})();
