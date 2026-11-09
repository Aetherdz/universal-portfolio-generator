/* =============================================
   js/form/actions.js — Form Actions & Interactive Handlers
   Universal Portfolio Studio — v3.8 Workbench Architecture
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
 * Update the Stepper UI, Left Architectural Rail, Completeness Score, and Sub-badges
 */
function updateStepIndicator() {
  const cur = FormState.currentStep;

  // Rail tabs & Stepper buttons sync
  document.querySelectorAll('.wb-rail-tab, .step-tab, .step-dot, .mobile-step-pill, .m-step-pill').forEach(tab => {
    const s = parseInt(tab.dataset.step, 10);
    tab.classList.toggle('active', s === cur);
    tab.classList.toggle('done', s < cur);
  });

  // Update Rail Sub-Badges dynamically
  const railSub1 = document.getElementById('rail-sub-1');
  if (railSub1) {
    const name = FormState.data.name?.trim();
    railSub1.textContent = name ? (name.length > 14 ? name.substring(0, 12) + '...' : name) : 'Required';
    railSub1.classList.toggle('ready', Boolean(name));
  }

  const railSub2 = document.getElementById('rail-sub-2');
  if (railSub2) {
    const count = Object.values(FormState.data.socials || {}).filter(v => v && String(v).trim().length > 0).length;
    railSub2.textContent = `${count} channels`;
    railSub2.classList.toggle('ready', count > 0);
  }

  const railSub3 = document.getElementById('rail-sub-3');
  if (railSub3) {
    const count = (FormState.data.skills || []).length;
    railSub3.textContent = `${count} skills`;
    railSub3.classList.toggle('ready', count >= 3);
  }

  const railSub4 = document.getElementById('rail-sub-4');
  if (railSub4) {
    const pCount = (FormState.data.projects || []).length;
    const eCount = (FormState.data.experience || []).length;
    railSub4.textContent = `${pCount} proj · ${eCount} exp`;
    railSub4.classList.toggle('ready', pCount > 0);
  }

  const railSub5 = document.getElementById('rail-sub-5');
  if (railSub5) {
    const themeNames = {
      1: 'Aether', 2: 'Terminal', 3: 'Minimal',
      4: 'Bento', 5: 'Glass', 6: 'Dark Prem', 7: 'Academic'
    };
    railSub5.textContent = themeNames[FormState.data.theme || 1] || 'Theme 1';
  }

  // Update Studio Completeness Meter
  if (typeof FormState.getCompletenessScore === 'function') {
    const { score, percent, ready } = FormState.getCompletenessScore();

    const scorePill = document.getElementById('score-pill');
    if (scorePill) {
      scorePill.textContent = `${percent} Ready`;
      scorePill.classList.toggle('score-ready', ready);
    }

    const railScoreFill = document.getElementById('rail-score-fill');
    if (railScoreFill) {
      railScoreFill.style.width = percent;
    }

    const railScoreText = document.getElementById('rail-score-text');
    if (railScoreText) {
      railScoreText.textContent = `${percent} Complete`;
    }
  }

  // Sync Simulator Toolbar Theme Dropdown
  const previewThemeSelect = document.getElementById('preview-theme-select');
  if (previewThemeSelect && previewThemeSelect.value !== String(FormState.data.theme || 1)) {
    previewThemeSelect.value = String(FormState.data.theme || 1);
  }

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
      mobileNextText.textContent = isAr ? 'تصدير الموقع' : 'Export HTML';
      mobileNext.setAttribute('onclick', 'downloadHTML()');
    } else {
      mobileNextText.textContent = isAr ? 'المرحلة التالية' : 'Next Stage';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const editorEl = document.getElementById('form-container');
    if (editorEl) editorEl.scrollTop = 0;
  }
}

function prevStep() {
  if (FormState.currentStep > 1) {
    FormState.currentStep--;
    renderCurrentStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const editorEl = document.getElementById('form-container');
    if (editorEl) editorEl.scrollTop = 0;
  }
}

function goToStep(step) {
  const n = parseInt(step, 10);
  if (n >= 1 && n <= FormState.totalSteps) {
    FormState.currentStep = n;
    renderCurrentStep();
    const editorEl = document.getElementById('form-container');
    if (editorEl) editorEl.scrollTop = 0;
  }
}

/**
 * Step 1: Profile Helpers
 */
function setPresetRole(role) {
  FormState.data.role = role;
  const input = document.getElementById('input-role-custom');
  if (input) input.value = role;
  document.querySelectorAll('.role-chip').forEach(c => {
    c.classList.toggle('selected', c.textContent.trim() === role);
  });
  triggerPreview();
}

function updateBio(val) {
  FormState.data.bio = val;
  const counter = document.getElementById('bio-counter');
  if (counter) counter.textContent = `${(val || '').length} / 280`;
  triggerPreview();
}

function removePhoto() {
  FormState.data.photo = '';
  FormState.data.photoFile = null;
  const inputPhoto = document.getElementById('input-photo');
  if (inputPhoto) inputPhoto.value = '';
  renderCurrentStep();
  triggerPreview();
}

function handlePhotoUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
    if (!file.type.startsWith('image/')) {
      if (typeof Utils !== 'undefined') {
        Utils.showToast(isAr ? 'الملف المختار ليس صورة' : 'Selected file is not an image', 'error');
      }
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      FormState.data.photo = e.target.result;
      renderCurrentStep();
      triggerPreview();
      if (typeof Utils !== 'undefined') {
        Utils.showToast(isAr ? 'تم تحميل الصورة بنجاح' : 'Photo uploaded and processed!', 'success');
      }
    };
    reader.readAsDataURL(file);
  }
}

