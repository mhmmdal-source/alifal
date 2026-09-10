/* ============================================================
   THE DARK KNIGHT PORTFOLIO — script.js
   Modular: data di bagian atas, lalu init functions.
   Fitur baru: bat swarm saat loading selesai + ambient bats
   di hero, figur Batman 3D interaktif, bat-signal burst.
   ============================================================ */
'use strict';

/* ---------- KONFIGURASI DATA (mudah diedit) ---------- */
const SKILLS = [
  { name: 'HTML',        level: 95, icon: 'i-code'   },
  { name: 'CSS',         level: 92, icon: 'i-design' },
  { name: 'JavaScript',  level: 88, icon: 'i-code'   },
  { name: 'PHP',         level: 80, icon: 'i-server' },
  { name: 'MySQL',       level: 82, icon: 'i-db'     },
  { name: 'Bootstrap',   level: 85, icon: 'i-mobile' },
  { name: 'React',       level: 78, icon: 'i-code'   },
  { name: 'UI/UX',       level: 84, icon: 'i-design' },
  { name: 'Git',         level: 86, icon: 'i-git'    },
  { name: 'Figma',       level: 81, icon: 'i-design' },
];

const PROJECTS = [
  {
    num: 'MISSION 01', title: 'Gotham Finance Dashboard', cat: 'WEB APP — FINTECH',
    desc: 'Dashboard keuangan real-time dengan grafik interaktif dan dark mode penuh.',
    challenge: 'Menampilkan ribuan data transaksi secara real-time tanpa menurunkan performa.',
    solution: 'Virtualisasi data, WebSocket untuk live update, dan chart library yang ringan.',
    result: 'Load time turun 60% dan engagement pengguna naik 35%.',
    tech: ['React', 'Chart.js', 'Node.js'], img: 'assets/images/project-1.jpg',
    demo: 'https://example.com', github: 'https://github.com/yourusername'
  },
  {
    num: 'MISSION 02', title: 'Wayne Industries Platform', cat: 'CORPORATE PLATFORM',
    desc: 'Platform korporat multi-role dengan CMS custom dan manajemen aset.',
    challenge: 'Kebutuhan role yang kompleks (admin, staff, viewer) dalam satu codebase.',
    solution: 'Arsitektur RBAC berbasis middleware dan komponen akses terkondisi.',
    result: 'Proses internal perusahaan terdigitalisasi 100% dalam 3 bulan.',
    tech: ['PHP', 'Laravel', 'MySQL'], img: 'assets/images/project-2.jpg',
    demo: 'https://example.com', github: 'https://github.com/yourusername'
  },
  {
    num: 'MISSION 03', title: 'Batcave Command Center', cat: 'INTERFACE — MONITORING',
    desc: 'Monitoring system dengan tactical HUD, alert realtime, dan dark UI system.',
    challenge: 'Visualisasi puluhan metrik server dalam satu layar tanpa terasa penuh.',
    solution: 'Design system modular, progressive disclosure, dan status berbasis warna.',
    result: 'Waktu deteksi insiden turun dari menit ke detik.',
    tech: ['JavaScript', 'WebSocket', 'SCSS'], img: 'assets/images/project-3.jpg',
    demo: 'https://example.com', github: 'https://github.com/yourusername'
  },
  {
    num: 'MISSION 04', title: 'Gotham E-Commerce', cat: 'E-COMMERCE',
    desc: 'Toko online dengan fitur keranjang, payment gateway, dan panel admin.',
    challenge: 'Conversion rate rendah karena proses checkout yang panjang.',
    solution: 'Checkout satu halaman, lazy load produk, dan optimasi Core Web Vitals.',
    result: 'Conversion rate naik 42% pada bulan pertama setelah relaunch.',
    tech: ['React', 'Bootstrap', 'MySQL'], img: 'assets/images/project-4.jpg',
    demo: 'https://example.com', github: 'https://github.com/yourusername'
  },
  {
    num: 'MISSION 05', title: 'Dark UI System', cat: 'DESIGN SYSTEM',
    desc: 'Design system dark dengan 40+ komponen reusable, token warna, dan dokumentasi.',
    challenge: 'Inkonsistensi UI di 5 produk berbeda milik tim yang sama.',
    solution: 'Design token berbasis CSS variables dan library komponen terdokumentasi.',
    result: 'Kecepatan development fitur baru naik 50%, bug UI turun signifikan.',
    tech: ['Figma', 'CSS', 'Storybook'], img: 'assets/images/project-5.jpg',
    demo: 'https://example.com', github: 'https://github.com/yourusername'
  },
  {
    num: 'MISSION 06', title: 'Nightfall Portfolio', cat: 'PERSONAL SITE',
    desc: 'Website portfolio imersif dengan animasi scroll dan interaksi 3D ringan.',
    challenge: 'Menyeimbangkan visual cinematic dengan performa mobile.',
    solution: 'IntersectionObserver untuk reveal, canvas particle teroptimasi, reduced motion.',
    result: 'Skor Lighthouse 95+ di semua kategori dan mobile.',
    tech: ['HTML', 'CSS', 'JavaScript'], img: 'assets/images/project-6.jpg',
    demo: 'https://example.com', github: 'https://github.com/yourusername'
  },
];

