/* =============================================
   themes.js — 7 High-Fidelity Portfolio Themes
   Universal Portfolio Generator — Elite Edition
   ============================================= */

const THEMES = [
  // ========================================================
  // THEME 1: Aether (Futuristic Cyberpunk & Particle Universe)
  // ========================================================
  {
    id: 1,
    nameKey: 'theme.1',
    icon: 'fas fa-atom',
    description: 'Pixel-perfect Aether — interactive particles, dark/light toggle, neon accents',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · {{portfolioTexts.title}}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Righteous&family=Space+Grotesk:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#07090e;
  --fg:#f1f5f9;
  --fg2:rgba(241,245,249,0.7);
  --fg3:rgba(241,245,249,0.4);
  --primary:{{colors.primary}};
  --accent:#00ffaa;
  --card-bg:rgba(15,23,42,0.6);
  --card-border:rgba(255,255,255,0.08);
  --font-display:'Righteous',cursive,'Cairo',sans-serif;
  --font-body:'Space Grotesk','Cairo',sans-serif;
}
.light{
  --bg:#f8fafc;
  --fg:#0f172a;
  --fg2:rgba(15,23,42,0.75);
  --fg3:rgba(15,23,42,0.5);
  --accent:#059669;
  --card-bg:rgba(255,255,255,0.85);
  --card-border:rgba(15,23,42,0.08);
}
body{
  background:var(--bg);
  color:var(--fg);
  font-family:var(--font-body);
  line-height:1.6;
  overflow-x:hidden;
  transition:background .3s,color .3s;
}
#particles-js{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}
.theme-btn{
  position:fixed;top:1.2rem;right:1.2rem;z-index:100;
  width:2.5rem;height:2.5rem;border-radius:50%;
  border:1px solid var(--card-border);background:var(--card-bg);
  color:var(--fg);cursor:pointer;display:flex;align-items:center;
  justify-content:center;font-size:1rem;backdrop-filter:blur(8px);
  transition:all .2s;
}
.theme-btn:hover{color:var(--accent);border-color:var(--accent);transform:scale(1.05)}
.container{position:relative;z-index:1;max-width:980px;margin:0 auto;padding:3rem 1.5rem}
.hero{display:flex;align-items:center;gap:2.5rem;min-height:55vh;padding:2rem 0}
.avatar{
  width:min(160px,38vw);height:min(160px,38vw);border-radius:50%;
  object-fit:cover;border:3px solid var(--accent);box-shadow:0 0 25px rgba(0,255,170,0.25);
  flex-shrink:0;
}
.avatar-fallback{
  width:min(160px,38vw);height:min(160px,38vw);border-radius:50%;
  background:linear-gradient(135deg,var(--primary),var(--accent));
  color:#fff;display:flex;align-items:center;justify-content:center;
  font-family:var(--font-display);font-size:3rem;font-weight:700;
  border:3px solid var(--accent);box-shadow:0 0 25px rgba(0,255,170,0.25);
  flex-shrink:0;
}
.hero-text{flex:1;min-width:280px}
.name{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,3.8rem);line-height:1.1;margin-bottom:0.25rem;color:var(--fg)}
.role-badge{display:inline-block;padding:0.25rem 0.85rem;border-radius:9999px;background:rgba(0,255,170,0.12);color:var(--accent);font-size:0.875rem;font-weight:600;margin-bottom:0.75rem;border:1px solid rgba(0,255,170,0.2)}
.bio{font-size:1.05rem;color:var(--fg2);max-width:620px;margin-bottom:1.25rem}
.socials{display:flex;flex-wrap:wrap;gap:0.75rem}
.social-link{
  width:2.5rem;height:2.5rem;border-radius:50%;
  background:var(--card-bg);border:1px solid var(--card-border);
  color:var(--fg2);display:flex;align-items:center;justify-content:center;
  font-size:1.1rem;text-decoration:none;transition:all .2s;
}
.social-link:hover{color:var(--accent);border-color:var(--accent);transform:translateY(-3px)}
.section{margin:3.5rem 0}
.section-title{font-family:var(--font-display);font-size:1.6rem;color:var(--accent);margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.6rem}
.skill-tag{
  display:inline-flex;align-items:center;gap:0.5rem;padding:0.45rem 0.9rem;
  background:var(--card-bg);border:1px solid var(--card-border);
  border-radius:8px;font-size:0.85rem;font-weight:500;color:var(--fg);
  transition:all .2s;
}
.skill-tag i{font-size:1rem}
.skill-tag:hover{border-color:var(--accent);transform:translateY(-2px);color:var(--accent)}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem}
.project-card{
  background:var(--card-bg);border:1px solid var(--card-border);
  border-radius:12px;padding:1.4rem;transition:all .25s;backdrop-filter:blur(10px);
}
.project-card:hover{border-color:var(--accent);transform:translateY(-4px);box-shadow:0 10px 25px rgba(0,0,0,0.3)}
.project-card h3{font-family:var(--font-display);font-size:1.15rem;margin-bottom:0.5rem;color:var(--fg)}
.project-card p{font-size:0.875rem;color:var(--fg2);margin-bottom:1rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem}
.project-tags span{font-size:0.75rem;padding:0.15rem 0.5rem;border-radius:4px;background:rgba(255,255,255,0.06);color:var(--fg3)}
.project-link{color:var(--accent);font-size:0.85rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:0.35rem}
.project-link:hover{text-decoration:underline}
.timeline{display:flex;flex-direction:column;gap:1rem}
.timeline-item{padding:1rem 1.25rem;border-left:3px solid var(--accent);background:var(--card-bg);border-radius:0 8px 8px 0}
.timeline-item h4{font-weight:600;font-size:1rem;color:var(--fg)}
.timeline-item .meta{font-size:0.825rem;color:var(--fg3)}
.bb-grid{display:flex;flex-wrap:wrap;gap:0.75rem}
.bb-item{padding:0.5rem 1rem;background:var(--card-bg);border:1px solid var(--card-border);border-radius:8px;font-size:0.85rem;display:flex;align-items:center;gap:0.5rem}
.bb-item i{color:var(--accent)}
.contact-box{background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;padding:1.5rem;text-align:center}
.contact-btn{display:inline-flex;align-items:center;gap:0.5rem;padding:0.7rem 1.5rem;background:var(--accent);color:#07090e;font-weight:700;border-radius:8px;text-decoration:none;margin-top:1rem;transition:all .2s}
.contact-btn:hover{filter:brightness(1.1);transform:scale(1.02)}
footer{text-align:center;padding:3rem 0 1rem;color:var(--fg3);font-size:0.8rem;border-top:1px solid var(--card-border);margin-top:4rem}
[dir="rtl"] .hero{text-align:right}
[dir="rtl"] .timeline-item{border-left:none;border-right:3px solid var(--accent);border-radius:8px 0 0 8px}
[dir="rtl"] .socials{justify-content:flex-start}
[dir="rtl"] .theme-btn{right:auto;left:1.2rem}
@media(max-width:768px){.hero{flex-direction:column;text-align:center;gap:1.5rem;min-height:auto}.socials{justify-content:center}}
</style>
</head>
<body>
<button class="theme-btn" id="darkToggle" aria-label="Toggle theme"><i class="fas fa-sun"></i></button>
<div id="particles-js"></div>
<div class="container">
  <section class="hero"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    {{#if photo}}
      <img src="{{photo}}" alt="{{name}}" class="avatar">
    {{else}}
      <div class="avatar-fallback">{{initials}}</div>
    {{/if}}
    <div class="hero-text">
      <h1 class="name">{{name}}</h1>
      <div class="role-badge"><i class="fas fa-terminal mr-1"></i> {{role}}</div>
      {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
      <div class="socials">
        {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
      </div>
    </div>
  </section>

  {{#if skills.length}}
  <section class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-code"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </section>
  {{/if}}

  {{#if projects.length}}
  <section class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-folder-open"></i> <span>{{sectionTitles.projects}}</span></h2>
    <div class="projects-grid">
      {{#each projects}}
      <div class="project-card">
        <h3>{{this.name}}</h3>
        <p>{{this.desc}}</p>
        <div class="project-tags">
          {{#each this.tags}}<span>{{this}}</span>{{/each}}
        </div>
        {{#if this.url}}
        <a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">
          <span>{{portfolioTexts.viewProject}}</span>
          <i class="fas fa-arrow-up-right-from-square text-xs"></i>
        </a>
        {{/if}}
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{#if education.length}}
  <section class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-graduation-cap"></i> <span>{{sectionTitles.education}}</span></h2>
    <div class="timeline">
      {{#each education}}
      <div class="timeline-item">
        <h4>{{this.degree}}</h4>
        <div class="meta">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{#if bugbounty.length}}
  <section class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-shield-halved"></i> <span>{{sectionTitles.bugbounty}}</span></h2>
    <div class="bb-grid">
      {{#each bugbounty}}
      <div class="bb-item">
        <i class="fas fa-shield-halved"></i>
        <span><strong>{{this.platform}}</strong> / {{this.username}}</span>
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{#if contactForm}}
  <section class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <div class="contact-box">
      <h2 class="section-title" style="justify-content:center;margin-bottom:0.5rem"><i class="fas fa-paper-plane"></i> <span>{{sectionTitles.contact}}</span></h2>
      <p style="color:var(--fg2);font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
      {{#if contactEmail}}
      <a href="mailto:{{contactEmail}}" class="contact-btn">
        <i class="fas fa-envelope"></i>
        <span>{{contactEmail}}</span>
      </a>
      {{/if}}
    </div>
  </section>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}}</p>
  </footer>
</div>

<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script>
particlesJS('particles-js',{particles:{number:{value:50,density:{enable:true,value_area:800}},color:{value:"#00ffaa"},shape:{type:"circle"},opacity:{value:0.5,random:true},size:{value:3,random:true},line_linked:{enable:true,distance:150,color:"#00ffaa",opacity:0.2,width:1},move:{enable:true,speed:1.5}},interactivity:{events:{onhover:{enable:true,mode:"grab"},resize:true}},retina_detect:true});
(()=>{const b=document.getElementById('darkToggle'),i=b.querySelector('i');const t=()=>{document.documentElement.classList.toggle('light');const isL=document.documentElement.classList.contains('light');i.className=isL?'fas fa-moon':'fas fa-sun';localStorage.setItem('aether-theme',isL?'light':'dark')};if(localStorage.getItem('aether-theme')==='light')t();b.addEventListener('click',t)})();
</script>
{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  },

  // ========================================================
  // THEME 2: Terminal (Hacker CLI & Matrix Particle Console)
  // ========================================================
  {
    id: 2,
    nameKey: 'theme.2',
    icon: 'fas fa-terminal',
    description: 'Terminal-inspired with matrix particle network, command prompt aesthetics',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · terminal</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#090a0f;
  --fg:#d1d5db;
  --accent:#00ff88;
  --accent2:#38bdf8;
  --card:#11131a;
  --border:rgba(0,255,136,0.18);
  --font:'Fira Code','Cairo',monospace;
}
body{
  background:var(--bg);color:var(--fg);
  font-family:var(--font);line-height:1.6;
  overflow-x:hidden;
}
#particles-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}
.container{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:2.5rem 1.25rem}
.term-window{
  background:var(--card);border:1px solid var(--border);
  border-radius:12px;box-shadow:0 15px 40px rgba(0,0,0,0.6);
  overflow:hidden;margin-bottom:2rem;
}
.term-header{
  background:#1a1d27;padding:0.6rem 1rem;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid rgba(255,255,255,0.06);
}
.term-dots{display:flex;gap:6px}
.dot{width:11px;height:11px;border-radius:50%}
.dot-red{background:#ef4444}.dot-yellow{background:#f59e0b}.dot-green{background:#10b981}
.term-title{font-size:0.75rem;color:#6b7280;font-weight:600}
.term-body{padding:1.5rem}
.prompt-line{color:#9ca3af;font-size:0.85rem;margin-bottom:1.25rem}
.prompt-user{color:var(--accent);font-weight:600}
.prompt-host{color:var(--accent2)}
.header-row{display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem}
.avatar{width:90px;height:90px;border-radius:10px;object-fit:cover;border:2px solid var(--accent)}
.avatar-fallback{
  width:90px;height:90px;border-radius:10px;
  background:#1f2430;border:2px solid var(--accent);
  display:flex;align-items:center;justify-content:center;
  font-size:2rem;font-weight:700;color:var(--accent);
}
h1{font-size:clamp(1.6rem,4vw,2.4rem);color:#fff;margin-bottom:0.25rem}
.role{color:var(--accent);font-size:0.95rem;font-weight:600}
.bio{color:#9ca3af;font-size:0.9rem;margin:0.75rem 0}
.socials{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1rem}
.social-link{
  display:inline-flex;align-items:center;gap:0.4rem;padding:0.35rem 0.75rem;
  background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
  border-radius:6px;color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:all .2s;
}
.social-link:hover{color:var(--accent);border-color:var(--accent);background:rgba(0,255,136,0.08)}
.section{margin:2.5rem 0}
.section-title{color:var(--accent);font-size:1.1rem;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.5rem}
.skill-chip{
  padding:0.35rem 0.75rem;background:rgba(0,255,136,0.05);
  border:1px solid rgba(0,255,136,0.2);border-radius:6px;
  font-size:0.8rem;color:#e5e7eb;display:inline-flex;align-items:center;gap:0.4rem;
}
.skill-chip i{font-size:0.95rem;color:var(--accent)}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1rem}
.project-card{
  background:#131620;border:1px solid rgba(255,255,255,0.06);
  border-radius:8px;padding:1.25rem;transition:all .2s;
}
.project-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.project-card h3{color:#fff;font-size:1rem;margin-bottom:0.4rem}
.project-card p{color:#9ca3af;font-size:0.825rem;margin-bottom:0.75rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.75rem}
.project-tags span{font-size:0.7rem;color:var(--accent2);background:rgba(56,189,248,0.08);padding:0.15rem 0.45rem;border-radius:4px}
.project-link{color:var(--accent);font-size:0.8rem;text-decoration:none;font-weight:600}
.edu-row{padding:0.75rem 0;border-bottom:1px solid rgba(255,255,255,0.06)}
.edu-row h4{color:#fff;font-size:0.95rem}
.edu-row .meta{color:#6b7280;font-size:0.8rem}
.bb-list{display:flex;flex-wrap:wrap;gap:0.6rem}
.bb-chip{padding:0.4rem 0.8rem;background:#151824;border:1px solid rgba(0,255,136,0.2);border-radius:6px;font-size:0.8rem;color:#e5e7eb}
footer{text-align:center;color:#6b7280;font-size:0.75rem;padding:2rem 0;border-top:1px solid rgba(255,255,255,0.06);margin-top:3rem}
[dir="rtl"] .term-window{text-align:right}
[dir="rtl"] .socials{justify-content:flex-start}
</style>
</head>
<body>
<canvas id="particles-canvas"></canvas>
<div class="container">
  <div class="term-window">
    <div class="term-header">
      <div class="term-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="term-title">bash · {{slug}}@dev: ~</span>
      <span></span>
    </div>
    <div class="term-body">
      <div class="prompt-line">
        <span class="prompt-user">visitor</span>@<span class="prompt-host">{{slug}}</span>:~$ <span style="color:#fff">cat</span> profile.md
      </div>
      <div class="header-row">
        {{#if photo}}
          <img src="{{photo}}" alt="{{name}}" class="avatar">
        {{else}}
          <div class="avatar-fallback">{{initials}}</div>
        {{/if}}
        <div>
          <h1>{{name}}</h1>
          <div class="role">// {{role}}</div>
          {{#if location}}<div style="color:#6b7280;font-size:0.8rem;margin-top:0.2rem"><i class="fas fa-location-dot"></i> {{location}}</div>{{/if}}
        </div>
      </div>
      {{#if bio}}<p class="bio">/* {{bio}} */</p>{{/if}}
      <div class="socials">
        {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="{{this.icon}}"></i><span>{{this.label}}</span></a>{{/each}}
      </div>
    </div>
  </div>

  {{#if skills.length}}
  <div class="section">
    <h2 class="section-title"><span>##</span> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-chip"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section">
    <h2 class="section-title"><span>##</span> <span>{{sectionTitles.projects}}</span></h2>
    <div class="projects-grid">
      {{#each projects}}
      <div class="project-card">
        <h3>{{this.name}}</h3>
        <p>{{this.desc}}</p>
        <div class="project-tags">
          {{#each this.tags}}<span>#{{this}}</span>{{/each}}
        </div>
        {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">[ {{portfolioTexts.viewProject}} &rarr; ]</a>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education.length}}
  <div class="section">
    <h2 class="section-title"><span>##</span> <span>{{sectionTitles.education}}</span></h2>
    <div>
      {{#each education}}
      <div class="edu-row">
        <h4>{{this.degree}}</h4>
        <div class="meta">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if bugbounty.length}}
  <div class="section">
    <h2 class="section-title"><span>##</span> <span>{{sectionTitles.bugbounty}}</span></h2>
    <div class="bb-list">
      {{#each bugbounty}}<div class="bb-chip"><i class="fas fa-bug" style="color:var(--accent)"></i> {{this.platform}} / {{this.username}}</div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section">
    <h2 class="section-title"><span>##</span> <span>{{sectionTitles.contact}}</span></h2>
    <p style="color:#9ca3af;font-size:0.85rem">// {{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.5rem"><a href="mailto:{{contactEmail}}" style="color:var(--accent);text-decoration:none">&gt; echo "{{contactEmail}}" | mail -s "Hello"</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} // terminal mode</p>
  </footer>
</div>

<script>
const c=document.getElementById('particles-canvas'),ctx=c.getContext('2d');
let w,h,mouse={x:0,y:0};
function resize(){w=c.width=innerWidth;h=c.height=innerHeight}
resize();window.addEventListener('resize',resize);
document.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
const particles=Array.from({length:50},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.5,vy:(Math.random()-0.5)*0.5,size:Math.random()*2+1}));
function anim(){ctx.clearRect(0,0,w,h);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=mouse.x-p.x,dy=mouse.y-p.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<110){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle='rgba(0,255,136,'+(0.18-dist/700)+')';ctx.stroke()}ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle='rgba(0,255,136,0.6)';ctx.fill()});requestAnimationFrame(anim)}
anim();
</script>
</body>
</html>`)(data)
  },

  // ========================================================
  // THEME 3: Minimal (Swiss Typographic Elegance)
  // ========================================================
  {
    id: 3,
    nameKey: 'theme.3',
    icon: 'fas fa-pen-nib',
    description: 'Clean minimal typography with dark/light toggle, elegant whitespace',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · {{role}}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family={{fontUrl}}&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#fafafa;
  --fg:#09090b;
  --muted:#f4f4f5;
  --accent:{{colors.primary}};
  --border:#e4e4e7;
  --font:'{{fontFamilyCss}}','Cairo',sans-serif;
}
.dark{
  --bg:#09090b;
  --fg:#fafafa;
  --muted:#18181b;
  --border:#27272a;
}
body{
  background:var(--bg);color:var(--fg);
  font-family:var(--font);line-height:1.7;
  transition:background .25s,color .25s;
}
.container{max-width:760px;margin:0 auto;padding:3rem 1.5rem}
.theme-btn{
  position:fixed;top:1.2rem;right:1.2rem;z-index:50;
  width:2.4rem;height:2.4rem;border-radius:50%;
  border:1px solid var(--border);background:var(--bg);
  color:var(--fg);cursor:pointer;display:flex;align-items:center;
  justify-content:center;transition:all .2s;
}
.theme-btn:hover{background:var(--muted)}
header{padding:3rem 0 2rem;border-bottom:1px solid var(--border)}
.avatar{width:88px;height:88px;border-radius:50%;object-fit:cover;margin-bottom:1.25rem}
.avatar-fallback{
  width:88px;height:88px;border-radius:50%;background:var(--accent);
  color:#fff;display:flex;align-items:center;justify-content:center;
  font-size:2rem;font-weight:700;margin-bottom:1.25rem;
}
h1{font-size:clamp(2rem,5vw,2.75rem);font-weight:700;letter-spacing:-0.03em;line-height:1.15;margin-bottom:0.4rem}
.role{font-size:1.1rem;color:var(--accent);font-weight:600;margin-bottom:0.75rem}
.bio{font-size:1.05rem;color:#71717a;max-width:600px;margin-bottom:1.25rem}
.socials{display:flex;flex-wrap:wrap;gap:0.75rem}
.social-link{
  color:var(--fg);opacity:0.6;font-size:1.1rem;text-decoration:none;
  transition:all .2s;display:inline-flex;align-items:center;
}
.social-link:hover{opacity:1;color:var(--accent)}
.section{padding:2.5rem 0;border-bottom:1px solid var(--border)}
.section-title{font-size:1.2rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:1.25rem}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.5rem}
.skill-tag{
  padding:0.35rem 0.85rem;background:var(--muted);border-radius:9999px;
  font-size:0.85rem;font-weight:500;display:inline-flex;align-items:center;gap:0.4rem;
}
.skill-tag i{font-size:0.95rem}
.projects-list{display:flex;flex-direction:column;gap:1.5rem}
.project-item{padding:1.25rem;border:1px solid var(--border);border-radius:12px;transition:border-color .2s}
.project-item:hover{border-color:var(--accent)}
.project-item h3{font-size:1.1rem;font-weight:600;margin-bottom:0.3rem}
.project-item p{font-size:0.9rem;color:#71717a;margin-bottom:0.75rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.75rem}
.project-tags span{font-size:0.75rem;padding:0.15rem 0.6rem;background:var(--muted);border-radius:9999px}
.project-link{color:var(--accent);font-size:0.875rem;font-weight:600;text-decoration:none}
.timeline{display:flex;flex-direction:column;gap:1rem}
.timeline-item h4{font-size:1rem;font-weight:600}
.timeline-item .meta{font-size:0.85rem;color:#71717a}
.bb-list{display:flex;flex-wrap:wrap;gap:0.5rem}
.bb-badge{padding:0.35rem 0.75rem;background:var(--muted);border-radius:9999px;font-size:0.8rem}
footer{padding:2.5rem 0;text-align:center;color:#a1a1aa;font-size:0.825rem}
[dir="rtl"] header,[dir="rtl"] .section{text-align:right}
[dir="rtl"] .socials{justify-content:flex-start}
[dir="rtl"] .theme-btn{right:auto;left:1.2rem}
</style>
</head>
<body>
<button class="theme-btn" id="darkToggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
<div class="container">
  <header{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    {{#if photo}}
      <img src="{{photo}}" alt="{{name}}" class="avatar">
    {{else}}
      <div class="avatar-fallback">{{initials}}</div>
    {{/if}}
    <h1>{{name}}</h1>
    <div class="role">{{role}}</div>
    {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
    <div class="socials">
      {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
    </div>
  </header>

  {{#if skills.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.skills}}</h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.projects}}</h2>
    <div class="projects-list">
      {{#each projects}}
      <div class="project-item">
        <h3>{{this.name}}</h3>
        <p>{{this.desc}}</p>
        <div class="project-tags">
          {{#each this.tags}}<span>{{this}}</span>{{/each}}
        </div>
        {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">{{portfolioTexts.viewProject}} &rarr;</a>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.education}}</h2>
    <div class="timeline">
      {{#each education}}
      <div class="timeline-item">
        <h4>{{this.degree}}</h4>
        <div class="meta">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if bugbounty.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.bugbounty}}</h2>
    <div class="bb-list">
      {{#each bugbounty}}<div class="bb-badge"><i class="fas fa-shield-halved" style="color:var(--accent)"></i> {{this.platform}} · {{this.username}}</div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.contact}}</h2>
    <p style="color:#71717a;font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.75rem"><a href="mailto:{{contactEmail}}" class="project-link">{{contactEmail}} &rarr;</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}}</p>
  </footer>
</div>

<script>
(()=>{const b=document.getElementById('darkToggle'),i=b.querySelector('i');const t=()=>{document.documentElement.classList.toggle('dark');const d=document.documentElement.classList.contains('dark');i.className=d?'fas fa-sun':'fas fa-moon';localStorage.setItem('minimal-theme',d?'dark':'light')};if(localStorage.getItem('minimal-theme')==='dark')t();b.addEventListener('click',t)})();
</script>
{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  },

  // ========================================================
  // THEME 4: Bento Grid (Linear / Modern Modular Architecture)
  // ========================================================
  {
    id: 4,
    nameKey: 'theme.4',
    icon: 'fas fa-table-cells-large',
    description: 'Modern Bento Grid cards layout with stats, tech stack, interactive modules',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · Bento</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0b0f19;
  --card:#111827;
  --card-border:rgba(255,255,255,0.08);
  --fg:#f9fafb;
  --fg2:#9ca3af;
  --accent:{{colors.primary}};
  --accent-light:{{colors.accent}};
  --font:'Plus Jakarta Sans','Cairo',sans-serif;
}
body{
  background:var(--bg);color:var(--fg);
  font-family:var(--font);line-height:1.6;padding:2.5rem 1rem;
}
.bento-container{max-width:1100px;margin:0 auto}
.bento-grid{
  display:grid;grid-template-columns:repeat(12,1fr);
  gap:1.25rem;
}
.bento-card{
  background:var(--card);border:1px solid var(--card-border);
  border-radius:18px;padding:1.75rem;position:relative;
  overflow:hidden;transition:all .25s ease;
}
.bento-card:hover{border-color:rgba(255,255,255,0.18);transform:translateY(-3px);box-shadow:0 12px 30px rgba(0,0,0,0.4)}
.card-hero{grid-column:span 8}
.card-stats{grid-column:span 4;display:flex;flex-direction:column;justify-content:center;gap:1.25rem}
.card-skills{grid-column:span 7}
.card-socials{grid-column:span 5}
.card-projects{grid-column:span 12}
.card-creds{grid-column:span 12}
.avatar{width:80px;height:80px;border-radius:50%;object-fit:cover;border:2px solid var(--accent);margin-bottom:1rem}
.avatar-fallback{
  width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-light));
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;margin-bottom:1rem;
}
h1{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin-bottom:0.25rem}
.role{font-size:1rem;color:var(--accent);font-weight:700;margin-bottom:0.75rem}
.bio{color:var(--fg2);font-size:0.95rem;max-width:560px}
.stat-box{background:rgba(255,255,255,0.03);padding:1rem 1.25rem;border-radius:12px;border:1px solid rgba(255,255,255,0.05)}
.stat-val{font-size:1.8rem;font-weight:800;color:var(--accent);line-height:1}
.stat-lbl{font-size:0.8rem;color:var(--fg2);margin-top:0.35rem;font-weight:600}
.skills-flow{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1rem}
.skill-chip{
  padding:0.4rem 0.85rem;background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.08);border-radius:8px;
  font-size:0.825rem;font-weight:600;display:inline-flex;align-items:center;gap:0.4rem;
}
.skill-chip i{font-size:0.95rem;color:var(--accent)}
.social-buttons{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;margin-top:1rem}
.bento-social-btn{
  display:flex;align-items:center;gap:0.6rem;padding:0.75rem 1rem;
  background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);
  border-radius:10px;color:var(--fg);text-decoration:none;font-size:0.85rem;font-weight:600;transition:all .2s;
}
.bento-social-btn:hover{background:rgba(255,255,255,0.08);border-color:var(--accent);color:var(--accent)}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.25rem;margin-top:1rem}
.proj-item{
  background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);
  border-radius:12px;padding:1.25rem;transition:all .2s;
}
.proj-item:hover{border-color:var(--accent)}
.proj-item h4{font-size:1.05rem;font-weight:700;margin-bottom:0.4rem}
.proj-item p{font-size:0.85rem;color:var(--fg2);margin-bottom:0.75rem}
.proj-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.75rem}
.proj-tags span{font-size:0.7rem;padding:0.15rem 0.5rem;background:rgba(255,255,255,0.05);border-radius:4px;color:var(--fg2)}
.bento-heading{font-size:1.15rem;font-weight:700;display:flex;align-items:center;gap:0.5rem}
footer{text-align:center;color:var(--fg2);font-size:0.8rem;padding:3rem 0 1rem}
[dir="rtl"] .bento-card{text-align:right}
@media(max-width:960px){
  .card-hero,.card-stats,.card-skills,.card-socials{grid-column:span 12}
}
@media(max-width:640px){
  .social-buttons{grid-template-columns:1fr}
  .proj-grid{grid-template-columns:1fr}
}
</style>
</head>
<body>
<div class="bento-container">
  <div class="bento-grid">
    <!-- Hero Card -->
    <div class="bento-card card-hero"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
      {{#if photo}}
        <img src="{{photo}}" alt="{{name}}" class="avatar">
      {{else}}
        <div class="avatar-fallback">{{initials}}</div>
      {{/if}}
      <h1>{{name}}</h1>
      <div class="role">{{role}}</div>
      {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
      {{#if location}}<div style="color:var(--fg2);font-size:0.85rem;margin-top:0.75rem"><i class="fas fa-location-dot"></i> {{location}}</div>{{/if}}
    </div>

    <!-- Stats Card -->
    <div class="bento-card card-stats"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
      <div class="stat-box">
        <div class="stat-val">{{skills.length}}</div>
        <div class="stat-lbl">{{sectionTitles.skills}}</div>
      </div>
      <div class="stat-box">
        <div class="stat-val">{{projects.length}}</div>
        <div class="stat-lbl">{{sectionTitles.projects}}</div>
      </div>
    </div>

    <!-- Skills Card -->
    {{#if skills.length}}
    <div class="bento-card card-skills"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-microchip text-blue-500"></i> <span>{{sectionTitles.skills}}</span></div>
      <div class="skills-flow">
        {{#each skills}}<div class="skill-chip"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
      </div>
    </div>
    {{/if}}

    <!-- Socials Card -->
    <div class="bento-card card-socials"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-globe text-emerald-500"></i> <span>{{portfolioTexts.title}} Links</span></div>
      <div class="social-buttons">
        {{#each socials}}
        <a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="bento-social-btn">
          <i class="{{this.icon}} text-base"></i>
          <span>{{this.label}}</span>
        </a>
        {{/each}}
      </div>
    </div>

    <!-- Projects Card -->
    {{#if projects.length}}
    <div class="bento-card card-projects"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-folder-open text-amber-500"></i> <span>{{sectionTitles.projects}}</span></div>
      <div class="proj-grid">
        {{#each projects}}
        <div class="proj-item">
          <h4>{{this.name}}</h4>
          <p>{{this.desc}}</p>
          <div class="proj-tags">
            {{#each this.tags}}<span>{{this}}</span>{{/each}}
          </div>
          {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" style="color:var(--accent);font-size:0.825rem;font-weight:700;text-decoration:none">{{portfolioTexts.viewProject}} &rarr;</a>{{/if}}
        </div>
        {{/each}}
      </div>
    </div>
    {{/if}}

    <!-- Credentials Card -->
    {{#if education.length}}
    <div class="bento-card card-creds"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-graduation-cap text-indigo-500"></i> <span>{{sectionTitles.education}}</span></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:1rem">
        {{#each education}}
        <div style="background:rgba(255,255,255,0.02);padding:1rem;border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
          <div style="font-weight:700">{{this.degree}}</div>
          <div style="color:var(--fg2);font-size:0.85rem">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
        </div>
        {{/each}}
      </div>
    </div>
    {{/if}}

    {{#if contactForm}}
    <div class="bento-card card-projects" style="text-align:center"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading" style="justify-content:center"><i class="fas fa-envelope text-blue-500"></i> <span>{{sectionTitles.contact}}</span></div>
      <p style="color:var(--fg2);margin:0.5rem 0">{{sectionTitles.contact_sub}}</p>
      {{#if contactEmail}}<a href="mailto:{{contactEmail}}" style="display:inline-block;padding:0.6rem 1.4rem;background:var(--accent);color:#fff;border-radius:10px;font-weight:700;text-decoration:none;margin-top:0.5rem">{{contactEmail}}</a>{{/if}}
    </div>
    {{/if}}
  </div>

  <footer>
    <p>{{name}} · {{year}} // Bento Design System</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  },

  // ========================================================
  // THEME 5: Glassmorphic (Frosted Aurora)
  // ========================================================
  {
    id: 5,
    nameKey: 'theme.5',
    icon: 'fas fa-wand-magic-sparkles',
    description: 'Vibrant frosted glass aesthetics, glowing aura gradients, luminous depth',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · Glass</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  min-height:100vh;
  background:radial-gradient(circle at 10% 20%, #1e1b4b 0%, #0f172a 50%, #030712 100%);
  color:#f8fafc;
  font-family:'Space Grotesk','Cairo',sans-serif;
  line-height:1.6;
  position:relative;
  overflow-x:hidden;
  padding:3rem 1.5rem;
}
.orb{
  position:fixed;border-radius:50%;filter:blur(100px);z-index:0;pointer-events:none;
}
.orb-1{top:-10%;left:15%;width:450px;height:450px;background:rgba(99,102,241,0.25)}
.orb-2{bottom:5%;right:10%;width:500px;height:500px;background:rgba(236,72,153,0.2)}
.container{position:relative;z-index:1;max-width:880px;margin:0 auto}
.glass-panel{
  background:rgba(255,255,255,{{glassmorphism.opacity}});
  backdrop-filter:blur({{glassmorphism.blur}}px);
  -webkit-backdrop-filter:blur({{glassmorphism.blur}}px);
  border:1px solid rgba(255,255,255,0.18);
  border-radius:{{glassmorphism.radius}}px;
  box-shadow:0 20px 50px rgba(0,0,0,0.3);
  padding:2.25rem;margin-bottom:2rem;
}
.avatar{width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.4);margin-bottom:1rem}
.avatar-fallback{
  width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#ec4899);
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:700;margin-bottom:1rem;
}
h1{font-size:clamp(2rem,5vw,3rem);font-weight:700;line-height:1.15;margin-bottom:0.25rem}
.role{font-size:1.1rem;color:#a5b4fc;font-weight:600;margin-bottom:0.75rem}
.bio{color:#cbd5e1;font-size:1rem;max-width:600px;margin-bottom:1.5rem}
.socials{display:flex;flex-wrap:wrap;gap:0.75rem}
.social-btn{
  width:2.5rem;height:2.5rem;border-radius:50%;
  background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
  color:#fff;display:flex;align-items:center;justify-content:center;
  text-decoration:none;transition:all .2s;
}
.social-btn:hover{background:rgba(255,255,255,0.25);transform:scale(1.1)}
.section-title{font-size:1.3rem;font-weight:700;margin-bottom:1.25rem;display:flex;align-items:center;gap:0.5rem;color:#f1f5f9}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.5rem}
.skill-tag{
  padding:0.4rem 0.9rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);
  border-radius:9999px;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;
}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem}
.project-card{
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
  border-radius:14px;padding:1.25rem;transition:all .2s;
}
.project-card:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3);transform:translateY(-3px)}
.project-card h4{font-size:1.1rem;font-weight:600;margin-bottom:0.35rem}
.project-card p{font-size:0.85rem;color:#cbd5e1;margin-bottom:0.75rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.75rem}
.project-tags span{font-size:0.7rem;padding:0.15rem 0.5rem;background:rgba(255,255,255,0.1);border-radius:4px}
.project-link{color:#a5b4fc;font-size:0.85rem;font-weight:600;text-decoration:none}
footer{text-align:center;color:#94a3b8;font-size:0.8rem;padding:2rem 0}
[dir="rtl"] .glass-panel{text-align:right}
[dir="rtl"] .socials{justify-content:flex-start}
</style>
</head>
<body>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="container">
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    {{#if photo}}
      <img src="{{photo}}" alt="{{name}}" class="avatar">
    {{else}}
      <div class="avatar-fallback">{{initials}}</div>
    {{/if}}
    <h1>{{name}}</h1>
    <div class="role">{{role}}</div>
    {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
    <div class="socials">
      {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-btn" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
    </div>
  </div>

  {{#if skills.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-sparkles text-indigo-400"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-cubes text-pink-400"></i> <span>{{sectionTitles.projects}}</span></h2>
    <div class="projects-grid">
      {{#each projects}}
      <div class="project-card">
        <h4>{{this.name}}</h4>
        <p>{{this.desc}}</p>
        <div class="project-tags">
          {{#each this.tags}}<span>{{this}}</span>{{/each}}
        </div>
        {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">{{portfolioTexts.viewProject}} &rarr;</a>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-graduation-cap"></i> <span>{{sectionTitles.education}}</span></h2>
    <div style="display:flex;flex-direction:column;gap:1rem">
      {{#each education}}
      <div>
        <div style="font-weight:600">{{this.degree}}</div>
        <div style="font-size:0.85rem;color:#cbd5e1">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="glass-panel" style="text-align:center"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title" style="justify-content:center"><i class="fas fa-paper-plane text-indigo-300"></i> <span>{{sectionTitles.contact}}</span></h2>
    <p style="color:#cbd5e1;font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.75rem"><a href="mailto:{{contactEmail}}" style="display:inline-block;padding:0.6rem 1.4rem;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:9999px;color:#fff;text-decoration:none;font-weight:600">{{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}}</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  },

  // ========================================================
  // THEME 6: Dark Premium (Midnight Obsidian & Neon Glow)
  // ========================================================
  {
    id: 6,
    nameKey: 'theme.6',
    icon: 'fas fa-shield-cat',
    description: 'High-contrast midnight dark theme with subtle grid pattern and sleek neon accents',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · Developer</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  background:#090a0f;
  background-image:linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size:36px 36px;
  color:#f1f5f9;
  font-family:'Space Grotesk','Cairo',sans-serif;
  line-height:1.6;padding:3rem 1.5rem;
}
.container{max-width:920px;margin:0 auto}
.hero{padding:4rem 0 3rem;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08)}
.avatar{width:110px;height:110px;border-radius:50%;object-fit:cover;border:3px solid {{colors.primary}};box-shadow:0 0 25px {{colors.primary}}44;margin:0 auto 1.5rem}
.avatar-fallback{
  width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,{{colors.primary}},{{colors.accent}});
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:700;
  border:3px solid {{colors.primary}};box-shadow:0 0 25px {{colors.primary}}44;margin:0 auto 1.5rem;
}
h1{font-size:clamp(2.2rem,6vw,3.5rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:0.5rem}
.role{font-size:1.15rem;color:{{colors.primary}};font-weight:600;margin-bottom:1rem}
.bio{color:#94a3b8;font-size:1.05rem;max-width:620px;margin:0 auto 1.5rem}
.socials{display:flex;justify-content:center;gap:0.75rem;flex-wrap:wrap}
.social-link{
  width:2.5rem;height:2.5rem;border-radius:50%;background:#131722;
  border:1px solid rgba(255,255,255,0.08);color:#94a3b8;
  display:flex;align-items:center;justify-content:center;text-decoration:none;transition:all .2s;
}
.social-link:hover{color:{{colors.primary}};border-color:{{colors.primary}};transform:translateY(-2px)}
.section{padding:3rem 0;border-bottom:1px solid rgba(255,255,255,0.08)}
.section-title{font-size:1.4rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem;color:#f8fafc}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.6rem}
.skill-tag{
  padding:0.45rem 1rem;background:#131722;border:1px solid rgba(255,255,255,0.08);
  border-radius:8px;font-size:0.85rem;color:#e2e8f0;display:inline-flex;align-items:center;gap:0.5rem;
}
.skill-tag i{font-size:1rem}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1.25rem}
.project-card{
  background:#131722;border:1px solid rgba(255,255,255,0.08);
  border-radius:12px;padding:1.5rem;transition:all .25s;
}
.project-card:hover{border-color:{{colors.primary}};transform:translateY(-3px);box-shadow:0 10px 25px rgba(0,0,0,0.5)}
.project-card h4{font-size:1.15rem;margin-bottom:0.4rem}
.project-card p{color:#94a3b8;font-size:0.875rem;margin-bottom:1rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem}
.project-tags span{font-size:0.75rem;padding:0.2rem 0.6rem;background:rgba(255,255,255,0.05);border-radius:4px;color:#94a3b8}
.project-link{color:{{colors.primary}};font-size:0.875rem;font-weight:600;text-decoration:none}
footer{text-align:center;padding:3rem 0;color:#64748b;font-size:0.85rem}
[dir="rtl"] .hero,[dir="rtl"] .section{text-align:right}
[dir="rtl"] .socials{justify-content:flex-start}
</style>
</head>
<body>
<div class="container">
  <header class="hero"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    {{#if photo}}
      <img src="{{photo}}" alt="{{name}}" class="avatar">
    {{else}}
      <div class="avatar-fallback">{{initials}}</div>
    {{/if}}
    <h1>{{name}}</h1>
    <div class="role">{{role}}</div>
    {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
    <div class="socials">
      {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
    </div>
  </header>

  {{#if skills.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-layer-group" style="color:{{colors.primary}}"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-terminal" style="color:{{colors.primary}}"></i> <span>{{sectionTitles.projects}}</span></h2>
    <div class="projects-grid">
      {{#each projects}}
      <div class="project-card">
        <h4>{{this.name}}</h4>
        <p>{{this.desc}}</p>
        <div class="project-tags">
          {{#each this.tags}}<span>{{this}}</span>{{/each}}
        </div>
        {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">{{portfolioTexts.viewProject}} &rarr;</a>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-graduation-cap"></i> <span>{{sectionTitles.education}}</span></h2>
    <div style="display:flex;flex-direction:column;gap:1rem">
      {{#each education}}
      <div style="background:#131722;padding:1.25rem;border-radius:10px;border:1px solid rgba(255,255,255,0.06)">
        <div style="font-weight:700">{{this.degree}}</div>
        <div style="color:#94a3b8;font-size:0.85rem">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if bugbounty.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-shield-halved" style="color:{{colors.primary}}"></i> <span>{{sectionTitles.bugbounty}}</span></h2>
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      {{#each bugbounty}}
      <div style="background:#131722;padding:0.6rem 1rem;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:0.85rem">
        <i class="fas fa-bug" style="color:{{colors.primary}}"></i> <strong>{{this.platform}}</strong> / {{this.username}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section" style="text-align:center"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title" style="justify-content:center"><i class="fas fa-paper-plane" style="color:{{colors.primary}}"></i> <span>{{sectionTitles.contact}}</span></h2>
    <p style="color:#94a3b8;font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:1rem"><a href="mailto:{{contactEmail}}" style="display:inline-block;padding:0.65rem 1.5rem;background:{{colors.primary}};color:#fff;border-radius:8px;font-weight:700;text-decoration:none">{{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} // Midnight Dark System</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  },

  // ========================================================
  // THEME 7: Academic (Scholar / Researcher CV Format)
  // ========================================================
  {
    id: 7,
    nameKey: 'theme.7',
    icon: 'fas fa-graduation-cap',
    description: 'Clean scholarly resume format for researchers, academics, and engineers',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · {{portfolioTexts.titleAcademic}}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  background:#fff;color:#1e293b;
  font-family:'Inter','Cairo',sans-serif;line-height:1.7;padding:3rem 1.5rem;
}
.academic-wrap{max-width:820px;margin:0 auto}
.header{
  display:flex;align-items:flex-start;justify-content:space-between;
  gap:2rem;border-bottom:2px solid #0f172a;padding-bottom:2rem;margin-bottom:2.5rem;
}
.header-info{flex:1}
.name{font-family:'Crimson Pro','Cairo',serif;font-size:2.8rem;font-weight:700;line-height:1.1;color:#0f172a;margin-bottom:0.25rem}
.role{font-size:1.15rem;font-weight:600;color:#2563eb;margin-bottom:0.75rem}
.meta-line{font-size:0.875rem;color:#64748b;margin-bottom:0.25rem;display:flex;gap:1.5rem;flex-wrap:wrap}
.bio{margin-top:1rem;color:#334155;font-size:0.975rem}
.avatar{width:110px;height:110px;border-radius:8px;object-fit:cover;border:1px solid #cbd5e1}
.avatar-fallback{
  width:110px;height:110px;border-radius:8px;background:#f1f5f9;
  border:1px solid #cbd5e1;display:flex;align-items:center;justify-content:center;
  font-family:'Crimson Pro',serif;font-size:2.5rem;font-weight:700;color:#0f172a;
}
.social-bar{display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:1rem}
.social-link{color:#475569;font-size:1.1rem;text-decoration:none;transition:color .2s}
.social-link:hover{color:#2563eb}
.section{margin-bottom:2.5rem}
.section-title{
  font-family:'Crimson Pro','Cairo',serif;font-size:1.5rem;font-weight:700;
  color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:0.4rem;margin-bottom:1.25rem;
}
.timeline{display:flex;flex-direction:column;gap:1.25rem}
.timeline-item{padding-left:1rem;border-left:2px solid #2563eb}
.timeline-item h4{font-size:1.05rem;font-weight:600;color:#0f172a}
.timeline-item .sub{font-size:0.875rem;color:#64748b}
.skills-list{display:flex;flex-wrap:wrap;gap:0.5rem}
.skill-item{padding:0.3rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;font-size:0.825rem;color:#334155;display:inline-flex;align-items:center;gap:0.4rem}
.pub-item{margin-bottom:1.25rem}
.pub-title{font-weight:600;font-size:1rem;color:#0f172a}
.pub-desc{font-size:0.875rem;color:#475569}
.pub-link{color:#2563eb;font-size:0.825rem;text-decoration:none;font-weight:600}
footer{border-top:1px solid #e2e8f0;padding-top:2rem;text-align:center;color:#94a3b8;font-size:0.8rem}
[dir="rtl"] .header{flex-direction:row-reverse;text-align:right}
[dir="rtl"] .timeline-item{padding-left:0;padding-right:1rem;border-left:none;border-right:2px solid #2563eb}
[dir="rtl"] .meta-line{justify-content:flex-start}
[dir="rtl"] .social-bar{justify-content:flex-start}
[dir="rtl"] .section{text-align:right}
@media(max-width:640px){.header{flex-direction:column;align-items:center;text-align:center}}
</style>
</head>
<body>
<div class="academic-wrap">
  <header class="header"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    <div class="header-info">
      <h1 class="name">{{name}}</h1>
      <div class="role">{{role}}</div>
      <div class="meta-line">
        {{#if email}}<span><i class="fas fa-envelope"></i> {{email}}</span>{{/if}}
        {{#if location}}<span><i class="fas fa-location-dot"></i> {{location}}</span>{{/if}}
      </div>
      {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
      <div class="social-bar">
        {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
      </div>
    </div>
    {{#if photo}}
      <img src="{{photo}}" alt="{{name}}" class="avatar">
    {{else}}
      <div class="avatar-fallback">{{initials}}</div>
    {{/if}}
  </header>

  {{#if education.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.education}}</h2>
    <div class="timeline">
      {{#each education}}
      <div class="timeline-item">
        <h4>{{this.degree}}</h4>
        <div class="sub">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if skills.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.skills}}</h2>
    <div class="skills-list">
      {{#each skills}}<div class="skill-item"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.projects}}</h2>
    <div>
      {{#each projects}}
      <div class="pub-item">
        <div class="pub-title">{{this.name}}</div>
        <div class="pub-desc">{{this.desc}}</div>
        {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="pub-link">[ {{portfolioTexts.viewProject}} &rarr; ]</a>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if bugbounty.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.bugbounty}}</h2>
    <div class="skills-list">
      {{#each bugbounty}}<div class="skill-item"><i class="fas fa-shield-halved"></i> {{this.platform}}: {{this.username}}</div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title">{{sectionTitles.contact}}</h2>
    <p style="color:#475569;font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.5rem"><a href="mailto:{{contactEmail}}" class="pub-link">{{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} · Curriculum Vitae</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  }
];

/**
 * Extensible Dynamic Theme Registry
 * Allows third-party themes, modular plugins, and dynamic template extensions
 */
const ThemeRegistry = {
  _themes: new Map(),

  register(theme) {
    if (!theme || !theme.id) {
      console.warn('Invalid theme definition:', theme);
      return;
    }
    this._themes.set(Number(theme.id), theme);
  },

  get(id) {
    const numericId = parseInt(id, 10);
    return this._themes.get(numericId) || this._themes.get(3) || Array.from(this._themes.values())[0];
  },

  getAll() {
    return Array.from(this._themes.values());
  },

  has(id) {
    return this._themes.has(Number(id));
  }
};

// Register default themes into registry
THEMES.forEach(t => ThemeRegistry.register(t));

if (typeof window !== 'undefined') {
  window.ThemeRegistry = ThemeRegistry;
  window.THEMES = THEMES;
} else if (typeof globalThis !== 'undefined') {
  globalThis.ThemeRegistry = ThemeRegistry;
  globalThis.THEMES = THEMES;
}

/**
 * Public accessor for current active theme
 */
function getTheme(id) {
  return ThemeRegistry.get(id);
}

