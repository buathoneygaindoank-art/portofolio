(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var toastEl = document.getElementById('toast');
  var toastTimer;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  }

  // Menu mobile
  function setMenu(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Bayangan tipis navbar saat scroll
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu aktif sesuai section
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = links.querySelectorAll('a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    // Animasi muncul halus
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Sertifikat: jika berkas gambar belum ada, tandai dan nonaktifkan tombol
  document.querySelectorAll('.cert').forEach(function (card) {
    var img = card.querySelector('img');
    var btn = card.querySelector('a.btn');
    function markMissing() {
      card.querySelector('.thumb').classList.add('missing');
      img.style.visibility = 'hidden';
      btn.classList.add('disabled');
      btn.setAttribute('aria-disabled', 'true');
      btn.removeAttribute('href');
    }
    if (img.complete && img.naturalWidth === 0) markMissing();
    else img.addEventListener('error', markMissing);
  });

  // Download CV: beri tahu jika berkas belum ada (saat dijalankan lewat server/Live Server)
  var cvBtn = document.getElementById('cvBtn');
  if (cvBtn && location.protocol.indexOf('http') === 0) {
    cvBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var url = cvBtn.getAttribute('href');
      fetch(url, { method: 'HEAD' }).then(function (r) {
        if (!r.ok) throw new Error('missing');
        var a = document.createElement('a');
        a.href = url; a.download = ''; document.body.appendChild(a); a.click(); a.remove();
      }).catch(function () {
        toast('File CV belum ditambahkan ke folder cv/.');
      });
    });
  }
})();