/**
 * Step 2: Social Helpers
 */
function updateSocialChannel(platform, value) {
  if (!FormState.data.socials) FormState.data.socials = {};
  FormState.data.socials[platform] = value;
  triggerPreview();
}

/**
 * Step 3: Technical Arsenal Handlers
 */
function filterSkills(query) {
  window.skillSearchQuery = query;
  renderCurrentStep();
}

function selectSkillCategory(catId) {
  window.activeSkillTab = catId;
  renderCurrentStep();
}

function toggleSkill(tech) {
  if (!Array.isArray(FormState.data.skills)) FormState.data.skills = [];
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
  if (!Array.isArray(FormState.data.skills)) return;
  const idx = FormState.data.skills.indexOf(tech);
  if (idx > -1) {
    FormState.data.skills.splice(idx, 1);
    renderCurrentStep();
    triggerPreview();
  }
}

function clearAllSkills() {
  FormState.data.skills = [];
  renderCurrentStep();
  triggerPreview();
}

function addCustomSkill() {
  const input = document.getElementById('custom-skill-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;

  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

  // Strict Curation: reject non-skill hosting providers or buzzwords
  if (typeof Utils !== 'undefined' && Utils.isNonSkill && Utils.isNonSkill(val)) {
    Utils.showToast(
      isAr ? `"${val}" خدمة استضافة أو مصطلح غير تقني، وليست مهارة برمجية!` : `"${val}" is a hosting platform or buzzword, not an engineering skill!`,
      'warn'
    );
    input.value = '';
    return;
  }

  if (!Array.isArray(FormState.data.skills)) FormState.data.skills = [];

  const exists = FormState.data.skills.some(s => s.toLowerCase() === val.toLowerCase());
  if (!exists) {
    FormState.data.skills.push(val);
    input.value = '';
    renderCurrentStep();
    triggerPreview();
    if (typeof Utils !== 'undefined') {
      Utils.showToast(isAr ? `تمت إضافة ${val}` : `Added ${val} to arsenal`, 'success');
    }
  } else {
    input.value = '';
  }
}

/**
 * Step 4: Projects, Experience, Education & Security
 */
function addProject() {
  if (!Array.isArray(FormState.data.projects)) FormState.data.projects = [];
  FormState.data.projects.unshift({
    name: '',
    desc: '',
    tags: ['TypeScript', 'Open Source'],
    url: ''
  });
  renderCurrentStep();
  triggerPreview();
}

function removeProject(idx) {
  if (Array.isArray(FormState.data.projects)) {
    FormState.data.projects.splice(idx, 1);
    renderCurrentStep();
    triggerPreview();
  }
}

function runStep4GitHubSync() {
  const input = document.getElementById('step4-github-user');
  const user = input?.value?.trim() || FormState.data.socials?.github || '';
  if (typeof syncGitHubRepos === 'function') {
    syncGitHubRepos(user);
  }
}

function addExperience() {
  if (!Array.isArray(FormState.data.experience)) FormState.data.experience = [];
  FormState.data.experience.push({
    role: '',
    company: '',
    year: '',
    desc: ''
  });
  renderCurrentStep();
  triggerPreview();
}

function removeExperience(idx) {
  if (Array.isArray(FormState.data.experience)) {
    FormState.data.experience.splice(idx, 1);
    renderCurrentStep();
    triggerPreview();
  }
}

function addEducation() {
  if (!Array.isArray(FormState.data.education)) FormState.data.education = [];
  FormState.data.education.push({
    degree: '',
    school: '',
    year: ''
  });
  renderCurrentStep();
  triggerPreview();
}

function removeEducation(idx) {
  if (Array.isArray(FormState.data.education)) {
    FormState.data.education.splice(idx, 1);
    renderCurrentStep();
    triggerPreview();
  }
}

function addBugBounty() {
  if (!Array.isArray(FormState.data.bugbounty)) FormState.data.bugbounty = [];
  FormState.data.bugbounty.push({
    platform: 'HackerOne',
    username: ''
  });
  renderCurrentStep();
  triggerPreview();
}

function removeBugBounty(idx) {
  if (Array.isArray(FormState.data.bugbounty)) {
    FormState.data.bugbounty.splice(idx, 1);
    renderCurrentStep();
    triggerPreview();
  }
}

/**
 * Step 5: Themes, Palettes & Tokens
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
    Utils.showToast(isAr ? 'تم تطبيق لوحة الألوان بنجاح!' : 'Color palette applied!', 'success');
  }
}

function updateCustomColor(type, value) {
  if (!FormState.data.customColors) {
    FormState.data.customColors = { primary: '#3b82f6', accent: '#06b6d4', bg: '#07080a' };
  }
  FormState.data.customColors[type] = value;
  triggerPreview();
}

function updateGlassmorphism(prop, val) {
  if (!FormState.data.glassmorphism) {
    FormState.data.glassmorphism = { blur: 16, opacity: 0.08, radius: 24 };
  }
  FormState.data.glassmorphism[prop] = parseFloat(val);
  const label = document.getElementById(`val-glass-${prop}`);
  if (label) {
    label.textContent = (prop === 'opacity') ? val : `${val}px`;
  }
  triggerPreview();
}

/**
 * Trigger Live Preview Update (debounced & persisted)
 */
function triggerPreview() {
  if (typeof FormState !== 'undefined') {
    FormState.saveToStorage();
    if (typeof FormState.emit === 'function') {
      FormState.emit('change', FormState.data);
    }
  }
  if (typeof renderPreview === 'function') {
    renderPreview();
  }
  updateStepIndicator();
}