const SERVICES = [
  { icon: 'i-code',   title: 'Web Development',       desc: 'Membangun website modern dari nol — cepat, aman, dan SEO-friendly.' },
  { icon: 'i-design', title: 'UI/UX Design',          desc: 'Desain antarmuka yang intuitif dengan pendekatan user-centered.' },
  { icon: 'i-mobile', title: 'Frontend Development',  desc: 'Antarmuka interaktif dengan React, animasi halus, dan pixel-perfect.' },
  { icon: 'i-server', title: 'Backend Development',   desc: 'API, database, dan logika server yang scalable dan terstruktur.' },
  { icon: 'i-db',     title: 'Responsive Design',     desc: 'Tampilan sempurna di desktop, tablet, dan smartphone.' },
  { icon: 'i-speed',  title: 'Website Optimization',  desc: 'Optimasi kecepatan, Core Web Vitals, dan pengalaman pengguna.' },
];

/* ---------- UTILITIES ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const rand = (min, max) => min + Math.random() * (max - min);

/* ---------- BAT SWARM (kelelawar terbang) ----------
   Membuat kawanan kelelawar SVG yang mengepak sayap & terbang
   menjauh dari titik asal. Dipakai untuk: ledakan saat loading
   selesai, terbangan ambient di hero, dan burst bat-signal.      */
const BAT_PATH = 'M50 8 C46 2 40 0 34 2 C38 6 39 10 38 14 C28 8 16 8 6 14 C12 16 15 19 14 24 C8 24 4 26 2 30 C10 30 15 33 18 38 C24 34 30 34 34 38 C32 42 32 46 34 50 C40 44 45 42 50 44 C55 42 60 44 66 50 C68 46 68 42 66 38 C70 34 76 34 82 38 C85 33 90 30 98 30 C96 26 92 24 86 24 C85 19 88 16 94 14 C84 8 72 8 62 14 C61 10 62 6 66 2 C60 0 54 2 50 8 Z';

function spawnBat(container, x, y, opts = {}) {
  if (reduceMotion) return;
  const wrap = document.createElement('div');
  wrap.className = 'bat';
  wrap.style.left = x + 'px';
  wrap.style.top = y + 'px';
  wrap.style.setProperty('--s', rand(opts.minSize ?? 18, opts.maxSize ?? 40).toFixed(0) + 'px');
  wrap.style.setProperty('--dx', rand(...(opts.dxRange ?? [-0.55, 0.55])) * innerWidth * -1 + 'px');
  wrap.style.setProperty('--dy', rand(...(opts.dyRange ?? [-0.5, -0.1])) * innerHeight + 'px');
  wrap.style.setProperty('--lift', rand(40, 160).toFixed(0) + 'px');
  wrap.style.setProperty('--rot', rand(...(opts.rotRange ?? [-70, 70])).toFixed(0) + 'deg');
  wrap.style.setProperty('--dur', rand(...(opts.durRange ?? [1.6, 2.8])).toFixed(2) + 's');
  wrap.style.setProperty('--delay', rand(0, (opts.maxDelay ?? 0.25)).toFixed(2) + 's');

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 60');
  svg.setAttribute('class', 'bat-wing');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', BAT_PATH);
  svg.appendChild(path);
  wrap.appendChild(svg);
  container.appendChild(wrap);

  wrap.addEventListener('animationend', () => wrap.remove(), { once: true });
  // Safety cleanup
  setTimeout(() => wrap.remove(), 5000);
}

