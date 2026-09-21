/* =================================================================
   PORTFOLIO ENGINE & INTERACTIONS - SCRIPT.JS
==================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL PROGRESS BAR
  const progressBar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  });


  // 2. MOBILE NAVIGATION TOGGLE
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
      menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking nav links
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });
  }


  // 3. TERMINAL EMAIL COPY BUTTON
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('mathampranav@gmail.com').then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    });
  }


  // 4. PROJECT FILTERING LOGIC
  const filterButtons = document.querySelectorAll('.filter');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });


  // 5. PROJECT ARCHITECTURE MODAL DATA & CONTROLS
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalKicker = document.getElementById('modalKicker');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPipeline = document.getElementById('modalPipeline');
  const modalRole = document.getElementById('modalRole');

  // Project architectural specs database
  const projectData = {
    thyroid: {
      kicker: 'AI / COMPUTER VISION',
      title: 'Thyroid Nodule Detection Engine',
      desc: 'An end-to-end deep learning system designed for precise medical image segmentation and ultrasound analysis. Utilizes EfficientNetB2 architecture coupled with custom preprocessing pipelines to isolate nodules and classify malignancy risk with high accuracy.',
      pipeline: 'OpenCV Preprocessing → EfficientNetB2 Feature Extraction → Softmax Classification',
      role: 'Lead Architect & Model Builder'
    },
    buspass: {
      kicker: 'PYTHON / DJANGO',
      title: 'BusPass Automation Engine',
      desc: 'A robust web-based transit pass management application engineered to handle secure user authentication, database record keeping, validation cycles, and instant cryptographic QR pass generation.',
      pipeline: 'Django Auth → SQLite Relational Mapping → QR Generation Middleware',
      role: 'Full-Stack Developer'
    },
    traffic: {
      kicker: 'REAL-TIME SYSTEM',
      title: 'NeuroSphere-X Smart City',
      desc: 'An experimental urban telemetry dashboard featuring high-frequency WebSocket streams, FastAPI asynchronous backend routing, and dynamic data visualization modules for traffic density monitoring.',
      pipeline: 'FastAPI Async Endpoints → WebSockets → React Live Analytics Canvas',
      role: 'Systems & Backend Engineer'
    },
    railway: {
      kicker: 'FULL STACK',
      title: 'Railway Reservation System',
      desc: 'A cross-platform ticket booking and schedule tracking solution built to manage live seat allocation, booking states, cancellation handling, and customer verification workflows.',
      pipeline: 'Flutter Frontend → Node.js API Gateway → SQL Database Cluster',
      role: 'Cross-Platform Developer'
    },
    foodie: {
      kicker: 'COMPUTER VISION',
      title: 'FoodieAI Nutrition Vision',
      desc: 'A computer-vision powered nutrition mapping engine that evaluates food imagery, identifies meal categories, and maps estimated macronutrient breakdowns via trained classification networks.',
      pipeline: 'Image Capture → OpenCV Feature Matching → Nutritional DB Query',
      role: 'AI / CV Developer'
    },
    smartnode: {
      kicker: 'IOT / REAL TIME',
      title: 'Smart Autonomous Home Node',
      desc: 'An embedded hardware telemetry node built around the ESP32 microcontroller, streaming real-time sensor metrics, threshold alerts, and remote device triggers over secure WebSocket channels.',
      pipeline: 'ESP32 C++ Sensors → Node.js WebSocket Broker → Web Dashboard',
      role: 'Embedded & IoT Developer'
    }
  };

  // Open modal on details button click
  document.querySelectorAll('.project-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.project-card');
      const projectKey = card.getAttribute('data-project');
      const data = projectData[projectKey];

      if (data && modal) {
        modalKicker.textContent = data.kicker;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalPipeline.textContent = data.pipeline;
        modalRole.textContent = data.role;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal helper
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close') || e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal via ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  // 6. SCROLL REVEAL ANIMATIONS VIA INTERSECTION OBSERVER
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


 // 7. INTERACTIVE WALKING CAT SPRITE CONTROLLER
  const catEl = document.getElementById('walkingCat');
  const catSprite = document.getElementById('catSprite');
  const catBubble = document.getElementById('catBubble');

  if (catEl && catSprite) {
    const catMessages = [
      "pspsps... 🐾",
      "compiling clean code... 💻",
      "models training... ⚡",
      "coffee level: optimal ☕",
      "git commit -m 'purrfect' 🚀",
      "bugs eliminated: 0 🐛"
    ];

    let messageIndex = 0;
    let catX = window.innerWidth - 120; // Initial X position
    let velocity = 1.2;                 // Walking speed
    let isFacingLeft = true;
    let isPaused = false;
    let pauseTimer = null;

    // Sprite frame animation state
    let frameIndex = 0;
    const totalFrames = 4; // Adjust if you have more/fewer frame files (e.g. cat_00.png to cat_03.png)
    let frameTimer = 0;

    catEl.style.position = 'fixed';
    catEl.style.bottom = '20px';
    catEl.style.zIndex = '99';

    function animateCat(timestamp) {
      if (!isPaused) {
        catX += velocity;

        // Boundary checks
        const minX = 20;
        const maxX = window.innerWidth - 80;

        if (catX >= maxX) {
          catX = maxX;
          velocity = -Math.abs(velocity); // Turn left
          isFacingLeft = true;
          triggerCatPause();
        } else if (catX <= minX) {
          catX = minX;
          velocity = Math.abs(velocity);  // Turn right
          isFacingLeft = false;
          triggerCatPause();
        }

        // Update CSS position and horizontal flip
        catEl.style.left = `${catX}px`;
        catEl.style.transform = isFacingLeft ? 'scaleX(1)' : 'scaleX(-1)';

        // Leg animation walk cycle (updates frame every 120ms while walking)
        if (!frameTimer || timestamp - frameTimer > 120) {
          frameIndex = (frameIndex + 1) % totalFrames;
          // Dynamically points to cat_00.png, cat_01.png, cat_02.png, etc.
          const frameNumString = String(frameIndex).padStart(2, '0');
          catSprite.src = `assets/cat/cat_${frameNumString}.png`;
          frameTimer = timestamp;
        }
      } else {
        // When paused, show a resting frame (frame 0)
        catSprite.src = `assets/cat/cat_00.png`;
      }

      requestAnimationFrame(animateCat);
    }

    function triggerCatPause() {
      isPaused = true;
      if (pauseTimer) clearTimeout(pauseTimer);
      
      pauseTimer = setTimeout(() => {
        isPaused = false;
      }, Math.random() * 3000 + 1500);
    }

    catEl.addEventListener('click', () => {
      isPaused = true;
      if (pauseTimer) clearTimeout(pauseTimer);
      catSprite.src = `assets/cat/cat_00.png`; // Sit when clicked

      messageIndex = (messageIndex + 1) % catMessages.length;
      if (catBubble) {
        catBubble.textContent = catMessages[messageIndex];
        catBubble.style.opacity = '1';
        catBubble.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          catBubble.style.opacity = '';
          catBubble.style.transform = '';
          isPaused = false;
        }, 2500);
      }
    });

    requestAnimationFrame(animateCat);
  }
});