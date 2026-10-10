/* Sayt animatsiyalari: kursor, magnit tugmalar, 3D qiyshayish, scroll animatsiyalari.
   HTML'da data-atributlar bilan ishlaydi:
   data-reveal="up|left|right|zoom"  data-delay="150"   — scroll qilganda chiqib keladi
   data-magnetic                                         — tugma sichqonchaga tortiladi
   data-tilt                                             — karta sichqoncha bilan 3D qiyshayadi
   data-parallax="0.04"                                  — sichqoncha bilan suriladi
   data-scroll-x="-0.4"                                  — scroll bilan gorizontal suriladi
   data-spotlight                                        — kartada sichqoncha ortidan yorug'lik */
(function () {
  if (window.__fx) return;
  window.__fx = true;
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  if (!reduce) root.classList.add('fx');

  // ---- Scroll qilganda chiqib kelish ----
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

  function scan() {
    document.querySelectorAll('[data-reveal]:not([data-fx])').forEach(function (el) {
      el.setAttribute('data-fx', '');
      var d = el.getAttribute('data-delay');
      if (d) el.style.transitionDelay = d + 'ms';
      if (io && !reduce) io.observe(el); else el.classList.add('is-in');
    });
  }
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });

  // ---- Scroll progress va scroll bilan harakat ----
  var bar = document.createElement('div');
  bar.className = 'fx-progress';
  document.body.appendChild(bar);
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var h = root.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
      if (reduce) return;
      document.querySelectorAll('[data-scroll-x]').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        var k = parseFloat(el.getAttribute('data-scroll-x'));
        el.style.transform = 'translate3d(' + ((r.top - innerHeight / 2) * k) + 'px,0,0)';
      });
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  if (reduce || !fine) return;

  // ---- Kursor halqasi ----
  var dot = document.createElement('div'); dot.className = 'fx-dot';
  var ring = document.createElement('div'); ring.className = 'fx-ring';
  document.body.appendChild(ring); document.body.appendChild(dot);
  var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, seen = false;
  addEventListener('pointermove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (!seen) { seen = true; rx = mx; ry = my; root.classList.add('fx-cursor'); }
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    var t = e.target.closest && e.target.closest('a,button,input,textarea,summary,label,[data-cursor]');
    ring.classList.toggle('is-hover', !!t);
  }, { passive: true });
  document.addEventListener('pointerleave', function () { root.classList.remove('fx-cursor'); seen = false; });
  addEventListener('pointerdown', function () { ring.classList.add('is-down'); });
  addEventListener('pointerup', function () { ring.classList.remove('is-down'); });

  // ---- Sichqoncha bilan parallaks ----
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    var cx = (mx / innerWidth - 0.5), cy = (my / innerHeight - 0.5);
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      var k = parseFloat(el.getAttribute('data-parallax')) * 1000;
      el.style.translate = (cx * k) + 'px ' + (cy * k) + 'px';
    });
    requestAnimationFrame(loop);
  })();

  // ---- Magnit tugmalar, 3D karta, yorug'lik ----
  document.addEventListener('pointermove', function (e) {
    var m = e.target.closest && e.target.closest('[data-magnetic]');
    document.querySelectorAll('[data-magnetic].is-mag').forEach(function (el) {
      if (el !== m) { el.classList.remove('is-mag'); el.style.translate = ''; }
    });
    if (m) {
      var r = m.getBoundingClientRect();
      m.classList.add('is-mag');
      m.style.translate = ((e.clientX - r.left - r.width / 2) * 0.3) + 'px ' + ((e.clientY - r.top - r.height / 2) * 0.4) + 'px';
    }
    var t = e.target.closest && e.target.closest('[data-tilt]');
    document.querySelectorAll('[data-tilt].is-tilt').forEach(function (el) {
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
