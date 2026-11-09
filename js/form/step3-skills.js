/* =============================================
   js/form/step3-skills.js — Step 3: Skills & Tech Stack
   Universal Portfolio Generator — Next-Gen Studio
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FormSteps = root.FormSteps || {};
    root.FormSteps.renderSkillsStep = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  return function renderSkillsStep(state) {
    const currentSkills = state.data.skills || [];
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

    const categories = [
      { name: isAr ? 'اللغات الأساسية' : 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C++', 'Java', 'PHP', 'Ruby', 'Bash'] },
      { name: isAr ? 'الواجهة الأمامية' : 'Frontend', items: ['React', 'Next.js', 'Vue', 'Svelte', 'Tailwind', 'HTML5', 'CSS3', 'Three.js', 'Figma'] },
      { name: isAr ? 'الواجهة الخلفية والخوادم' : 'Backend & DB', items: ['Node.js', 'Express', 'FastAPI', 'Django', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
      { name: isAr ? 'السحابة والأمان' : 'Cloud & DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Linux', 'Git', 'CI/CD', 'OWASP', 'Penetration Testing'] }
    ];

    return `
      <!-- Step Header -->
      <div class="flex items-center justify-between pb-3 mb-4 border-b border-mono-200 dark:border-white/10">
        <div>
          <h2 class="text-base font-bold text-mono-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-code text-blue-500"></i>
            <span>${I18N.t('form.step.skills')}</span>
          </h2>
          <p class="text-xs text-mono-500 dark:text-mono-400 mt-0.5">${I18N.t('form.step.skills_desc')}</p>
        </div>
      </div>

      <!-- Add Custom Skill Bar -->
      <div class="flex gap-2 mb-4">
        <input type="text" id="custom-skill-input" class="form-input text-xs" placeholder="${isAr ? 'أضف مهارة مخصصة (مثال: WebAssembly, Terraform...)' : 'Add custom tech (e.g. WebAssembly, Terraform...)'}" onkeydown="if(event.key==='Enter'){event.preventDefault();addCustomSkill();}">
        <button type="button" class="btn btn-secondary px-4 text-xs flex-shrink-0" onclick="addCustomSkill()">
          <i class="fas fa-plus"></i>
          <span>${isAr ? 'إضافة' : 'Add'}</span>
        </button>
      </div>

      <!-- Active Selected Skills Chips -->
      <div class="mb-5 p-3 rounded-xl bg-mono-50 dark:bg-white/[0.03] border border-mono-200 dark:border-white/10">
        <div class="text-[11px] font-semibold text-mono-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>${isAr ? 'المهارات المحددة حالياً' : 'Currently Selected'} (${currentSkills.length})</span>
          ${currentSkills.length ? `<button type="button" class="text-rose-500 hover:underline text-[11px]" onclick="FormState.data.skills=[];renderCurrentStep();triggerPreview();">${isAr ? 'مسح الكل' : 'Clear all'}</button>` : ''}
        </div>
        <div class="flex flex-wrap gap-1.5" id="selected-skills-box">
          ${currentSkills.length === 0 ? `<span class="text-xs text-mono-400 italic">${isAr ? 'انقر على التقنيات أدناه لإضافتها' : 'Click the tags below to add skills'}</span>` : ''}
          ${currentSkills.map(skill => `
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 shadow-sm">
              <i class="${Utils.skillIcon(skill)}"></i>
              <span>${Utils.sanitize(skill)}</span>
              <button type="button" class="hover:text-rose-500 ml-1" onclick="removeSkill('${Utils.sanitize(skill)}')"><i class="fas fa-times text-[10px]"></i></button>
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Category Catalog -->
      <div class="space-y-3.5">
        ${categories.map(cat => `
          <div>
            <div class="text-[11px] font-bold text-mono-600 dark:text-mono-300 uppercase tracking-wider mb-1.5">${cat.name}</div>
            <div class="flex flex-wrap gap-1.5">
              ${cat.items.map(tech => {
                const active = currentSkills.includes(tech);
                return `
                  <button type="button" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${active ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white dark:bg-white/[0.04] text-mono-700 dark:text-mono-300 border-mono-200 dark:border-white/10 hover:border-blue-400'}" onclick="toggleSkill('${tech}')">
                    <i class="${Utils.skillIcon(tech)}"></i>
                    <span>${tech}</span>
                    ${active ? '<i class="fas fa-check text-[10px] ml-0.5"></i>' : ''}
                  </button>
                `;
              }).join('')}
            </div>
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
