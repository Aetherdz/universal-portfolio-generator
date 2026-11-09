/* =============================================
   js/form/step4-projects.js — Step 4: Projects & Experience
   Universal Portfolio Generator — Next-Gen Studio
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FormSteps = root.FormSteps || {};
    root.FormSteps.renderProjectsStep = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  return function renderProjectsStep(state) {
    const d = state.data;
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
    const projects = d.projects || [];
    const education = d.education || [];

    return `
      <!-- Step Header -->
      <div class="flex items-center justify-between pb-3 mb-4 border-b border-mono-200 dark:border-white/10">
        <div>
          <h2 class="text-base font-bold text-mono-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-folder-open text-blue-500"></i>
            <span>${I18N.t('form.step.projects')}</span>
          </h2>
          <p class="text-xs text-mono-500 dark:text-mono-400 mt-0.5">${I18N.t('form.step.projects_desc')}</p>
        </div>
        <div class="flex items-center gap-2">
          <!-- Sync from GitHub Button -->
          <button type="button" class="btn btn-secondary btn-sm text-mono-700 dark:text-mono-200 border-mono-300 dark:border-white/15" onclick="syncGitHubReposPrompt()" title="Import Public Repos from GitHub">
            <i class="fab fa-github"></i>
            <span class="hidden sm:inline">${isAr ? 'مزامنة من GitHub' : 'Sync GitHub'}</span>
          </button>
          <button type="button" class="btn btn-primary btn-sm" onclick="addProject()">
            <i class="fas fa-plus"></i>
            <span>${I18N.t('form.project.add')}</span>
          </button>
        </div>
      </div>

      <!-- Featured Projects List -->
      <div class="space-y-3 mb-6" id="projects-container">
        ${projects.length === 0 ? `<p class="text-xs text-mono-400 italic text-center py-4">${isAr ? 'لا توجد مشاريع مضافة بعد. انقر على إضافة مشروع بالأعلى.' : 'No projects added yet. Click Add Project above.'}</p>` : ''}
        ${projects.map((p, idx) => `
          <div class="p-3.5 rounded-xl bg-mono-50 dark:bg-white/[0.03] border border-mono-200 dark:border-white/10 relative transition hover:border-blue-300 dark:hover:border-blue-900/60" data-project-idx="${idx}">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-mono-900 dark:text-white flex items-center gap-1.5">
                <i class="fas fa-cube text-blue-500"></i>
                <span>#${idx + 1}</span>
              </span>
              <button type="button" class="text-mono-400 hover:text-rose-500 text-xs transition" onclick="removeProject(${idx})" title="Delete Project">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input class="form-input text-xs" value="${Utils.sanitize(p.name || '')}" placeholder="${I18N.t('form.project.name')}" oninput="FormState.data.projects[${idx}].name=this.value;triggerPreview();">
              <input class="form-input text-xs" value="${Utils.sanitize(p.url || '')}" placeholder="${I18N.t('form.project.url')}" oninput="FormState.data.projects[${idx}].url=this.value;triggerPreview();">
            </div>
            <textarea class="form-textarea text-xs mb-2 min-h-[60px]" placeholder="${I18N.t('form.project.desc')}" oninput="FormState.data.projects[${idx}].desc=this.value;triggerPreview();">${Utils.sanitize(p.desc || '')}</textarea>
            <input class="form-input text-xs" value="${Utils.sanitize(Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''))}" placeholder="${I18N.t('form.project.tags')}" oninput="FormState.data.projects[${idx}].tags=this.value.split(',').map(t=>t.trim()).filter(Boolean);triggerPreview();">
          </div>
        `).join('')}
      </div>

      <!-- Education & Credentials Header -->
      <div class="flex items-center justify-between pt-4 pb-2 border-t border-mono-200 dark:border-white/10 mb-3">
        <h3 class="text-xs font-bold text-mono-700 dark:text-mono-300 uppercase tracking-wider flex items-center gap-1.5">
          <i class="fas fa-graduation-cap text-indigo-500"></i>
          <span>${isAr ? 'التعليم والمؤهلات' : 'Education & Credentials'}</span>
        </h3>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addEducation()">
          <i class="fas fa-plus text-xs"></i>
          <span>${isAr ? 'إضافة مؤهل' : 'Add Credential'}</span>
        </button>
      </div>

      <div class="space-y-2 mb-4" id="education-container">
        ${education.map((edu, idx) => `
          <div class="flex gap-2 items-center p-2 rounded-lg bg-mono-50 dark:bg-white/[0.03] border border-mono-200 dark:border-white/10">
            <input class="form-input text-xs flex-1" value="${Utils.sanitize(edu.degree || '')}" placeholder="Degree / Certification" oninput="FormState.data.education[${idx}].degree=this.value;triggerPreview();">
            <input class="form-input text-xs flex-1" value="${Utils.sanitize(edu.school || '')}" placeholder="University / Organization" oninput="FormState.data.education[${idx}].school=this.value;triggerPreview();">
            <input class="form-input text-xs w-28" value="${Utils.sanitize(edu.year || '')}" placeholder="2020 - 2024" oninput="FormState.data.education[${idx}].year=this.value;triggerPreview();">
            <button type="button" class="text-mono-400 hover:text-rose-500 p-2" onclick="removeEducation(${idx})"><i class="fas fa-times text-xs"></i></button>
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
