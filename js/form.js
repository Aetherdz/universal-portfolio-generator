/* =============================================
   form.js — Multi-step Form Logic & State Management
   Universal Portfolio Generator — Elite Edition
   ============================================= */

const FormState = {
  currentStep: 1,
  totalSteps: 5,
  _listeners: {},

  /**
   * Reactive Event Bus
   */
  on(event, callback) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(callback);
    return () => {
      this._listeners[event] = (this._listeners[event] || []).filter(cb => cb !== callback);
    };
  },

  emit(event, payload) {
    if (this._listeners[event]) {
      this._listeners[event].forEach(cb => {
        try { cb(payload); } catch (e) { console.error('FormState listener error:', e); }
      });
    }
  },

  data: {
    name: '',
    bio: '',
    role: 'Software Engineer',
    email: '',
    location: '',
    photo: '',
    photoFile: null,
    socials: {
      github: '',
      linkedin: '',
      twitter: '',
      devto: '',
      blog: ''
    },
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Docker'],
    projects: [
      {
        name: 'Distributed Cloud Mesh',
        desc: 'High-throughput microservices mesh engine built with Go and WebSockets for zero-downtime orchestration.',
        tags: ['Go', 'Docker', 'Kubernetes', 'WebSockets'],
        url: 'https://github.com'
      },
      {
        name: 'Neural Guard Security Scanner',
        desc: 'Automated vulnerability detection and dynamic AST audit scanner for modern web APIs and cloud deployments.',
        tags: ['Python', 'OWASP', 'FastAPI', 'Security'],
        url: 'https://github.com'
      }
    ],
    education: [
      { degree: 'B.S. in Computer Science', school: 'Tech University', year: '2023' }
    ],
    experience: [],
    certifications: [],
    publications: [],
    languages: [],
    bugbounty: [
      { platform: 'hackerone', username: 'security_researcher' }
    ],
    theme: 3,
    colorPalette: 'default',
    customColors: { primary: '#2563EB', accent: '#D97706', bg: '#F8FAFC' },
    fontFamily: 'Inter',
    glassBlur: 20,
    glassTransparency: 0.12,
    borderRadius: 16,
    animations: true,
    contactForm: true,
    contactEmail: '',
    customDomain: '',
    githubPat: '',
    githubUsername: ''
  },

  init() {
    // Restore saved draft from localStorage
    const saved = localStorage.getItem('portfolio-draft-v2') || localStorage.getItem('portfolio-draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          Object.assign(this.data, parsed);
        }
      } catch (e) {
        console.warn('Draft parse error:', e);
      }
    }

    // Auto-detect country via IP if not already set
    this.detectCountry();

    // Render initial step
    this.renderStep(1);

    // Auto-save on input
    document.addEventListener('input', this.autoSave.bind(this));

    // Bind clickable step indicators
    this.bindStepDotClicks();
  },

  bindStepDotClicks() {
    document.querySelectorAll('.step-dot').forEach(dot => {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => {
        const targetStep = parseInt(dot.dataset.step, 10);
        if (targetStep && targetStep !== this.currentStep) {
          // If on step 1 and trying to advance, ensure required fields
          if (this.currentStep === 1 && targetStep > 1) {
            const name = (this.data.name || '').trim();
            const role = (this.data.role || '').trim();
            if (!name || !role) {
              Utils.showToast(I18N.current === 'ar' ? 'الاسم والمسمى الوظيفي مطلوبان' : 'Please provide name and role first', 'warn');
              return;
            }
          }
          this.renderStep(targetStep);
        }
      });
    });
  },

  detectCountry() {
    if (this.data.location) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    fetch('https://ip-api.com/json/?fields=country', { signal: controller.signal })
      .then(r => r.json())
      .then(d => {
        clearTimeout(timeout);
        if (d && d.country && !this.data.location) {
          this.data.location = d.country;
          if (this.currentStep === 1) {
            const locSelect = document.getElementById('input-location');
            if (locSelect) locSelect.value = d.country;
          }
        }
      })
      .catch(() => { clearTimeout(timeout); });
  },

  autoSave() {
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      try {
        localStorage.setItem('portfolio-draft-v2', JSON.stringify(this.data));
      } catch (e) {
        console.warn('Local storage save error:', e);
      }
    }, 800);
  },

  loadDemoData() {
    const isAr = I18N.current === 'ar';
    if (isAr) {
      this.data.name = 'أحمد عبد الرحمن';
      this.data.role = 'Security Researcher';
      this.data.bio = 'مهندس برمجيات وباحث أمني شغوف ببناء أنظمة سحابية موزعة واكتشاف الثغرات الأمنية في بنية الويب والأنظمة الذكية.';
      this.data.location = 'السعودية';
      this.data.email = 'ahmed.dev@example.com';
      this.data.socials = {
        github: 'ahmed-dev',
        linkedin: 'ahmed-abdulrahman',
        twitter: 'ahmed_sec',
        devto: 'ahmedsec',
        hackerone: 'ahmed_h1',
        blog: 'https://ahmed-portfolio.example.com'
      };
      this.data.skills = ['Python', 'TypeScript', 'Go', 'Rust', 'React', 'Docker', 'Kubernetes', 'OWASP', 'Penetration Testing', 'PostgreSQL', 'Redis', 'AWS'];
      this.data.projects = [
        {
          name: 'منصة سحابة الأمان الموزعة',
          desc: 'نظام مراقبة أمنية ذكي يعتمد على تحليل الحزم الشبكية واكتشاف الهجمات السيبرانية في الوقت الفعلي.',
          tags: ['Python', 'Go', 'Docker', 'Security'],
          url: 'https://github.com/example/cloud-security'
        },
        {
          name: 'أداة التدقيق الآلي للواجهات البرمجية',
          desc: 'أداة مفتوحة المصدر لفحص وتأمين واجهات REST & GraphQL ضد ثغرات OWASP Top 10.',
          tags: ['TypeScript', 'GraphQL', 'OWASP', 'Node.js'],
          url: 'https://github.com/example/api-audit'
        },
        {
          name: 'محرك البحث الدلالي بالذكاء الاصطناعي',
          desc: 'محرك بحث فائق السرعة يعتمد على نماذج التضمين اللغوي وقواعد البيانات المتجهة.',
          tags: ['Python', 'RAG', 'VectorDB', 'FastAPI'],
          url: 'https://github.com/example/semantic-search'
        }
      ];
      this.data.education = [
        { degree: 'ماجستير في الأمن السيبراني والشبكات', school: 'جامعة الملك فهد', year: '2023' },
        { degree: 'بكالوريوس علوم الحاسب الآلي', school: 'جامعة الملك سعود', year: '2021' }
      ];
      this.data.bugbounty = [
        { platform: 'hackerone', username: 'ahmed_h1' },
        { platform: 'bugcrowd', username: 'ahmed_sec' }
      ];
    } else {
      this.data.name = 'Alex Morgan';
      this.data.role = 'Software Engineer';
      this.data.bio = 'Full-stack software architect & security engineer passionate about distributed infrastructure, developer tools, and high-performance web systems.';
      this.data.location = 'United States';
      this.data.email = 'alex.morgan@example.com';
      this.data.socials = {
        github: 'alexmorgan',
        linkedin: 'alexmorgan-dev',
        twitter: 'alexmorgan_tech',
        devto: 'alexmorgan',
        hackerone: 'alex_bounty',
        blog: 'https://alexmorgan.dev'
      };
      this.data.skills = ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'React', 'Next.js', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'AWS', 'OWASP'];
      this.data.projects = [
        {
          name: 'Aether Cloud Mesh',
          desc: 'High-throughput microservices mesh engine built with Go and WebSockets for zero-downtime container orchestration.',
          tags: ['Go', 'Docker', 'Kubernetes', 'WebSockets'],
          url: 'https://github.com/example/aether-mesh'
        },
        {
          name: 'Neural Guard Security Scanner',
          desc: 'Automated vulnerability detection and dynamic AST audit scanner for modern web APIs and cloud deployments.',
          tags: ['Python', 'OWASP', 'FastAPI', 'Security'],
          url: 'https://github.com/example/neural-guard'
        },
        {
          name: 'Prism UI Component System',
          desc: 'Ultra-fast, accessible, design-token driven headless component library built for modern React and Tailwind applications.',
          tags: ['React', 'TypeScript', 'Tailwind', 'Design Systems'],
          url: 'https://github.com/example/prism-ui'
        }
      ];
      this.data.education = [
        { degree: 'M.S. in Computer Science (Distributed Systems)', school: 'Stanford University', year: '2023' },
        { degree: 'B.S. in Software Engineering', school: 'University of Washington', year: '2021' }
      ];
      this.data.bugbounty = [
        { platform: 'hackerone', username: 'alex_bounty' },
        { platform: 'bugcrowd', username: 'alex_research' }
      ];
    }

    this.data.contactForm = true;
    this.data.contactEmail = this.data.email;

    this.autoSave();
    this.renderStep(this.currentStep);
    triggerPreview();
    Utils.showToast(I18N.t('success.demo'), 'success');
  },

  clearFormData() {
    this.data.name = '';
    this.data.bio = '';
    this.data.role = 'Software Engineer';
    this.data.email = '';
    this.data.location = '';
    this.data.photo = '';
    this.data.photoFile = null;
    this.data.socials = {};
    this.data.skills = ['JavaScript', 'TypeScript', 'React'];
    this.data.projects = [];
    this.data.education = [];
    this.data.bugbounty = [];
    this.data.contactForm = false;
    this.data.contactEmail = '';

    localStorage.removeItem('portfolio-draft-v2');
    localStorage.removeItem('portfolio-draft');

    this.renderStep(1);
    triggerPreview();
    Utils.showToast(I18N.t('success.cleared'), 'info');
  },

  /**
   * Produce sanitized, mapped data structure for theme rendering
   */
  getData() {
    const d = this.data;
    const currentLang = I18N.current || 'en';
    const isAr = currentLang === 'ar';
    const currentDir = isAr ? 'rtl' : 'ltr';

    const colors = d.customColors || { primary: '#2563EB', accent: '#D97706', bg: '#F8FAFC' };

    // Format and sanitize socials
    const socialsArray = Object.entries(d.socials || {})
      .filter(([k, val]) => val && String(val).trim())
      .map(([platform, val]) => ({
        platform,
        url: Utils.socialUrl(platform, val),
        icon: Utils.socialIcon(platform),
        label: Utils.socialLabel(platform)
      }));

    // Format skills with Devicon & FontAwesome classes
    const skillsArray = (d.skills || []).map(s => ({
      name: Utils.sanitize(s),
      icon: Utils.skillIcon(s)
    }));

    // Format projects
    const projectsArray = (d.projects || []).map(p => {
      let tagsArr = [];
      if (Array.isArray(p.tags)) {
        tagsArr = p.tags;
      } else if (typeof p.tags === 'string') {
        tagsArr = p.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      return {
        name: Utils.sanitize(p.name || ''),
        desc: Utils.sanitize(p.desc || ''),
        tags: tagsArr.map(t => Utils.sanitize(t)),
        url: Utils.sanitizeURL(p.url || '')
      };
    });

    // Format education
    const educationArray = (d.education || []).map(e => ({
      degree: Utils.sanitize(e.degree || ''),
      school: Utils.sanitize(e.school || ''),
      year: Utils.sanitize(e.year || '')
    }));

    // Format extensible sections: experience, certifications, publications, languages
    const experienceArray = (d.experience || []).map(exp => ({
      role: Utils.sanitize(exp.role || ''),
      company: Utils.sanitize(exp.company || ''),
      year: Utils.sanitize(exp.year || ''),
      desc: Utils.sanitize(exp.desc || '')
    }));

    const certificationsArray = (d.certifications || []).map(cert => ({
      name: Utils.sanitize(cert.name || ''),
      issuer: Utils.sanitize(cert.issuer || ''),
      year: Utils.sanitize(cert.year || ''),
      url: Utils.sanitizeURL(cert.url || '')
    }));

    const publicationsArray = (d.publications || []).map(pub => ({
      title: Utils.sanitize(pub.title || ''),
      publisher: Utils.sanitize(pub.publisher || ''),
      year: Utils.sanitize(pub.year || ''),
      url: Utils.sanitizeURL(pub.url || '')
    }));

    const languagesArray = (d.languages || []).map(lang => ({
      language: Utils.sanitize(lang.language || ''),
      level: Utils.sanitize(lang.level || '')
    }));

    // Format bug bounty
    const bugbountyArray = (d.bugbounty || []).map(b => ({
      platform: Utils.sanitize(b.platform || ''),
      username: Utils.sanitize(b.username || '')
    }));

    const initials = Utils.getInitials(d.name);

    return {
      name: Utils.sanitize(d.name || ''),
      bio: Utils.sanitize(d.bio || ''),
      role: Utils.sanitize(d.role || 'Software Engineer'),
      email: Utils.sanitize(d.email || ''),
      location: Utils.sanitize(d.location || ''),
      photo: Utils.sanitizeURL(d.photo || ''),
      initials: initials,
      year: new Date().getFullYear(),
      slug: Utils.slugify(d.name || 'portfolio'),
      lang: currentLang,
      dir: currentDir,
      colors: colors,

      // Dual arrays guarantee compatibility whether template uses 'skills' or 'skillsArray'
      skills: skillsArray,
      skillsArray: skillsArray,
      socials: socialsArray,
      socialsArray: socialsArray,
      projects: projectsArray,
      projectsArray: projectsArray,
      education: educationArray,
      educationArray: educationArray,
      experience: experienceArray,
      experienceArray: experienceArray,
      certifications: certificationsArray,
      certificationsArray: certificationsArray,
      publications: publicationsArray,
      publicationsArray: publicationsArray,
      languages: languagesArray,
      languagesArray: languagesArray,
      bugbounty: bugbountyArray,
      bugbountyArray: bugbountyArray,

      // Contact feature
      contactForm: Boolean(d.contactForm),
      contactEmail: Utils.sanitize(d.contactEmail || d.email || ''),

      // Glassmorphism styling tokens
      glassmorphism: {
        blur: d.glassBlur || 20,
        opacity: d.glassTransparency || 0.12,
        radius: d.borderRadius || 16
      },
      animationsEnabled: d.animations !== false,

      // Font tokens
      fontUrl: DesignSystem.getFontUrl(d.fontFamily || 'Inter'),
      fontFamilyCss: d.fontFamily || 'Inter',

      // Bilingual section titles
      sectionTitles: {
        skills: isAr ? 'المهارات والتقنيات' : 'Skills & Technologies',
        projects: isAr ? 'أبرز المشاريع' : 'Featured Projects',
        education: isAr ? 'التعليم والشهادات' : 'Education & Credentials',
        bugbounty: isAr ? 'صيد الثغرات والأمان' : 'Security & Bug Bounty',
        about: isAr ? 'نبذة تعريفية' : 'About Me',
        contact: isAr ? 'تواصل معي' : 'Get In Touch',
        contact_sub: isAr ? 'يسعدني التواصل والتعاون في مشاريع جديدة' : 'Feel free to reach out for collaborations or inquiries.',
        skills_sub: isAr ? 'التقنيات التي أعمل بها يومياً' : 'Core technologies and tools I work with',
        projects_sub: isAr ? 'نماذج مختارة من أعمالي البرمجية' : 'Curated selection of open-source and client work'
      },

      portfolioTexts: {
        title: isAr ? 'الملف الشخصي' : 'Portfolio',
        titleAcademic: isAr ? 'السيرة الأكاديمية' : 'Academic CV',
        viewProject: isAr ? 'مشاهدة المشروع' : 'View Project',
        view: isAr ? 'عرض' : 'View',
        source: isAr ? 'المصدر' : 'Source',
        resume: isAr ? 'السيرة الذاتية' : 'Resume',
        cv: isAr ? 'السيرة الذاتية' : 'Curriculum Vitae',
        noProjects: isAr ? 'لا توجد مشاريع مضافة بعد.' : 'No projects listed yet.',
        contactName: isAr ? 'الاسم' : 'Name',
        contactEmail: isAr ? 'البريد الإلكتروني' : 'Email',
        contactMessage: isAr ? 'الرسالة' : 'Message',
        contactSend: isAr ? 'إرسال الرسالة' : 'Send Message'
      }
    };
  },

  renderStep(step) {
    this.currentStep = step;
    const container = document.getElementById('form-container');
    if (!container) return;

    const steps = {
      1: this.renderProfileStep,
      2: this.renderSocialStep,
      3: this.renderSkillsStep,
      4: this.renderProjectsStep,
      5: this.renderThemeStep
    };

    container.innerHTML = (steps[step] || steps[1]).call(this);
    this.updateStepIndicator();
    this.bindStepEvents();
  },

  updateStepIndicator() {
    const dots = document.querySelectorAll('.step-dot');
    const lines = document.querySelectorAll('.step-line');
    dots.forEach(dot => {
      const s = parseInt(dot.dataset.step, 10);
      dot.classList.toggle('active', s === this.currentStep);
      dot.classList.toggle('done', s < this.currentStep);
      if (s === this.currentStep && typeof dot.scrollIntoView === 'function') {
        try {
          dot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {}
      }
    });
    lines.forEach((line, i) => {
      line.classList.toggle('done', this.currentStep > i + 1);
    });

    // Synchronize Mobile Sticky Action Bar
    const mobilePrev = document.getElementById('mobile-btn-prev');
    const mobileNext = document.getElementById('mobile-btn-next');
    const mobileNextText = document.getElementById('mobile-next-text');
    const mobileNextIcon = document.getElementById('mobile-next-icon');
    const isAr = I18N.current === 'ar';

    if (mobilePrev) {
      if (this.currentStep <= 1) {
        mobilePrev.disabled = true;
        mobilePrev.classList.add('opacity-40', 'pointer-events-none');
      } else {
        mobilePrev.disabled = false;
        mobilePrev.classList.remove('opacity-40', 'pointer-events-none');
      }
    }

    if (mobileNext && mobileNextText) {
      if (this.currentStep === 5) {
        mobileNextText.textContent = I18N.t('btn.finish');
        mobileNext.className = 'btn btn-success flex-[2] py-3 text-xs';
        mobileNext.setAttribute('onclick', 'finishForm()');
        if (mobileNextIcon) mobileNextIcon.className = 'fas fa-wand-magic-sparkles text-xs';
      } else {
        mobileNextText.textContent = I18N.t('btn.next');
        mobileNext.className = 'btn btn-primary flex-[2] py-3 text-xs';
        mobileNext.setAttribute('onclick', 'nextStep()');
        if (mobileNextIcon) mobileNextIcon.className = `fas ${isAr ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs`;
      }
    }
  },

  // --- Step 1: Profile ---
  renderProfileStep() {
    const d = this.data;
    const isAr = I18N.current === 'ar';
    const roles = [
      'Software Engineer', 'Security Researcher', 'Bug Bounty Hunter',
      'Tech Founder', 'UI/UX Designer', 'Data Scientist'
    ];
    const countries = this.countryList();

    return `
      <div class="flex items-center justify-between mb-4 pb-2 border-b border-mono-200 dark:border-mono-800">
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-mono-600 dark:text-mono-400 flex items-center gap-2">
            <i class="fas fa-id-card text-blue-600 dark:text-blue-400"></i>
            <span>${I18N.t('form.profile.title')}</span>
          </h2>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition" onclick="FormState.loadDemoData()">
            <i class="fas fa-wand-magic-sparkles mr-1"></i> ${I18N.t('btn.demo')}
          </button>
          <button type="button" class="px-2 py-1 text-xs rounded-lg border border-mono-200 dark:border-mono-800 text-mono-500 hover:text-rose-600 hover:border-rose-200 transition" onclick="FormState.clearFormData()" title="Reset form">
            <i class="fas fa-rotate-left"></i>
          </button>
        </div>
      </div>

      <!-- Full Name & Primary Role -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.fullName')}</label>
          <input class="form-input" id="input-name" value="${Utils.sanitize(d.name)}" placeholder="${I18N.t('form.profile.placeholder.name')}" autocomplete="name">
        </div>
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.role')}</label>
          <div class="role-grid" id="input-role">
            ${roles.map(r => {
              const sel = d.role === r ? ' selected' : '';
              const key = 'form.role.' + r.toLowerCase().replace(/[\/\s-]/g, '');
              const label = I18N.t(key) || r;
              return `<div class="role-chip${sel}" data-role="${r}" onclick="document.querySelectorAll('.role-chip').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');FormState.data.role='${r}';triggerPreview();">${label}</div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Bio / Tagline -->
      <div class="form-group mb-3">
        <label class="form-label">${I18N.t('form.profile.bio')}</label>
        <textarea class="form-textarea" id="input-bio" placeholder="${I18N.t('form.profile.placeholder.bio')}" rows="2">${Utils.sanitize(d.bio)}</textarea>
      </div>

      <!-- Email & Location -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.email')}</label>
          <div class="relative">
            <input class="form-input" id="input-email" type="email" value="${Utils.sanitize(d.email)}" placeholder="user@example.com" autocomplete="email">
          </div>
        </div>
        <div class="form-group mb-0">
          <label class="form-label">${I18N.t('form.profile.location')}</label>
          <select class="form-select" id="input-location">
            <option value="">${isAr ? '— اختر الدولة —' : '— Select location —'}</option>
            ${countries.map(c => `<option value="${c}" ${d.location === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Profile Photo Upload -->
      <div class="form-group mb-4">
        <label class="form-label">${I18N.t('form.profile.photo')}</label>
        <div class="photo-wrapper">
          <div class="file-upload-area ${d.photo ? 'has-image' : ''}" id="photo-upload" title="${isAr ? 'انقر لرفع صورة' : 'Click to upload image'}">
            ${d.photo
              ? `<img src="${d.photo}" class="preview-img" alt="Avatar">`
              : `<div class="upload-placeholder"><i class="fas fa-camera text-base"></i><span>${isAr ? 'رفع صورة' : 'Upload'}</span></div>`
            }
          </div>
          <input type="file" id="photo-input" accept="image/*" class="hidden">
          <div class="flex-1 min-w-0">
            <input class="form-input photo-url-input" id="photo-url" placeholder="${isAr ? 'أو الصق رابط صورة مباشر (https://...)' : 'Or paste an image URL (https://...)'}" value="${d.photo && !d.photo.startsWith('data:') ? Utils.sanitize(d.photo) : ''}">
            <p class="text-[11px] text-mono-400 dark:text-mono-500 mt-1">${isAr ? 'يتم تحويل الصورة تلقائياً لحفظها واستخدامها دون خادم خارجي.' : 'Images are securely processed in-browser.'}</p>
          </div>
        </div>
      </div>

      <!-- Education & Bug Bounty Section Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-mono-200 dark:border-mono-800">
        <!-- Education Card -->
        <div class="section-card">
          <div class="section-card-header">
            <div class="section-card-title"><i class="fas fa-graduation-cap text-blue-500"></i> ${I18N.t('form.education.title')}</div>
            <button type="button" class="section-add-btn" onclick="addEducation()"><i class="fas fa-plus"></i> ${I18N.t('form.education.add')}</button>
          </div>
          <div id="education-list" class="section-card-body">
            ${(d.education || []).length === 0
              ? `<p class="text-xs text-mono-400 text-center py-3">${isAr ? 'لا توجد مؤهلات مضافة بعد' : 'No credentials added yet'}</p>`
              : (d.education || []).map((e, i) => `
                <div class="sub-entry">
                  <div class="sub-entry-row">
                    <input class="form-input sub-input edu-degree" data-idx="${i}" value="${Utils.sanitize(e.degree || '')}" placeholder="${I18N.t('form.education.degree')}">
                    <input class="form-input sub-input sub-year edu-year" data-idx="${i}" value="${Utils.sanitize(e.year || '')}" placeholder="${I18N.t('form.education.year')}">
                    <button type="button" class="sub-remove" onclick="removeEducation(${i})" title="Remove"><i class="fas fa-times"></i></button>
                  </div>
                  <input class="form-input sub-input edu-school mt-1" data-idx="${i}" value="${Utils.sanitize(e.school || '')}" placeholder="${I18N.t('form.education.school')}">
                </div>
              `).join('')
            }
          </div>
        </div>

        <!-- Bug Bounty Card -->
        <div class="section-card">
          <div class="section-card-header">
            <div class="section-card-title"><i class="fas fa-shield-halved text-emerald-500"></i> ${I18N.t('form.bugbounty.title')}</div>
            <button type="button" class="section-add-btn" onclick="addBugBounty()"><i class="fas fa-plus"></i> ${I18N.t('form.bugbounty.add')}</button>
          </div>
          <div id="bugbounty-list" class="section-card-body">
            ${(d.bugbounty || []).length === 0
              ? `<p class="text-xs text-mono-400 text-center py-3">${isAr ? 'لا توجد منصات مضافة بعد' : 'No platforms added yet'}</p>`
              : (d.bugbounty || []).map((b, i) => `
                <div class="sub-entry">
                  <div class="sub-entry-row">
                    <select class="form-select sub-input bb-platform" data-idx="${i}">
                      <option value="hackerone" ${b.platform === 'hackerone' ? 'selected' : ''}>HackerOne</option>
                      <option value="bugcrowd" ${b.platform === 'bugcrowd' ? 'selected' : ''}>Bugcrowd</option>
                      <option value="intigriti" ${b.platform === 'intigriti' ? 'selected' : ''}>Intigriti</option>
                      <option value="yeswehack" ${b.platform === 'yeswehack' ? 'selected' : ''}>YesWeHack</option>
                      <option value="tryhackme" ${b.platform === 'tryhackme' ? 'selected' : ''}>TryHackMe</option>
                      <option value="hackthebox" ${b.platform === 'hackthebox' ? 'selected' : ''}>HackTheBox</option>
                    </select>
                    <input class="form-input sub-input bb-username" data-idx="${i}" value="${Utils.sanitize(b.username || '')}" placeholder="${I18N.t('form.bugbounty.username')}">
                    <button type="button" class="sub-remove" onclick="removeBugBounty(${i})" title="Remove"><i class="fas fa-times"></i></button>
                  </div>
                </div>
              `).join('')
            }
          </div>
        </div>
      </div>

      ${this.navButtons()}
    `;
  },

  countryList() {
    const isAr = I18N.current === 'ar';
    const list = [
      { en: 'Algeria', ar: 'الجزائر' }, { en: 'Argentina', ar: 'الأرجنتين' },
      { en: 'Australia', ar: 'أستراليا' }, { en: 'Austria', ar: 'النمسا' },
      { en: 'Bahrain', ar: 'البحرين' }, { en: 'Belgium', ar: 'بلجيكا' },
      { en: 'Brazil', ar: 'البرازيل' }, { en: 'Canada', ar: 'كندا' },
      { en: 'Denmark', ar: 'الدنمارك' }, { en: 'Egypt', ar: 'مصر' },
      { en: 'Finland', ar: 'فنلندا' }, { en: 'France', ar: 'فرنسا' },
      { en: 'Germany', ar: 'ألمانيا' }, { en: 'India', ar: 'الهند' },
      { en: 'Iraq', ar: 'العراق' }, { en: 'Ireland', ar: 'أيرلندا' },
      { en: 'Italy', ar: 'إيطاليا' }, { en: 'Japan', ar: 'اليابان' },
      { en: 'Jordan', ar: 'الأردن' }, { en: 'Kuwait', ar: 'الكويت' },
      { en: 'Lebanon', ar: 'لبنان' }, { en: 'Morocco', ar: 'المغرب' },
      { en: 'Netherlands', ar: 'هولندا' }, { en: 'Norway', ar: 'النرويج' },
      { en: 'Oman', ar: 'عُمان' }, { en: 'Palestine', ar: 'فلسطين' },
      { en: 'Qatar', ar: 'قطر' }, { en: 'Saudi Arabia', ar: 'السعودية' },
      { en: 'Spain', ar: 'إسبانيا' }, { en: 'Sweden', ar: 'السويد' },
      { en: 'Switzerland', ar: 'سويسرا' }, { en: 'Tunisia', ar: 'تونس' },
      { en: 'Turkey', ar: 'تركيا' }, { en: 'United Arab Emirates', ar: 'الإمارات' },
      { en: 'United Kingdom', ar: 'المملكة المتحدة' },
      { en: 'United States', ar: 'الولايات المتحدة' }
    ];
    return isAr ? list.map(c => c.ar).sort() : list.map(c => c.en).sort();
  },

  // --- Step 2: Social Links ---
  renderSocialStep() {
    const d = this.data;
    const categories = [
      { label: 'Developer', key: 'dev', platforms: ['github', 'gitlab', 'stackoverflow', 'devto', 'medium', 'codepen', 'leetcode'] },
      { label: 'Security & CTF', key: 'sec', platforms: ['hackerone', 'bugcrowd', 'tryhackme', 'hackthebox'] },
      { label: 'Social & Professional', key: 'soc', platforms: ['linkedin', 'twitter', 'youtube', 'instagram', 'telegram', 'whatsapp', 'reddit'] },
      { label: 'Design & Creative', key: 'creative', platforms: ['dribbble', 'behance'] },
      { label: 'Sponsorship & Support', key: 'support', platforms: ['buymeacoffee'] },
      { label: 'Website / Blog', key: 'other', platforms: ['blog'] }
    ];
    const categoryIcons = {
      dev: 'fas fa-code',
      sec: 'fas fa-shield-halved',
      soc: 'fas fa-users',
      creative: 'fas fa-palette',
      support: 'fas fa-mug-hot',
      other: 'fas fa-globe'
    };

    let html = `
      <div class="mb-4">
        <h2 class="text-sm font-bold uppercase tracking-wider text-mono-600 dark:text-mono-400 flex items-center gap-2">
          <i class="fas fa-share-nodes text-blue-600 dark:text-blue-400"></i>
          <span>${I18N.t('form.social.title')}</span>
        </h2>
        <p class="text-xs text-mono-500 dark:text-mono-400 mt-1">${I18N.t('form.social.subtitle')}</p>
      </div>
    `;

    categories.forEach(cat => {
      const catIcon = categoryIcons[cat.key] || 'fas fa-link';
      html += `
        <div class="mb-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-mono-500 mb-2 flex items-center gap-1.5">
            <i class="${catIcon} text-blue-500 text-xs"></i>
            <span>${cat.label}</span>
          </h3>
          <div class="social-grid">
      `;
      cat.platforms.forEach(p => {
        const val = d.socials[p] || '';
        html += `
          <div class="social-item">
            <i class="${Utils.socialIcon(p)} social-icon"></i>
            <input class="social-input" data-platform="${p}" value="${Utils.sanitize(val)}" placeholder="${Utils.socialPlaceholder(p)}" title="${Utils.socialLabel(p)}" autocomplete="off">
          </div>
        `;
      });
      html += `</div></div>`;
    });

    html += this.navButtons();
    return html;
  },

  // --- Step 3: Skills ---
  renderSkillsStep() {
    const d = this.data;
    const isAr = I18N.current === 'ar';

    let html = `
      <div class="mb-4">
        <h2 class="text-sm font-bold uppercase tracking-wider text-mono-600 dark:text-mono-400 flex items-center gap-2">
          <i class="fas fa-cubes text-blue-600 dark:text-blue-400"></i>
          <span>${I18N.t('form.skills.title')}</span>
        </h2>
        <p class="text-xs text-mono-500 mt-1">${isAr ? 'اختر مهاراتك أو اكتب مهارات مخصصة.' : 'Click to add from curated categories or type custom skills.'}</p>
      </div>

      <!-- Skill Search -->
      <div class="relative mb-3">
        <input class="form-input" id="skill-search" placeholder="${I18N.t('form.skills.search')}" oninput="filterSkills(this.value)">
      </div>

      <!-- Selected Skills Box -->
      <div class="mb-4 p-3 rounded-xl border border-mono-200 dark:border-mono-800 bg-mono-100/50 dark:bg-mono-950/50">
        <div class="text-xs font-semibold text-mono-500 mb-2 flex items-center justify-between">
          <span>${isAr ? 'المهارات المحددة:' : 'Selected Skills:'} (${d.skills.length})</span>
        </div>
        <div class="flex flex-wrap gap-1.5" id="selected-skills">
          ${d.skills.length === 0
            ? `<span class="text-xs text-mono-400">${isAr ? 'لم تختر أي مهارة بعد' : 'No skills chosen yet'}</span>`
            : d.skills.map(s => `
              <span class="skill-option selected" data-skill="${s}">
                <i class="${Utils.skillIcon(s)}"></i>
                <span>${s}</span>
                <span class="ml-1 cursor-pointer font-bold opacity-70 hover:opacity-100" onclick="removeSkill('${s}')">&times;</span>
              </span>
            `).join('')
          }
        </div>
      </div>

      <!-- Skill Pool -->
      <div class="text-xs font-semibold text-mono-500 mb-2">${isAr ? 'انقر لإضافة مهارة:' : 'Click to add technology:'}</div>
      <div class="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-1 border border-mono-200 dark:border-mono-800 rounded-xl" id="skill-pool">
        ${Utils.AVAILABLE_SKILLS.map(s => {
          if (d.skills.includes(s)) return '';
          return `
            <span class="skill-option" data-skill="${s}" onclick="addSkill('${s}')">
              <i class="${Utils.skillIcon(s)}"></i>
              <span>${s}</span>
            </span>
          `;
        }).join('')}
      </div>

      <!-- Custom Skill Input -->
      <div class="flex gap-2 mt-4 pt-3 border-t border-mono-200 dark:border-mono-800">
        <input class="form-input flex-1" id="custom-skill" placeholder="${isAr ? 'أضف مهارة مخصصة...' : 'Add custom skill or framework...'}">
        <button type="button" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition" onclick="addCustomSkill()">
          <i class="fas fa-plus"></i> ${isAr ? 'إضافة' : 'Add'}
        </button>
      </div>

      ${this.navButtons()}
    `;
    return html;
  },

  // --- Step 4: Projects ---
  renderProjectsStep() {
    const d = this.data;
    const isAr = I18N.current === 'ar';

    let html = `
      <div class="flex items-center justify-between mb-4 pb-2 border-b border-mono-200 dark:border-mono-800">
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-mono-600 dark:text-mono-400 flex items-center gap-2">
            <i class="fas fa-folder-tree text-blue-600 dark:text-blue-400"></i>
            <span>${I18N.t('form.projects.title')}</span>
          </h2>
          <p class="text-xs text-mono-500 mt-0.5">${d.projects.length} ${isAr ? 'مشاريع مضافة' : 'projects configured'}</p>
        </div>
        <button type="button" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5" onclick="addProject()">
          <i class="fas fa-plus"></i>
          <span>${I18N.t('form.projects.add')}</span>
        </button>
      </div>
    `;

    if (d.projects.length === 0) {
      html += `
        <div class="text-center py-10 border-2 border-dashed border-mono-200 dark:border-mono-800 rounded-2xl bg-mono-50/50 dark:bg-mono-950/50">
          <i class="fas fa-folder-open text-3xl text-mono-400 dark:text-mono-600 mb-2"></i>
          <p class="text-mono-600 dark:text-mono-300 text-sm font-medium mb-1">${isAr ? 'لا توجد مشاريع مضافة حالياً.' : 'No projects added yet.'}</p>
          <p class="text-mono-400 text-xs mb-4">${isAr ? 'أضف أعمالك المميزة أو قم بمزامنتها من حساب GitHub.' : 'Showcase your best open-source or commercial repositories.'}</p>
          <button type="button" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-sm" onclick="addProject()">
            <i class="fas fa-plus mr-1"></i> ${I18N.t('form.projects.add')}
          </button>
        </div>
      `;
    } else {
      html += `<div id="projects-list" class="space-y-3">`;
      d.projects.forEach((proj, i) => {
        const tagsStr = Array.isArray(proj.tags) ? proj.tags.join(', ') : (proj.tags || '');
        html += `
          <div class="project-card">
            <button type="button" class="remove-btn" onclick="removeProject(${i})" title="Remove project">&times;</button>
            <div class="proj-header">
              <span class="proj-number">${i + 1}</span>
              <h4>${Utils.sanitize(proj.name) || (isAr ? 'مشروع جديد' : 'New Project')}</h4>
            </div>
            <div class="proj-body">
              <div class="form-group mb-2">
                <label class="form-label">${I18N.t('form.projects.name')}</label>
                <input class="form-input proj-name" data-idx="${i}" value="${Utils.sanitize(proj.name)}" placeholder="e.g. Distributed Cloud Mesh">
              </div>
              <div class="form-group mb-2">
                <label class="form-label">${I18N.t('form.projects.desc')}</label>
                <textarea class="form-textarea proj-desc" data-idx="${i}" rows="2" placeholder="${isAr ? 'ما المشكلة التي يحلها المشروع وما أهميته؟' : 'Briefly explain what this project does and its technical highlights'}">${Utils.sanitize(proj.desc)}</textarea>
              </div>
              <div class="form-group mb-2">
                <label class="form-label">${I18N.t('form.projects.tags')}</label>
                <input class="form-input proj-tags" data-idx="${i}" value="${tagsStr}" placeholder="React, Node.js, Docker, API">
              </div>
              <div class="form-group mb-0">
                <label class="form-label">${I18N.t('form.projects.url')}</label>
                <input class="form-input proj-url" data-idx="${i}" value="${Utils.sanitize(proj.url || '')}" placeholder="https://github.com/username/project">
              </div>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += this.navButtons();
    return html;
  },

  // --- Step 5: Theme & Custom Controls ---
  renderThemeStep() {
    const d = this.data;
    const isAr = I18N.current === 'ar';

    const palettes = [
      { id: 'default', name: 'Sapphire', icon: 'fa-sun', colors: ['#2563EB', '#D97706', '#F8FAFC'] },
      { id: 'dracula', name: 'Dracula', icon: 'fa-moon', colors: ['#BD93F9', '#FF79C6', '#282A36'] },
      { id: 'nord', name: 'Nord', icon: 'fa-snowflake', colors: ['#88C0D0', '#BF616A', '#ECEFF4'] },
      { id: 'monokai', name: 'Monokai', icon: 'fa-bolt', colors: ['#A6E22E', '#FD971F', '#272822'] },
      { id: 'tailwind', name: 'Modern Sky', icon: 'fa-wind', colors: ['#3B82F6', '#10B981', '#F8FAFC'] },
      { id: 'night', name: 'Night Owl', icon: 'fa-crown', colors: ['#82AAFF', '#C792EA', '#011627'] },
      { id: 'rose', name: 'Rose', icon: 'fa-heart', colors: ['#E11D48', '#FB7185', '#FFF1F2'] },
      { id: 'emerald', name: 'Emerald', icon: 'fa-gem', colors: ['#059669', '#10B981', '#ECFDF5'] },
      { id: 'cyberpunk', name: 'Cyberpunk', icon: 'fa-microchip', colors: ['#00FFF0', '#FF00AA', '#0A0A1A'] },
      { id: 'catppuccin', name: 'Catppuccin', icon: 'fa-cat', colors: ['#89B4FA', '#F5C2E7', '#1E1E2E'] }
    ];

    const fonts = DesignSystem.fontFamilies || ['Inter', 'Space Grotesk', 'JetBrains Mono', 'Archivo', 'Outfit', 'Plus Jakarta Sans', 'DM Sans'];

    let html = `
      <div class="mb-4">
        <h2 class="text-sm font-bold uppercase tracking-wider text-mono-600 dark:text-mono-400 flex items-center gap-2">
          <i class="fas fa-palette text-blue-600 dark:text-blue-400"></i>
          <span>${I18N.t('form.theme.title')}</span>
        </h2>
        <p class="text-xs text-mono-500 mt-1">${I18N.t('form.theme.select')}</p>
      </div>

      <!-- Theme Grid -->
      <div class="theme-grid mb-6">
    `;

    const themeList = (typeof ThemeRegistry !== 'undefined' && ThemeRegistry.getAll)
      ? ThemeRegistry.getAll()
      : (typeof THEMES !== 'undefined' ? THEMES : ((typeof window !== 'undefined' && window.THEMES) || []));

    themeList.forEach(t => {
      const sel = d.theme === t.id ? 'selected' : '';
      const thumbs = {
        1: '<svg viewBox="0 0 120 60" class="w-full h-full"><rect width="120" height="60" fill="#000"/><circle cx="24" cy="22" r="10" fill="#00ffaa" opacity="0.9"/><rect x="42" y="14" width="55" height="4" rx="2" fill="#fff" opacity="0.3"/><rect x="42" y="22" width="35" height="3" rx="1.5" fill="#00ffaa" opacity="0.6"/><rect x="10" y="42" width="45" height="8" rx="2" fill="#fff" opacity="0.08"/><rect x="62" y="42" width="48" height="8" rx="2" fill="#fff" opacity="0.08"/></svg>',
        2: '<svg viewBox="0 0 120 60" class="w-full h-full"><rect width="120" height="60" fill="#0a0a0f"/><rect x="10" y="8" width="40" height="3" rx="1" fill="#00ff88" opacity="0.7"/><rect x="10" y="16" width="70" height="3" rx="1.5" fill="#fff" opacity="0.3"/><rect x="10" y="26" width="30" height="6" rx="2" fill="#00ff88" opacity="0.2"/><rect x="46" y="26" width="30" height="6" rx="2" fill="#00ff88" opacity="0.2"/><rect x="10" y="38" width="100" height="15" rx="3" fill="#fff" opacity="0.04"/></svg>',
        3: '<svg viewBox="0 0 120 60" class="w-full h-full"><rect width="120" height="60" fill="#fafafa"/><circle cx="20" cy="18" r="7" fill="#e4e4e7"/><rect x="34" y="12" width="50" height="4" rx="2" fill="#09090b"/><rect x="34" y="20" width="30" height="3" rx="1.5" fill="#2563EB" opacity="0.7"/><rect x="12" y="36" width="96" height="1" rx="0.5" fill="#e4e4e7"/><rect x="12" y="42" width="42" height="6" rx="2" fill="#f4f4f5"/><rect x="60" y="42" width="48" height="6" rx="2" fill="#f4f4f5"/></svg>',
        4: '<svg viewBox="0 0 120 60" class="w-full h-full"><rect width="120" height="60" fill="#f8fafc"/><rect x="8" y="8" width="38" height="44" rx="4" fill="#fff" stroke="#e2e8f0" stroke-width="0.8"/><circle cx="22" cy="20" r="5" fill="#2563EB"/><rect x="14" y="30" width="26" height="3" rx="1" fill="#0f172a"/><rect x="52" y="8" width="60" height="20" rx="4" fill="#fff" stroke="#e2e8f0" stroke-width="0.8"/><rect x="52" y="32" width="28" height="20" rx="4" fill="#fff" stroke="#e2e8f0" stroke-width="0.8"/><rect x="84" y="32" width="28" height="20" rx="4" fill="#fff" stroke="#e2e8f0" stroke-width="0.8"/></svg>',
        5: '<svg viewBox="0 0 120 60" class="w-full h-full"><defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#3B82F6"/></linearGradient></defs><rect width="120" height="60" fill="url(#g5)"/><rect x="12" y="10" width="96" height="40" rx="8" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/><circle cx="28" cy="22" r="6" fill="rgba(255,255,255,0.4)"/><rect x="42" y="18" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.9)"/><rect x="42" y="24" width="28" height="2" rx="1" fill="rgba(255,255,255,0.5)"/><rect x="20" y="38" width="80" height="4" rx="2" fill="rgba(255,255,255,0.2)"/></svg>',
        6: '<svg viewBox="0 0 120 60" class="w-full h-full"><rect width="120" height="60" fill="#0a0a0f"/><circle cx="20" cy="18" r="6" fill="#2563EB"/><rect x="34" y="12" width="55" height="4" rx="2" fill="#fff" opacity="0.9"/><rect x="34" y="20" width="35" height="3" rx="1.5" fill="#2563EB" opacity="0.7"/><rect x="12" y="34" width="96" height="1" rx="0.5" fill="rgba(255,255,255,0.06)"/><rect x="12" y="40" width="45" height="12" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/><rect x="63" y="40" width="45" height="12" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/></svg>',
        7: '<svg viewBox="0 0 120 60" class="w-full h-full"><rect width="120" height="60" fill="#f8fafc"/><rect x="12" y="10" width="28" height="28" rx="4" stroke="#2563EB" stroke-width="1.5" fill="none"/><rect x="46" y="10" width="60" height="3" rx="1.5" fill="#2563EB"/><rect x="46" y="17" width="40" height="3" rx="1.5" fill="#0f172a" opacity="0.8"/><rect x="46" y="24" width="50" height="2" rx="1" fill="#64748b" opacity="0.5"/><rect x="12" y="44" width="96" height="1" rx="0.5" fill="#e2e8f0"/><rect x="12" y="48" width="50" height="3" rx="1" fill="#cbd5e1"/></svg>'
      };

      html += `
        <div class="theme-card ${sel}" data-theme="${t.id}" onclick="selectTheme(${t.id})">
          <div class="theme-thumb theme-thumb-${t.id}">${thumbs[t.id] || ''}</div>
          <i class="${t.icon} theme-icon"></i>
          <div class="theme-name">${I18N.t(t.nameKey)}</div>
        </div>
      `;
    });

    html += `</div>`;

    // === Advanced Design Customizer Controls ===
    html += `
      <div class="p-4 sm:p-5 bg-mono-100/60 dark:bg-mono-950/60 rounded-2xl border border-mono-200 dark:border-mono-800">
        <!-- Palette Chooser -->
        <h3 class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-mono-700 dark:text-mono-300">
          <i class="fas fa-palette text-blue-600 dark:text-blue-400"></i>
          <span>${I18N.t('form.controls.palette')}</span>
        </h3>
        <div class="palette-grid mb-4">
    `;

    palettes.forEach(p => {
      const sel = d.colorPalette === p.id ? 'selected' : '';
      html += `
        <div class="palette-card ${sel}" data-palette="${p.id}" onclick="selectPalette('${p.id}')" title="${p.name}">
          <div class="palette-swatches">
            <span class="palette-dot" style="background:${p.colors[0]}"></span>
            <span class="palette-dot" style="background:${p.colors[1]}"></span>
            <span class="palette-dot" style="background:${p.colors[2]}"></span>
          </div>
          <div class="palette-info">
            <i class="fas ${p.icon} palette-icon"></i>
            <span class="palette-label">${p.name}</span>
          </div>
          <div class="palette-check"><i class="fas fa-check"></i></div>
        </div>
      `;
    });

    html += `</div>`;

    // Color Pickers
    html += `
      <div class="grid grid-cols-3 gap-2 mb-4 p-3 bg-white dark:bg-mono-900 rounded-xl border border-mono-200 dark:border-mono-800">
        <div class="color-picker-wrap">
          <label class="text-[11px] font-semibold text-mono-500">${isAr ? 'الرئيسي' : 'Primary'}</label>
          <input type="color" class="color-picker-circle" id="color-primary" value="${d.customColors.primary}" onchange="updateColor('primary', this.value)">
        </div>
        <div class="color-picker-wrap">
          <label class="text-[11px] font-semibold text-mono-500">${isAr ? 'الثانوي' : 'Accent'}</label>
          <input type="color" class="color-picker-circle" id="color-accent" value="${d.customColors.accent}" onchange="updateColor('accent', this.value)">
        </div>
        <div class="color-picker-wrap">
          <label class="text-[11px] font-semibold text-mono-500">${isAr ? 'الخلفية' : 'Background'}</label>
          <input type="color" class="color-picker-circle" id="color-bg" value="${d.customColors.bg}" onchange="updateColor('bg', this.value)">
        </div>
      </div>
    `;

    // Font Chooser
    html += `
      <h3 class="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-mono-700 dark:text-mono-300">
        <i class="fas fa-font text-blue-600 dark:text-blue-400"></i>
        <span>${I18N.t('form.controls.font')}</span>
      </h3>
      <div class="font-grid mb-4" id="font-select">
    `;

    fonts.forEach(f => {
      const sel = d.fontFamily === f ? ' selected' : '';
      html += `
        <div class="font-chip${sel}" data-font="${f}" onclick="updateFont('${f}');document.querySelectorAll('.font-chip').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');" style="font-family:'${f}',sans-serif">${f}</div>
      `;
    });

    html += `</div>`;

    // Glassmorphism sliders
    html += `
      <h3 class="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-mono-700 dark:text-mono-300">
        <i class="fas fa-cubes-stacked text-blue-600 dark:text-blue-400"></i>
        <span>${I18N.t('form.controls.glass')}</span>
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-3 bg-white dark:bg-mono-900 rounded-xl border border-mono-200 dark:border-mono-800">
        <div>
          <label class="text-[11px] text-mono-500 flex justify-between">
            <span>${I18N.t('form.controls.blur')}</span>
            <span id="blur-val" class="font-semibold text-blue-600">${d.glassBlur}px</span>
          </label>
          <input type="range" class="control-slider mt-1" min="4" max="40" value="${d.glassBlur}" oninput="updateGlass('blur', this.value)">
        </div>
        <div>
          <label class="text-[11px] text-mono-500 flex justify-between">
            <span>${I18N.t('form.controls.opacity')}</span>
            <span id="opacity-val" class="font-semibold text-blue-600">${Math.round(d.glassTransparency * 100)}%</span>
          </label>
          <input type="range" class="control-slider mt-1" min="5" max="60" value="${Math.round(d.glassTransparency * 100)}" oninput="updateGlass('opacity', this.value)">
        </div>
        <div>
          <label class="text-[11px] text-mono-500 flex justify-between">
            <span>${I18N.t('form.controls.radius')}</span>
            <span id="radius-val" class="font-semibold text-blue-600">${d.borderRadius}px</span>
          </label>
          <input type="range" class="control-slider mt-1" min="4" max="32" value="${d.borderRadius}" oninput="updateGlass('radius', this.value)">
        </div>
      </div>
    `;

    // Animations & Contact Form toggles
    html += `
      <div class="space-y-3 pt-2 border-t border-mono-200 dark:border-mono-800">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold flex items-center gap-2">
            <i class="fas fa-play text-blue-500 text-xs"></i>
            <span>${I18N.t('form.controls.animations')}</span>
          </span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" ${d.animations ? 'checked' : ''} onchange="toggleAnimations(this.checked)">
            <div class="w-9 h-5 bg-mono-300 dark:bg-mono-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold flex items-center gap-2">
            <i class="fas fa-envelope text-emerald-500 text-xs"></i>
            <span>${I18N.t('form.controls.enableContact')}</span>
          </span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" ${d.contactForm ? 'checked' : ''} onchange="toggleContactForm(this.checked)">
            <div class="w-9 h-5 bg-mono-300 dark:bg-mono-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div id="contact-email-field" class="${d.contactForm ? '' : 'hidden'} pl-6">
          <input class="form-input" id="contact-email" type="email" placeholder="contact@example.com" value="${d.contactEmail || d.email || ''}" oninput="FormState.data.contactEmail=this.value">
        </div>
      </div>
    `;

    // GitHub Sync section
    html += `
      <div class="mt-5 pt-4 border-t border-mono-200 dark:border-mono-800">
        <h3 class="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2 text-mono-800 dark:text-mono-200">
          <i class="fab fa-github text-sm"></i>
          <span>${I18N.t('form.controls.github')}</span>
        </h3>
        <p class="text-xs text-mono-500 mb-3">${I18N.t('form.controls.githubDesc')}</p>
        <div class="flex flex-col sm:flex-row gap-2">
          <input class="form-input flex-1" id="form-pat-input" type="text" placeholder="${I18N.t('form.controls.githubPlaceholder')}" value="${d.githubPat || d.socials?.github || ''}" oninput="FormState.data.githubPat=this.value">
          <button type="button" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center justify-center gap-1.5" onclick="syncGitHubRepos()">
            <i class="fas fa-rotate"></i>
            <span>${I18N.t('form.controls.sync')}</span>
          </button>
        </div>
        <p class="text-[11px] text-mono-400 dark:text-mono-500 mt-1.5">${I18N.t('form.controls.tokenNote')}</p>
      </div>
    `;

    // Config export & import buttons
    html += `
      <div class="mt-5 pt-3 border-t border-mono-200 dark:border-mono-800 flex items-center justify-center gap-3">
        <button type="button" class="text-xs px-3.5 py-2 border border-mono-300 dark:border-mono-700 rounded-xl font-medium hover:bg-mono-200 dark:hover:bg-mono-800 transition flex items-center gap-1.5" onclick="exportConfig()">
          <i class="fas fa-file-arrow-down text-blue-600"></i>
          <span>${I18N.t('export.saveConfig')}</span>
        </button>
        <button type="button" class="text-xs px-3.5 py-2 border border-mono-300 dark:border-mono-700 rounded-xl font-medium hover:bg-mono-200 dark:hover:bg-mono-800 transition flex items-center gap-1.5" onclick="importConfig()">
          <i class="fas fa-file-arrow-up text-emerald-600"></i>
          <span>${I18N.t('export.loadConfig')}</span>
        </button>
      </div>
    </div>
    `;

    html += `<div class="mt-4">${this.navButtons(true)}</div>`;
    return html;
  },

  navButtons(isLast = false) {
    const isAr = I18N.current === 'ar';
    const prev = this.currentStep > 1
      ? `<button type="button" class="btn btn-secondary px-5 py-2.5 text-xs sm:text-sm" onclick="prevStep()"><i class="fas ${isAr ? 'fa-arrow-right' : 'fa-arrow-left'} text-xs"></i><span>${I18N.t('btn.prev')}</span></button>`
      : `<div></div>`;
    const next = isLast
      ? `<button type="button" class="btn btn-success px-6 py-2.5 text-xs sm:text-sm" onclick="finishForm()"><i class="fas fa-wand-magic-sparkles text-xs"></i><span>${I18N.t('btn.finish')}</span></button>`
      : `<button type="button" class="btn btn-primary px-6 py-2.5 text-xs sm:text-sm" onclick="nextStep()"><span>${I18N.t('btn.next')}</span><i class="fas ${isAr ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs"></i></button>`;
    return `<div class="form-nav">${prev}${next}</div>`;
  },

  bindStepEvents() {
    const name = document.getElementById('input-name');
    if (name) {
      name.oninput = (e) => {
        this.data.name = e.target.value;
        triggerPreview();
      };
    }

    const bio = document.getElementById('input-bio');
    if (bio) {
      bio.oninput = (e) => {
        this.data.bio = e.target.value;
        triggerPreview();
      };
    }

    const email = document.getElementById('input-email');
    if (email) {
      email.oninput = (e) => {
        this.data.email = e.target.value;
        triggerPreview();
      };
    }

    const loc = document.getElementById('input-location');
    if (loc) {
      loc.onchange = (e) => {
        this.data.location = e.target.value;
        triggerPreview();
      };
    }

    // Photo file upload
    const photoUpload = document.getElementById('photo-upload');
    const photoInput = document.getElementById('photo-input');
    const photoUrl = document.getElementById('photo-url');
    if (photoUpload && photoInput) {
      photoUpload.onclick = () => photoInput.click();
      photoInput.onchange = async (e) => {
        if (e.target.files?.[0]) {
          try {
            const b64 = await Utils.fileToBase64(e.target.files[0]);
            this.data.photo = b64;
            this.data.photoFile = e.target.files[0];
            triggerPreview();
            this.renderStep(this.currentStep);
          } catch (err) {
            Utils.showToast(err.message, 'error');
          }
        }
      };
    }

    if (photoUrl) {
      photoUrl.oninput = Utils.debounce(async (e) => {
        const val = e.target.value.trim();
        if (val) {
          const url = await Utils.urlToBase64(val);
          if (url) {
            this.data.photo = url;
            triggerPreview();
            const img = document.querySelector('.file-upload-area .preview-img');
            if (img) img.src = url;
          }
        } else {
          this.data.photo = '';
          triggerPreview();
        }
      }, 500);
    }

    // Education bindings
    document.querySelectorAll('.edu-degree').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.education[i]) {
          this.data.education[i].degree = e.target.value;
          triggerPreview();
        }
      };
    });
    document.querySelectorAll('.edu-school').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.education[i]) {
          this.data.education[i].school = e.target.value;
          triggerPreview();
        }
      };
    });
    document.querySelectorAll('.edu-year').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.education[i]) {
          this.data.education[i].year = e.target.value;
          triggerPreview();
        }
      };
    });

    // Bug bounty bindings
    document.querySelectorAll('.bb-platform').forEach(el => {
      el.onchange = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.bugbounty[i]) {
          this.data.bugbounty[i].platform = e.target.value;
          triggerPreview();
        }
      };
    });
    document.querySelectorAll('.bb-username').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.bugbounty[i]) {
          this.data.bugbounty[i].username = e.target.value;
          triggerPreview();
        }
      };
    });

    // Project bindings
    document.querySelectorAll('.proj-name').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.projects[i]) {
          this.data.projects[i].name = e.target.value;
          triggerPreview();
        }
      };
    });
    document.querySelectorAll('.proj-desc').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.projects[i]) {
          this.data.projects[i].desc = e.target.value;
          triggerPreview();
        }
      };
    });
    document.querySelectorAll('.proj-tags').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.projects[i]) {
          this.data.projects[i].tags = e.target.value;
          triggerPreview();
        }
      };
    });
    document.querySelectorAll('.proj-url').forEach(el => {
      el.oninput = (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (this.data.projects[i]) {
          this.data.projects[i].url = e.target.value;
          triggerPreview();
        }
      };
    });

    // Social inputs binding
    document.querySelectorAll('.social-input').forEach(inp => {
      inp.oninput = (e) => {
        const plat = e.target.dataset.platform;
        this.data.socials[plat] = e.target.value;
        triggerPreview();
      };
    });
  }
};

// Global handlers
let _nextStepLock = false;
function nextStep() {
  if (_nextStepLock) return;
  _nextStepLock = true;
  setTimeout(() => { _nextStepLock = false; }, 400);

  // Validate Step 1
  if (FormState.currentStep === 1) {
    const name = (document.getElementById('input-name')?.value || FormState.data.name || '').trim();
    const role = (FormState.data.role || '').trim();
    let valid = true;

    if (!name) {
      document.getElementById('input-name')?.classList.add('border-rose-500', 'ring-2', 'ring-rose-400/20');
      valid = false;
    } else {
      document.getElementById('input-name')?.classList.remove('border-rose-500', 'ring-2', 'ring-rose-400/20');
    }

    if (!valid) {
      Utils.showToast(I18N.current === 'ar' ? 'يرجى إدخال الاسم الكامل لمتابعة الخطوات' : 'Please provide your full name to proceed', 'warn');
      return;
    }
  }

  if (FormState.currentStep < FormState.totalSteps) {
    FormState.renderStep(FormState.currentStep + 1);
  }
}

function prevStep() {
  if (FormState.currentStep > 1) {
    FormState.renderStep(FormState.currentStep - 1);
  }
}

function finishForm() {
  const name = (FormState.data.name || '').trim();
  if (!name) {
    Utils.showToast(I18N.current === 'ar' ? 'الاسم مطلوب لإنشاء البورتفوليو' : 'Full name is required to build your portfolio', 'warn');
    FormState.renderStep(1);
    return;
  }

  triggerPreview();

  const modal = document.getElementById('generate-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}

function confirmGenerate() {
  const modal = document.getElementById('generate-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }

  // Reveal completion actions footer
  const footer = document.getElementById('completion-footer');
  if (footer) {
    footer.classList.remove('hidden');
    footer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  Utils.showToast(I18N.t('export.success'), 'success');
}

function cancelGenerate() {
  const modal = document.getElementById('generate-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

function selectTheme(id) {
  FormState.data.theme = id;
  document.querySelectorAll('.theme-card').forEach(c => {
    c.classList.toggle('selected', parseInt(c.dataset.theme, 10) === id);
  });
  triggerPreview();
}

function addSkill(skill) {
  if (!FormState.data.skills.includes(skill)) {
    FormState.data.skills.push(skill);
    FormState.renderStep(3);
    triggerPreview();
  }
}

function removeSkill(skill) {
  FormState.data.skills = FormState.data.skills.filter(s => s !== skill);
  FormState.renderStep(3);
  triggerPreview();
}

function addCustomSkill() {
  const inp = document.getElementById('custom-skill');
  if (inp && inp.value.trim()) {
    addSkill(inp.value.trim());
    inp.value = '';
  }
}

function filterSkills(q) {
  const query = q.toLowerCase().trim();
  document.querySelectorAll('#skill-pool .skill-option').forEach(el => {
    el.style.display = el.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

function addProject() {
  FormState.data.projects.push({ name: '', desc: '', tags: [], url: '' });
  FormState.renderStep(4);
}

function removeProject(idx) {
  FormState.data.projects.splice(idx, 1);
  FormState.renderStep(4);
  triggerPreview();
}

function addEducation() {
  FormState.data.education.push({ degree: '', school: '', year: '' });
  FormState.renderStep(1);
}

function removeEducation(idx) {
  FormState.data.education.splice(idx, 1);
  FormState.renderStep(1);
  triggerPreview();
}

function addBugBounty() {
  FormState.data.bugbounty.push({ platform: 'hackerone', username: '' });
  FormState.renderStep(1);
}

function removeBugBounty(idx) {
  FormState.data.bugbounty.splice(idx, 1);
  FormState.renderStep(1);
  triggerPreview();
}

function selectPalette(id) {
  const p = DesignSystem.getPalette(id);
  FormState.data.colorPalette = id;
  FormState.data.customColors = {
    primary: p.primary,
    accent: p.accent,
    bg: p.bg
  };

  const colP = document.getElementById('color-primary');
  const colA = document.getElementById('color-accent');
  const colB = document.getElementById('color-bg');
  if (colP) colP.value = p.primary;
  if (colA) colA.value = p.accent;
  if (colB) colB.value = p.bg;

  document.querySelectorAll('.palette-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.palette-card[data-palette="${id}"]`);
  if (card) card.classList.add('selected');

  triggerPreview();
}

function updateColor(key, val) {
  FormState.data.customColors[key] = val;
  FormState.data.colorPalette = 'custom';
  triggerPreview();
}

function updateFont(family) {
  FormState.data.fontFamily = family;
  triggerPreview();
}

function updateGlass(type, val) {
  if (type === 'blur') {
    FormState.data.glassBlur = parseInt(val, 10);
    const el = document.getElementById('blur-val');
    if (el) el.textContent = `${val}px`;
  }
  if (type === 'opacity') {
    FormState.data.glassTransparency = parseInt(val, 10) / 100;
    const el = document.getElementById('opacity-val');
    if (el) el.textContent = `${val}%`;
  }
  if (type === 'radius') {
    FormState.data.borderRadius = parseInt(val, 10);
    const el = document.getElementById('radius-val');
    if (el) el.textContent = `${val}px`;
  }
  triggerPreview();
}

function toggleAnimations(enabled) {
  FormState.data.animations = enabled;
  triggerPreview();
}

function toggleContactForm(enabled) {
  FormState.data.contactForm = enabled;
  const field = document.getElementById('contact-email-field');
  if (field) field.classList.toggle('hidden', !enabled);
  triggerPreview();
}

function triggerPreview() {
  if (typeof FormState !== 'undefined' && typeof FormState.emit === 'function') {
    FormState.emit('change', FormState.data);
  }
  if (typeof renderPreview === 'function') {
    renderPreview();
  }
}

if (typeof window !== 'undefined') {
  window.FormState = FormState;
} else if (typeof globalThis !== 'undefined') {
  globalThis.FormState = FormState;
}