/** Ledakan kelelawar dari satu titik (mis. tengah layar saat loading selesai). */
function releaseBats(container, x, y, count, opts) {
  for (let i = 0; i < count; i++) spawnBat(container, x, y, opts);
}

/** Kelelawar beterbangan melintasi hero (kiri -> kanan atau sebaliknya). */
function flybyBats(container, count) {
  const hero = $('#home');
  if (!hero) return;
  const h = hero.offsetHeight;
  const fromLeft = Math.random() < 0.5;
  for (let i = 0; i < count; i++) {
    spawnBat(container, fromLeft ? -60 : innerWidth * 0.95, rand(h * 0.08, h * 0.45), {
      minSize: 14, maxSize: 30,
      dxRange: fromLeft ? [0.9, 1.3] : [-1.3, -0.9],
      dyRange: [-0.06, 0.06],
      rotRange: fromLeft ? [8, 24] : [-24, -8],
      durRange: [2.6, 4.2],
      maxDelay: i * 0.22,
    });
  }
}

/* ---------- LOADING SCREEN ---------- */
function initLoader() {
  const loader = $('#loader');
  const swarm = $('#loadSwarm');
  const minTime = reduceMotion ? 100 : 1200;
  const start = performance.now();
  let burstDone = false;

  const finish = () => {
    const wait = Math.max(0, minTime - (performance.now() - start));
    setTimeout(() => {
      loader.classList.add('done');
      document.body.classList.add('loaded');
      // === Kelelawar beterbangan keluar saat loading selesai ===
      if (!burstDone) {
        burstDone = true;
        releaseBats(swarm, innerWidth / 2, innerHeight / 2, 18, {
          minSize: 20, maxSize: 46,
          dxRange: [-0.6, 0.6], dyRange: [-0.55, -0.08],
          durRange: [1.8, 3.0],
        });
      }
      setTimeout(() => loader.remove(), 700);
    }, wait);
  };
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
  // Fallback jika load tertahan lebih dari 4 detik
  setTimeout(finish, 4000);
}

/* ---------- AMBIENT BATS DI HERO ---------- */
function initAmbientBats() {
  if (reduceMotion) return;
  const container = $('#heroSwarm');
  const hero = $('#home');
  if (!container || !hero) return;
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.1 }).observe(hero);

  const schedule = () => {
    setTimeout(() => {
      if (visible && !document.hidden) flybyBats(container, Math.round(rand(3, 6)));
      schedule();
    }, rand(7000, 13000));
  };
  schedule();
}

/* ---------- NAVIGATION ---------- */
function initNavigation() {
  const navbar = $('#navbar');
  const toggle = $('#navToggle');
  const menu = $('#navMenu');
  const links = $$('.nav-link');

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  });

  links.forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // Scrollspy
  const sections = links.map(l => $(l.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => spy.observe(s));
}

/* ---------- SCROLL EFFECTS ---------- */
function initScrollEffects() {
  // Progress bar
  const bar = $('#scrollProgress');
  const update = () => {
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));
}

