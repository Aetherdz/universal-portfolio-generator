/* =============================================
   js/themes/dark-premium.js — Theme 6: Dark Premium (Radial Dotted Obsidian with Sapphire & Emerald Neon Accents)
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
    description: 'Radial dotted dark background with sapphire & emerald neon accents and Cairo Arabic RTL cascade',
    render: (data) => Handlebars.compile(`<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{name}} · Developer</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
{{#if animationsEnabled}}<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">{{/if}}
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#050811;
  --card:#0d1322;
  --sapphire:#3b82f6;
  --emerald:#10b981;
  --primary:{{colors.primary}};
  --fg:#f8fafc;
  --muted:#94a3b8;
  --border:rgba(255,255,255,0.08);
}
body{
  background-color:var(--bg);
  background-image:
    radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
    radial-gradient(ellipse 80% 45% at 50% -10%, rgba(59,130,246,0.18), transparent 70%),
    radial-gradient(ellipse 60% 40% at 85% 90%, rgba(16,185,129,0.12), transparent 70%);
  background-size:24px 24px, 100% 100%, 100% 100%;
  color:var(--fg);
  font-family:'Space Grotesk','Cairo',sans-serif;
  line-height:1.65;padding:3rem 1.5rem;
}
.container{max-width:940px;margin:0 auto}
.hero{padding:3.75rem 0 3.25rem;text-align:center;border-bottom:1px solid var(--border)}
.avatar{
  width:116px;height:116px;border-radius:50%;object-fit:cover;
  border:3px solid var(--sapphire);
  box-shadow:0 0 30px rgba(59,130,246,0.35),0 0 15px rgba(16,185,129,0.25);
  margin:0 auto 1.5rem;display:block;
}
.avatar-fallback{
  width:116px;height:116px;border-radius:50%;
  background:linear-gradient(135deg,var(--sapphire),var(--emerald));
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:2.6rem;font-weight:700;
  border:3px solid var(--sapphire);
  box-shadow:0 0 30px rgba(59,130,246,0.35),0 0 15px rgba(16,185,129,0.25);
  margin:0 auto 1.5rem;
}
h1{
  font-size:clamp(2.3rem,6vw,3.6rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:0.65rem;
  background:linear-gradient(135deg,#ffffff 20%,#60a5fa 65%,#34d399 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.role-badge{
  display:inline-flex;align-items:center;gap:0.5rem;
  padding:0.35rem 1.1rem;border-radius:9999px;
  background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);
  color:#34d399;font-size:0.95rem;font-weight:600;margin-bottom:1.1rem;
  box-shadow:0 0 20px rgba(16,185,129,0.15);
}
.role-dot{width:8px;height:8px;border-radius:50%;background:var(--emerald);box-shadow:0 0 10px var(--emerald)}
.bio{color:var(--muted);font-size:1.05rem;max-width:640px;margin:0 auto 1.6rem}
.socials{display:flex;justify-content:center;gap:0.75rem;flex-wrap:wrap}
.social-link{
  width:2.65rem;height:2.65rem;border-radius:50%;background:var(--card);
  border:1px solid var(--border);color:var(--muted);
  display:flex;align-items:center;justify-content:center;text-decoration:none;transition:all .22s ease;
}
.social-link:hover{
  color:#60a5fa;border-color:var(--sapphire);
  box-shadow:0 0 18px rgba(59,130,246,0.35);
  transform:translateY(-3px);
}
.section{padding:3.25rem 0;border-bottom:1px solid var(--border)}
.section-title{font-size:1.45rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.6rem;color:var(--fg)}
.skills-grid{display:flex;flex-wrap:wrap;gap:0.65rem}
.skill-tag{
  padding:0.5rem 1.05rem;background:var(--card);border:1px solid var(--border);
  border-radius:10px;font-size:0.86rem;font-weight:600;color:#e2e8f0;
  display:inline-flex;align-items:center;gap:0.5rem;transition:all .22s ease;
}
.skill-tag:hover{border-color:var(--emerald);color:#34d399;box-shadow:0 0 16px rgba(16,185,129,0.2);transform:translateY(-2px)}
.skill-tag i{font-size:1.05rem;color:var(--sapphire)}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.3rem}
.project-card{
  background:var(--card);border:1px solid var(--border);
  border-radius:14px;padding:1.55rem;transition:all .25s ease;
  display:flex;flex-direction:column;justify-content:space-between;
}
.project-card:hover{
  border-color:var(--sapphire);transform:translateY(-4px);
  box-shadow:0 14px 35px rgba(0,0,0,0.6),0 0 24px rgba(59,130,246,0.2);
}
.project-card h4{font-size:1.15rem;margin-bottom:0.45rem;color:#fff}
.project-card p{color:var(--muted);font-size:0.88rem;margin-bottom:1rem}
.project-tags{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1rem}
.project-tags span{
  font-size:0.74rem;font-weight:600;padding:0.2rem 0.6rem;
  background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.24);
  border-radius:6px;color:#93c5fd;
}
.project-link{color:#34d399;font-size:0.875rem;font-weight:700;text-decoration:none}
.project-link:hover{text-decoration:underline}
footer{text-align:center;padding:3rem 0 1rem;color:#64748b;font-size:0.85rem}

/* Cairo Arabic RTL Cascade */
[dir="rtl"],[dir="rtl"] body,[dir="rtl"] h1,[dir="rtl"] .section-title,[dir="rtl"] .project-card h4{
  font-family:'Cairo','Space Grotesk',sans-serif;
}
[dir="rtl"] .section{text-align:right}
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
    <div class="role-badge"><span class="role-dot"></span> <span>{{role}}</span></div>
    {{#if bio}}<p class="bio">{{bio}}</p>{{/if}}
    <div class="socials">
      {{#each socials}}<a href="{{this.url}}" target="_blank" rel="noopener noreferrer" class="social-link" title="{{this.label}}"><i class="{{this.icon}}"></i></a>{{/each}}
    </div>
  </header>

  {{#if skills.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-layer-group" style="color:var(--sapphire)"></i> <span>{{sectionTitles.skills}}</span></h2>
    <div class="skills-grid">
      {{#each skills}}<div class="skill-tag"><i class="{{this.icon}}"></i><span>{{this.name}}</span></div>{{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-code-branch" style="color:var(--emerald)"></i> <span>{{sectionTitles.projects}}</span></h2>
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
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-graduation-cap" style="color:var(--sapphire)"></i> <span>{{sectionTitles.education}}</span></h2>
    <div style="display:flex;flex-direction:column;gap:1rem">
      {{#each education}}
      <div style="background:var(--card);padding:1.25rem;border-radius:12px;border:1px solid var(--border);border-left:3px solid var(--sapphire)">
        <div style="font-weight:700">{{this.degree}}</div>
        <div style="color:var(--muted);font-size:0.85rem">{{this.school}}{{#if this.year}} · {{this.year}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if bugbounty.length}}
  <div class="section"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title"><i class="fas fa-shield-halved" style="color:var(--emerald)"></i> <span>{{sectionTitles.bugbounty}}</span></h2>
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      {{#each bugbounty}}
      <div style="background:var(--card);padding:0.6rem 1.1rem;border-radius:9999px;border:1px solid rgba(16,185,129,0.3);font-size:0.85rem">
        <i class="fas fa-bug" style="color:var(--emerald)"></i> <strong>{{this.platform}}</strong> / {{this.username}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if contactForm}}
  <div class="section" style="text-align:center"{{#if animationsEnabled}} data-aos="fade-up"{{/if}}>
    <h2 class="section-title" style="justify-content:center"><i class="fas fa-paper-plane" style="color:var(--sapphire)"></i> <span>{{sectionTitles.contact}}</span></h2>
    <p style="color:var(--muted);font-size:0.95rem">{{sectionTitles.contact_sub}}</p>
    {{#if contactEmail}}<p style="margin-top:1.1rem"><a href="mailto:{{contactEmail}}" style="display:inline-block;padding:0.7rem 1.65rem;background:linear-gradient(135deg,var(--sapphire),var(--emerald));color:#fff;border-radius:9999px;font-weight:700;text-decoration:none;box-shadow:0 0 24px rgba(59,130,246,0.35)">{{contactEmail}}</a></p>{{/if}}
  </div>
  {{/if}}

  <footer>
    <p>{{name}} · {{year}} // Sapphire &amp; Emerald Obsidian System</p>
  </footer>
</div>

{{#if animationsEnabled}}<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration:600,once:true})</script>{{/if}}
</body>
</html>`)(data)
  };
});
