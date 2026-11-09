/* =============================================
   js/form/step1-profile.js — Step 1: Personal Profile
   Universal Portfolio Generator — Next-Gen Studio
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
      'Full-Stack Developer', 'Frontend Developer', 'Backend Developer',
      'Mobile Developer', 'DevOps / Cloud Engineer', 'Security Researcher',
      'AI / Machine Learning Engineer', 'UI/UX Designer', 'Data Scientist'
    ];

    return `
      <!-- Step Header -->
      <div class="flex items-center justify-between pb-3 mb-4 border-b border-mono-200 dark:border-white/10">
        <div>
          <h2 class="text-base font-bold text-mono-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-user text-blue-500"></i>
            <span>${I18N.t('form.step.profile')}</span>
          </h2>
          <p class="text-xs text-mono-500 dark:text-mono-400 mt-0.5">${I18N.t('form.step.profile_desc')}</p>
        </div>
        <div class="flex items-center gap-1.5">
          <button type="button" class="btn btn-secondary btn-sm" onclick="FormState.loadDemoData()" title="Load Sample Data">
            <i class="fas fa-wand-magic-sparkles text-blue-500"></i>
            <span class="hidden sm:inline">${I18N.t('btn.demo')}</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm btn-icon" onclick="FormState.clearFormData()" title="Reset Form">
            <i class="fas fa-rotate-left text-mono-400 hover:text-rose-500"></i>
          </button>
        </div>
      </div>

      <!-- Avatar & Photo Uploader -->
      <div class="p-3.5 mb-4 rounded-xl bg-mono-50 dark:bg-white/[0.03] border border-mono-200 dark:border-white/10 flex items-center gap-4">
        <div class="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0" id="avatar-preview-box">
          ${d.photo ? `<img src="${Utils.sanitizeURL(d.photo)}" class="w-full h-full object-cover" alt="Avatar">` : `<span>${initials}</span>`}
        </div>
        <div class="flex-1 min-w-0">
          <label class="block text-xs font-semibold text-mono-700 dark:text-mono-300 mb-1">${isAr ? 'الصورة الشخصية أو الرابط' : 'Profile Picture / Avatar'}</label>
          <div class="flex gap-2">
            <input type="text" id="input-photo" class="form-input text-xs py-1.5" value="${Utils.sanitize(d.photo || '')}" placeholder="https://example.com/avatar.jpg" oninput="FormState.data.photo=this.value;triggerPreview();">
            <label class="btn btn-secondary btn-sm cursor-pointer flex-shrink-0" title="Upload local image">
              <i class="fas fa-upload text-xs"></i>
              <input type="file" id="file-photo" class="hidden" accept="image/*" onchange="handlePhotoUpload(this)">
            </label>
          </div>
          <span class="text-[11px] text-mono-400 mt-1 block">${isAr ? 'تتم معالجة وضغط الصورة محلياً داخل المتصفح' : 'Processed securely inside your browser'}</span>
        </div>
      </div>

      <!-- Full Name & Primary Role -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.fullName')}</label>
          <input class="form-input" id="input-name" value="${Utils.sanitize(d.name)}" placeholder="${I18N.t('form.profile.placeholder.name')}" autocomplete="name" oninput="FormState.data.name=this.value;triggerPreview();">
        </div>
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.role')}</label>
          <input class="form-input" id="input-role-custom" value="${Utils.sanitize(d.role || '')}" placeholder="e.g. Full-Stack Architect" oninput="FormState.data.role=this.value;triggerPreview();">
        </div>
      </div>

      <!-- Role Preset Chips -->
      <div class="mb-3">
        <label class="text-[11px] font-semibold text-mono-400 uppercase tracking-wider block mb-1.5">${isAr ? 'أو اختر دوراً سريعاً:' : 'Quick Role Presets:'}</label>
        <div class="role-grid">
          ${roles.map(r => {
            const sel = d.role === r ? ' selected' : '';
            return `<div class="role-chip${sel}" onclick="document.querySelectorAll('.role-chip').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');FormState.data.role='${r}';document.getElementById('input-role-custom').value='${r}';triggerPreview();">${r}</div>`;
          }).join('')}
        </div>
      </div>

      <!-- Bio / Tagline -->
      <div class="form-group mb-3">
        <label class="form-label">${I18N.t('form.profile.bio')}</label>
        <textarea class="form-textarea" id="input-bio" placeholder="${I18N.t('form.profile.placeholder.bio')}" oninput="FormState.data.bio=this.value;triggerPreview();">${Utils.sanitize(d.bio)}</textarea>
      </div>

      <!-- Location & Email -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.location')}</label>
          <input class="form-input" id="input-location" value="${Utils.sanitize(d.location)}" placeholder="e.g. San Francisco / Remote" oninput="FormState.data.location=this.value;triggerPreview();">
        </div>
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.email')}</label>
          <input type="email" class="form-input" id="input-email" value="${Utils.sanitize(d.email)}" placeholder="you@domain.com" autocomplete="email" oninput="FormState.data.email=this.value;triggerPreview();">
        </div>
      </div>

      <!-- Step Navigation Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-mono-200 dark:border-white/10 mt-6">
        <div></div>
        <button type="button" class="btn btn-primary px-6" onclick="nextStep()">
          <span>${I18N.t('btn.next')}</span>
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
    `;
  };
});
