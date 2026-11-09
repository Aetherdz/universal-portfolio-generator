/* =============================================
   js/form/step1-profile.js — Step 1: Profile & Identity
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FormSteps = root.FormSteps || {};
    root.FormSteps.renderProfileStep = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  return function renderProfileStep(state) {
    const d = state.data;
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
    const initials = (typeof Utils !== 'undefined') ? Utils.getInitials(d.name) : 'DEV';

    const roles = [
      'Full-Stack Developer', 'Cloud & DevOps Architect', 'Security Researcher',
      'Bug Bounty Hunter', 'Systems / Rust Engineer', 'Backend Specialist',
      'Creative UI Technologist', 'AI / ML Researcher', 'Mobile Engineer'
    ];

    const bioLength = (d.bio || '').length;

    return `
      <!-- Step Header -->
      <div class="studio-step-header">
        <div>
          <h2 class="studio-step-title">
            <span class="step-icon-badge"><i class="fas fa-user-astronaut"></i></span>
            <span>${I18N.t('form.step.profile')}</span>
          </h2>
          <p class="studio-step-desc">${I18N.t('form.step.profile_desc')}</p>
        </div>
        <div class="studio-step-actions">
          <button type="button" class="btn btn-secondary btn-sm" onclick="FormState.loadDemoData()" title="${isAr ? 'تحميل بيانات تجريبية' : 'Load High-Craft Sample'}">
            <i class="fas fa-wand-magic-sparkles text-accent"></i>
            <span>${I18N.t('btn.demo')}</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm btn-icon" onclick="FormState.clearFormData()" title="${isAr ? 'إعادة ضبط النموذج' : 'Reset Form'}">
            <i class="fas fa-rotate-left"></i>
          </button>
        </div>
      </div>

      <!-- Avatar & Photo Station -->
      <div class="avatar-upload-card">
        <div class="avatar-preview-box" id="avatar-preview-box">
          ${d.photo ? `<img src="${Utils.sanitizeURL(d.photo)}" alt="Avatar">` : `<span class="avatar-fallback-text">${initials}</span>`}
        </div>
        <div class="avatar-meta">
          <label class="form-label">${isAr ? 'الصورة الشخصية أو الرابط' : 'Profile Picture / Avatar URL'}</label>
          <div class="avatar-input-row">
            <input type="text" id="input-photo" class="form-input text-xs" value="${Utils.sanitize(d.photo || '')}" placeholder="https://example.com/avatar.jpg" oninput="FormState.data.photo=this.value;triggerPreview();">
            <label class="btn btn-secondary btn-sm avatar-upload-btn" title="${isAr ? 'رفع صورة من الجهاز' : 'Upload image from disk'}">
              <i class="fas fa-arrow-up-from-bracket"></i>
              <span>${isAr ? 'رفع' : 'Upload'}</span>
              <input type="file" id="file-photo" class="hidden-file-input" accept="image/*" onchange="handlePhotoUpload(this)">
            </label>
            ${d.photo ? `
              <button type="button" class="btn btn-secondary btn-sm btn-danger-hover" onclick="removePhoto()" title="${isAr ? 'إزالة الصورة' : 'Remove Photo'}">
                <i class="fas fa-trash-can"></i>
              </button>
            ` : ''}
          </div>
          <span class="form-hint">${isAr ? 'تتم معالجة الصورة محلياً داخل المتصفح بأمان كامل (بدون تخزين سحابي).' : 'Processed securely in-browser via Canvas Base64 with zero server storage.'}</span>
        </div>
      </div>

      <!-- Full Name & Primary Role -->
      <div class="form-grid-2 mb-3">
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.fullName')}</label>
          <input class="form-input" id="input-name" value="${Utils.sanitize(d.name)}" placeholder="${I18N.t('form.profile.placeholder.name')}" autocomplete="name" oninput="FormState.data.name=this.value;triggerPreview();">
        </div>
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.role')}</label>
          <input class="form-input" id="input-role-custom" value="${Utils.sanitize(d.role || '')}" placeholder="e.g. Cloud & Systems Architect" oninput="FormState.data.role=this.value;triggerPreview();">
        </div>
      </div>

      <!-- Quick Role Presets -->
      <div class="form-group mb-3">
        <label class="form-label-muted">${isAr ? 'أو اختر دوراً سريعاً بنقرة واحدة:' : 'Quick Role Presets:'}</label>
        <div class="role-chip-grid">
          ${roles.map(r => {
            const sel = d.role === r ? ' selected' : '';
            return `<button type="button" class="role-chip${sel}" onclick="setPresetRole('${r}')">${r}</button>`;
          }).join('')}
        </div>
      </div>

      <!-- Bio / Tagline with Live Counter -->
      <div class="form-group mb-3">
        <div class="flex-between mb-1">
          <label class="form-label mb-0">${I18N.t('form.profile.bio')}</label>
          <span class="bio-counter" id="bio-counter">${bioLength} / 280</span>
        </div>
        <textarea class="form-textarea" id="input-bio" placeholder="${I18N.t('form.profile.placeholder.bio')}" oninput="updateBio(this.value)">${Utils.sanitize(d.bio)}</textarea>
      </div>

      <!-- Location & Email -->
      <div class="form-grid-2 mb-4">
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.location')}</label>
          <input class="form-input" id="input-location" value="${Utils.sanitize(d.location)}" placeholder="e.g. San Francisco, CA / Remote" oninput="FormState.data.location=this.value;triggerPreview();">
        </div>
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.email')}</label>
          <input type="email" class="form-input" id="input-email" value="${Utils.sanitize(d.email)}" placeholder="you@example.com" autocomplete="email" oninput="FormState.data.email=this.value;triggerPreview();">
        </div>
      </div>

      <!-- Step Navigation Footer -->
      <div class="step-nav-footer">
        <div></div>
        <button type="button" class="btn btn-primary px-6" onclick="nextStep()">
          <span>${I18N.t('btn.next')}</span>
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
    `;
  };
});
