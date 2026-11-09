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
    description: 'Swiss typography, elegant hairline borders, generous whitespace, hover micro-lifts & Cairo RTL',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · {{role}}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family={{fontUrl}}&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#fcfcfc;
  --fg:#09090b;
  --fg2:#52525b;
  --fg3:#71717a;
  --muted:#f4f4f5;
  --accent:{{colors.primary}};
  --border:#e4e4e7;
  --font:'{{fontFamilyCss}}','Cairo',-apple-system,BlinkMacSystemFont,sans-serif;
}
.dark{
  --bg:#09090b;
  --fg:#fafafa;
  --fg2:#a1a1aa;
  --fg3:#71717a;
  --muted:#18181b;
  --border:#27272a;
}
body{
  background:var(--bg);color:var(--fg);
  font-family:var(--font);line-height:1.75;
  transition:background .28s ease,color .28s ease;
  -webkit-font-smoothing:antialiased;
}
.container{max-width:780px;margin:0 auto;padding:4.5rem 1.75rem}
.theme-btn{
  position:fixed;top:1.5rem;right:1.5rem;z-index:50;
  width:2.5rem;height:2.5rem;border-radius:50%;
  border:1px solid var(--border);background:var(--bg);
  color:var(--fg);cursor:pointer;display:flex;align-items:center;
  justify-content:center;transition:all .22s cubic-bezier(0.16,1,0.3,1);
}
.theme-btn:hover{background:var(--muted);transform:translateY(-2px)}
header{padding:2.5rem 0 3.5rem;border-bottom:1px solid var(--border)}
.swiss-kicker{
  font-size:0.72rem;font-weight:700;text-transform:uppercase;
  letter-spacing:0.14em;color:var(--fg3);margin-bottom:1.25rem;
  display:flex;align-items:center;gap:0.75rem;
}
.swiss-kicker::after{content:'';height:1px;width:2.5rem;background:var(--border)}
.avatar{width:92px;height:92px;border-radius:50%;object-fit:cover;margin-bottom:1.5rem;border:1px solid var(--border)}
.avatar-fallback{
  width:92px;height:92px;border-radius:50%;background:var(--fg);
  color:var(--bg);display:flex;align-items:center;justify-content:center;
  font-size:2rem;font-weight:700;margin-bottom:1.5rem;
}
h1{
  font-size:clamp(2.35rem,5.5vw,3.35rem);font-weight:800;
  letter-spacing:-0.04em;line-height:1.08;margin-bottom:0.5rem;
}
.role{font-size:1.15rem;color:var(--accent);font-weight:600;margin-bottom:1rem;letter-spacing:-0.01em}
.bio{font-size:1.08rem;color:var(--fg2);max-width:620px;margin-bottom:1.75rem;line-height:1.75}
.socials{display:flex;flex-wrap:wrap;gap:0.65rem}
.social-link{
  color:var(--fg2);font-size:0.95rem;text-decoration:none;
  width:2.35rem;height:2.35rem;border-radius:50%;
  border:1px solid var(--border);
  transition:all .22s cubic-bezier(0.16,1,0.3,1);
  display:inline-flex;align-items:center;justify-content:center;
}
.social-link:hover{color:var(--accent);border-color:var(--accent);transform:translateY(-3px)}
.section{padding:3.25rem 0;border-bottom:1px solid var(--border)}
.section-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1.75rem}
.section-title{font-size:1.25rem;font-weight:700;letter-spacing:-0.025em}
.section-index{font-size:0.75rem;font-weight:600;color:var(--fg3);letter-spacing:0.08em;text-transform:uppercase}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.55rem}
.skill-tag{
  padding:0.42rem 0.95rem;background:var(--muted);
  border:1px solid var(--border);border-radius:9999px;
  font-size:0.85rem;font-weight:500;display:inline-flex;align-items:center;gap:0.45rem;
  transition:all .22s cubic-bezier(0.16,1,0.3,1);
}
.skill-tag:hover{border-color:var(--accent);transform:translateY(-2px)}
.skill-tag i{font-size:0.95rem;color:var(--accent)}
.projects-list{display:flex;flex-direction:column;gap:1.25rem}
.project-item{
  padding:1.6rem;border:1px solid var(--border);border-radius:14px;
  background:var(--bg);
  transition:all .25s cubic-bezier(0.16,1,0.3,1);
}
.project-item:hover{
  border-color:var(--accent);
  transform:translateY(-3px);
  box-shadow:0 12px 30px -10px rgba(0,0,0,0.08);
}
.project-item h3{font-size:1.15rem;font-weight:700;letter-spacing:-0.015em;margin-bottom:0.35rem}
.project-item p{font-size:0.925rem;color:var(--fg2);margin-bottom:0.9rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.9rem}
.project-tags span{font-size:0.75rem;font-weight:500;padding:0.18rem 0.65rem;background:var(--muted);border:1px solid var(--border);border-radius:9999px;color:var(--fg2)}
.project-link{color:var(--accent);font-size:0.875rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:0.35rem}
.project-link:hover{text-decoration:underline}
.timeline{display:flex;flex-direction:column;gap:1.25rem}
.timeline-item{padding:1rem 1.25rem;border:1px solid var(--border);border-radius:12px;transition:transform .22s ease}
.timeline-item:hover{transform:translateY(-2px);border-color:var(--accent)}
.timeline-item h4{font-size:1rem;font-weight:600}
.timeline-item .meta{font-size:0.85rem;color:var(--fg3)}
.bb-list{display:flex;flex-wrap:wrap;gap:0.55rem}
.bb-badge{padding:0.4rem 0.85rem;background:var(--muted);border:1px solid var(--border);border-radius:9999px;font-size:0.82rem;font-weight:500}
footer{padding:3rem 0 1rem;text-align:center;color:var(--fg3);font-size:0.825rem}

