/* =============================================
   js/form/actions.js — Form Actions & Interactive Handlers
   Universal Portfolio Generator — Next-Gen Studio
   ============================================= */

/**
 * Render the currently selected step into the DOM
 */
function renderCurrentStep() {
  const container = document.getElementById('form-container');
  if (!container || typeof FormSteps === 'undefined') return;

  const steps = {
    1: FormSteps.renderProfileStep,
    2: FormSteps.renderSocialStep,
    3: FormSteps.renderSkillsStep,
    4: FormSteps.renderProjectsStep,
    5: FormSteps.renderThemeStep
  };

  const renderFn = steps[FormState.currentStep] || FormSteps.renderProfileStep;
  container.innerHTML = renderFn(FormState);
  updateStepIndicator();
}

/**
 * Update the Stepper UI
 */
function updateStepIndicator() {
  const dots = document.querySelectorAll('.step-dot');
  const lines = document.querySelectorAll('.step-line');
  const cur = FormState.currentStep;

  dots.forEach(dot => {
    const s = parseInt(dot.dataset.step, 10);
    dot.classList.toggle('active', s === cur);
    dot.classList.toggle('done', s < cur);
    if (s === cur && typeof dot.scrollIntoView === 'function') {
      try { dot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); } catch (e) {}
    }
  });

  lines.forEach((line, i) => {
    line.classList.toggle('done', cur > i + 1);
  });

  // Mobile Sticky Bar sync
  const mobilePrev = document.getElementById('mobile-btn-prev');
  const mobileNext = document.getElementById('mobile-btn-next');
  const mobileNextText = document.getElementById('mobile-next-text');
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

  if (mobilePrev) {
    mobilePrev.disabled = cur <= 1;
    mobilePrev.classList.toggle('opacity-40', cur <= 1);
  }
  if (mobileNext && mobileNextText) {
    if (cur === 5) {
      mobileNextText.textContent = isAr ? 'تحميل الموقع' : 'Export HTML';
      mobileNext.setAttribute('onclick', 'downloadHTML()');
    } else {
      mobileNextText.textContent = isAr ? 'الخطوة التالية' : 'Next Step';
      mobileNext.setAttribute('onclick', 'nextStep()');
    }
  }
}

/**
 * Navigation steps
 */
function nextStep() {
  if (FormState.currentStep < FormState.totalSteps) {
    FormState.currentStep++;
    renderCurrentStep();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
}

function prevStep() {
  if (FormState.currentStep > 1) {
    FormState.currentStep--;
    renderCurrentStep();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
}

function goToStep(step) {
  const n = parseInt(step, 10);
  if (n >= 1 && n <= FormState.totalSteps) {
    FormState.currentStep = n;
    renderCurrentStep();
  }
}

/**
 * Skill actions
 */
function addCustomSkill() {
  const input = document.getElementById('custom-skill-input');
  if (!input) return;
  const val = input.value.trim();
  if (val && !FormState.data.skills.includes(val)) {
    FormState.data.skills.push(val);
    input.value = '';
    renderCurrentStep();
    triggerPreview();
  }
}

function toggleSkill(tech) {
  const idx = FormState.data.skills.indexOf(tech);
  if (idx > -1) {
    FormState.data.skills.splice(idx, 1);
  } else {
    FormState.data.skills.push(tech);
  }
  renderCurrentStep();
  triggerPreview();
}

function removeSkill(tech) {
  const idx = FormState.data.skills.indexOf(tech);
  if (idx > -1) {
    FormState.data.skills.splice(idx, 1);
    renderCurrentStep();
    triggerPreview();
  }
}

/**
 * Project actions
 */
function addProject() {
  FormState.data.projects.push({
    name: '',
    desc: '',
    tags: ['Web', 'Open Source'],
    url: ''
  });
  renderCurrentStep();
  triggerPreview();
}

function removeProject(idx) {
  FormState.data.projects.splice(idx, 1);
  renderCurrentStep();
  triggerPreview();
}

/**
 * Education actions
 */
function addEducation() {
  FormState.data.education.push({
    degree: '',
    school: '',
    year: ''
  });
  renderCurrentStep();
  triggerPreview();
}

function removeEducation(idx) {
  FormState.data.education.splice(idx, 1);
  renderCurrentStep();
  triggerPreview();
}

/**
 * Theme selection & palette
 */
function selectTheme(themeId) {
  FormState.data.theme = parseInt(themeId, 10);
  renderCurrentStep();
  triggerPreview();
}

function applyColorPalette(primary, accent, bg) {
  FormState.data.customColors = { primary, accent, bg };
  renderCurrentStep();
  triggerPreview();
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  if (typeof Utils !== 'undefined') {
    Utils.showToast(isAr ? 'تم تطبيق لوحة الألوان!' : 'Palette applied!', 'success');
  }
}

/**
 * Photo upload & compression
 */
function handlePhotoUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      FormState.data.photo = e.target.result;
      renderCurrentStep();
      triggerPreview();
    };
    reader.readAsDataURL(file);
  }
}

/**
 * GitHub Sync Prompt
 */
function syncGitHubReposPrompt() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  const ghUser = FormState.data.socials?.github || prompt(isAr ? 'أدخل اسم المستخدم على GitHub:' : 'Enter your GitHub username:');
  if (ghUser && typeof syncGitHubRepos === 'function') {
    syncGitHubRepos(ghUser.trim());
  }
}

/**
 * Trigger Live Preview Update
 */
function triggerPreview() {
  FormState.saveToStorage();
  if (typeof updatePreview === 'function') {
    updatePreview();
  }
}
