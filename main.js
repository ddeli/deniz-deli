// Bootstrap 5 bundle handles all interactive components (carousel, navbar collapse).
// Hero height is set via CSS (100vh) — no JS override needed.

// YouTube facade: load iframe on click
document.querySelectorAll('.yt-facade').forEach(function (facade) {
  facade.addEventListener('click', function () {
    var id = facade.dataset.id;
    facade.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
});

// Animated canvas gradient background
(function () {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COLS = ['#00e5ff', '#7b4fff', '#00e5ff', '#c8954a', '#7b4fff', '#00e5ff'];

  function initCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    particles = COLS.map(col => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   200 + Math.random() * 280,
      vx:  (Math.random() - 0.5) * 0.5,
      vy:  (Math.random() - 0.5) * 0.5,
      col: col
    }));
  }

  function draw() {
    ctx.filter = 'none';
    ctx.fillStyle = '#080807';
    ctx.fillRect(0, 0, W, H);

    ctx.filter = 'blur(90px)';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -p.r)   p.x = W + p.r;
      if (p.x > W + p.r) p.x = -p.r;
      if (p.y < -p.r)   p.y = H + p.r;
      if (p.y > H + p.r) p.y = -p.r;

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.col + '99');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', initCanvas);
  initCanvas();
  draw();
})();
