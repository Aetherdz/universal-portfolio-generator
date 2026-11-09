/* =============================================
   js/form/step5-theme.js — Step 5: Visual Theme & Export
   Universal Portfolio Generator — Next-Gen Studio
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

    const palettes = [
      { id: 'sapphire', name: 'Sapphire Modern', primary: '#2563EB', accent: '#D97706', bg: '#030712' },
      { id: 'emerald', name: 'Emerald Cyber', primary: '#10B981', accent: '#3B82F6', bg: '#030712' },
      { id: 'violet', name: 'Neon Violet', primary: '#8B5CF6', accent: '#EC4899', bg: '#030712' },
      { id: 'amber', name: 'Golden Amber', primary: '#F59E0B', accent: '#EF4444', bg: '#030712' },
      { id: 'cyan', name: 'Cyberpunk Cyan', primary: '#06B6D4', accent: '#F43F5E', bg: '#030712' }
    ];

    return `
      <!-- Step Header -->
      <div class="flex items-center justify-between pb-3 mb-4 border-b border-mono-200 dark:border-white/10">
        <div>
          <h2 class="text-base font-bold text-mono-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-palette text-blue-500"></i>
            <span>${I18N.t('form.step.theme')}</span>
          </h2>
          <p class="text-xs text-mono-500 dark:text-mono-400 mt-0.5">${I18N.t('form.step.theme_desc')}</p>
        </div>
      </div>

      <!-- 7 Visual Theme Cards Grid -->
      <div class="mb-5">
        <label class="text-[11px] font-bold text-mono-400 uppercase tracking-wider block mb-2">${isAr ? 'اختر القالب البصري (7 قوالب متقدمة)' : 'Select Design Theme (7 Elevated Themes)'}</label>
        <div class="theme-grid">
          ${themes.map(t => {
            const isSel = (d.theme === t.id) ? ' selected' : '';
            return `
              <div class="theme-card${isSel}" onclick="selectTheme(${t.id})">
                <div class="flex items-center justify-between">
                  <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm">
                    <i class="${t.icon || 'fas fa-wand-magic-sparkles'}"></i>
                  </div>
                  ${isSel ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">Active</span>' : ''}
                </div>
                <div>
                  <div class="font-bold text-xs text-mono-900 dark:text-white">${I18N.t(t.nameKey) || ('Theme ' + t.id)}</div>
                  <div class="text-[11px] text-mono-400 leading-tight mt-0.5 line-clamp-2">${t.description || ''}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Color Palettes -->
      <div class="mb-5 p-3.5 rounded-xl bg-mono-50 dark:bg-white/[0.03] border border-mono-200 dark:border-white/10">
        <label class="text-[11px] font-bold text-mono-400 uppercase tracking-wider block mb-2">${isAr ? 'لوحة الألوان المتناسقة' : 'Curated Color Palette'}</label>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
          ${palettes.map(p => `
            <button type="button" class="p-2 rounded-lg border border-mono-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-left hover:border-blue-400 transition" onclick="applyColorPalette('${p.primary}', '${p.accent}', '${p.bg}')">
              <div class="flex gap-1.5 mb-1.5">
                <span class="w-3.5 h-3.5 rounded-full" style="background:${p.primary}"></span>
                <span class="w-3.5 h-3.5 rounded-full" style="background:${p.accent}"></span>
              </div>
              <div class="text-[11px] font-bold text-mono-700 dark:text-mono-300 truncate">${p.name}</div>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Font Family & Animations -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div class="form-group mb-0">
          <label class="form-label">${isAr ? 'عائلة الخط الأساسي' : 'Primary Typography'}</label>
          <select class="form-select text-xs" onchange="FormState.data.fontFamily=this.value;triggerPreview();">
            <option value="Inter" ${d.fontFamily === 'Inter' ? 'selected' : ''}>Inter / Modern Clean</option>
            <option value="Space Grotesk" ${d.fontFamily === 'Space Grotesk' ? 'selected' : ''}>Space Grotesk / Tech Monospace</option>
            <option value="Plus Jakarta Sans" ${d.fontFamily === 'Plus Jakarta Sans' ? 'selected' : ''}>Plus Jakarta Sans / Linear</option>
            <option value="Crimson Pro" ${d.fontFamily === 'Crimson Pro' ? 'selected' : ''}>Crimson Pro / Scholarly Serif</option>
            <option value="Fira Code" ${d.fontFamily === 'Fira Code' ? 'selected' : ''}>Fira Code / Hacker Terminal</option>
          </select>
        </div>
        <div class="form-group mb-0 flex items-center justify-between p-2.5 rounded-lg border border-mono-200 dark:border-white/10 bg-mono-50 dark:bg-white/[0.03]">
          <div>
            <div class="text-xs font-bold text-mono-900 dark:text-white">${isAr ? 'تأثيرات الحركة (Scroll Animations)' : 'AOS Animations'}</div>
            <div class="text-[11px] text-mono-400">${isAr ? 'حركات الظهور السلسة عند التمرير' : 'Smooth micro-interactions'}</div>
          </div>
          <input type="checkbox" class="w-4 h-4 rounded text-blue-600" ${d.animations !== false ? 'checked' : ''} onchange="FormState.data.animations=this.checked;triggerPreview();">
        </div>
      </div>

      <!-- Export & Generation Hub -->
      <div class="p-4 rounded-xl bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/20 mb-4">
        <div class="text-xs font-bold text-mono-900 dark:text-white mb-2 flex items-center gap-1.5">
          <i class="fas fa-rocket text-blue-500"></i>
          <span>${isAr ? 'تصدير ونشر المعرض الشخصي' : 'Export & Deployment Station'}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button type="button" class="btn btn-primary w-full py-2.5 text-xs shadow-md" onclick="downloadHTML()">
            <i class="fas fa-file-code"></i>
            <span>${isAr ? 'تحميل كـ HTML مستقل' : 'Download HTML'}</span>
          </button>
          <button type="button" class="btn btn-secondary w-full py-2.5 text-xs shadow-sm" onclick="downloadZIP()">
            <i class="fas fa-file-zipper"></i>
            <span>${isAr ? 'حزمة ZIP كاملة' : 'Download ZIP'}</span>
          </button>
          <button type="button" class="btn btn-secondary w-full py-2.5 text-xs shadow-sm" onclick="copyHTML()">
            <i class="fas fa-copy"></i>
            <span>${isAr ? 'نسخ كود HTML' : 'Copy HTML'}</span>
          </button>
        </div>
      </div>

      <!-- Step Navigation Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-mono-200 dark:border-white/10 mt-6">
        <button type="button" class="btn btn-secondary px-5" onclick="prevStep()">
          <i class="fas fa-arrow-left text-xs"></i>
          <span>${I18N.t('btn.prev')}</span>
        </button>
        <button type="button" class="btn btn-success px-6 shadow-md" onclick="downloadHTML()">
          <i class="fas fa-wand-magic-sparkles text-xs"></i>
          <span>${isAr ? 'إنهاء وتحميل الملف' : 'Finish & Export'}</span>
        </button>
      </div>
    `;
  };
});
