/* =============================================
   js/themes/academic.js — Theme 7: Academic (Scholar / Researcher CV Format)
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
    root.themeAcademic = theme;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  return {
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
  };
});
