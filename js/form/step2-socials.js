/* =============================================
   js/form/step2-socials.js — Step 2: Network & Channels
   Universal Portfolio Studio — v3.8 Workbench Architecture
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
      { key: 'github', label: 'GitHub', icon: 'fab fa-github', ph: 'username', prefix: 'github.com/' },
      { key: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin-in', ph: 'username', prefix: 'linkedin.com/in/' },
      { key: 'twitter', label: 'X (Twitter)', icon: 'fab fa-x-twitter', ph: 'handle', prefix: 'x.com/' },
      { key: 'telegram', label: 'Telegram', icon: 'fab fa-telegram', ph: 'username', prefix: 't.me/' },
      { key: 'hackerone', label: 'HackerOne', icon: 'fas fa-shield-halved', ph: 'username', prefix: 'hackerone.com/' },
      { key: 'bugcrowd', label: 'Bugcrowd', icon: 'fas fa-bug', ph: 'username', prefix: 'bugcrowd.com/' },
      { key: 'tryhackme', label: 'TryHackMe', icon: 'fas fa-mask', ph: 'username', prefix: 'tryhackme.com/p/' },
      { key: 'hackthebox', label: 'HackTheBox', icon: 'fas fa-cube', ph: 'user ID', prefix: 'hackthebox.com/' },
      { key: 'devto', label: 'DEV Community', icon: 'fab fa-dev', ph: 'username', prefix: 'dev.to/' },
      { key: 'medium', label: 'Medium', icon: 'fab fa-medium', ph: 'username', prefix: 'medium.com/@' },
      { key: 'stackoverflow', label: 'Stack Overflow', icon: 'fab fa-stack-overflow', ph: 'user ID', prefix: 'users/' },
      { key: 'leetcode', label: 'LeetCode', icon: 'fas fa-code', ph: 'username', prefix: 'leetcode.com/u/' },
      { key: 'youtube', label: 'YouTube', icon: 'fab fa-youtube', ph: 'channel', prefix: 'youtube.com/@' },
      { key: 'blog', label: isAr ? 'الموقع الشخصي / المدونة' : 'Personal Website / Blog', icon: 'fas fa-globe', ph: 'https://yourdomain.com', prefix: '' }
    ];

    const connectedCount = Object.values(s).filter(v => v && String(v).trim().length > 0).length;

    return `
      <!-- Step Header -->
      <div class="studio-step-header">
        <div>
          <h2 class="studio-step-title">
            <span class="step-icon-badge"><i class="fas fa-network-wired"></i></span>
            <span>${I18N.t('form.step.social')}</span>
          </h2>
          <p class="studio-step-desc">${I18N.t('form.step.social_desc')}</p>
        </div>
        <div class="channel-count-badge">
          <span>${connectedCount} / ${platforms.length}</span>
          <span class="channel-count-label">${isAr ? 'متصل' : 'Connected'}</span>
        </div>
      </div>

      <!-- Social Channels 2-Col Grid -->
      <div class="social-input-grid">
        ${platforms.map(p => {
          const val = Utils.sanitize(s[p.key] || '');
          const isFilled = Boolean(val);
          return `
            <div class="social-input-card${isFilled ? ' filled' : ''}">
              <div class="social-card-lead">
                <span class="social-icon-box"><i class="${p.icon}"></i></span>
                <span class="social-label-text">${p.label}</span>
              </div>
              <div class="social-input-field-wrap">
                ${p.prefix ? `<span class="social-prefix">${p.prefix}</span>` : ''}
                <input class="form-input text-xs" data-social="${p.key}" value="${val}" placeholder="${p.ph}" oninput="updateSocialChannel('${p.key}', this.value)">
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Step Navigation Footer -->
      <div class="step-nav-footer">
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
