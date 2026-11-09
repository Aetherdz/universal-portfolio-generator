/* =============================================
   js/form/step2-socials.js — Step 2: Social Channels
   Universal Portfolio Generator — Next-Gen Studio
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FormSteps = root.FormSteps || {};
    root.FormSteps.renderSocialStep = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  return function renderSocialStep(state) {
    const s = state.data.socials || {};
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

    const platforms = [
      { key: 'github', label: 'GitHub', icon: 'fab fa-github', color: 'text-mono-900 dark:text-white', ph: 'username' },
      { key: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin', color: 'text-blue-500', ph: 'username' },
      { key: 'twitter', label: 'X (Twitter)', icon: 'fab fa-x-twitter', color: 'text-mono-900 dark:text-white', ph: 'username' },
      { key: 'devto', label: 'DEV Community', icon: 'fab fa-dev', color: 'text-mono-800 dark:text-mono-200', ph: 'username' },
      { key: 'hackerone', label: 'HackerOne', icon: 'fas fa-shield-halved', color: 'text-rose-500', ph: 'username' },
      { key: 'telegram', label: 'Telegram', icon: 'fab fa-telegram', color: 'text-sky-400', ph: 'username' },
      { key: 'medium', label: 'Medium', icon: 'fab fa-medium', color: 'text-mono-900 dark:text-white', ph: '@username' },
      { key: 'blog', label: isAr ? 'الموقع الشخصي' : 'Personal Website', icon: 'fas fa-globe', color: 'text-emerald-500', ph: 'https://...' }
    ];

    return `
      <!-- Step Header -->
      <div class="flex items-center justify-between pb-3 mb-4 border-b border-mono-200 dark:border-white/10">
        <div>
          <h2 class="text-base font-bold text-mono-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-share-nodes text-blue-500"></i>
            <span>${I18N.t('form.step.social')}</span>
          </h2>
          <p class="text-xs text-mono-500 dark:text-mono-400 mt-0.5">${I18N.t('form.step.social_desc')}</p>
        </div>
      </div>

      <!-- Socials Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        ${platforms.map(p => `
          <div class="form-group mb-0">
            <label class="form-label flex items-center gap-1.5">
              <i class="${p.icon} ${p.color} text-sm"></i>
              <span>${p.label}</span>
            </label>
            <input class="form-input text-xs" data-social="${p.key}" value="${Utils.sanitize(s[p.key] || '')}" placeholder="${p.ph}" oninput="FormState.data.socials['${p.key}']=this.value;triggerPreview();">
          </div>
        `).join('')}
      </div>

      <!-- Step Navigation Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-mono-200 dark:border-white/10 mt-6">
        <button type="button" class="btn btn-secondary px-5" onclick="prevStep()">
          <i class="fas fa-arrow-left text-xs"></i>
          <span>${I18N.t('btn.prev')}</span>
        </button>
        <button type="button" class="btn btn-primary px-6" onclick="nextStep()">
          <span>${I18N.t('btn.next')}</span>
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
    `;
  };
});
