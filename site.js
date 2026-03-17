(function() {
  try {
    // ---- CURSOR ----
    var dot = document.getElementById('cur-dot');
    var ring = document.getElementById('cur-ring');
    var glow = document.getElementById('cur-glow');
    var mx = 0, my = 0, rx = 0, ry = 0;

    if (dot && ring && glow) {
      dot.style.display = 'block';
      ring.style.display = 'block';
      glow.style.display = 'block';
      document.body.style.cursor = 'none';

      document.addEventListener('mousemove', function(e) {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        glow.style.left = mx + 'px';
        glow.style.top = my + 'px';
      });

      document.querySelectorAll('a, button').forEach(function(el) {
        el.addEventListener('mouseenter', function() {
          dot.style.width = '18px';
          dot.style.height = '18px';
          ring.style.width = '54px';
          ring.style.height = '54px';
        });
        el.addEventListener('mouseleave', function() {
          dot.style.width = '10px';
          dot.style.height = '10px';
          ring.style.width = '36px';
          ring.style.height = '36px';
        });
      });

      (function tickRing() {
        rx += (mx - rx) * 0.11;
        ry += (my - ry) * 0.11;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(tickRing);
      })();
    }

    // ---- NAV ----
    var nav = document.getElementById('nav');
    var sectionEls = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      var current = '';
      sectionEls.forEach(function(s) {
        if (window.scrollY >= s.offsetTop - 250) current = s.id;
      });
      navLinks.forEach(function(a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    });

    // ---- SCROLL REVEAL ----
    var revealEls = document.querySelectorAll(
      '.section-label, .exp-item .exp-meta, .exp-item > div:last-child, .project-card, .skill-group, .cert-row'
    );

    revealEls.forEach(function(el, i) {
      el.classList.add('will-reveal');
      if (el.classList.contains('exp-meta')) {
        el.classList.add('from-left');
      } else if (el.closest('.exp-item')) {
        el.classList.add('from-right');
      } else {
        el.classList.add('from-bottom');
      }
      el.classList.add('d' + ((i % 4) + 1));
    });

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(function(el) { obs.observe(el); });

  } catch(e) {
    console.warn('Enhancement error:', e);
  }
})();
