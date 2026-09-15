const projectData={
  thyroid:{kicker:"AI / COMPUTER VISION",title:"Thyroid Nodule Detection Engine",desc:"Ultrasound image-analysis workflow using CNNs and EfficientNet-B0 for automated benign/malignant classification.",pipeline:"Ultrasound image → preprocessing / ROI → EfficientNet-B0 features → classification → probability score",role:"AI/ML + computer-vision project focused on an end-to-end model-to-application workflow."},
  buspass:{kicker:"PYTHON / DJANGO",title:"BusPass Automation Engine",desc:"Digital transit-pass platform with Django authentication, validation, QR pass generation and database-backed records.",pipeline:"User input → Django auth/validation → QR token → SQLite record → digital pass",role:"Full-stack Python project focused on replacing a paper-heavy transit-pass flow with a web application."},
  traffic:{kicker:"REAL-TIME SYSTEM",title:"NeuroSphere-X Smart City",desc:"FastAPI-based urban analytics concept with live dashboards, traffic visualization, heatmaps and WebSocket telemetry.",pipeline:"Telemetry/video input → processing → FastAPI → WebSocket → React dashboard",role:"Systems project exploring real-time data delivery and practical urban analytics."},
  railway:{kicker:"FULL STACK",title:"Railway Reservation System",desc:"Cross-platform reservation concept covering booking flows, seat allocation, schedules and cancellation handling.",pipeline:"Flutter UI → authentication/data → booking service → reservation state",role:"Application-engineering project covering user flows, data persistence and booking logic."},
  foodie:{kicker:"COMPUTER VISION",title:"FoodieAI Nutrition Vision",desc:"Computer-vision food recognition concept paired with nutritional mapping and a REST-backed application flow.",pipeline:"Image → visual features → food match → nutrition mapping → API response",role:"AI application concept connecting computer vision with a practical user-facing workflow."},
  smartnode:{kicker:"IOT / REAL TIME",title:"Smart Autonomous Home Node",desc:"ESP32 sensing concept with telemetry graphs, threshold alerts and remote controls over WebSocket links.",pipeline:"Sensors → ESP32 → WebSocket server → dashboard → alerts/controls",role:"Embedded + real-time systems project combining sensing, communication and visualization."}
};

const $=(s)=>document.querySelector(s);
const $$=(s)=>document.querySelectorAll(s);

window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  $("#progress").style.width=`${Math.min(100,(y/(document.documentElement.scrollHeight-innerHeight))*100)}%`;
  $("#header").classList.toggle("scrolled",y>20);
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

$("#menuBtn").addEventListener("click",()=>{
  const open=$("#nav").classList.toggle("open");
  $("#menuBtn").setAttribute("aria-expanded",open);
});
$$(".nav a").forEach(a => {
  a.addEventListener("click", e => {
    const targetId = a.getAttribute("href");

    // Close mobile navigation
    $("#nav").classList.remove("open");
    $("#menuBtn").setAttribute("aria-expanded", "false");

    // Handle internal section links ourselves
    if (targetId && targetId.startsWith("#")) {
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const headerHeight = $("#header").offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        // Keep URL hash
        history.pushState(null, "", targetId);
      }
    }
  });
});

$$(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    $$(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter=btn.dataset.filter;
    $$(".project-card").forEach(card=>{
      card.classList.toggle("hidden",filter!=="all" && card.dataset.category!==filter);
    });
  });
});

function openProject(id){
  const d=projectData[id]; if(!d)return;
  $("#modalKicker").textContent=d.kicker;
  $("#modalTitle").textContent=d.title;
  $("#modalDesc").textContent=d.desc;
  $("#modalPipeline").textContent=d.pipeline;
  $("#modalRole").textContent=d.role;
  $("#projectModal").classList.add("open");
  $("#projectModal").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeProject(){
  $("#projectModal").classList.remove("open");
  $("#projectModal").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
$$(".project-card").forEach(card=>card.addEventListener("click",()=>openProject(card.dataset.project)));
$("#modalClose").addEventListener("click",closeProject);
$$("[data-close]").forEach(x=>x.addEventListener("click",closeProject));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProject()});

