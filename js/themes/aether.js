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
  };
});
