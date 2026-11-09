/* =============================================
   js/themes/dark-premium.js — Theme 6: Dark Premium (Midnight Obsidian & Neon Glow)
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
    root.themeDarkPremium = theme;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  return {
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
  };
});
