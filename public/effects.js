/* Sayt animatsiyalari. HTML'da data-atributlar bilan ishlaydi:
   data-reveal="up|left|right|zoom"  data-delay="150"  — scroll qilganda chiqib keladi (data-in qo'yiladi; class emas, chunki React className'ni qayta yozadi)
   data-magnetic                                        — tugma sichqonchaga tortiladi
   data-tilt                                            — karta sichqoncha bilan 3D qiyshayadi
   data-parallax="0.04"                                 — sichqoncha bilan suriladi
   data-scroll-x="-0.4"                                 — scroll bilan gorizontal suriladi (+ tezlikka qarab qiyshayadi)
   data-skew                                            — scroll tezligiga qarab qiyshayadi
   data-spotlight                                       — kartada sichqoncha ortidan yorug'lik
   data-particles                                       — sichqonchaga javob beradigan nuqtalar maydoni (canvas)
   data-hscroll + data-hscroll-track + data-hscroll-bar — vertikal scroll bilan gorizontal suriladigan bo'lim
   #preloader                                           — ochilishdagi yuklanish ekrani
   window.__confetti()                                  — konfetti portlashi */
(function () {
  if (window.__fx) return;
  window.__fx = true;
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var wide = matchMedia('(min-width: 1024px)');
  if (!reduce) root.classList.add('fx');
  var qa = function (s) { return document.querySelectorAll(s); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  // ---- Preloader ----
  (function () {
    var pl = document.getElementById('preloader');
    if (!pl) return;
    var done = function () {
      root.classList.add('pl-done');
      try { sessionStorage.setItem('pl', '1'); } catch (e) {}
      setTimeout(function () { pl.remove(); }, 1200);
    };
    if (reduce || root.classList.contains('pl-skip')) { pl.remove(); root.classList.add('pl-done'); return; }
    var num = pl.querySelector('[data-pl-count]');
    var bar = pl.querySelector('[data-pl-bar]');
    var start = performance.now(), dur = 1100;
    (function step(t) {
      var p = clamp((t - start) / dur, 0, 1);
      var e = 1 - Math.pow(1 - p, 3);
      if (num) num.textContent = String(Math.round(e * 100)).padStart(2, '0');
      if (bar) bar.style.transform = 'scaleX(' + e + ')';
      if (p < 1) requestAnimationFrame(step); else setTimeout(done, 150);
    })(start);
  })();

  // ---- Silliq scroll (Lenis) ----
  function initLenis() {
    if (reduce || window.__lenis || !window.Lenis) return;
    try { window.__lenis = new window.Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -80 } }); } catch (e) {}
  }
  if (window.Lenis) initLenis(); else addEventListener('load', initLenis);

  // ---- Scroll qilganda chiqib kelish ----
  // Har safar ekranga kirganda qayta o'ynaydi. Ekrandan to'liq chiqqanda holat tiklanadi:
  // yuqoridan chiqib ketgan element keyin yuqoridan, pastdan chiqqani pastdan kirib keladi.
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var el = e.target;
      if (e.isIntersecting && e.intersectionRatio >= 0.1) {
        el.setAttribute('data-in', '');
      } else if (!e.isIntersecting) {
        el.removeAttribute('data-in');
        el.setAttribute('data-from', e.boundingClientRect.top < 0 ? 'top' : 'bottom');
      }
    });
  }, { threshold: [0, 0.1], rootMargin: '0px 0px -30px 0px' }) : null;

  function scan() {
    qa('[data-reveal]:not([data-fx])').forEach(function (el) {
      el.setAttribute('data-fx', '');
      var d = el.getAttribute('data-delay');
      if (d) el.style.transitionDelay = d + 'ms';
      if (io && !reduce) io.observe(el); else el.setAttribute('data-in', '');
    });
  }
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });

  // ---- Scroll: progress, gorizontal harakat, tezlik ----
  var bar = document.createElement('div');
  bar.className = 'fx-progress';
  document.body.appendChild(bar);
  var lastY = scrollY, vel = 0;

  function frame() {
    var y = scrollY;
    vel += ((y - lastY) - vel) * 0.15;
    lastY = y;
    var h = root.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    if (!reduce) {
      var skew = clamp(vel * 0.25, -12, 12);
      qa('[data-scroll-x]').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > innerHeight + 300) return;
        var k = parseFloat(el.getAttribute('data-scroll-x'));
        el.style.transform = 'translate3d(' + ((r.top - innerHeight / 2) * k) + 'px,0,0) skewX(' + (-skew) + 'deg)';
      });
      qa('[data-skew]').forEach(function (el) { el.style.transform = 'skewY(' + (skew * 0.15) + 'deg)'; });
      qa('[data-vline]').forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        var p = clamp((innerHeight * 0.65 - r.top) / r.height, 0, 1);
        el.style.transform = 'scaleY(' + p + ')';
      });
      qa('[data-hscroll]').forEach(function (sec) {
        var track = sec.querySelector('[data-hscroll-track]');
        var hb = sec.querySelector('[data-hscroll-bar]');
        if (!track) return;
        if (!wide.matches) { track.style.transform = ''; if (hb) hb.style.transform = ''; return; }
        var r = sec.getBoundingClientRect();
        var p = clamp(-r.top / (r.height - innerHeight), 0, 1);
        var dist = track.scrollWidth - track.parentElement.clientWidth;
        track.style.transform = 'translate3d(' + (-p * dist) + 'px,0,0)';
        if (hb) hb.style.transform = 'scaleX(' + p + ')';
      });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ---- Konfetti ----
  window.__confetti = function (x, y) {
    if (reduce) return;
    var c = document.createElement('canvas');
    c.className = 'fx-confetti';
    var dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    document.body.appendChild(c);
    var g = c.getContext('2d'); g.scale(dpr, dpr);
    var cols = ['#4b55f5', '#ffd43b', '#10b981', '#f43f5e', '#ffffff'];
    x = x == null ? innerWidth / 2 : x; y = y == null ? innerHeight / 2 : y;
    var ps = [];
    for (var i = 0; i < 140; i++) {
      var a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 9;
      ps.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6, w: 6 + Math.random() * 6, h: 3 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[i % cols.length] });
    }
    var t0 = performance.now();
    (function draw(t) {
      var life = (t - t0) / 2200;
      g.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach(function (p) {
        p.vy += 0.28; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        g.save(); g.globalAlpha = 1 - life; g.translate(p.x, p.y); g.rotate(p.r);
        g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore();
      });
      if (life < 1) requestAnimationFrame(draw); else c.remove();
    })(t0);
  };

  // ---- Nuqtalar maydoni (hero fon) ----
  var pointer = { x: -9999, y: -9999 }, lastMove = 0;
  addEventListener('pointermove', function (e) { pointer.x = e.clientX; pointer.y = e.clientY; lastMove = performance.now(); }, { passive: true });
  addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) { pointer.x = t.clientX; pointer.y = t.clientY; lastMove = performance.now(); } }, { passive: true });
  addEventListener('touchstart', function (e) { var t = e.touches[0]; if (t) { pointer.x = t.clientX; pointer.y = t.clientY; lastMove = performance.now(); } }, { passive: true });
  qa('[data-particles]').forEach(function (cv) {
    if (reduce) return;
    var g = cv.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2), W = 0, H = 0, pts = [], color = '#4b55f5', accent = '#ffd43b';
    function size() {
      var r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      var gap = W < 640 ? 34 : 30;
      for (var y = gap / 2; y < H; y += gap) for (var x = gap / 2; x < W; x += gap) pts.push({ ox: x, oy: y, x: x, y: y, vx: 0, vy: 0 });
    }
    function colors() {
      var cs = getComputedStyle(cv);
      color = cs.color; accent = cs.getPropertyValue('--accent').trim() || accent;
    }
    size(); colors();
    addEventListener('resize', size);
    new MutationObserver(colors).observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    var visible = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(cv);
    var t = 0;
    (function draw() {
      requestAnimationFrame(draw);
      if (!visible) return;
      t += 0.012;
      var r = cv.getBoundingClientRect(), mx = pointer.x - r.left, my = pointer.y - r.top, R = fine ? 140 : 110;
      // Sensorli ekranda, barmoq tegmaganda, "ko'rinmas kursor" maydon bo'ylab sekin aylanib yuradi
      if (!fine && performance.now() - lastMove > 1500) {
        mx = W * (0.5 + 0.38 * Math.sin(t * 0.9)); my = H * (0.42 + 0.3 * Math.sin(t * 1.7));
      }
      g.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < R) { var f = (1 - d / R) * 2.2; p.vx += dx / (d || 1) * f; p.vy += dy / (d || 1) * f; }
        p.vx += (p.ox - p.x) * 0.06; p.vy += (p.oy - p.y) * 0.06;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        var wave = Math.sin(p.ox * 0.012 + t * 2) * Math.cos(p.oy * 0.014 + t) * 0.5 + 0.5;
        var near = d < R ? 1 - d / R : 0;
        g.globalAlpha = 0.12 + wave * 0.18 + near * 0.7;
        g.fillStyle = near > 0.35 ? accent : color;
        var s = 1.2 + wave * 0.9 + near * 2.6;
        g.beginPath(); g.arc(p.x, p.y, s, 0, 6.283); g.fill();
      }
      g.globalAlpha = 1;
    })();
  });

  if (reduce || !fine) return;

  // ---- Sichqoncha bilan parallaks ----
  var mx = innerWidth / 2, my = innerHeight / 2;
  addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });

  (function loop() {
    var cx = (mx / innerWidth - 0.5), cy = (my / innerHeight - 0.5);
    qa('[data-parallax]').forEach(function (el) {
      var k = parseFloat(el.getAttribute('data-parallax')) * 1000;
      el.style.translate = (cx * k) + 'px ' + (cy * k) + 'px';
    });
    requestAnimationFrame(loop);
  })();

  // ---- Magnit tugmalar, 3D karta, yorug'lik ----
  document.addEventListener('pointermove', function (e) {
    var m = e.target.closest && e.target.closest('[data-magnetic]');
    qa('[data-magnetic].is-mag').forEach(function (el) {
      if (el !== m) { el.classList.remove('is-mag'); el.style.translate = ''; }
    });
    if (m) {
      var r = m.getBoundingClientRect();
      m.classList.add('is-mag');
      m.style.translate = ((e.clientX - r.left - r.width / 2) * 0.3) + 'px ' + ((e.clientY - r.top - r.height / 2) * 0.4) + 'px';
    }
    var t = e.target.closest && e.target.closest('[data-tilt]');
    qa('[data-tilt].is-tilt').forEach(function (el) {
      if (el !== t) { el.classList.remove('is-tilt'); el.style.transform = ''; }
    });
    if (t) {
      var b = t.getBoundingClientRect();
      var px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
      t.classList.add('is-tilt');
      t.style.transform = 'perspective(900px) rotateX(' + (-py * 10) + 'deg) rotateY(' + (px * 12) + 'deg)';
      t.style.setProperty('--gx', ((px + 0.5) * 100) + '%');
      t.style.setProperty('--gy', ((py + 0.5) * 100) + '%');
    }
    var s = e.target.closest && e.target.closest('[data-spotlight]');
    if (s) {
      var q = s.getBoundingClientRect();
      s.style.setProperty('--mx', (e.clientX - q.left) + 'px');
      s.style.setProperty('--my', (e.clientY - q.top) + 'px');
    }
  }, { passive: true });
})();
