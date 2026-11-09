/* =============================================
   js/form/step4-projects.js — Step 4: Projects, Experience & Security
   Universal Portfolio Studio — v3.8 Workbench Architecture
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
    const experience = d.experience || [];
    const education = d.education || [];
    const bugbounty = d.bugbounty || [];

    const defaultGh = d.socials?.github || d.githubUsername || '';

    return `
      <!-- Step Header -->
      <div class="studio-step-header">
        <div>
          <h2 class="studio-step-title">
            <span class="step-icon-badge"><i class="fas fa-cubes"></i></span>
            <span>${I18N.t('form.step.projects')}</span>
          </h2>
          <p class="studio-step-desc">${I18N.t('form.step.projects_desc')}</p>
        </div>
        <div class="channel-count-badge">
          <span>${projects.length}</span>
          <span class="channel-count-label">${isAr ? 'مشاريع' : 'Projects'}</span>
        </div>
      </div>

      <!-- 1-Click Inline GitHub Repository Sync Bar -->
      <div class="github-sync-card">
        <div class="github-sync-lead">
          <div class="github-sync-icon">
            <i class="fab fa-github"></i>
          </div>
          <div>
            <div class="github-sync-title">${isAr ? 'مزامنة مستودعات GitHub المباشرة' : '1-Click GitHub Repository Sync'}</div>
            <div class="github-sync-desc">${isAr ? 'استيراد أفضل المشاريع العامة وتحديث المهارات تلقائياً بدون أي نوافذ منبثقة.' : 'Fetch top public repositories, languages & topics into your showcase in one click.'}</div>
          </div>
        </div>
        <div class="github-sync-form">
          <div class="github-sync-input-wrap">
            <span class="github-sync-prefix">github.com/</span>
            <input type="text" id="step4-github-user" class="form-input text-xs" value="${Utils.sanitize(defaultGh)}" placeholder="username" onkeydown="if(event.key==='Enter'){event.preventDefault();runStep4GitHubSync();}">
          </div>
          <button type="button" class="btn btn-primary btn-sm flex-shrink-0" onclick="runStep4GitHubSync()">
            <i class="fas fa-arrows-rotate"></i>
            <span>${isAr ? 'مزامنة المشاريع' : 'Sync Repos'}</span>
          </button>
        </div>
      </div>

      <!-- Featured Projects Section -->
      <div class="section-divider-bar">
        <div class="section-bar-title">
          <i class="fas fa-layer-group text-accent"></i>
          <span>${isAr ? 'أبرز المشاريع والأنظمة' : 'Featured Projects'}</span>
          <span class="counter-pill">${projects.length}</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addProject()">
          <i class="fas fa-plus"></i>
          <span>${I18N.t('form.projects.add')}</span>
        </button>
      </div>

      <div class="projects-list-container" id="projects-container">
        ${projects.length === 0 ? `
          <div class="empty-list-card">
            <i class="fas fa-folder-open text-accent"></i>
            <span>${isAr ? 'لا توجد مشاريع مضافة بعد. استخدم المزامنة بالأعلى أو أضف مشروعاً يدوياً.' : 'No projects added yet. Sync from GitHub above or click Add Project.'}</span>
          </div>
        ` : ''}

        ${projects.map((p, idx) => `
          <div class="project-editor-card" data-project-idx="${idx}">
            <div class="project-editor-head">
              <span class="project-index-pill">#${idx + 1}</span>
              <button type="button" class="btn-card-remove" onclick="removeProject(${idx})" title="${isAr ? 'حذف المشروع' : 'Delete Project'}">
                <i class="fas fa-trash-can"></i>
              </button>
            </div>
            <div class="form-grid-2 mb-2">
              <div class="form-group mb-0">
                <label class="form-label-xs">${I18N.t('form.projects.name')}</label>
                <input class="form-input text-xs" value="${Utils.sanitize(p.name || '')}" placeholder="e.g. Distributed Mesh Engine" oninput="FormState.data.projects[${idx}].name=this.value;triggerPreview();">
              </div>
              <div class="form-group mb-0">
                <label class="form-label-xs">${I18N.t('form.projects.url')}</label>
                <input class="form-input text-xs" value="${Utils.sanitize(p.url || '')}" placeholder="https://github.com/..." oninput="FormState.data.projects[${idx}].url=this.value;triggerPreview();">
              </div>
            </div>
            <div class="form-group mb-2">
              <label class="form-label-xs">${I18N.t('form.projects.desc')}</label>
              <textarea class="form-textarea text-xs project-desc-textarea" placeholder="High-throughput systems architecture, architecture details, and impact..." oninput="FormState.data.projects[${idx}].desc=this.value;triggerPreview();">${Utils.sanitize(p.desc || '')}</textarea>
            </div>
            <div class="form-group mb-0">
              <label class="form-label-xs">${I18N.t('form.projects.tags')}</label>
              <input class="form-input text-xs" value="${Utils.sanitize(Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''))}" placeholder="Go, Docker, Kubernetes, WebSockets" oninput="FormState.data.projects[${idx}].tags=this.value.split(',').map(t=>t.trim()).filter(Boolean);triggerPreview();">
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Work Experience Section -->
      <div class="section-divider-bar mt-6">
        <div class="section-bar-title">
          <i class="fas fa-briefcase text-accent"></i>
          <span>${isAr ? 'الخبرات المهنية وسجل العمل' : 'Work Experience'}</span>
          <span class="counter-pill">${experience.length}</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addExperience()">
          <i class="fas fa-plus"></i>
          <span>${isAr ? '+ إضافة خبرة' : '+ Add Experience'}</span>
        </button>
      </div>

      <div class="experience-list-container" id="experience-container">
        ${experience.length === 0 ? `
          <div class="empty-list-card">
            <i class="fas fa-building text-accent"></i>
            <span>${isAr ? 'لم تتم إضافة أي خبرة مهنية بعد. اضغط على إضافة خبرة بالأعلى.' : 'No experience entries yet. Click Add Experience to add your track record.'}</span>
          </div>
        ` : ''}

        ${experience.map((exp, idx) => `
          <div class="timeline-editor-card" data-exp-idx="${idx}">
            <div class="project-editor-head">
              <span class="project-index-pill">${isAr ? 'الخبرة' : 'Exp'} #${idx + 1}</span>
              <button type="button" class="btn-card-remove" onclick="removeExperience(${idx})" title="Remove">
                <i class="fas fa-trash-can"></i>
              </button>
            </div>
            <div class="form-grid-3 mb-2">
              <div class="form-group mb-0">
                <label class="form-label-xs">${isAr ? 'المسمى الوظيفي' : 'Role / Title'}</label>
                <input class="form-input text-xs" value="${Utils.sanitize(exp.role || '')}" placeholder="Lead Systems Architect" oninput="FormState.data.experience[${idx}].role=this.value;triggerPreview();">
              </div>
              <div class="form-group mb-0">
                <label class="form-label-xs">${isAr ? 'الشركة / المؤسسة' : 'Company / Organization'}</label>
                <input class="form-input text-xs" value="${Utils.sanitize(exp.company || '')}" placeholder="Acme Labs" oninput="FormState.data.experience[${idx}].company=this.value;triggerPreview();">
              </div>
              <div class="form-group mb-0">
                <label class="form-label-xs">${isAr ? 'الفترة' : 'Years / Period'}</label>
                <input class="form-input text-xs" value="${Utils.sanitize(exp.year || '')}" placeholder="2022 - Present" oninput="FormState.data.experience[${idx}].year=this.value;triggerPreview();">
              </div>
            </div>
            <div class="form-group mb-0">
              <label class="form-label-xs">${isAr ? 'الإنجازات والمسؤوليات' : 'Key Responsibilities & Impact'}</label>
              <textarea class="form-textarea text-xs timeline-desc-textarea" placeholder="Architected distributed event-driven systems and microservices handling 50k+ req/sec..." oninput="FormState.data.experience[${idx}].desc=this.value;triggerPreview();">${Utils.sanitize(exp.desc || '')}</textarea>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Education & Credentials Section -->
      <div class="section-divider-bar mt-6">
        <div class="section-bar-title">
          <i class="fas fa-graduation-cap text-accent"></i>
          <span>${isAr ? 'التعليم والشهادات الأكاديمية' : 'Education & Credentials'}</span>
          <span class="counter-pill">${education.length}</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addEducation()">
          <i class="fas fa-plus"></i>
          <span>${isAr ? '+ إضافة مؤهل' : '+ Add Credential'}</span>
        </button>
      </div>

      <div class="education-list-container" id="education-container">
        ${education.length === 0 ? `
          <div class="empty-list-card">
            <i class="fas fa-university text-accent"></i>
            <span>${isAr ? 'لم تتم إضافة أي مؤهلات تعليمية بعد.' : 'No education entries added yet.'}</span>
          </div>
        ` : ''}

        ${education.map((edu, idx) => `
          <div class="timeline-editor-row" data-edu-idx="${idx}">
            <div class="form-grid-3 flex-1 mb-0">
              <input class="form-input text-xs" value="${Utils.sanitize(edu.degree || '')}" placeholder="${isAr ? 'الدرجة العلمية (مثال: بكالوريوس علوم حاسب)' : 'Degree / Certification (e.g. B.Sc. CS)'}" oninput="FormState.data.education[${idx}].degree=this.value;triggerPreview();">
              <input class="form-input text-xs" value="${Utils.sanitize(edu.school || '')}" placeholder="${isAr ? 'الجامعة / الجهة المانحة' : 'University / Organization'}" oninput="FormState.data.education[${idx}].school=this.value;triggerPreview();">
              <input class="form-input text-xs" value="${Utils.sanitize(edu.year || '')}" placeholder="2018 - 2022" oninput="FormState.data.education[${idx}].year=this.value;triggerPreview();">
            </div>
            <button type="button" class="btn-card-remove" onclick="removeEducation(${idx})" title="Remove">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Bug Bounty & Security Profiles Section -->
      <div class="section-divider-bar mt-6">
        <div class="section-bar-title">
          <i class="fas fa-shield-halved text-accent"></i>
          <span>${isAr ? 'منصات صيد الثغرات والأمان' : 'Bug Bounty & Security Platforms'}</span>
          <span class="counter-pill">${bugbounty.length}</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addBugBounty()">
          <i class="fas fa-plus"></i>
          <span>${isAr ? '+ إضافة منصة' : '+ Add Platform'}</span>
        </button>
      </div>

      <div class="bugbounty-list-container" id="bugbounty-container">
        ${bugbounty.length === 0 ? `
          <div class="empty-list-card">
            <i class="fas fa-crosshairs text-accent"></i>
            <span>${isAr ? 'لم تتم إضافة منصات أمنية (اختياري لباحثي الأمان وصائدي الثغرات).' : 'No security platforms added (optional for security researchers & bug bounty hunters).'}</span>
          </div>
        ` : ''}

        ${bugbounty.map((bb, idx) => {
          const platforms = ['HackerOne', 'Bugcrowd', 'Intigriti', 'YesWeHack', 'HackTheBox', 'TryHackMe'];
          return `
            <div class="timeline-editor-row" data-bb-idx="${idx}">
              <select class="form-select text-xs w-44" onchange="FormState.data.bugbounty[${idx}].platform=this.value;triggerPreview();">
                ${platforms.map(p => `
                  <option value="${p}" ${bb.platform === p ? 'selected' : ''}>${p}</option>
                `).join('')}
              </select>
              <input class="form-input text-xs flex-1" value="${Utils.sanitize(bb.username || '')}" placeholder="username / user ID" oninput="FormState.data.bugbounty[${idx}].username=this.value;triggerPreview();">
              <button type="button" class="btn-card-remove" onclick="removeBugBounty(${idx})" title="Remove">
                <i class="fas fa-trash-can"></i>
              </button>
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