$("#copyEmail").addEventListener("click",async()=>{
  try{
    await navigator.clipboard.writeText("mathampranav@gmail.com");
    $("#copyEmail").textContent="copied ✓";
    setTimeout(()=>$("#copyEmail").textContent="copy",1500);
  }catch{location.href="mailto:mathampranav@gmail.com"}
});

const cat=$("#walkingCat");
const catSprite=$("#catSprite");
const catBubble=$("#catBubble");
const catFrames=Array.from({length:11},(_,i)=>`assets/cat/cat_${String(i).padStart(2,"0")}.png`);
const catPhrases=[
  "pspsps... 🐾",
  "just passing through 😼",
  "keep scrolling 👀",
  "nice project. approved.",
  "ship it! 🚀",
  "meow = deploy",
  "don't forget GitHub!",
  "i saw that bug 👁️",
  "need a referral? 👀"
];

// Preload the extracted frames so the realistic cat animation stays smooth.
catFrames.forEach(src=>{const img=new Image();img.src=src});

let catX=-190;
let catDirection=1;
let catFrame=0;
let catPaused=false;
let lastTime=performance.now();
let frameClock=0;
let pawClock=0;
let bubbleTimer=null;
let idleUntil=0;
const CAT_SPEED=58;
const FRAME_MS=82;

function showCatMessage(message){
  catBubble.textContent=message;
  cat.classList.add("show-bubble");
  clearTimeout(bubbleTimer);
  bubbleTimer=setTimeout(()=>cat.classList.remove("show-bubble"),2400);
}

function leavePaw(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const paw=document.createElement("span");
  paw.className="paw-print";
  const rect=cat.getBoundingClientRect();
  const x=catDirection>0 ? rect.left+28 : rect.right-45;
  const y=rect.bottom-27;
  paw.style.left=`${Math.max(4,x)}px`;
  paw.style.top=`${Math.max(4,y)}px`;
  paw.style.transform=`rotate(${catDirection>0?-8:8}deg) scale(.8)`;
  document.body.appendChild(paw);
  setTimeout(()=>paw.remove(),2600);
}

function renderCat(){
  const viewport=window.innerWidth;
  const catWidth=cat.getBoundingClientRect().width || 170;
  const minX=-catWidth-20;
  const maxX=viewport-32;
  cat.style.transform=`translate3d(${catX}px,0,0) scaleX(${catDirection})`;
}

function catLoop(now){
  const dt=Math.min(40,now-lastTime);
  lastTime=now;
  if(!catPaused && now>=idleUntil){
    catX += catDirection * CAT_SPEED * dt/1000;
    frameClock += dt;
    pawClock += dt;
    if(frameClock>=FRAME_MS){
      frameClock=0;
      catFrame=(catFrame+1)%catFrames.length;
      catSprite.src=catFrames[catFrame];
    }
    if(pawClock>430){pawClock=0;leavePaw();}

    const catWidth=cat.getBoundingClientRect().width || 170;
    const rightLimit=window.innerWidth-25;
    if(catDirection>0 && catX>rightLimit){
      catDirection=-1;
      catX=rightLimit;
      catFrame=0;
      showCatMessage("oops. wrong way. ↩");
      idleUntil=now+420;
    }else if(catDirection<0 && catX<-catWidth-25){
      catDirection=1;
      catX=-catWidth-25;
      catFrame=0;
      idleUntil=now+650;
    }
  }
  renderCat();
  requestAnimationFrame(catLoop);
}

cat.addEventListener("click",()=>{
  catPaused=!catPaused;
  if(catPaused){
    showCatMessage(catPhrases[Math.floor(Math.random()*catPhrases.length)] + " — paused.");
  }else{
    showCatMessage("okay, back to causing trouble 😼");
    lastTime=performance.now();
  }
});
cat.addEventListener("keydown",e=>{
  if(e.key==="Enter"||e.key===" "){e.preventDefault();cat.click()}
});

window.addEventListener("resize",renderCat);

const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
if(reduceMotion.matches){
  catPaused=true;
  catX=Math.max(12,(window.innerWidth-170)/2);
  catDirection=1;
  catSprite.src=catFrames[0];
}

requestAnimationFrame(catLoop);
