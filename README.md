<p align="center">
  <a href="https://universal-portfolio-generator.vercel.app" target="_blank" rel="noopener">
    <img src="assets/banner.svg" alt="PortfolioGen Banner" width="100%">
  </a>
</p>

<p align="center">
  <samp>
    <b>PortfolioGen</b> · <b>ارسم هويتك (Draw Your Profile)</b>
  </samp>
  <br>
  <sub>The high-performance, privacy-first portfolio builder for software engineers, security researchers, and digital creators.</sub>
</p>

<p align="center">
  <a href="#-key-features">✨ Features</a> &nbsp;•&nbsp;
  <a href="#-live-demonstrations">🌐 Live Demos</a> &nbsp;•&nbsp;
  <a href="#-modular-architecture">🏗️ Architecture</a> &nbsp;•&nbsp;
  <a href="#-the-7-signature-themes">🎨 Themes</a> &nbsp;•&nbsp;
  <a href="#-quick-start">🚀 Quick Start</a> &nbsp;•&nbsp;
  <a href="#-extensibility-guide">🧩 Plugin Guide</a> &nbsp;•&nbsp;
  <a href="#-security--privacy">🔒 Security</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-3b82f6?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="MIT License">
  <img src="https://img.shields.io/badge/Architecture-100%25%20Modular-10b981?style=for-the-badge&logo=javascript&logoColor=white" alt="Modular Architecture">
  <img src="https://img.shields.io/badge/RTL-Native%20Arabic%20%2B%20English-8b5cf6?style=for-the-badge" alt="Bilingual RTL">
  <img src="https://img.shields.io/badge/Build%20Step-Zero%20(Pure%20Vanilla%20ES6)-f59e0b?style=for-the-badge&logo=fastapi&logoColor=white" alt="Zero Build Step">
  <img src="https://img.shields.io/badge/Privacy-100%25%20Client--Side-ec4899?style=for-the-badge&logo=shield&logoColor=white" alt="Client-Side Only">
  <img src="https://img.shields.io/badge/Sanitization-DOMPurify%20Hardened-06b6d4?style=for-the-badge" alt="DOMPurify">
</p>

---

## 🌐 Live Demonstrations

Experience the generator live in your browser with zero installation:

