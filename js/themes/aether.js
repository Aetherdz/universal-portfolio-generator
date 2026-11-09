/* =============================================
   js/themes/aether.js — Theme 1: Aether (Futuristic Cyberpunk & Particle Universe)
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
    root.themeAether = theme;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  return {
    id: 1,
    nameKey: 'theme.1',
    icon: 'fas fa-atom',
    description: 'Pixel-perfect Aether — glowing hero typography, interactive particles network, neon badges, dark/light toggle & Cairo RTL',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · {{portfolioTexts.title}}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Righteous&family=Space+Grotesk:wght@400;500;600;700&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#05070d;
  --fg:#f1f5f9;
  --fg2:rgba(241,245,249,0.75);
  --fg3:rgba(241,245,249,0.48);
  --primary:{{colors.primary}};
  --accent:#00ffaa;
  --accent-glow:rgba(0,255,170,0.32);
  --card-bg:rgba(15,23,42,0.65);
  --card-border:rgba(0,255,170,0.14);
  --font-display:'Righteous','Space Grotesk','Cairo',sans-serif;
  --font-body:'Space Grotesk','Cairo',sans-serif;
}
.light{
  --bg:#f8fafc;
  --fg:#0f172a;
  --fg2:rgba(15,23,42,0.78);
  --fg3:rgba(15,23,42,0.52);
  --accent:#059669;
  --accent-glow:rgba(5,150,105,0.22);
  --card-bg:rgba(255,255,255,0.88);
  --card-border:rgba(5,150,105,0.18);
}
body{
  background:var(--bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -15%, rgba(0,255,170,0.14), transparent 70%),
    radial-gradient(ellipse 60% 45% at 85% 20%, rgba(59,130,246,0.12), transparent 65%);
  color:var(--fg);
  font-family:var(--font-body);
  line-height:1.65;
  overflow-x:hidden;
  transition:background .3s ease,color .3s ease;
}
#particles-js{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}
.theme-btn{
  position:fixed;top:1.25rem;right:1.25rem;z-index:100;
  width:2.75rem;height:2.75rem;border-radius:50%;
  border:1px solid var(--card-border);background:var(--card-bg);
  color:var(--fg);cursor:pointer;display:flex;align-items:center;
  justify-content:center;font-size:1.05rem;backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  box-shadow:0 0 20px rgba(0,0,0,0.3);
  transition:all .25s ease;
}
.theme-btn:hover{color:var(--accent);border-color:var(--accent);box-shadow:0 0 20px var(--accent-glow);transform:scale(1.08)}
.container{position:relative;z-index:1;max-width:1000px;margin:0 auto;padding:3.5rem 1.5rem}
.hero{display:flex;align-items:center;gap:2.75rem;min-height:56vh;padding:2.5rem 0}
.avatar-wrap{position:relative;flex-shrink:0}
.avatar-wrap::after{
  content:'';position:absolute;inset:-6px;border-radius:50%;
  background:conic-gradient(from 0deg,var(--accent),var(--primary),var(--accent));
  z-index:-1;filter:blur(12px);opacity:0.65;
}
.avatar{
  width:min(165px,38vw);height:min(165px,38vw);border-radius:50%;
  object-fit:cover;border:3px solid var(--accent);
  box-shadow:0 0 32px var(--accent-glow);
  display:block;
}
.avatar-fallback{
  width:min(165px,38vw);height:min(165px,38vw);border-radius:50%;
  background:linear-gradient(135deg,var(--primary),var(--accent));
  color:#05070d;display:flex;align-items:center;justify-content:center;
  font-family:var(--font-display);font-size:3.1rem;font-weight:800;
  border:3px solid var(--accent);box-shadow:0 0 32px var(--accent-glow);
}
.hero-text{flex:1;min-width:280px}
.name{
  font-family:var(--font-display);
  font-size:clamp(2.35rem,5.5vw,4rem);
  line-height:1.08;
  margin-bottom:0.6rem;
  background:linear-gradient(135deg,var(--fg) 20%,var(--accent) 70%,var(--primary) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 0 24px var(--accent-glow));
  letter-spacing:-0.01em;
}
.badges-row{display:flex;flex-wrap:wrap;align-items:center;gap:0.6rem;margin-bottom:1rem}
.role-badge{
  display:inline-flex;align-items:center;gap:0.45rem;
  padding:0.35rem 1rem;border-radius:9999px;
  background:rgba(0,255,170,0.12);color:var(--accent);
  font-size:0.875rem;font-weight:700;
  border:1px solid rgba(0,255,170,0.35);
  box-shadow:0 0 18px rgba(0,255,170,0.18),inset 0 0 8px rgba(0,255,170,0.08);
}
.role-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}
.meta-badge{
  display:inline-flex;align-items:center;gap:0.4rem;
  padding:0.3rem 0.85rem;border-radius:9999px;
  background:var(--card-bg);color:var(--fg2);
  font-size:0.8rem;font-weight:500;
  border:1px solid var(--card-border);
}
.bio{font-size:1.06rem;color:var(--fg2);max-width:640px;margin-bottom:1.4rem;line-height:1.7}
.socials{display:flex;flex-wrap:wrap;gap:0.75rem}
.social-link{
  width:2.65rem;height:2.65rem;border-radius:50%;
  background:var(--card-bg);border:1px solid var(--card-border);
  color:var(--fg2);display:flex;align-items:center;justify-content:center;
  font-size:1.1rem;text-decoration:none;transition:all .22s ease;
  backdrop-filter:blur(8px);
}
.social-link:hover{
  color:var(--accent);border-color:var(--accent);
  box-shadow:0 0 18px var(--accent-glow);
  transform:translateY(-3px);
}
.section{margin:3.75rem 0}
.section-title{
  font-family:var(--font-display);font-size:1.55rem;color:var(--accent);
  margin-bottom:1.5rem;display:flex;align-items:center;gap:0.65rem;
  text-shadow:0 0 18px var(--accent-glow);
}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.65rem}
.skill-tag{
  display:inline-flex;align-items:center;gap:0.55rem;padding:0.5rem 1rem;
  background:var(--card-bg);border:1px solid var(--card-border);
  border-radius:10px;font-size:0.875rem;font-weight:600;color:var(--fg);
  backdrop-filter:blur(10px);transition:all .22s ease;
}
.skill-tag i{font-size:1.05rem;color:var(--accent)}
.skill-tag:hover{
  border-color:var(--accent);color:var(--accent);
  box-shadow:0 0 16px var(--accent-glow);
  transform:translateY(-2px);
}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:1.35rem}
.project-card{
  background:var(--card-bg);border:1px solid var(--card-border);
  border-radius:16px;padding:1.55rem;transition:all .28s cubic-bezier(0.16,1,0.3,1);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  display:flex;flex-direction:column;justify-content:space-between;
}
.project-card:hover{
  border-color:var(--accent);transform:translateY(-5px);
  box-shadow:0 16px 35px rgba(0,0,0,0.45),0 0 24px var(--accent-glow);
}
.project-card h3{font-family:var(--font-display);font-size:1.2rem;margin-bottom:0.5rem;color:var(--fg)}
.project-card p{font-size:0.9rem;color:var(--fg2);margin-bottom:1.1rem;line-height:1.6}
.project-tags{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.1rem}
.project-tags span{
  font-size:0.74rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;
  background:rgba(0,255,170,0.1);border:1px solid rgba(0,255,170,0.22);color:var(--accent);
}
.project-link{
  color:var(--accent);font-size:0.875rem;font-weight:700;text-decoration:none;
  display:inline-flex;align-items:center;gap:0.4rem;
}
.project-link:hover{text-decoration:underline;filter:brightness(1.15)}
.timeline{display:flex;flex-direction:column;gap:1rem}
.timeline-item{
  padding:1.15rem 1.35rem;border-left:3px solid var(--accent);
  background:var(--card-bg);border-radius:0 12px 12px 0;
  border-top:1px solid var(--card-border);border-right:1px solid var(--card-border);border-bottom:1px solid var(--card-border);
  backdrop-filter:blur(10px);
}
.timeline-item h4{font-weight:700;font-size:1.02rem;color:var(--fg)}
.timeline-item .meta{font-size:0.85rem;color:var(--fg3);margin-top:0.2rem}
.bb-grid{display:flex;flex-wrap:wrap;gap:0.75rem}
.bb-item{
  padding:0.55rem 1.1rem;background:var(--card-bg);
  border:1px solid rgba(0,255,170,0.28);border-radius:9999px;
  font-size:0.85rem;display:inline-flex;align-items:center;gap:0.5rem;
  box-shadow:0 0 14px rgba(0,255,170,0.12);
}
.bb-item i{color:var(--accent)}
.contact-box{
  background:var(--card-bg);border:1px solid var(--card-border);
  border-radius:18px;padding:2.25rem;text-align:center;
  backdrop-filter:blur(14px);box-shadow:0 0 30px rgba(0,255,170,0.08);
}
.contact-btn{
  display:inline-flex;align-items:center;gap:0.55rem;padding:0.8rem 1.75rem;
  background:var(--accent);color:#05070d;font-weight:800;border-radius:9999px;
  text-decoration:none;margin-top:1.15rem;transition:all .22s ease;
  box-shadow:0 0 24px var(--accent-glow);
}
.contact-btn:hover{filter:brightness(1.1);transform:translateY(-2px) scale(1.02)}
footer{text-align:center;padding:3rem 0 1rem;color:var(--fg3);font-size:0.82rem;border-top:1px solid var(--card-border);margin-top:4rem}

/* Cairo Arabic RTL Cascade */
[dir="rtl"],[dir="rtl"] body,[dir="rtl"] .name,[dir="rtl"] .section-title,[dir="rtl"] .project-card h3{
  font-family:'Cairo','Space Grotesk',sans-serif;
}
[dir="rtl"] .hero{text-align:right}
[dir="rtl"] .timeline-item{
  border-left:1px solid var(--card-border);
  border-right:3px solid var(--accent);
  border-radius:12px 0 0 12px;
}
[dir="rtl"] .socials,[dir="rtl"] .badges-row{justify-content:flex-start}
[dir="rtl"] .theme-btn{right:auto;left:1.25rem}
@media(max-width:768px){
  .hero{flex-direction:column;text-align:center;gap:1.5rem;min-height:auto}
  .socials,.badges-row,[dir="rtl"] .socials,[dir="rtl"] .badges-row{justify-content:center}
  [dir="rtl"] .hero{text-align:center}
}
</style>
</head>
<body>
<button class="theme-btn" id="darkToggle" aria-label="Toggle theme"><i class="fas fa-sun"></i></button>
<div id="particles-js"></div>
<div class="container">
  <section class="hero"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    <div class="avatar-wrap">
      {{#if photo}}
        <img src="{{photo}}" alt="{{name}}" class="avatar">
      {{else}}
        <div class="avatar-fallback">{{initials}}</div>
      {{/if}}
    </div>
    <div class="hero-text">
      <h1 class="name">{{name}}</h1>
      <div class="badges-row">
        <div class="role-badge"><span class="role-dot"></span> <span>{{role}}</span></div>
        {{#if location}}<div class="meta-badge"><i class="fas fa-location-dot" style="color:var(--accent)"></i> <span>{{location}}</span></div>{{/if}}
      </div>
      {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
      <div class="socials">
        {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
      </div>
    </div>
  </section>

  {{#if skills.length}}
  <section class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-bolt"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </section>
  {{/if}}

  {{#if projects.length}}
  <section class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-cubes"></i> <span>{{sectionTitles.projects}}</span></h2>
    <div class="projects-grid">
      {{#each projects}}
      <div class="project-card">
        <div>
          <h3>{{this.name}}</h3>
          <p>{{this.desc}}</p>
        </div>
        <div>
          <div class="project-tags">
            {{#each this.tags}}<span>{{this}}</span>{{/each}}
          </div>
          {{#if this.url}}
          <a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">
            <span>{{../portfolioTexts.viewProject}}</span>
            <i class="fas fa-arrow-up-right-from-square" style="font-size:0.75rem"></i>
          </a>
          {{/if}}
        </div>
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
    <p>{{name}} · {{year}} · Aether Neural Engine</p>
  </footer>
</div>

<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script>
if(typeof particlesJS!=='undefined'){
  particlesJS('particles-js',{particles:{number:{value:55,density:{enable:true,value_area:800}},color:{value:"#00ffaa"},shape:{type:"circle"},opacity:{value:0.5,random:true},size:{value:3,random:true},line_linked:{enable:true,distance:150,color:"#00ffaa",opacity:0.22,width:1},move:{enable:true,speed:1.4}},interactivity:{events:{onhover:{enable:true,mode:"grab"},onclick:{enable:true,mode:"push"},resize:true}},retina_detect:true});
}
(()=>{const b=document.getElementById('darkToggle'),i=b.querySelector('i');const t=()=>{document.documentElement.classList.toggle('light');const isL=document.documentElement.classList.contains('light');i.className=isL?'fas fa-moon':'fas fa-sun';localStorage.setItem('aether-theme',isL?'light':'dark')};if(localStorage.getItem('aether-theme')==='light')t();b.addEventListener('click',t)})();
</script>
{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  };
});
