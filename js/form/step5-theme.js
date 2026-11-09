/* =============================================
   js/form/step5-theme.js — Step 5: Visual Theme, Tokens & Ship Station
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FormSteps = root.FormSteps || {};
    root.FormSteps.renderThemeStep = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  return function renderThemeStep(state) {
    const d = state.data;
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
    const themes = (typeof ThemeRegistry !== 'undefined') ? ThemeRegistry.getAll() : [];

    const palettes = (typeof DesignSystem !== 'undefined' && DesignSystem.palettes)
      ? Object.values(DesignSystem.palettes)
      : [
          { id: 'default', name: 'Sapphire Modern', primary: '#2563EB', accent: '#D97706', bg: '#F8FAFC' },
          { id: 'dracula', name: 'Dracula Dark', primary: '#BD93F9', accent: '#FF79C6', bg: '#282A36' },
          { id: 'nord', name: 'Nordic Frost', primary: '#88C0D0', accent: '#BF616A', bg: '#ECEFF4' },
          { id: 'monokai', name: 'Monokai Pro', primary: '#A6E22E', accent: '#FD971F', bg: '#272822' },
          { id: 'tailwind', name: 'Modern Sky', primary: '#3B82F6', accent: '#10B981', bg: '#F8FAFC' },
          { id: 'night', name: 'Night Owl', primary: '#82AAFF', accent: '#C792EA', bg: '#011627' },
          { id: 'rose', name: 'Crimson Rose', primary: '#E11D48', accent: '#FB7185', bg: '#FFF1F2' },
          { id: 'emerald', name: 'Jade Forest', primary: '#059669', accent: '#10B981', bg: '#ECFDF5' },
          { id: 'cyberpunk', name: 'Cyberpunk Neon', primary: '#00FFF0', accent: '#FF00AA', bg: '#0A0A1A' },
          { id: 'catppuccin', name: 'Catppuccin Pastel', primary: '#89B4FA', accent: '#F5C2E7', bg: '#1E1E2E' }
        ];

    const currentColors = d.customColors || { primary: '#3b82f6', accent: '#06b6d4', bg: '#07080a' };
    const glass = d.glassmorphism || { blur: 16, opacity: 0.08, radius: 24 };

    const fonts = [
      { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans · Contemporary Linear' },
      { id: 'Space Grotesk', label: 'Space Grotesk · Cybernetic Display' },
      { id: 'Inter', label: 'Inter · Swiss High-Legibility' },
      { id: 'JetBrains Mono', label: 'JetBrains Mono · Terminal Code' },
      { id: 'Fira Code', label: 'Fira Code · Hacker Monospace' },
      { id: 'Crimson Pro', label: 'Crimson Pro · Scholarly Editorial Serif' },
      { id: 'Outfit', label: 'Outfit · Geometric Modern' }
    ];

    const isTheme5 = d.theme === 5;

    return `
      <!-- Step Header -->
      <div class="studio-step-header">
        <div>
          <h2 class="studio-step-title">
            <span class="step-icon-badge"><i class="fas fa-palette"></i></span>
            <span>${I18N.t('form.step.theme')}</span>
          </h2>
          <p class="studio-step-desc">${I18N.t('form.step.theme_desc')}</p>
        </div>
        <div class="channel-count-badge">
          <span>Theme ${d.theme || 1}</span>
          <span class="channel-count-label">${isAr ? 'القالب النشط' : 'Active'}</span>
        </div>
      </div>

      <!-- 7 Signature Themes Grid -->
      <div class="theme-selection-section mb-6">
        <label class="section-label">${isAr ? 'اختر القالب الهندسي (7 قوالب متقدمة):' : 'Select Signature Architecture (7 Elevated Themes):'}</label>
        <div class="theme-selector-grid">
          ${themes.map(t => {
            const isSel = (d.theme === t.id);
            return `
              <div class="theme-picker-card${isSel ? ' active' : ''}" onclick="selectTheme(${t.id})">
                <div class="theme-picker-header">
                  <div class="theme-icon-circle">
                    <i class="${t.icon || 'fas fa-wand-magic-sparkles'}"></i>
                  </div>
                  ${isSel ? `
                    <span class="theme-active-tag">
                      <span class="traffic-dot-pulse"></span>
                      <span>Active</span>
                    </span>
                  ` : ''}
                </div>
                <div class="theme-card-body">
                  <div class="theme-name">${I18N.t(t.nameKey) || ('Theme ' + t.id)}</div>
                  <div class="theme-desc">${t.description || ''}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 10 Curated Color Palettes -->
      <div class="palette-selection-section mb-6">
        <label class="section-label">${isAr ? 'لوحات الألوان المدروسة (10 لوحات احترافية):' : 'Curated Color Palettes (10 Design-System Profiles):'}</label>
        <div class="palette-swatches-grid">
          ${palettes.map(p => `
            <button type="button" class="palette-btn" onclick="applyColorPalette('${p.primary}', '${p.accent}', '${p.bg}')" title="${p.name}">
              <div class="palette-dots-row">
                <span class="palette-swatch-dot" style="background:${p.primary}"></span>
                <span class="palette-swatch-dot" style="background:${p.accent}"></span>
                <span class="palette-swatch-dot" style="background:${p.bg};border:1px solid rgba(255,255,255,0.2)"></span>
              </div>
              <div class="palette-label-text">${p.name}</div>
            </button>
          `).join('')}
        </div>

        <!-- Custom Hex Color Overrides -->
        <div class="custom-hex-row mt-3">
          <div class="custom-hex-field">
            <label class="form-label-xs">${isAr ? 'اللون الرئيسي' : 'Primary Hex'}</label>
            <div class="hex-picker-wrap">
              <input type="color" class="color-picker-input" value="${currentColors.primary || '#3b82f6'}" oninput="updateCustomColor('primary', this.value)">
              <input type="text" class="form-input text-xs font-mono" value="${currentColors.primary || '#3b82f6'}" onchange="updateCustomColor('primary', this.value)">
            </div>
          </div>
          <div class="custom-hex-field">
            <label class="form-label-xs">${isAr ? 'لون التوهج' : 'Accent Glow'}</label>
            <div class="hex-picker-wrap">
              <input type="color" class="color-picker-input" value="${currentColors.accent || '#06b6d4'}" oninput="updateCustomColor('accent', this.value)">
              <input type="text" class="form-input text-xs font-mono" value="${currentColors.accent || '#06b6d4'}" onchange="updateCustomColor('accent', this.value)">
            </div>
          </div>
          <div class="custom-hex-field">
            <label class="form-label-xs">${isAr ? 'خلفية الصفحة' : 'Background'}</label>
            <div class="hex-picker-wrap">
              <input type="color" class="color-picker-input" value="${currentColors.bg || '#07080a'}" oninput="updateCustomColor('bg', this.value)">
              <input type="text" class="form-input text-xs font-mono" value="${currentColors.bg || '#07080a'}" onchange="updateCustomColor('bg', this.value)">
            </div>
          </div>
        </div>
      </div>

      <!-- Typography & Visual Toggles -->
      <div class="form-grid-2 mb-6">
        <div class="form-group mb-0">
          <label class="form-label">${isAr ? 'نوع الخط الأساسي (Typography)' : 'Primary Typography'}</label>
          <select class="form-select text-xs" onchange="FormState.data.fontFamily=this.value;triggerPreview();">
            ${fonts.map(f => `
              <option value="${f.id}" ${d.fontFamily === f.id ? 'selected' : ''}>${f.label}</option>
            `).join('')}
          </select>
        </div>

        <div class="toggles-card">
          <label class="toggle-control-item">
            <div>
              <div class="toggle-title">${isAr ? 'حركات الظهور (Scroll Animations)' : 'AOS Smooth Motion'}</div>
              <div class="toggle-sub">${isAr ? 'تأثيرات التمرير التفاعلية' : 'Hardware-accelerated viewport transitions'}</div>
            </div>
            <input type="checkbox" class="wb-checkbox" ${d.animations !== false ? 'checked' : ''} onchange="FormState.data.animations=this.checked;triggerPreview();">
          </label>

          <label class="toggle-control-item border-top-subtle">
            <div>
              <div class="toggle-title">${isAr ? 'قسم التواصل السريع' : 'Interactive Contact Section'}</div>
              <div class="toggle-sub">${isAr ? 'نموذج المراسلة والبريد المباشر' : 'Direct email & inquiry dispatch card'}</div>
            </div>
            <input type="checkbox" class="wb-checkbox" ${d.contactForm !== false ? 'checked' : ''} onchange="FormState.data.contactForm=this.checked;triggerPreview();">
          </label>
        </div>
      </div>

      <!-- Glassmorphic Customization Sliders (Enabled for Theme 5 or fine-tuning) -->
      <div class="glass-controls-panel mb-6" style="${isTheme5 ? '' : 'opacity:0.85'}">
        <div class="glass-panel-title">
          <i class="fas fa-sliders text-accent"></i>
          <span>${isAr ? 'معايير الزجاج الشفاف (Glassmorphism Precision)' : 'Glassmorphism Controls'}</span>
          ${isTheme5 ? '<span class="counter-pill">Active for Theme 5</span>' : '<span class="form-hint">(Theme 5 Frosted Glass)</span>'}
        </div>
        <div class="form-grid-3 mt-3">
          <div class="slider-group">
            <div class="slider-head">
              <span class="slider-label">${isAr ? 'درجة الضبابية' : 'Backdrop Blur'}</span>
              <span class="slider-val" id="val-glass-blur">${glass.blur || 16}px</span>
            </div>
            <input type="range" class="wb-slider" min="4" max="40" value="${glass.blur || 16}" oninput="updateGlassmorphism('blur', this.value)">
          </div>

          <div class="slider-group">
            <div class="slider-head">
              <span class="slider-label">${isAr ? 'شفافية السطح' : 'Surface Opacity'}</span>
              <span class="slider-val" id="val-glass-opacity">${glass.opacity || 0.08}</span>
            </div>
            <input type="range" class="wb-slider" min="0.02" max="0.30" step="0.01" value="${glass.opacity || 0.08}" oninput="updateGlassmorphism('opacity', this.value)">
          </div>

          <div class="slider-group">
            <div class="slider-head">
              <span class="slider-label">${isAr ? 'استدارة الحواف' : 'Border Radius'}</span>
              <span class="slider-val" id="val-glass-radius">${glass.radius || 24}px</span>
            </div>
            <input type="range" class="wb-slider" min="8" max="40" value="${glass.radius || 24}" oninput="updateGlassmorphism('radius', this.value)">
          </div>
        </div>
      </div>

      <!-- Export & Generation Hub -->
      <div class="deploy-hub-card mb-6">
        <div class="deploy-hub-head">
          <div class="deploy-hub-title">
            <i class="fas fa-rocket text-accent"></i>
            <span>${isAr ? 'محطة التصدير والنشر الفوري' : 'Zero-Dependency Export & Deployment Hub'}</span>
          </div>
          <span class="deploy-badge">${isAr ? '100% عميل مستقل' : '100% Client-Side'}</span>
        </div>

        <div class="export-actions-grid">
          <button type="button" class="btn btn-primary" onclick="downloadHTML()">
            <i class="fas fa-file-code"></i>
            <span>${isAr ? 'تحميل كـ HTML مستقل' : 'Download Standalone HTML'}</span>
          </button>
          <button type="button" class="btn btn-secondary" onclick="downloadZIP()">
            <i class="fas fa-file-zipper"></i>
            <span>${isAr ? 'حزمة ZIP كاملة للإنتاج' : 'Download Production ZIP'}</span>
          </button>
          <button type="button" class="btn btn-secondary" onclick="copyHTML()">
            <i class="fas fa-copy"></i>
            <span>${isAr ? 'نسخ كود HTML' : 'Copy HTML Code'}</span>
          </button>
          <button type="button" class="btn btn-secondary" onclick="exportConfig()">
            <i class="fas fa-arrow-down"></i>
            <span>${isAr ? 'تصدير JSON' : 'Export JSON Config'}</span>
          </button>
          <button type="button" class="btn btn-secondary" onclick="importConfig()">
            <i class="fas fa-arrow-up"></i>
            <span>${isAr ? 'استيراد JSON' : 'Import JSON Config'}</span>
          </button>
        </div>

        <!-- Direct GitHub Pages Auto-Deployer -->
        <div class="github-deploy-box mt-4">
          <div class="github-deploy-head">
            <div class="github-deploy-lead">
              <i class="fab fa-github text-lg"></i>
              <div>
                <div class="font-bold text-xs">${isAr ? 'النشر المباشر على GitHub Pages' : 'Direct GitHub Pages Auto-Deployer'}</div>
                <div class="text-[11px] text-muted">${isAr ? 'ينشئ مستودع portfolio وينشر ملف index.html فوراً بدون أي أدوات خارجية' : 'Creates or updates your portfolio repository and configures GitHub Pages via REST API.'}</div>
              </div>
            </div>
          </div>

          <div class="form-grid-2 mt-3">
            <div class="form-group mb-0">
              <label class="form-label-xs">${isAr ? 'اسم مستخدم GitHub' : 'GitHub Username'}</label>
              <input type="text" id="deploy-username" class="form-input text-xs" value="${Utils.sanitize(d.socials?.github || '')}" placeholder="e.g. torvalds">
            </div>
            <div class="form-group mb-0">
              <label class="form-label-xs">${isAr ? 'رمز الوصول الشخصي (PAT مع صلاحية repo)' : 'Personal Access Token (PAT with repo scope)'}</label>
              <input type="password" id="pat-input" class="form-input text-xs font-mono" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx">
            </div>
          </div>

          <div class="flex-between mt-3">
            <span class="token-security-hint">
              <i class="fas fa-shield-halved text-emerald-400"></i>
              <span>${isAr ? 'الرمز مؤقت في ذاكرة المتصفح فقط ولا يتم حفظه أبداً.' : 'Ephemeral token: transmitted via HTTPS directly to GitHub and never stored.'}</span>
            </span>
            <button type="button" class="btn btn-success btn-sm px-4" onclick="deployToGitHub()">
              <i class="fas fa-cloud-arrow-up"></i>
              <span>${isAr ? 'نشر على GitHub Pages' : 'Deploy to GitHub Pages'}</span>
            </button>
          </div>

          <div id="deploy-result" class="mt-3"></div>
        </div>
      </div>

      <!-- Step Navigation Footer -->
      <div class="step-nav-footer">
        <button type="button" class="btn btn-secondary px-5" onclick="prevStep()">
          <i class="fas fa-arrow-left text-xs"></i>
          <span>${I18N.t('btn.prev')}</span>
        </button>
        <button type="button" class="btn btn-success px-6" onclick="downloadHTML()">
          <i class="fas fa-wand-magic-sparkles text-xs"></i>
          <span>${isAr ? 'إنهاء وتحميل الموقع' : 'Finish & Export HTML'}</span>
        </button>
      </div>
    `;
  };
});