| Provider | Production Endpoint | Deployment Type | Status |
|:---|:---|:---|:---:|
| **Vercel** | [universal-portfolio-generator.vercel.app](https://universal-portfolio-generator.vercel.app) | Edge CDN Static | ![Active](https://img.shields.io/badge/ONLINE-brightgreen?style=flat-square) |
| **Netlify** | [portfolio-generat.netlify.app](https://portfolio-generat.netlify.app) | Global Edge Network | ![Active](https://img.shields.io/badge/ONLINE-brightgreen?style=flat-square) |
| **GitHub Pages** | [aetherdz.github.io/universal-portfolio-generator](https://aetherdz.github.io/universal-portfolio-generator) | Direct Branch Serving | ![Active](https://img.shields.io/badge/ONLINE-brightgreen?style=flat-square) |

---

## 💡 Overview

**PortfolioGen** is a modern, client-side web application engineered to generate developer portfolios, hacker résumés, and technical showcase sites in minutes. Designed from the ground up for speed, modularity, and privacy:

* **Zero Build Step, Zero Friction**: Pure vanilla ES6+, HTML5, and Tailwind CSS. Runs instantly in any modern web browser or through a static local file server.
* **Modular Theme Engine**: Each template is completely isolated into its own pluggable component. Adding a custom theme requires zero modifications to the core engine.
* **100% Client-Side Privacy**: No external backend or tracking database. All personal information, tokens, and projects remain strictly inside your browser's local memory.
* **First-Class Arabic RTL Support**: Complete bidirectional mirroring (`dir="rtl"`) with automatic typographic cascades (Google Fonts *Cairo* and *Tajawal*).
* **Security Researcher First**: Built-in support for Bug Bounty platforms (HackerOne, Bugcrowd, Intigriti), CVE badges, and security scorecards.

---

## ✨ Key Features

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ 🎨 7 Signature Themes (Modular & Pluggable)                                      │
│  ▸ Aether: Cyberpunk neon glow with interactive Canvas particles & physics        │
│  ▸ Terminal: Hacker CLI matrix environment with retro window headers & monospace  │
│  ▸ Minimal: Swiss typographic masterclass with generous whitespace & dark/light   │
│  ▸ Bento Grid: High-density asymmetric modular cards (Apple & Linear design)      │
│  ▸ Glassmorphic: Frosted ambient aurora glow with backdrop blur tokens & depth    │
│  ▸ Dark Premium: Obsidian midnight developer layout with subtle grid patterns     │
│  ▸ Academic: Scholarly CV format with timeline citations & serif typography       │
└───────────────────────────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────────────────────────┐
│ ⚡ Power Capabilities                                                            │
│  ▸ GitHub Sync: One-click repository fetcher with auto-extracted tech stacks      │
│  ▸ 80+ Devicon Skills: Automatic devicon-class detection with colored badges      │
│  ▸ Reactive Event Bus: Real-time debounced preview rendering with zero lag        │
│  ▸ 10 Curated Palettes: Sapphire, Dracula, Nord, Monokai, Catppuccin & Custom Hex │
│  ▸ Multi-Device Preview: Desktop, Tablet (768px), and Mobile (375px) viewports    │
│  ▸ Multi-Format Export: Single-file HTML, Production ZIP, or JSON config archive   │
│  ▸ One-Click GitHub Pages: Automated repository creation and commit via Octokit   │
│  ▸ Security Hardened: Strict URI whitelisting & DOMPurify script neutralization   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Online Execution
Open any of the production deployments linked above. No accounts or registrations required.

### 2. Local Development (Instant)
Clone the repository and serve with any local HTTP server:

```bash
# Clone the repository
git clone https://github.com/Aetherdz/universal-portfolio-generator.git portfoliogen
cd portfoliogen

# Option A: Python 3
python3 -m http.server 8080

# Option B: Node.js (npx)
npx serve .

# Option C: PHP
php -S localhost:8080
```
Then navigate to `http://localhost:8080` in your browser.

---

## 🏗️ Modular Architecture

The repository avoids monolithic code files by adopting a decoupled, component-based layout:

```
portfoliogen/
├── index.html                   # Application entry point & accessible UI shell
├── .nojekyll                    # GitHub Pages Jekyll bypass flag
├── assets/
│   └── banner.svg               # Vector brand graphic & SVG presentation
├── css/
│   └── style.css                # Obsidian design system, glassmorphism & resets
├── js/
│   ├── app.js                   # Application lifecycle, keybindings & orchestration
│   ├── design-tokens.js         # Color palettes, typography & design system tokens
│   ├── form.js                  # Reactive multi-step state machine & Event Bus
│   ├── export.js                # ZIP, standalone HTML & JSON config generators
│   ├── github.js                # Octokit GitHub Pages deployer & repo synchronizer
│   ├── i18n.js                  # Bilingual translation dictionary (English & Arabic)
│   ├── preview.js               # Sandboxed multi-viewport iframe renderer
│   ├── utils.js                 # DOMPurify sanitizer, URI whitelist & icon mappings
│   ├── themes.js                # Core ThemeRegistry facade (backwards-compatible)
│   └── themes/                  # Modular Individual Theme Components
│       ├── registry.js          # Pluggable ThemeRegistry class & lifecycle hooks
│       ├── aether.js            # Theme 1: Aether Cyberpunk Canvas
│       ├── terminal.js          # Theme 2: Hacker CLI Terminal
│       ├── minimal.js           # Theme 3: Swiss Typography Minimalist
│       ├── bento.js             # Theme 4: Modern Bento Box Grid
│       ├── glassmorphic.js      # Theme 5: Frosted Aurora Glassmorphism
│       ├── dark-premium.js      # Theme 6: Obsidian Midnight Developer
│       └── academic.js          # Theme 7: Scholarly CV & Research Timeline
└── README.md                    # Project documentation
```

---

## 🎨 The 7 Signature Themes

| ID | Theme Name | Visual Philosophy | Best Suited For | RTL Arabic | Dark / Light |
|:---:|:---|:---|:---|:---:|:---:|
| `1` | **Aether** 🪐 | Interactive canvas particle network, neon glows | Full-stack developers, tech leads | ✅ Full | ✅ Toggleable |
| `2` | **Terminal** 💻 | Monospace CRT terminal, matrix glow, Unix prompt | Hackers, Pentesting, Security researchers | ✅ Full | 🌙 Dark Core |
| `3` | **Minimal** ✨ | Pure Swiss whitespace, micro-borders, clean type | Product designers, minimalist engineers | ✅ Full | ✅ Toggleable |
| `4` | **Bento Grid** 🔲 | Asymmetric card tiles, linear micro-shadows | Multi-disciplinary developers, founders | ✅ Full | 🌙 Dark Core |
| `5` | **Glassmorphic** 🪟 | Deep radial backdrop blur, translucent glass cards | Modern frontend & UI engineers | ✅ Full | 🌙 Aurora Dark |
| `6` | **Dark Premium** 🌙 | 1px radial grid pattern, obsidian contrast | Cloud architects, SaaS engineers | ✅ Full | 🌙 Obsidian |
| `7` | **Academic** 🎓 | Timelines, formal serif headers, publication cards | Researchers, PhD candidates, academics | ✅ Full | ☀️ Formal Light |

---

## 🧩 Extensibility Guide: Adding a Custom Theme

PortfolioGen features a pluggable theme registry. You can add a new theme in under **3 minutes** without altering existing templates:

1. Create a new file in `js/themes/my-custom-theme.js`:
```javascript
ThemeRegistry.register({
  id: 'my-custom-theme',
  nameKey: 'theme.custom',
  icon: 'fas fa-sparkles',
  description: 'My custom developer template',
  render: function(data) {
    return Handlebars.compile(`
      <!DOCTYPE html>
      <html lang="{{lang}}" dir="{{dir}}">
      <head>
        <meta charset="UTF-8">
        <title>{{name}} — Portfolio</title>
        <style>
          body { font-family: sans-serif; background: {{colors.bg}}; color: {{colors.text}}; }
        </style>
      </head>
      <body>
        <h1>{{name}}</h1>
        <p>{{role}}</p>
      </body>
      </html>
    `)(data);
  }
});
```
2. Include your script in `index.html`:
```html
<script src="js/themes/my-custom-theme.js"></script>
```
3. Your theme is immediately available in the picker, preview, and export engine!

---

## 🔒 Security & Privacy Architecture

* **Zero Data Transmission**: Everything runs purely in client-side JavaScript. No form values, email addresses, or repository lists are ever sent to an external server.
* **Ephemeral GitHub PAT Token**: When using the direct GitHub Pages deployer, your Personal Access Token (`repo` scope) is retained only in browser RAM for the duration of the API call and is never cached in `localStorage` or disk.
* **XSS Defense-in-Depth**:
  - `Utils.sanitize()` strips unsafe HTML tags via **DOMPurify**.
  - `Utils.sanitizeURL()` aggressively neutralizes `javascript:`, `vbscript:`, and malicious `data:` URIs.
* **Sandboxed Live Preview**: The live iframe operates under strict sandboxing (`sandbox="allow-scripts allow-same-origin"`), ensuring total isolation between the builder UI and the rendered template.

---

## 🤝 Contributing

Contributions from the developer and open-source community are warmly welcomed!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/EpicTheme`)
3. Commit your Changes (`git commit -m 'feat: Add Nord Minimalist theme'`)
4. Push to the Branch (`git push origin feature/EpicTheme`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Crafted with precision by <b><a href="https://github.com/Aetherdz">Aether-DZ</a></b><br>
  <sub>Software Engineer · Security Researcher · AI Systems Architect</sub>
</p>
