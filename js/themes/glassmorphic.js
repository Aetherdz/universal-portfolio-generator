/* =============================================
   js/themes/glassmorphic.js — Theme 5: Glassmorphic (Frosted Aurora)
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
    description: 'Vibrant frosted glass aesthetics, glowing aura gradients, luminous depth',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · Glass</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  min-height:100vh;
  background:radial-gradient(circle at 10% 20%, #1e1b4b 0%, #0f172a 50%, #030712 100%);
  color:#f8fafc;
  font-family:'Space Grotesk','Cairo',sans-serif;
  line-height:1.6;
  position:relative;
  overflow-x:hidden;
  padding:3rem 1.5rem;
}
.orb{
  position:fixed;border-radius:50%;filter:blur(100px);z-index:0;pointer-events:none;
}
.orb-1{top:-10%;left:15%;width:450px;height:450px;background:rgba(99,102,241,0.25)}
.orb-2{bottom:5%;right:10%;width:500px;height:500px;background:rgba(236,72,153,0.2)}
.container{position:relative;z-index:1;max-width:880px;margin:0 auto}
.glass-panel{
  background:rgba(255,255,255,{{glassmorphism.opacity}});
  backdrop-filter:blur({{glassmorphism.blur}}px);
  -webkit-backdrop-filter:blur({{glassmorphism.blur}}px);
  border:1px solid rgba(255,255,255,0.18);
  border-radius:{{glassmorphism.radius}}px;
  box-shadow:0 20px 50px rgba(0,0,0,0.3);
  padding:2.25rem;margin-bottom:2rem;
}
.avatar{width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.4);margin-bottom:1rem}
.avatar-fallback{
  width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#ec4899);
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:700;margin-bottom:1rem;
}
h1{font-size:clamp(2rem,5vw,3rem);font-weight:700;line-height:1.15;margin-bottom:0.25rem}
.role{font-size:1.1rem;color:#a5b4fc;font-weight:600;margin-bottom:0.75rem}
.bio{color:#cbd5e1;font-size:1rem;max-width:600px;margin-bottom:1.5rem}
.socials{display:flex;flex-wrap:wrap;gap:0.75rem}
.social-btn{
  width:2.5rem;height:2.5rem;border-radius:50%;
  background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
  color:#fff;display:flex;align-items:center;justify-content:center;
  text-decoration:none;transition:all .2s;
}
.social-btn:hover{background:rgba(255,255,255,0.25);transform:scale(1.1)}
.section-title{font-size:1.3rem;font-weight:700;margin-bottom:1.25rem;display:flex;align-items:center;gap:0.5rem;color:#f1f5f9}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.5rem}
.skill-tag{
  padding:0.4rem 0.9rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);
  border-radius:9999px;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;
}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem}
.project-card{
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
  border-radius:14px;padding:1.25rem;transition:all .2s;
}
.project-card:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.3);transform:translateY(-3px)}
.project-card h4{font-size:1.1rem;font-weight:600;margin-bottom:0.35rem}
.project-card p{font-size:0.85rem;color:#cbd5e1;margin-bottom:0.75rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.75rem}
.project-tags span{font-size:0.7rem;padding:0.15rem 0.5rem;background:rgba(255,255,255,0.1);border-radius:4px}
.project-link{color:#a5b4fc;font-size:0.85rem;font-weight:600;text-decoration:none}
footer{text-align:center;color:#94a3b8;font-size:0.8rem;padding:2rem 0}
[dir="rtl"] .glass-panel{text-align:right}
[dir="rtl"] .socials{justify-content:flex-start}
</style>
</head>
<body>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="container">
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-down"{{/if}}>
    {{#if photo}}
      <img src="{{photo}}" alt="{{name}}" class="avatar">
    {{else}}
      <div class="avatar-fallback">{{initials}}</div>
    {{/if}}
    <h1>{{name}}</h1>
    <div class="role">{{role}}</div>
    {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
    <div class="socials">
      {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-btn" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
    </div>
  </div>

  {{#if skills.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-sparkles text-indigo-400"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-cubes text-pink-400"></i> <span>{{sectionTitles.projects}}</span></h2>
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
  <div class="glass-panel"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-graduation-cap"></i> <span>{{sectionTitles.education}}</span></h2>
    <div style="display:flex;flex-direction:column;gap:1rem">
      {{#each education}}
      <div>
        <div style="font-weight:600">{{this.degree}}</div>
        <div style="font-size:0.85rem;color:#cbd5e1">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="glass-panel" style="text-align:center"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title" style="justify-content:center"><i class="fas fa-paper-plane text-indigo-300"></i> <span>{{sectionTitles.contact}}</span></h2>
    <p style="color:#cbd5e1;font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:0.75rem"><a href="mailto:{{contactEmail}}" style="display:inline-block;padding:0.6rem 1.4rem;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:9999px;color:#fff;text-decoration:none;font-weight:600">{{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}}</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  };
});
