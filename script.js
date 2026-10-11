/* Pranav Matham — portfolio engine */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'mathampranav@gmail.com';
  document.documentElement.classList.add('fx');

  /* ---------- DATA ---------- */
  const PROJECTS = [
    { key: 'thyroid', cat: 'ai', img: 'thyroid.png', label: 'AI / CV pipeline', ieee: true,
      title: 'Thyroid Nodule Detection Engine', meta: 'IEEE published & major project',
      desc: 'Automated ultrasound diagnosis pipeline using Convolutional Neural Networks (EfficientNetB2) and Grad-CAM heatmaps for nodule classification.',
      tags: ['Python', 'TensorFlow', 'EfficientNet', 'OpenCV', 'Flask'],
      gh: 'https://github.com/PRANAV-MS25',
      long: 'An end-to-end deep learning system for ultrasound analysis. EfficientNetB2 is paired with a custom preprocessing pipeline to detect and classify thyroid nodules, and Grad-CAM heatmaps show which regions drove each prediction.',
      pipe: ['OpenCV preprocessing', 'EfficientNetB2 features', 'Classification', 'Grad-CAM heatmap', 'Flask app'], role: 'End-to-end implementation' },
    { key: 'buspass', cat: 'software', img: 'buspass.png', label: 'Python / Django',
      title: 'BusPass Automation Engine', meta: 'Web application',
      desc: 'Digital transit pass platform with automated approvals, role-based auth, SQL database tracking, and dynamic QR pass generation.',
      tags: ['Python', 'Django', 'SQLite', 'QR API'], gh: 'https://github.com/PRANAV-MS25/Mybuspass_project',
      long: 'A web-based transit pass manager with automated approvals, role-based sign-in, database-backed records and instant QR pass generation.',
      pipe: ['Django role-based auth', 'Approval workflow', 'SQLite models', 'QR generation'], role: 'Full-stack developer' },
    { key: 'traffic', cat: 'systems', img: 'NeuroSphere-X.png', label: 'Real-time system',
      title: 'NeuroSphere-X Smart City', meta: 'Urban tech analytics',
      desc: 'FastAPI-powered urban traffic monitoring dashboard leveraging WebSockets for real-time telemetry streaming and map heatmaps.',
      tags: ['FastAPI', 'React', 'WebSockets', 'PyTorch'], gh: 'https://github.com/PRANAV-MS25/-URban-Tech-NeuroSphere-X-',
      long: 'An urban traffic monitoring dashboard with high-frequency WebSocket streams, an asynchronous FastAPI backend and live heatmaps.',
      pipe: ['FastAPI async endpoints', 'WebSockets', 'React live canvas'], role: 'Systems and backend engineer' },
    { key: 'railway', cat: 'software', img: 'railway.png', label: 'Cross-platform',
      title: 'Railway Reservation System', meta: 'Application build',
      desc: 'Cross-platform ticket booking application handling live seat allocation, passenger schedules, and cancellation workflows.',
      tags: ['Flutter', 'Firebase', 'Node.js', 'SQL'], gh: null, ghLabel: 'Private 🔒',
      long: 'A cross-platform ticket booking and schedule tracker covering live seat allocation, booking states, cancellations and passenger verification.',
      pipe: ['Flutter frontend', 'Node.js API', 'SQL database'], role: 'Cross-platform developer' },
    { key: 'nutri', cat: 'ai', img: 'Nutri-AI.png', label: 'Computer vision',
      title: 'Nutri-AI Nutrition Vision', meta: 'Active AI build',
      desc: 'Automated macronutrient tracking web platform using OpenCV image recognition paired with the USDA API to scan meals instantly.',
      tags: ['Python', 'OpenCV', 'Node.js', 'USDA API'], gh: null, ghLabel: 'Active build ⚡',
      long: 'A computer-vision web platform that recognises meals from images and maps them to macronutrient data through the USDA API.',
      pipe: ['Image capture', 'OpenCV recognition', 'USDA API lookup'], role: 'AI / CV developer' }
  ];
  const byKey = k => PROJECTS.find(p => p.key === k);

  /* ---------- PROJECT CARDS ---------- */
  const grid = $('#projectsGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="card project-card reveal ${i % 2 ? 'delay-1' : ''}" data-category="${p.cat}" data-project="${p.key}">
      <div class="project-image">
        <img src="${p.img}" alt="${p.title} preview" loading="lazy">
        <span class="badge">${p.label}</span>${p.ieee ? '<span class="badge ieee">IEEE · 2026</span>' : ''}
      </div>
      <div class="project-body">
        <div class="project-meta">${String(i + 1).padStart(2, '0')} · ${p.meta}</div>
        <h3>${p.title}</h3><p>${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-actions">
          <button class="project-link" data-open="${p.key}">Explore architecture ↗</button>
          ${p.gh ? `<a class="github-link" href="${p.gh}" target="_blank" rel="noopener">GitHub ↗</a>` : `<span class="github-link github-disabled">${p.ghLabel}</span>`}
        </div>
      </div>
    </article>`).join('');

  /* ---------- HOBBIES & INTERESTS: edit this list (kind, emoji, title, text). Empty list hides the section. ---------- */
  const INTERESTS = [
    { kind: 'Hobby', icon: '🎧', title: 'Listening to music', text: 'My go-to for focus, long debugging sessions and winding down.' },
    { kind: 'Hobby', icon: '🚴', title: 'Weekend bike rides', text: 'Weekends are for getting outside, clearing my head and covering some distance.' },
    { kind: 'Hobby', icon: '📖', title: 'Reading novels', text: 'I read the novels I genuinely like, for the stories and the new ways of seeing things.' },
    { kind: 'Interest', icon: '📈', title: 'Stock market', text: 'I enjoy following how markets move and learning how businesses create value.' },
    { kind: 'Interest', icon: '🧪', title: 'Trying a new popular tech', text: 'I pick a widely used new topic and build a small working project on it to learn by doing.' },
    { kind: 'Interest', icon: '🧭', title: 'Finding where I fit', text: 'Exploring my next versions and the places, teams and roles where I fit best.' }
  ];
  const ig = $('#interestsGrid');
  if (!INTERESTS.length) $('#interests').remove();
  else ig.innerHTML = INTERESTS.map((x, i) => `
    <article class="card interest reveal delay-${i % 3 + 1}">
      <span class="interest-icon" aria-hidden="true">${x.icon}</span>
      <span class="interest-kind">${x.kind}</span><h3>${x.title}</h3><p>${x.text}</p>
    </article>`).join('');

  /* ---------- PROGRESS + SCROLLSPY + MENU ---------- */
  const bar = $('#progress');
  const links = $$('.nav a[href^="#"]');
  const spy = ['about', 'projects', 'stack', 'experience', 'interests', 'contact'].map(id => $('#' + id)).filter(Boolean);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    let cur = null;
    spy.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    links.forEach(a => a.classList.toggle('current', a.getAttribute('href') === '#' + cur));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const menuBtn = $('#menuBtn'), nav = $('#nav');
  const setMenu = open => { nav.classList.toggle('active', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? '✕' : '☰'; };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('active')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  /* ---------- ACCENT ---------- */
  const setAccent = a => {
    document.documentElement.dataset.accent = a;
    $$('.swatches button').forEach(b => b.classList.toggle('on', b.dataset.accent === a));
    try { localStorage.setItem('pm-accent', a); } catch (e) {}
    readColor();
  };
  $$('.swatches button').forEach(b => b.addEventListener('click', () => setAccent(b.dataset.accent)));

  /* ---------- COPY EMAIL ---------- */
  const copyEmail = () => navigator.clipboard.writeText(EMAIL).then(() => true, () => false);
  const copyBtn = $('#copyEmail');
  copyBtn.addEventListener('click', async () => {
    const ok = await copyEmail(); copyBtn.textContent = ok ? 'copied!' : 'press Ctrl+C';
    setTimeout(() => copyBtn.textContent = 'copy email', 1800);
  });

  /* ---------- FILTER ---------- */
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    $$('.filter').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    const f = btn.dataset.filter;
    $$('.project-card').forEach(c => {
      const show = f === 'all' || c.dataset.category === f;
      c.classList.toggle('hide', !show);
      if (show) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    });
  }));

  /* ---------- REVEAL ---------- */
  const io = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); o.unobserve(e.target); } }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- MARQUEE: exact duplicate so the loop is seamless ---------- */
  const mq = $('#marquee'); mq.innerHTML += mq.innerHTML;

  /* ---------- CARD SPOTLIGHT + TILT ---------- */
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.card');
    if (!c) return;
    const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
    if (!reduce && c.classList.contains('project-card')) {
      c.style.transform = `perspective(900px) rotateX(${((y / r.height) - .5) * -4}deg) rotateY(${((x / r.width) - .5) * 5}deg) translateY(-4px)`;
    }
  });
  $$('.project-card').forEach(c => c.addEventListener('pointerleave', () => c.style.transform = ''));

  /* ---------- MODAL ---------- */
  const modal = $('#projectModal'); let lastFocus = null;
  const openProject = key => {
    const p = byKey(key); if (!p) return false;
    lastFocus = document.activeElement;
    $('#modalKicker').textContent = p.label; $('#modalTitle').textContent = p.title; $('#modalDesc').textContent = p.long;
    $('#modalRole').textContent = p.role;
    $('#modalPipeline').innerHTML = p.pipe.map(s => `<i>${s}</i>`).join('<b>→</b>');
    const g = $('#modalGit');
    if (p.gh) { g.href = p.gh; g.textContent = 'GitHub ↗'; } else { g.removeAttribute('href'); g.textContent = p.ghLabel; }
    modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    $('#modalClose').focus(); return true;
  };
  const closeModal = () => {
    modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  grid.addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openProject(b.dataset.open); });
  modal.addEventListener('click', e => { if (e.target.hasAttribute('data-close') || e.target.closest('#modalClose')) closeModal(); });

  /* ---------- NAVIGATION HELPER ---------- */
  const go = id => { const el = $('#' + id); if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };

  /* ---------- COMMAND PALETTE ---------- */
  const pal = $('#palette'), palIn = $('#palInput'), palList = $('#palList');
  const ACTIONS = [
    ...[['about', 'About'], ['projects', 'Projects'], ['stack', 'Stack'], ['experience', 'Experience'], ['interests', 'Interests'], ['contact', 'Contact']].map(([id, t]) => ({ t: 'Go to ' + t, h: 'section', run: () => go(id) })),
    ...PROJECTS.map(p => ({ t: 'Open ' + p.title, h: 'project', run: () => openProject(p.key) })),
    { t: 'Open resume', h: 'link', run: () => open('Pranav_Matham_Resume.pdf', '_blank') },
    { t: 'Open GitHub', h: 'link', run: () => open('https://github.com/PRANAV-MS25', '_blank') },
    { t: 'Open LinkedIn', h: 'link', run: () => open('https://www.linkedin.com/in/pranav-matham/', '_blank') },
    { t: 'Copy email address', h: 'action', run: copyEmail },
    { t: 'Accent: amber', h: 'theme', run: () => setAccent('amber') },
    { t: 'Accent: ice', h: 'theme', run: () => setAccent('ice') },
    { t: 'Accent: rose', h: 'theme', run: () => setAccent('rose') },
    { t: 'Pet the cat', h: 'easter egg', run: () => cat.pet() }
  ];
  let sel = 0, shown = ACTIONS;
  const renderPal = () => {
    const q = palIn.value.trim().toLowerCase();
    shown = ACTIONS.filter(a => a.t.toLowerCase().includes(q) || a.h.includes(q)); sel = 0;
    palList.innerHTML = shown.length ? shown.map((a, i) => `<li data-i="${i}" class="${i ? '' : 'sel'}">${a.t}<small>${a.h}</small></li>`).join('') : '<div class="palette-empty">Nothing matches. Try “projects” or “resume”.</div>';
  };
  const mark = () => { $$('li', palList).forEach((li, i) => li.classList.toggle('sel', i === sel)); const s = $('li.sel', palList); if (s) s.scrollIntoView({ block: 'nearest' }); };
  const openPal = () => { pal.classList.add('open'); pal.setAttribute('aria-hidden', 'false'); palIn.value = ''; renderPal(); palIn.focus(); };
  const closePal = () => { pal.classList.remove('open'); pal.setAttribute('aria-hidden', 'true'); };
  const runSel = a => { closePal(); if (a) setTimeout(a.run, 60); };
  palIn.addEventListener('input', renderPal);
  palIn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); mark(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); mark(); e.preventDefault(); }
    else if (e.key === 'Enter') runSel(shown[sel]);
  });
  palList.addEventListener('click', e => { const li = e.target.closest('li'); if (li) runSel(shown[+li.dataset.i]); });
  pal.addEventListener('click', e => { if (e.target === pal) closePal(); });
  $('#openPalette').addEventListener('click', openPal);
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.classList.contains('open') ? closePal() : openPal(); }
    else if (e.key === 'Escape') { closePal(); if (modal.classList.contains('active')) closeModal(); }
  });

  /* ---------- INTERACTIVE TERMINAL ---------- */
  const tb = $('#termBody'); const hist = []; let hi = 0;
  const line = (html, cls = 'out') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; tb.insertBefore(d, inputRow); tb.scrollTop = tb.scrollHeight; };
  const inputRow = document.createElement('div'); inputRow.className = 'term-line';
  inputRow.innerHTML = '<b>$</b><input id="termIn" spellcheck="false" autocomplete="off" aria-label="Terminal command">';
  tb.appendChild(inputRow);
  const tin = $('#termIn');
  const linkTo = (label, cmd) => `<button class="link" data-cmd="${cmd}">${label}</button>`;
  const COMMANDS = {
    help: () => line(`Commands: <b class="dim">about · projects · project &lt;name&gt; · stack · exp · contact · resume · github · linkedin · email · theme &lt;amber|ice|rose&gt; · cat · clear</b>`),
    whoami: () => line('Pranav Matham — Python · Full Stack · AI/ML, Bengaluru, India'),
    about: () => { line('2026 CS graduate and Python full-stack developer, currently a Software Engineer Intern at Vectora Ventures.'); go('about'); },
    projects: () => { line(PROJECTS.map((p, i) => `${i + 1}. ${linkTo(p.key, 'project ' + p.key)}  <span class="dim">${p.title}</span>`).join('\n')); go('projects'); },
    project: a => { const k = ({ neurosphere: 'traffic', neuro: 'traffic', thyroid: 'thyroid', bus: 'buspass', nutri: 'nutri', 'nutri-ai': 'nutri' })[(a[0] || '').toLowerCase()] || (a[0] || '').toLowerCase();
      if (!openProject(k)) line(`Unknown project. Try: ${PROJECTS.map(p => p.key).join(', ')}`); },
    stack: () => { line('Python · JavaScript · C · C++ · Django · FastAPI · Flask · React · Node.js · TensorFlow · PyTorch · OpenCV · SQL · Docker · Git'); go('stack'); },
    exp: () => { line('Vectora Ventures (Aug 2026–now) → Test Yantra / PYSPIDERS (Jan–Jun 2026) → B.E. CSE, SJB Institute of Technology (2022–2026)'); go('experience'); },
    contact: () => { line(`<a href="mailto:${EMAIL}">${EMAIL}</a>`); go('contact'); },
    resume: () => { line('Opening resume…'); open('Pranav_Matham_Resume.pdf', '_blank'); },
    github: () => { line('Opening GitHub…'); open('https://github.com/PRANAV-MS25', '_blank'); },
    linkedin: () => { line('Opening LinkedIn…'); open('https://www.linkedin.com/in/pranav-matham/', '_blank'); },
    email: async () => line(await copyEmail() ? 'Email copied to clipboard.' : EMAIL),
    theme: a => { if (['amber', 'ice', 'rose'].includes(a[0])) { setAccent(a[0]); line('Accent set to ' + a[0] + '.'); } else line('Usage: theme amber | ice | rose'); },
    cat: () => { cat.pet(); line('The cat acknowledges you.'); },
    clear: () => $$('.out,.cmd', tb).forEach(n => n.remove()),
    sudo: a => a.join(' ') === 'hire-me' ? line('Permission granted. Opening email…', 'out') || (location.href = `mailto:${EMAIL}?subject=Opportunity for Pranav`) : line('pranav is not in the sudoers file. This incident will be reported to the cat.')
  };
  const run = raw => {
    const v = raw.trim(); if (!v) return;
    hist.push(v); hi = hist.length;
    const d = document.createElement('div'); d.className = 'out cmd'; d.innerHTML = '<b>$</b> '; d.append(v); tb.insertBefore(d, inputRow);
    const [c, ...a] = v.split(/\s+/);
    (COMMANDS[c.toLowerCase()] || (() => line(`command not found: ${c}. Type <b class="dim">help</b>.`)))(a);
    tb.scrollTop = tb.scrollHeight;
  };
  tin.addEventListener('keydown', e => {
    if (e.key === 'Enter') { run(tin.value); tin.value = ''; }
    else if (e.key === 'ArrowUp') { if (hi > 0) tin.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { hi = Math.min(hi + 1, hist.length); tin.value = hist[hi] || ''; e.preventDefault(); }
    else if (e.key === 'Tab') { e.preventDefault(); const m = Object.keys(COMMANDS).filter(c => c.startsWith(tin.value)); if (m.length === 1) tin.value = m[0]; }
  });
  tb.addEventListener('click', e => { const b = e.target.closest('[data-cmd]'); if (b) run(b.dataset.cmd); else if (!getSelection().toString()) tin.focus({ preventScroll: true }); });
  $('.term-hint').addEventListener('click', e => { const b = e.target.closest('[data-cmd]'); if (b) run(b.dataset.cmd); });
  // boot sequence (typed once, skipped for reduced motion)
  const boot = [['who am i', 'Pranav Matham'], ['core_focus', 'Python, FastAPI, Django, React, PyTorch'], ['current_role', 'Software Intern @ Vectora Ventures'], ['location', 'Bengaluru, India']];
  (async () => {
    for (const [c, o] of boot) {
      const d = document.createElement('div'); d.className = 'out cmd'; d.innerHTML = '<b>$</b> '; tb.insertBefore(d, inputRow);
      for (const ch of c) { d.append(ch); if (!reduce) await new Promise(r => setTimeout(r, 38)); }
      line(o);
    }
    line('Type <b class="dim">help</b> — this terminal drives the whole site.', 'out dim');
  })();

  /* ---------- BACKGROUND: dot field that bends toward the cursor ---------- */
  const cv = $('#bg'), cx = cv.getContext('2d'); let W, H, dpr, mx = -999, my = -999, rgb = '255,180,84';
  function readColor() {
    const c = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const n = parseInt(c.slice(1), 16); rgb = `${n >> 16},${(n >> 8) & 255},${n & 255}`;
  }
  const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  addEventListener('resize', size); size();
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
  const GAP = 38, R = 170;
  function draw() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    for (let y = GAP / 2; y < innerHeight; y += GAP) for (let x = GAP / 2; x < innerWidth; x += GAP) {
      const dx = mx - x, dy = my - y, d = Math.hypot(dx, dy), t = d < R ? 1 - d / R : 0;
      const px = x + dx * t * .18, py = y + dy * t * .18;
      cx.fillStyle = t ? `rgba(${rgb},${.18 + t * .7})` : 'rgba(236,233,223,.09)';
      cx.beginPath(); cx.arc(px, py, 1 + t * 1.8, 0, 6.283); cx.fill();
    }
    if (!reduce && !document.hidden) requestAnimationFrame(draw);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !reduce) requestAnimationFrame(draw); });
  const saved = (() => { try { return localStorage.getItem('pm-accent'); } catch (e) { return null; } })();
  setAccent(saved || 'amber'); draw();

  /* ---------- THE CAT ---------- */
  const catEl = $('#walkingCat'), spr = $('#catSprite'), emoji = $('#catEmoji'), bub = $('#catBubble');
  const FRAMES = 4, CAT_W = 64;                 // cat_00.png … cat_03.png in assets/cat/
  const MSGS = ['pspsps... 🐾', 'compiling clean code... 💻', 'models training... ⚡', 'coffee level: optimal ☕', "git commit -m 'purrfect' 🚀", 'zero bugs. allegedly. 🐛'];
  const cat = { x: Math.max(20, innerWidth - 160), dir: -1, state: 'walk', until: 0, frame: 0, ft: 0, last: performance.now(), mouse: null, naps: 0, msg: 0, bt: 0 };
  // sprite frames are pre-loaded; if the first one is missing we fall back to an emoji cat
  for (let i = 0; i < FRAMES; i++) { const im = new Image(); im.src = `assets/cat/cat_0${i}.png`; if (i === 0) im.onerror = () => catEl.classList.add('emoji'); }
  spr.addEventListener('error', () => catEl.classList.add('emoji'));
  const say = (t, ms = 2300) => { bub.textContent = t; bub.classList.add('show'); clearTimeout(cat.bt); cat.bt = setTimeout(() => bub.classList.remove('show'), ms); };
  const setState = (s, ms = 0) => { cat.state = s; cat.until = performance.now() + ms; catEl.classList.toggle('walk', s === 'walk' || s === 'chase'); };
  cat.pet = () => { cat.msg = (cat.msg + 1) % MSGS.length; say(MSGS[cat.msg]); setState('sit', 2600); };
  catEl.addEventListener('click', cat.pet);
  catEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cat.pet(); } });
  // when the pointer hangs out near the bottom edge, the cat comes to investigate
  addEventListener('pointermove', e => { cat.mouse = innerHeight - e.clientY < 150 ? e.clientX : null; });
  document.addEventListener('mouseleave', () => cat.mouse = null);

  function frame(now) {
    const dt = Math.min(.05, (now - cat.last) / 1000); cat.last = now;
    const maxX = innerWidth - CAT_W - 8, minX = 8;
    if (!reduce) {
      if (cat.mouse !== null && cat.state !== 'sleep') {
        const tx = Math.min(maxX, Math.max(minX, cat.mouse - CAT_W / 2)), d = tx - cat.x;
        if (Math.abs(d) > 8) { cat.dir = d < 0 ? -1 : 1; cat.x += cat.dir * 170 * dt; if (cat.state !== 'chase') { setState('chase'); } }
        else if (cat.state === 'chase') { setState('sit', 1500); }
      } else {
        if (cat.state === 'chase') setState('sit', 800);
        if (cat.state === 'walk') {
          cat.x += cat.dir * 55 * dt;
          if (cat.x >= maxX) { cat.x = maxX; cat.dir = -1; setState('sit', 1500 + Math.random() * 2500); }
          else if (cat.x <= minX) { cat.x = minX; cat.dir = 1; setState('sit', 1500 + Math.random() * 2500); }
          else if (now > cat.until) setState('sit', 1200 + Math.random() * 2600);
        } else if (now > cat.until) {
          if (cat.state === 'sit' && ++cat.naps % 4 === 0) { setState('sleep', 6000); say('zzz… 💤', 2400); }
          else { if (Math.random() < .5) cat.dir *= -1; setState('walk', 2500 + Math.random() * 4500); }
        }
      }
    }
    cat.x = Math.min(maxX, Math.max(minX, cat.x));
    // sprite frame: walk cycle only while moving; frame 0 when sitting
    if (cat.state === 'walk' || cat.state === 'chase') {
      const step = cat.state === 'chase' ? 80 : 130;
      if (now - cat.ft > step) { cat.frame = (cat.frame + 1) % FRAMES; cat.ft = now; spr.src = `assets/cat/cat_0${cat.frame}.png`; }
    } else if (cat.frame !== 0) { cat.frame = 0; spr.src = 'assets/cat/cat_00.png'; }
    // position moves the whole cat; only the sprite is mirrored, so the speech bubble never flips
    const flip = cat.dir < 0 ? 'scaleX(1)' : 'scaleX(-1)';           // sprites face left by default
    catEl.style.transform = `translate3d(${cat.x}px,0,0)`;
    catEl.style.setProperty('--flip', flip); spr.style.transform = flip; emoji.style.transform = flip;
    catEl.classList.toggle('right', cat.x > innerWidth / 2);
    requestAnimationFrame(frame);
  }
  setState('walk', 3000); requestAnimationFrame(frame);
})();