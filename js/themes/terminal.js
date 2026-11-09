/* =============================================
   js/themes/terminal.js — Theme 2: Terminal (Hacker CLI & Matrix Particle Console)
   Universal Portfolio Generator — Elite Edition
   ============================================= */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    const theme = factory();
    if (root.ThemeRegistry && typeof root.ThemeRegistry.register === "function") {
      root.ThemeRegistry.register(theme);
    } else {
      root.__PENDING_THEMES__ = root.__PENDING_THEMES__ || [];
      root.__PENDING_THEMES__.push(theme);
    }
    root.themeTerminal = theme;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  return {
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
  };
});
