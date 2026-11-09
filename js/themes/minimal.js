/* =============================================
   js/themes/minimal.js — Theme 3: Minimal (Swiss Typographic Elegance)
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
    root.themeMinimal = theme;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  return {
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
  };
});
