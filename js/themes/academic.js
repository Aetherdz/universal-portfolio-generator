/* =============================================
   js/themes/academic.js — Theme 7: Academic (Scholarly Serif & Chronological Timeline CV)
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
    description: 'Scholarly serif typography, clean chronological timeline for papers, research & experience, Cairo RTL',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · {{portfolioTexts.titleAcademic}}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#fdfdfc;
  --fg:#0f172a;
  --fg2:#334155;
  --muted:#64748b;
  --accent:{{colors.primary}};
  --border:#e2e8f0;
  --serif:'Crimson Pro','Cairo',Georgia,serif;
  --sans:'Inter','Cairo',sans-serif;
}
body{
  background:var(--bg);color:var(--fg);
  font-family:var(--sans);line-height:1.75;padding:3.5rem 1.5rem;
}
.academic-wrap{max-width:840px;margin:0 auto}
.header{
  display:flex;align-items:flex-start;justify-content:space-between;
  gap:2.25rem;border-bottom:2px solid var(--fg);padding-bottom:2.25rem;margin-bottom:2.75rem;
}
.header-info{flex:1}
.cv-kicker{font-family:var(--serif);font-style:italic;font-size:0.95rem;color:var(--muted);margin-bottom:0.25rem}
.name{font-family:var(--serif);font-size:clamp(2.3rem,5vw,3.1rem);font-weight:700;line-height:1.1;color:var(--fg);margin-bottom:0.3rem}
.role{font-size:1.15rem;font-weight:600;color:var(--accent);margin-bottom:0.75rem}
.meta-line{font-size:0.875rem;color:var(--muted);margin-bottom:0.35rem;display:flex;gap:1.5rem;flex-wrap:wrap}
.bio{margin-top:1rem;color:var(--fg2);font-size:1rem;font-family:var(--serif);font-size:1.12rem;line-height:1.7}
.avatar{width:116px;height:116px;border-radius:8px;object-fit:cover;border:1px solid #cbd5e1;flex-shrink:0}
.avatar-fallback{
  width:116px;height:116px;border-radius:8px;background:#f1f5f9;
  border:1px solid #cbd5e1;display:flex;align-items:center;justify-content:center;
  font-family:var(--serif);font-size:2.5rem;font-weight:700;color:var(--fg);flex-shrink:0;
}
.social-bar{display:flex;flex-wrap:wrap;gap:0.85rem;margin-top:1.1rem}
.social-link{color:var(--fg2);font-size:1.05rem;text-decoration:none;transition:color .2s}
.social-link:hover{color:var(--accent)}
.section{margin-bottom:2.75rem}
.section-title{
  font-family:var(--serif);font-size:1.55rem;font-weight:700;
  color:var(--fg);border-bottom:1px solid var(--border);padding-bottom:0.45rem;margin-bottom:1.4rem;
  display:flex;align-items:center;gap:0.55rem;
}
/* Chronological Timeline for Education, Experience & Papers/Projects */
.timeline{
  position:relative;display:flex;flex-direction:column;gap:1.4rem;
  padding-left:1.5rem;border-left:2px solid var(--border);
}
.timeline-item{position:relative}
.timeline-item::before{
  content:'';position:absolute;left:-1.92rem;top:0.4rem;
  width:11px;height:11px;border-radius:50%;
  background:#fff;border:2.5px solid var(--accent);
}
.timeline-head{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.timeline-item h4{font-family:var(--serif);font-size:1.2rem;font-weight:700;color:var(--fg)}
.timeline-year{
  font-size:0.78rem;font-weight:600;color:var(--accent);
  background:rgba(37,99,235,0.08);padding:0.15rem 0.6rem;border-radius:4px;
}
.timeline-item .sub{font-size:0.9rem;color:var(--muted);font-weight:500;margin-top:0.15rem}
.timeline-item .desc{font-size:0.92rem;color:var(--fg2);margin-top:0.35rem}
.pub-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.5rem}
.pub-tags span{font-size:0.72rem;padding:0.12rem 0.5rem;background:#f1f5f9;border:1px solid var(--border);border-radius:4px;color:var(--fg2)}
.pub-link{display:inline-block;margin-top:0.4rem;color:var(--accent);font-size:0.84rem;text-decoration:none;font-weight:600}
.pub-link:hover{text-decoration:underline}
.skills-list{display:flex;flex-wrap:wrap;gap:0.5rem}
.skill-item{padding:0.35rem 0.85rem;background:#f8fafc;border:1px solid var(--border);border-radius:4px;font-size:0.84rem;color:var(--fg2);display:inline-flex;align-items:center;gap:0.45rem}
footer{border-top:1px solid var(--border);padding-top:2rem;text-align:center;color:var(--muted);font-size:0.82rem;font-family:var(--serif)}

/* Cairo Arabic RTL Cascade */
[dir="rtl"],[dir="rtl"] body,[dir="rtl"] .name,[dir="rtl"] .section-title,[dir="rtl"] .timeline-item h4,[dir="rtl"] .bio{
  font-family:'Cairo',serif;
}
[dir="rtl"] .header{flex-direction:row-reverse;text-align:right}
[dir="rtl"] .timeline{padding-left:0;padding-right:1.5rem;border-left:none;border-right:2px solid var(--border)}
[dir="rtl"] .timeline-item::before{left:auto;right:-1.92rem}
[dir="rtl"] .meta-line,[dir="rtl"] .social-bar{justify-content:flex-start}
[dir="rtl"] .section{text-align:right}
@media(max-width:640px){
  .header,[dir="rtl"] .header{flex-direction:column-reverse;align-items:center;text-align:center}
  .meta-line,.social-bar,[dir="rtl"] .meta-line,[dir="rtl"] .social-bar{justify-content:center}
}
@media print{
  body{padding:0;background:#fff}
  .academic-wrap{max-width:100%}
}
</style>
</head>
<body>
<div class="academic-wrap">
  <header class="header"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    <div class="header-info">
      <div class="cv-kicker">{{portfolioTexts.cv}}</div>
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
    <h2 class="section-title"><i class="fas fa-university" style="font-size:1.1rem;color:var(--accent)"></i> <span>{{sectionTitles.education}}</span></h2>
    <div class="timeline">
      {{#each education}}
      <div class="timeline-item">
        <div class="timeline-head">
          <h4>{{this.degree}}</h4>
          {{#if this.year}}<span class="timeline-year">{{this.year}}</span>{{/if}}
        </div>
        <div class="sub">{{this.school}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if experience.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-briefcase" style="font-size:1.1rem;color:var(--accent)"></i> <span>Experience</span></h2>
    <div class="timeline">
      {{#each experience}}
      <div class="timeline-item">
        <div class="timeline-head">
          <h4>{{this.role}}</h4>
          {{#if this.year}}<span class="timeline-year">{{this.year}}</span>{{/if}}
        </div>
        <div class="sub">{{this.company}}</div>
        {{#if this.desc}}<div class="desc">{{this.desc}}</div>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-book-open" style="font-size:1.1rem;color:var(--accent)"></i> <span>{{sectionTitles.projects}} &amp; Research</span></h2>
    <div class="timeline">
      {{#each projects}}
      <div class="timeline-item">
        <div class="timeline-head">
          <h4>{{this.name}}</h4>
        </div>
        <div class="desc">{{this.desc}}</div>
        {{#if this.tags.length}}
        <div class="pub-tags">
          {{#each this.tags}}<span>{{this}}</span>{{/each}}
        </div>
        {{/if}}
        {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="pub-link">[ {{../portfolioTexts.viewProject}} &rarr; ]</a>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if skills.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-microscope" style="font-size:1.1rem;color:var(--accent)"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-list">
      {{#each skills}}<div class="skill-item"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if bugbounty.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-shield-halved" style="font-size:1.1rem;color:var(--accent)"></i> <span>{{sectionTitles.bugbounty}}</span></h2>
    <div class="skills-list">
      {{#each bugbounty}}<div class="skill-item"><i class="fas fa-shield-halved" style="color:var(--accent)"></i> {{this.platform}}: {{this.username}}</div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-envelope-open-text" style="font-size:1.1rem;color:var(--accent)"></i> <span>{{sectionTitles.contact}}</span></h2>
    <p style="color:var(--fg2);font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.5rem"><a href="mailto:{{contactEmail}}" class="pub-link">{{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} · {{portfolioTexts.cv}}</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  };
});
