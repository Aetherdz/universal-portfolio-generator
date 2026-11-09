/* =============================================
   js/themes/glassmorphic.js — Theme 5: Glassmorphic (Multi-Layered Frosted Glass & Aurora Orbs)
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
    root.themeGlassmorphic = theme;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  return {
    id: 5,
    nameKey: 'theme.5',
    icon: 'fas fa-wand-magic-sparkles',
    description: 'Multi-layered frosted glass with ambient aurora gradient orbs & Cairo Arabic RTL cascade',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · Glass</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  min-height:100vh;
  background:radial-gradient(circle at 15% 15%, #1e1b4b 0%, #0f172a 55%, #030712 100%);
  color:#f8fafc;
  font-family:'Space Grotesk','Cairo',sans-serif;
  line-height:1.65;
  position:relative;
  overflow-x:hidden;
  padding:3.25rem 1.5rem;
}
.orb{
  position:fixed;border-radius:50%;filter:blur(110px);z-index:0;pointer-events:none;
  animation:auroraFloat 14s ease-in-out infinite alternate;
}
.orb-1{top:-8%;left:10%;width:460px;height:460px;background:rgba(99,102,241,0.32)}
.orb-2{bottom:4%;right:8%;width:520px;height:520px;background:rgba(236,72,153,0.24);animation-delay:-5s}
.orb-3{top:42%;left:55%;width:380px;height:380px;background:rgba(6,182,212,0.22);animation-delay:-9s}
@keyframes auroraFloat{
  0%{transform:translate(0,0) scale(1)}
  100%{transform:translate(28px,-24px) scale(1.08)}
}
.container{position:relative;z-index:1;max-width:900px;margin:0 auto}
.glass-panel{
  background:linear-gradient(135deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,{{glassmorphism.opacity}}) 100%);
  backdrop-filter:blur({{glassmorphism.blur}}px) saturate(180%);
  -webkit-backdrop-filter:blur({{glassmorphism.blur}}px) saturate(180%);
  border:1px solid rgba(255,255,255,0.22);
  border-radius:{{glassmorphism.radius}}px;
  box-shadow:0 24px 60px rgba(0,0,0,0.38),inset 0 1px 0 rgba(255,255,255,0.28);
  padding:2.35rem;margin-bottom:2rem;
}
.avatar{width:96px;height:96px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.55);margin-bottom:1.1rem;box-shadow:0 10px 30px rgba(0,0,0,0.35)}
.avatar-fallback{
  width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#ec4899);
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:2.3rem;font-weight:700;margin-bottom:1.1rem;
  border:2px solid rgba(255,255,255,0.45);box-shadow:0 10px 30px rgba(0,0,0,0.35);
}
h1{font-size:clamp(2.1rem,5vw,3.15rem);font-weight:700;line-height:1.12;margin-bottom:0.35rem}
.role{
  display:inline-flex;align-items:center;gap:0.45rem;
  padding:0.3rem 0.95rem;border-radius:9999px;
  background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.22);
  font-size:0.92rem;color:#c7d2fe;font-weight:600;margin-bottom:0.9rem;
}
.bio{color:#e2e8f0;font-size:1.02rem;max-width:620px;margin-bottom:1.5rem}
.socials{display:flex;flex-wrap:wrap;gap:0.75rem}
.social-btn{
  width:2.6rem;height:2.6rem;border-radius:50%;
  background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.22);
  color:#fff;display:flex;align-items:center;justify-content:center;
  text-decoration:none;transition:all .22s ease;
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.25);
}
.social-btn:hover{background:rgba(255,255,255,0.25);transform:translateY(-3px) scale(1.06)}
.section-title{font-size:1.35rem;font-weight:700;margin-bottom:1.35rem;display:flex;align-items:center;gap:0.55rem;color:#fff}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.55rem}
.skill-tag{
  padding:0.45rem 0.95rem;background:rgba(255,255,255,0.09);
  border:1px solid rgba(255,255,255,0.2);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.2);
  border-radius:9999px;font-size:0.85rem;font-weight:500;
  display:inline-flex;align-items:center;gap:0.45rem;transition:all .2s ease;
}
.skill-tag:hover{background:rgba(255,255,255,0.18);transform:translateY(-2px)}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(265px,1fr));gap:1.25rem}
.project-card{
  background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.16);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.18);
  border-radius:16px;padding:1.4rem;transition:all .25s ease;
  display:flex;flex-direction:column;justify-content:space-between;
}
.project-card:hover{background:rgba(255,255,255,0.13);border-color:rgba(255,255,255,0.34);transform:translateY(-4px)}
.project-card h4{font-size:1.12rem;font-weight:700;margin-bottom:0.4rem}
.project-card p{font-size:0.875rem;color:#cbd5e1;margin-bottom:0.85rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.85rem}
.project-tags span{font-size:0.72rem;padding:0.18rem 0.55rem;background:rgba(255,255,255,0.12);border-radius:9999px}
.project-link{color:#a5b4fc;font-size:0.85rem;font-weight:600;text-decoration:none}
.project-link:hover{text-decoration:underline}
footer{text-align:center;color:#94a3b8;font-size:0.82rem;padding:2rem 0}

/* Cairo Arabic RTL Cascade */
[dir="rtl"],[dir="rtl"] body,[dir="rtl"] h1,[dir="rtl"] .section-title,[dir="rtl"] .project-card h4{
  font-family:'Cairo','Space Grotesk',sans-serif;
}
[dir="rtl"] .glass-panel{text-align:right}
[dir="rtl"] .socials{justify-content:flex-start}
</style>
</head>
<body>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="orb orb-3"></div>
<div class="container">
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    {{#if photo}}
      <img src="{{photo}}" alt="{{name}}" class="avatar">
    {{else}}
      <div class="avatar-fallback">{{initials}}</div>
    {{/if}}
    <h1>{{name}}</h1>
    <div class="role"><i class="fas fa-wand-magic-sparkles" style="font-size:0.8rem"></i> <span>{{role}}</span></div>
    {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
    <div class="socials">
      {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-btn" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
    </div>
  </div>

  {{#if skills.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-bolt" style="color:#a5b4fc"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-cubes" style="color:#f472b6"></i> <span>{{sectionTitles.projects}}</span></h2>
    <div class="projects-grid">
      {{#each projects}}
      <div class="project-card">
        <div>
          <h4>{{this.name}}</h4>
          <p>{{this.desc}}</p>
        </div>
        <div>
          <div class="project-tags">
            {{#each this.tags}}<span>{{this}}</span>{{/each}}
          </div>
          {{#if this.url}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="project-link">{{../portfolioTexts.viewProject}} &rarr;</a>{{/if}}
        </div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-graduation-cap" style="color:#38bdf8"></i> <span>{{sectionTitles.education}}</span></h2>
    <div style="display:flex;flex-direction:column;gap:1rem">
      {{#each education}}
      <div style="padding:1rem;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:12px">
        <div style="font-weight:700">{{this.degree}}</div>
        <div style="font-size:0.85rem;color:#cbd5e1">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if bugbounty.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-shield-halved" style="color:#34d399"></i> <span>{{sectionTitles.bugbounty}}</span></h2>
    <div class="skills-grid">
      {{#each bugbounty}}<div class="skill-tag"><i class="fas fa-bug" style="color:#34d399"></i><span><strong>{{this.platform}}</strong> / {{this.username}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="glass-panel" style="text-align:center"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title" style="justify-content:center"><i class="fas fa-paper-plane" style="color:#a5b4fc"></i> <span>{{sectionTitles.contact}}</span></h2>
    <p style="color:#cbd5e1;font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.9rem"><a href="mailto:{{contactEmail}}" style="display:inline-block;padding:0.65rem 1.5rem;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.32);border-radius:9999px;color:#fff;text-decoration:none;font-weight:600">{{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} · Frosted Aurora Edition</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  };
});