/* ---------- RENDER SKILLS / PROJECTS / SERVICES ---------- */
function renderContent() {
  $('#skillsGrid').innerHTML = SKILLS.map(s => `
    <article class="skill-card tilt" style="--level:${s.level}">
      <div class="skill-top">
        <svg aria-hidden="true"><use href="#${s.icon}"/></svg>
        <h3>${s.name}</h3>
      </div>
      <p class="skill-level"><span>PROFICIENCY</span><b>${s.level}%</b></p>
      <div class="skill-bar"><span></span></div>
    </article>`).join('');

  $('#projectsGrid').innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card tilt reveal" data-index="${i}" tabindex="0"
      role="button" aria-label="Buka detail ${p.title}">
      <div class="project-media">
        <img src="${p.img}" alt="Screenshot ${p.title}" loading="lazy">
        <span class="project-num">${p.num}</span>
        <div class="project-overlay"><span>VIEW DETAIL</span></div>
      </div>
      <div class="project-body">
        <p class="project-cat">${p.cat}</p>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </article>`).join('');

  $('#servicesGrid').innerHTML = SERVICES.map(s => `
    <article class="service-card tilt reveal">
      <div class="service-icon"><svg aria-hidden="true"><use href="#${s.icon}"/></svg></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>`).join('');

  // Animate skill bars saat terlihat
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); } });
  }, { threshold: 0.4 });
  $$('.skill-card').forEach(el => io.observe(el));
}

/* ---------- COUNTERS ---------- */
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const target = +e.target.dataset.target;
      if (reduceMotion) { e.target.textContent = target; return; }
      const dur = 1400, t0 = performance.now();
      const tick = now => {
        const t = Math.min((now - t0) / dur, 1);
        e.target.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('.counter').forEach(el => io.observe(el));
}

/* ---------- 3D TILT + MOUSE PARALLAX ---------- */
function init3DInteractions() {
  if (isTouch || reduceMotion) return;

  const max = 10;
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.tilt');
    if (card) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(6px)`;
      card.style.setProperty('--mx', (x + 0.5) * 100 + '%');
      card.style.setProperty('--my', (y + 0.5) * 100 + '%');
    }
    // Hero parallax (konten + figur Batman 3D)
    const hero = $('#heroVisual');
    if (hero) {
      const dx = (e.clientX / innerWidth - 0.5) * 2;
      const dy = (e.clientY / innerHeight - 0.5) * 2;
      hero.style.transform = `rotateY(${dx * 6}deg) rotateX(${-dy * 5}deg)`;
      const batman = $('#batmanInner');
      if (batman) batman.style.translate = `${dx * 14}px ${dy * 10}px`;
    }
  });
  document.addEventListener('mouseout', e => {
    const card = e.target.closest && e.target.closest('.tilt');
    if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
  });
}

/* ---------- MAGNETIC BUTTONS ---------- */
function initMagnetic() {
  if (isTouch || reduceMotion) return;
  $$('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ---------- CUSTOM CURSOR ---------- */
function initCursor() {
  if (isTouch) return;
  const dot = $('#cursorDot'), ring = $('#cursorRing');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    document.body.classList.add('cursor-on');
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  const hoverables = 'a, button, .tilt, input, textarea, [role="button"]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) document.body.classList.remove('cursor-hover');
  });
}

