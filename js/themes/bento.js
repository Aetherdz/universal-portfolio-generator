/* =============================================
   js/themes/bento.js — Theme 4: Bento Grid (Apple-Style Asymmetric Modular Architecture)
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
    description: 'Apple-style asymmetric bento grid with hover cards, modular stats & Cairo Arabic RTL cascade',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · Bento</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#070a12;
  --card:rgba(17,24,39,0.86);
  --card-border:rgba(255,255,255,0.09);
  --fg:#f9fafb;
  --fg2:#9ca3af;
  --accent:{{colors.primary}};
  --accent-light:{{colors.accent}};
  --font:'Plus Jakarta Sans','Cairo',sans-serif;
}
body{
  background:var(--bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -15%, rgba(59,130,246,0.16), transparent 70%),
    radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size:100% 100%, 24px 24px;
  color:var(--fg);
  font-family:var(--font);line-height:1.65;padding:2.75rem 1.25rem;
}
.bento-container{max-width:1120px;margin:0 auto}
.bento-grid{
  display:grid;grid-template-columns:repeat(12,1fr);
  gap:1.25rem;
}
.bento-card{
  background:var(--card);border:1px solid var(--card-border);
  border-radius:24px;padding:1.85rem;position:relative;
  overflow:hidden;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  box-shadow:0 16px 40px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.08);
  transition:all .28s cubic-bezier(0.16,1,0.3,1);
}
.bento-card:hover{
  border-color:rgba(255,255,255,0.22);
  transform:translateY(-4px);
  box-shadow:0 22px 48px rgba(0,0,0,0.5),0 0 28px rgba(59,130,246,0.12),inset 0 1px 0 rgba(255,255,255,0.14);
}
.card-hero{
  grid-column:span 8;
  background:linear-gradient(145deg,rgba(17,24,39,0.95) 0%,rgba(30,41,59,0.75) 100%);
}
.card-stats{grid-column:span 4;display:flex;flex-direction:column;justify-content:center;gap:1.15rem}
.card-skills{grid-column:span 7}
.card-socials{grid-column:span 5}
.card-projects{grid-column:span 12}
.card-creds{grid-column:span 12}
.avatar{width:84px;height:84px;border-radius:22px;object-fit:cover;border:2px solid var(--accent);margin-bottom:1.1rem;box-shadow:0 8px 24px rgba(0,0,0,0.4)}
.avatar-fallback{
  width:84px;height:84px;border-radius:22px;background:linear-gradient(135deg,var(--accent),var(--accent-light));
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;margin-bottom:1.1rem;
  box-shadow:0 8px 24px rgba(0,0,0,0.4);
}
h1{font-size:clamp(1.9rem,4.2vw,2.75rem);font-weight:800;letter-spacing:-0.03em;line-height:1.12;margin-bottom:0.35rem}
.role-pill{
  display:inline-flex;align-items:center;gap:0.45rem;
  padding:0.3rem 0.9rem;border-radius:9999px;
  background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.28);
  font-size:0.875rem;color:var(--accent);font-weight:700;margin-bottom:0.85rem;
}
.bio{color:var(--fg2);font-size:0.975rem;max-width:580px;line-height:1.7}
.stat-box{
  background:rgba(255,255,255,0.03);padding:1.15rem 1.35rem;border-radius:16px;
  border:1px solid rgba(255,255,255,0.06);transition:transform .2s ease;
}
.stat-box:hover{transform:scale(1.02);border-color:rgba(255,255,255,0.14)}
.stat-val{font-size:2rem;font-weight:800;color:var(--accent);line-height:1}
.stat-lbl{font-size:0.82rem;color:var(--fg2);margin-top:0.35rem;font-weight:600}
.skills-flow{display:flex;flex-wrap:wrap;gap:0.55rem;margin-top:1.1rem}
.skill-chip{
  padding:0.45rem 0.9rem;background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.08);border-radius:12px;
  font-size:0.84rem;font-weight:600;display:inline-flex;align-items:center;gap:0.45rem;
  transition:all .2s ease;
}
.skill-chip:hover{border-color:var(--accent);background:rgba(255,255,255,0.08);transform:translateY(-2px)}
.skill-chip i{font-size:1rem;color:var(--accent)}
.social-buttons{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;margin-top:1.1rem}
.bento-social-btn{
  display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;
  background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
  border-radius:14px;color:var(--fg);text-decoration:none;font-size:0.85rem;font-weight:600;transition:all .22s ease;
}
.bento-social-btn:hover{background:rgba(255,255,255,0.08);border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.25rem;margin-top:1.2rem}
.proj-item{
  background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);
  border-radius:18px;padding:1.45rem;transition:all .25s ease;
  display:flex;flex-direction:column;justify-content:space-between;
}
.proj-item:hover{border-color:var(--accent);transform:translateY(-4px);background:rgba(255,255,255,0.04)}
.proj-item h4{font-size:1.1rem;font-weight:700;margin-bottom:0.45rem}
.proj-item p{font-size:0.875rem;color:var(--fg2);margin-bottom:0.9rem}
.proj-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.85rem}
.proj-tags span{font-size:0.72rem;font-weight:600;padding:0.2rem 0.55rem;background:rgba(255,255,255,0.06);border-radius:6px;color:var(--fg2)}
.bento-heading{font-size:1.18rem;font-weight:800;display:flex;align-items:center;gap:0.55rem;letter-spacing:-0.01em}
footer{text-align:center;color:var(--fg2);font-size:0.82rem;padding:3rem 0 1rem}

/* Cairo Arabic RTL Cascade */
[dir="rtl"],[dir="rtl"] body,[dir="rtl"] h1,[dir="rtl"] .bento-heading,[dir="rtl"] .proj-item h4{
  font-family:'Cairo','Plus Jakarta Sans',sans-serif;
}
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
      <div class="role-pill"><i class="fas fa-bolt" style="font-size:0.75rem"></i> <span>{{role}}</span></div>
      {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
      {{#if location}}<div style="color:var(--fg2);font-size:0.85rem;margin-top:0.85rem"><i class="fas fa-location-dot" style="color:var(--accent)"></i> {{location}}</div>{{/if}}
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
      <div class="bento-heading"><i class="fas fa-microchip" style="color:var(--accent)"></i> <span>{{sectionTitles.skills}}</span></div>
      <div class="skills-flow">
        {{#each skills}}<div class="skill-chip"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
      </div>
    </div>
    {{/if}}

    <!-- Socials Card -->
    <div class="bento-card card-socials"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-compass" style="color:#10b981"></i> <span>{{portfolioTexts.title}}</span></div>
      <div class="social-buttons">
        {{#each socials}}
        <a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="bento-social-btn">
          <i class="{{this.icon}}"></i>
          <span>{{this.label}}</span>
        </a>
        {{/each}}
      </div>
    </div>

    <!-- Projects Card -->
    {{#if projects.length}}
    <div class="bento-card card-projects"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-layer-group" style="color:#f59e0b"></i> <span>{{sectionTitles.projects}}</span></div>
      <div class="proj-grid">
        {{#each projects}}
        <div class="proj-item">
          <div>
            <h4>{{this.name}}</h4>
            <p>{{this.desc}}</p>
          </div>
          <div>
            <div class="proj-tags">
              {{#each this.tags}}<span>{{this}}</span>{{/each}}
            </div>
            {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" style="color:var(--accent);font-size:0.84rem;font-weight:700;text-decoration:none">{{../portfolioTexts.viewProject}} &rarr;</a>{{/if}}
          </div>
        </div>
        {{/each}}
      </div>
    </div>
    {{/if}}

    <!-- Credentials Card -->
    {{#if education.length}}
    <div class="bento-card card-creds"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-graduation-cap" style="color:#6366f1"></i> <span>{{sectionTitles.education}}</span></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:1.1rem">
        {{#each education}}
        <div style="background:rgba(255,255,255,0.025);padding:1.15rem;border-radius:14px;border:1px solid rgba(255,255,255,0.06)">
          <div style="font-weight:700">{{this.degree}}</div>
          <div style="color:var(--fg2);font-size:0.85rem;margin-top:0.2rem">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
        </div>
        {{/each}}
      </div>
    </div>
    {{/if}}

    {{#if bugbounty.length}}
    <div class="bento-card card-creds"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading"><i class="fas fa-shield-halved" style="color:#10b981"></i> <span>{{sectionTitles.bugbounty}}</span></div>
      <div class="skills-flow">
        {{#each bugbounty}}
        <div class="skill-chip"><i class="fas fa-bug" style="color:#10b981"></i><span><strong>{{this.platform}}</strong> / {{this.username}}</span></div>
        {{/each}}
      </div>
    </div>
    {{/if}}

    {{#if contactForm}}
    <div class="bento-card card-projects" style="text-align:center"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
      <div class="bento-heading" style="justify-content:center"><i class="fas fa-paper-plane" style="color:var(--accent)"></i> <span>{{sectionTitles.contact}}</span></div>
      <p style="color:var(--fg2);margin:0.5rem 0">{{sectionTitles.contact_sub}}</p>
      {{#if contactEmail}}<a href="mailto:{{contactEmail}}" style="display:inline-block;padding:0.7rem 1.6rem;background:var(--accent);color:#fff;border-radius:9999px;font-weight:700;text-decoration:none;margin-top:0.65rem">{{contactEmail}}</a>{{/if}}
    </div>
    {{/if}}
  </div>

  <footer>
    <p>{{name}} · {{year}} // Bento Modular System</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  };
});
