/* =============================================
   js/themes/bento.js — Theme 4: Bento Grid (Linear / Modern Modular Architecture)
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
    root.themeBento = theme;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  return {
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
  };
});