/* ---------- PARTICLES ---------- */
function initParticles() {
  const canvas = $('#particles');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let w, h, parts = [], raf;

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.offsetWidth; h = canvas.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(isTouch ? 30 : 80, Math.floor(w / 16));
    parts = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.12,
      gold: Math.random() < 0.18
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? `rgba(240,180,40,${p.a})` : `rgba(220,228,238,${p.a * 0.6})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
  const stop = () => { cancelAnimationFrame(raf); raf = null; };

  resize();
  start();
  window.addEventListener('resize', debounce(resize, 200));
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
}

/* ---------- PROJECT MODAL ---------- */
function initProjectModal() {
  const modal = $('#projectModal');
  let lastFocus = null;

  const open = i => {
    const p = PROJECTS[i];
    if (!p) return;
    lastFocus = document.activeElement;
    $('#modalImg').src = p.img; $('#modalImg').alt = 'Screenshot ' + p.title;
    $('#modalNum').textContent = p.num;
    $('#modalTitle').textContent = p.title;
    $('#modalCat').textContent = p.cat;
    $('#modalDesc').textContent = p.desc;
    $('#modalChallenge').textContent = p.challenge;
    $('#modalSolution').textContent = p.solution;
    $('#modalResult').textContent = p.result;
    $('#modalTech').innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');
    $$('.modal-actions a', modal)[0].href = p.demo;
    $$('.modal-actions a', modal)[1].href = p.github;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => modal.classList.add('show'));
    $('.modal-close', modal).focus();
  };

  const close = () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    setTimeout(() => { modal.hidden = true; lastFocus && lastFocus.focus(); }, 400);
  };

  $('#projectsGrid').addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (card) open(+card.dataset.index);
  });
  $('#projectsGrid').addEventListener('keydown', e => {
    const card = e.target.closest('.project-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(+card.dataset.index); }
  });

  $$('[data-close]', modal).forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

/* ---------- CONTACT FORM ---------- */
function initContactForm() {
  const form = $('#contactForm');
  const status = $('#formStatus');

  const validators = {
    name:    v => v.trim().length >= 2  || 'Name minimal 2 karakter.',
    email:   v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'Format email tidak valid.',
    subject: v => v.trim().length >= 3  || 'Subject minimal 3 karakter.',
    message: v => v.trim().length >= 10 || 'Message minimal 10 karakter.',
  };

  const validateField = input => {
    const rule = validators[input.name];
    const group = input.closest('.form-group');
    const errEl = $('.form-error', group);
    const res = rule(input.value);
    if (res === true) { group.classList.remove('invalid'); errEl.textContent = ''; return true; }
    group.classList.add('invalid'); errEl.textContent = res; return false;
  };

  $$('input, textarea', form).forEach(input =>
    input.addEventListener('blur', () => validateField(input)));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = $$('input, textarea', form);
    const ok = fields.map(validateField).every(Boolean);
    if (!ok) {
      status.textContent = '// TRANSMISSION FAILED — PERIKSA FORM';
      status.className = 'form-status err';
      return;
    }
    // Simulasi pengiriman (ganti dengan fetch ke backend jika tersedia)
    const btn = $('#formSubmit');
    btn.disabled = true; btn.style.opacity = '.6';
    status.textContent = '// TRANSMITTING...';
    status.className = 'form-status';
    setTimeout(() => {
      btn.disabled = false; btn.style.opacity = '1';
      status.textContent = '// SIGNAL RECEIVED — PESAN TERKIRIM';
      status.className = 'form-status ok';
      form.reset();
      setTimeout(() => { status.textContent = ''; }, 5000);
    }, 1200);
  });
}

/* ---------- BAT-SIGNAL + BAT BURST ---------- */
function initBatSignal() {
  const btn = $('#signalBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const on = document.body.classList.toggle('signal-on');
    btn.setAttribute('aria-pressed', String(on));
    $('#signalLabel').textContent = on ? 'BAT-SIGNAL ACTIVE' : 'ACTIVATE BAT-SIGNAL';
    // Kelelawar keluar dari posisi bat-signal saat diaktifkan
    if (on) {
      const beam = $('#signalBeam').getBoundingClientRect();
      releaseBats(document.body.appendChild(Object.assign(document.createElement('div'), { className: 'bat-swarm' })),
        beam.left + beam.width / 2, Math.min(beam.top + beam.height * 0.7, innerHeight - 80), 10, {
          minSize: 16, maxSize: 34,
          dxRange: [-0.5, 0.5], dyRange: [-0.6, -0.15],
          durRange: [1.6, 2.6],
        });
    }
  });
}

/* ---------- BOOT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderContent();
  initLoader();
  initAmbientBats();
  initNavigation();
  initScrollEffects();
  initCounters();
  init3DInteractions();
  initMagnetic();
  initCursor();
  initParticles();
  initProjectModal();
  initContactForm();
  initBatSignal();
});