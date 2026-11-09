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
    description: 'Mac/Linux window bar with traffic dots, phosphor terminal glow, realistic prompt simulator, matrix particles & Cairo RTL',
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
  --bg:#06080d;
  --fg:#e2e8f0;
  --muted:#94a3b8;
  --accent:#00ff88;
  --accent-glow:rgba(0,255,136,0.22);
  --accent2:#38bdf8;
  --card:rgba(13,17,26,0.92);
  --border:rgba(0,255,136,0.24);
  --font:'Fira Code','Cairo',monospace;
}
body{
  background:var(--bg);
  background-image:radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,136,0.09), transparent 70%);
  color:var(--fg);
  font-family:var(--font);line-height:1.65;
  overflow-x:hidden;
}
#particles-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}
.container{position:relative;z-index:1;max-width:940px;margin:0 auto;padding:2.5rem 1.25rem}
.term-window{
  background:var(--card);border:1px solid var(--border);
  border-radius:14px;
  box-shadow:0 24px 60px rgba(0,0,0,0.78),0 0 35px rgba(0,255,136,0.12),inset 0 1px 0 rgba(255,255,255,0.08);
  overflow:hidden;margin-bottom:2.25rem;
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
}
.term-header{
  background:linear-gradient(180deg,#1a1f2e 0%,#131722 100%);
  padding:0.75rem 1.15rem;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid rgba(0,255,136,0.14);
}
.term-dots{display:flex;gap:8px;align-items:center}
.dot{width:12px;height:12px;border-radius:50%;display:inline-block}
.dot-red{background:#ff5f56;box-shadow:0 0 8px rgba(255,95,86,0.5)}
.dot-amber{background:#ffbd2e;box-shadow:0 0 8px rgba(255,189,46,0.5)}
.dot-green{background:#27c93f;box-shadow:0 0 8px rgba(39,201,63,0.5)}
.term-title{font-size:0.78rem;color:#94a3b8;font-weight:600;display:flex;align-items:center;gap:0.45rem}
.term-badge{font-size:0.68rem;padding:0.15rem 0.55rem;border-radius:9999px;background:rgba(0,255,136,0.1);color:var(--accent);border:1px solid rgba(0,255,136,0.28)}
.term-body{padding:1.75rem}
.prompt-line{color:#94a3b8;font-size:0.85rem;margin-bottom:1.15rem;display:flex;flex-wrap:wrap;align-items:center;gap:0.35rem}
.prompt-user{color:var(--accent);font-weight:700;text-shadow:0 0 10px var(--accent-glow)}
.prompt-host{color:var(--accent2);font-weight:600}
.prompt-cmd{color:#fff;font-weight:500}
.cursor{display:inline-block;width:8px;height:15px;background:var(--accent);vertical-align:middle;animation:blink 1s step-end infinite;box-shadow:0 0 8px var(--accent)}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.header-row{display:flex;align-items:center;gap:1.5rem;margin-bottom:1.25rem}
.avatar{width:96px;height:96px;border-radius:12px;object-fit:cover;border:2px solid var(--accent);box-shadow:0 0 22px var(--accent-glow)}
.avatar-fallback{
  width:96px;height:96px;border-radius:12px;
  background:#151b28;border:2px solid var(--accent);
  box-shadow:0 0 22px var(--accent-glow);
  display:flex;align-items:center;justify-content:center;
  font-size:2.1rem;font-weight:700;color:var(--accent);
}
h1{font-size:clamp(1.75rem,4vw,2.5rem);color:#fff;margin-bottom:0.2rem;text-shadow:0 0 18px rgba(0,255,136,0.22)}
.role{color:var(--accent);font-size:0.95rem;font-weight:600}
.bio{color:var(--muted);font-size:0.92rem;margin:0.85rem 0;padding:0.75rem 1rem;background:rgba(0,255,136,0.03);border-left:2px solid var(--accent);border-radius:0 8px 8px 0}
.socials{display:flex;flex-wrap:wrap;gap:0.55rem;margin-top:1rem}
.social-link{
  display:inline-flex;align-items:center;gap:0.45rem;padding:0.4rem 0.85rem;
  background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);
  border-radius:6px;color:#cbd5e1;text-decoration:none;font-size:0.8rem;transition:all .2s;
}
.social-link:hover{color:var(--accent);border-color:var(--accent);background:rgba(0,255,136,0.08);box-shadow:0 0 14px var(--accent-glow)}
.section{margin:2.25rem 0}
.section-title{
  color:var(--accent);font-size:1.05rem;margin-bottom:1rem;
  display:flex;align-items:center;gap:0.5rem;
  text-shadow:0 0 12px var(--accent-glow);
}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.55rem}
.skill-chip{
  padding:0.4rem 0.85rem;background:rgba(0,255,136,0.06);
  border:1px solid rgba(0,255,136,0.24);border-radius:6px;
  font-size:0.82rem;color:#f1f5f9;display:inline-flex;align-items:center;gap:0.45rem;
  transition:all .2s;
}
.skill-chip:hover{border-color:var(--accent);box-shadow:0 0 12px var(--accent-glow);transform:translateY(-2px)}
.skill-chip i{font-size:0.95rem;color:var(--accent)}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:1.1rem}
.project-card{
  background:rgba(17,22,34,0.88);border:1px solid rgba(255,255,255,0.08);
  border-radius:10px;padding:1.35rem;transition:all .22s ease;
  display:flex;flex-direction:column;justify-content:space-between;
}
.project-card:hover{border-color:var(--accent);box-shadow:0 10px 28px rgba(0,0,0,0.5),0 0 16px var(--accent-glow);transform:translateY(-3px)}
.project-card h3{color:#fff;font-size:1.05rem;margin-bottom:0.4rem}
.project-card p{color:var(--muted);font-size:0.84rem;margin-bottom:0.85rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.85rem}
.project-tags span{font-size:0.72rem;color:var(--accent2);background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);padding:0.15rem 0.5rem;border-radius:4px}
.project-link{color:var(--accent);font-size:0.82rem;text-decoration:none;font-weight:600}
.project-link:hover{text-decoration:underline}
.edu-row{padding:0.85rem 1rem;background:rgba(17,22,34,0.75);border-left:2px solid var(--accent2);border-radius:0 8px 8px 0;margin-bottom:0.65rem}
.edu-row h4{color:#fff;font-size:0.95rem}
.edu-row .meta{color:var(--muted);font-size:0.8rem}
.bb-list{display:flex;flex-wrap:wrap;gap:0.6rem}
.bb-chip{padding:0.45rem 0.9rem;background:#121723;border:1px solid rgba(0,255,136,0.28);border-radius:6px;font-size:0.82rem;color:#e5e7eb}
.cli-sim{
  margin-top:1.5rem;padding-top:1rem;border-top:1px dashed rgba(255,255,255,0.1);
}
.cli-pills{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.65rem}
.cli-pill{
  font-family:var(--font);font-size:0.72rem;padding:0.2rem 0.6rem;
  border-radius:4px;background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);
  color:var(--accent);cursor:pointer;transition:all .15s;
}
.cli-pill:hover{background:rgba(0,255,136,0.18)}
.cli-output{font-size:0.8rem;color:#cbd5e1;margin-top:0.5rem;min-height:1.3rem}
footer{text-align:center;color:#64748b;font-size:0.78rem;padding:2rem 0;border-top:1px solid rgba(255,255,255,0.06);margin-top:3rem}

/* Cairo Arabic RTL Cascade */
[dir="rtl"],[dir="rtl"] body,[dir="rtl"] h1,[dir="rtl"] .section-title,[dir="rtl"] .project-card h3{
  font-family:'Cairo','Fira Code',monospace;
}
[dir="rtl"] .term-window,[dir="rtl"] .section{text-align:right}
[dir="rtl"] .bio{border-left:none;border-right:2px solid var(--accent);border-radius:8px 0 0 8px}
[dir="rtl"] .edu-row{border-left:none;border-right:2px solid var(--accent2);border-radius:8px 0 0 8px}
[dir="rtl"] .socials{justify-content:flex-start}
@media(max-width:640px){
  .header-row{flex-direction:column;text-align:center}
  .socials,[dir="rtl"] .socials{justify-content:center}
}
</style>
</head>
<body>
<canvas id="particles-canvas"></canvas>
<div class="container">
  <div class="term-window">
    <div class="term-header">
      <div class="term-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-amber"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="term-title"><i class="fas fa-terminal" style="color:var(--accent)"></i> zsh · {{slug}}@dev: ~/portfolio</span>
      <span class="term-badge">TTY · 01</span>
    </div>
    <div class="term-body">
      <div class="prompt-line">
        <span class="prompt-user">visitor</span>@<span class="prompt-host">{{slug}}</span>:~$
        <span class="prompt-cmd">neofetch --profile</span>
        <span class="cursor"></span>
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
          {{#if location}}<div style="color:var(--muted);font-size:0.82rem;margin-top:0.25rem"><i class="fas fa-location-dot" style="color:var(--accent)"></i> {{location}}</div>{{/if}}
        </div>
      </div>
      {{#if bio}}<p class="bio">/* {{bio}} */</p>{{/if}}
      <div class="socials">
        {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="{{this.icon}}"></i><span>{{this.label}}</span></a>{{/each}}
      </div>

      <!-- Realistic Interactive Prompt Simulator -->
      <div class="cli-sim">
        <div class="cli-pills">
          <button type="button" class="cli-pill" onclick="runCmd('whoami')">$ whoami</button>
          <button type="button" class="cli-pill" onclick="runCmd('skills')">$ ls skills/</button>
          <button type="button" class="cli-pill" onclick="runCmd('uptime')">$ uptime</button>
        </div>
        <div id="cli-output" class="cli-output">&gt; Ready. Click a command above to inspect environment.</div>
      </div>
    </div>
  </div>

  {{#if skills.length}}
  <div class="section">
    <h2 class="section-title"><span>$ ls -la ./skills/</span> <span>— {{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-chip"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section">
    <h2 class="section-title"><span>$ git log --oneline</span> <span>— {{sectionTitles.projects}}</span></h2>
    <div class="projects-grid">
      {{#each projects}}
      <div class="project-card">
        <div>
          <h3>{{this.name}}</h3>
          <p>{{this.desc}}</p>
        </div>
        <div>
          <div class="project-tags">
            {{#each this.tags}}<span>#{{this}}</span>{{/each}}
          </div>
          {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">[ {{../portfolioTexts.viewProject}} &rarr; ]</a>{{/if}}
        </div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education.length}}
  <div class="section">
    <h2 class="section-title"><span>$ cat ./credentials.log</span> <span>— {{sectionTitles.education}}</span></h2>
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
    <h2 class="section-title"><span>$ ./audit --security</span> <span>— {{sectionTitles.bugbounty}}</span></h2>
    <div class="bb-list">
      {{#each bugbounty}}<div class="bb-chip"><i class="fas fa-bug" style="color:var(--accent)"></i> {{this.platform}} / {{this.username}}</div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section">
    <h2 class="section-title"><span>$ mail -s "Hello"</span> <span>— {{sectionTitles.contact}}</span></h2>
    <p style="color:var(--muted);font-size:0.86rem">// {{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.65rem"><a href="mailto:{{contactEmail}}" style="color:var(--accent);text-decoration:none;font-weight:600">&gt; echo "Hello {{name}}" | mail {{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} // session: active (0 errors)</p>
  </footer>
</div>

<script>
function runCmd(cmd){
  const out=document.getElementById('cli-output');
  if(!out)return;
  const responses={
    whoami:'> user: {{name}} ({{role}}) · status: online',
    skills:'> loaded {{skills.length}} modules into runtime memory',
    uptime:'> system uptime: 99.998% · {{projects.length}} active repositories'
  };
  out.textContent=responses[cmd]||'> command executed.';
}
const c=document.getElementById('particles-canvas'),ctx=c.getContext('2d');
let w,h,mouse={x:0,y:0};
function resize(){w=c.width=innerWidth;h=c.height=innerHeight}
resize();window.addEventListener('resize',resize);
document.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
const particles=Array.from({length:55},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.55,vy:(Math.random()-0.5)*0.55,size:Math.random()*2+1}));
function anim(){ctx.clearRect(0,0,w,h);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=mouse.x-p.x,dy=mouse.y-p.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle='rgba(0,255,136,'+(0.2-dist/700)+')';ctx.stroke()}ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle='rgba(0,255,136,0.65)';ctx.fill()});requestAnimationFrame(anim)}
anim();
</script>
</body>
</html>`)(data)
  };
});