/* Cairo Arabic RTL Cascade */
[dir="rtl"],[dir="rtl"] body,[dir="rtl"] h1,[dir="rtl"] .section-title,[dir="rtl"] .project-item h3{
  font-family:'Cairo','{{fontFamilyCss}}',sans-serif;
}
[dir="rtl"] header,[dir="rtl"] .section{text-align:right}
[dir="rtl"] .socials{justify-content:flex-start}
[dir="rtl"] .theme-btn{right:auto;left:1.5rem}
</style>
</head>
<body>
<button class="theme-btn" id="darkToggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
<div class="container">
  <header{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    <div class="swiss-kicker">{{portfolioTexts.title}} {{#if location}}· {{location}}{{/if}}</div>
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
    <div class="section-header">
      <h2 class="section-title">{{sectionTitles.skills}}</h2>
      <span class="section-index">01 / {{skills.length}}</span>
    </div>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <div class="section-header">
      <h2 class="section-title">{{sectionTitles.projects}}</h2>
      <span class="section-index">02 / {{projects.length}}</span>
    </div>
    <div class="projects-list">
      {{#each projects}}
      <div class="project-item">
        <h3>{{this.name}}</h3>
        <p>{{this.desc}}</p>
        <div class="project-tags">
          {{#each this.tags}}<span>{{this}}</span>{{/each}}
        </div>
        {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link"><span>{{../portfolioTexts.viewProject}}</span> <span>&rarr;</span></a>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <div class="section-header">
      <h2 class="section-title">{{sectionTitles.education}}</h2>
      <span class="section-index">03</span>
    </div>
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
    <div class="section-header">
      <h2 class="section-title">{{sectionTitles.bugbounty}}</h2>
      <span class="section-index">04</span>
    </div>
    <div class="bb-list">
      {{#each bugbounty}}<div class="bb-badge"><i class="fas fa-shield-halved" style="color:var(--accent)"></i> {{this.platform}} · {{this.username}}</div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <div class="section-header">
      <h2 class="section-title">{{sectionTitles.contact}}</h2>
      <span class="section-index">05</span>
    </div>
    <p style="color:var(--fg2);font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.85rem"><a href="mailto:{{contactEmail}}" class="project-link">{{contactEmail}} &rarr;</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} · Swiss Minimal Edition</p>
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
