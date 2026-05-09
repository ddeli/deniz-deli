// Bootstrap 5 bundle handles all interactive components (carousel, navbar collapse).
// Hero height is set via CSS (100vh) — no JS override needed.

// YouTube facade: load iframe on click
document.querySelectorAll('.yt-facade').forEach(function (facade) {
  facade.addEventListener('click', function () {
    var id = facade.dataset.id;
    facade.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
});

// Mobile detection
var isMobile = window.matchMedia('(max-width: 768px)').matches
            || ('ontouchstart' in window && window.innerWidth < 1024);

// Animated canvas gradient background
(function () {
  var canvas = document.getElementById('canvas-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [];
  var COLS = ['#00e5ff', '#7b4fff', '#00e5ff', '#c8954a', '#7b4fff', '#00e5ff'];

  function initCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    particles = COLS.map(function (col) {
      return {
        x:   Math.random() * W,
        y:   Math.random() * H,
        r:   200 + Math.random() * 280,
        vx:  (Math.random() - 0.5) * 0.5,
        vy:  (Math.random() - 0.5) * 0.5,
        col: col
      };
    });
  }

  function draw() {
    ctx.filter = 'none';
    ctx.fillStyle = '#080807';
    ctx.fillRect(0, 0, W, H);

    ctx.filter = isMobile ? 'blur(40px)' : 'blur(90px)';
    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -p.r)   p.x = W + p.r;
      if (p.x > W + p.r) p.x = -p.r;
      if (p.y < -p.r)   p.y = H + p.r;
      if (p.y > H + p.r) p.y = -p.r;

      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.col + '99');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // On mobile: render one static frame only, no animation loop
    if (!isMobile) {
      requestAnimationFrame(draw);
    }
  }

  // Only listen for resize on desktop (avoids re-draw on mobile)
  if (!isMobile) {
    window.addEventListener('resize', initCanvas);
  }
  initCanvas();
  draw();
})();

// Prevent accidental card taps on mobile (scroll vs. tap)
(function () {
  if (!('ontouchstart' in window)) return;
  var startY = 0;
  var THRESHOLD = 10;

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('touchstart', function (e) {
      startY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', function (e) {
      var dy = Math.abs(e.changedTouches[0].clientY - startY);
      if (dy > THRESHOLD) {
        e.preventDefault();
      }
    });
  });
})();
