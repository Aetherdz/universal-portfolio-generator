/* =============================================
   js/form/state.js — Reactive State Store & Personas
   Universal Portfolio Generator — Next-Gen Studio
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FormState = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  const STORAGE_KEY = 'universal_portfolio_data_v2';
  const _listeners = {};

  const FormState = {
    currentStep: 1,
    totalSteps: 5,
    _listeners,

    /**
     * Subscribe to state change events
     */
    on(event, callback) {
      if (!this._listeners[event]) this._listeners[event] = [];
      this._listeners[event].push(callback);
      return () => {
        this._listeners[event] = (this._listeners[event] || []).filter(cb => cb !== callback);
      };
    },

    /**
     * Emit an event
     */
    emit(event, payload) {
      if (this._listeners[event]) {
        this._listeners[event].forEach(cb => {
          try { cb(payload); } catch (e) { console.error('FormState listener error:', e); }
        });
      }
    },

    /**
     * Core Data Store
     */
    data: {
      name: '',
      bio: '',
      role: 'Software Engineer',
      email: '',
      location: '',
      photo: '',
      photoFile: null,
      theme: 1, // Default: Aether
      fontFamily: 'Inter',
      customColors: {
        primary: '#2563EB',
        accent: '#D97706',
        bg: '#030712'
      },
      animations: true,
      contactForm: true,
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
        {
          degree: 'B.Sc. Computer Science',
          school: 'University of Science & Technology',
          year: '2020 - 2024'
        }
      ],
      experience: [],
      certifications: [],
      publications: [],
      languages: [],
      bugbounty: []
    },

    /**
     * Pre-configured Developer Personas
     */
    personas: {
      fullstack: {
        theme: 1, // Aether
        name: 'Alex Vance',
        nameAr: 'أحمد عبد الرحمن',
        role: 'Full-Stack & Cloud Architect',
        bio: 'Building resilient cloud infrastructure, distributed microservices, and real-time interactive user interfaces.',
        bioAr: 'مهندس برمجيات وباحث أمني شغوف ببناء أنظمة سحابية موزعة وحلول متقدمة للويب.',
        location: 'San Francisco, CA',
        email: 'alex.vance@example.com',
        socials: { github: 'alexvance', linkedin: 'alex-vance', twitter: 'alex_dev', blog: 'https://alexvance.dev' },
        skills: ['TypeScript', 'React', 'Next.js', 'Go', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
        projects: [
          { name: 'Distributed Cloud Mesh', desc: 'Microservices mesh engine built with Go and WebSockets for zero-downtime clustering.', tags: ['Go', 'Docker', 'K8s'], url: 'https://github.com' },
          { name: 'HyperFlow React Engine', desc: 'Real-time collaborative canvas with zero-latency state sync and WebAssembly acceleration.', tags: ['TypeScript', 'React', 'WASM'], url: 'https://github.com' }
        ]
      },
      cybersecurity: {
        theme: 2, // Terminal
        name: 'Marcus Zero',
        nameAr: 'طارق سيف الدين',
        role: 'Security Researcher',
        bio: 'Offensive security specialist, reverse engineer, and Bug Bounty hunter focusing on cloud infrastructure & API exploits.',
        bioAr: 'باحث أمني ومكتشف ثغرات سيبرانية متخصص في تدقيق البنية التحتية السحابية وحماية الواجهات البرمجية.',
        location: 'Berlin / Remote',
        email: 'zero@recon.sec',
        socials: { github: 'marcus-zero', twitter: 'sec_zero', hackerone: 'zero_h1' },
        skills: ['Python', 'Rust', 'Bash', 'OWASP', 'Penetration Testing', 'Ghidra', 'Burp Suite', 'Docker', 'Linux Kernel'],
        projects: [
          { name: 'Aether Recon Framework', desc: 'Distributed OSINT reconnaissance engine with automated asset discovery and subdomain takeover verification.', tags: ['Python', 'Security', 'FastAPI'], url: 'https://github.com' },
          { name: 'API Shield Sentinel', desc: 'Automated fuzzing and AST validation engine for REST and GraphQL endpoints against OWASP Top 10.', tags: ['Rust', 'GraphQL', 'OWASP'], url: 'https://github.com' }
        ],
        bugbounty: [{ platform: 'HackerOne', username: 'zero_h1' }, { platform: 'Bugcrowd', username: 'm_zero' }]
      },
      creative: {
        theme: 4, // Bento Grid
        name: 'Elena Rostova',
        nameAr: 'ليلى المنصور',
        role: 'Creative Technologist',
        bio: 'Crafting spatial interfaces, fluid micro-interactions, and visual design systems at the intersection of design and engineering.',
        bioAr: 'مصممة واجهات ومطورة تجارب بصرية تفاعلية تدمج بين دقة التصميم وقوة الأداء البرمجي.',
        location: 'Paris, France',
        email: 'elena@creative.studio',
        socials: { github: 'elena-ux', twitter: 'elena_design', linkedin: 'elena-rostova' },
        skills: ['TypeScript', 'Three.js', 'React', 'Tailwind', 'Figma', 'GSAP', 'WebGL', 'CSS Grid', 'Next.js'],
        projects: [
          { name: 'Aurora Design System', desc: 'Award-winning tokenized design library with glassmorphic depth, spring physics, and WCAG AA tokens.', tags: ['React', 'Tailwind', 'Design'], url: 'https://github.com' },
          { name: 'Kinetic 3D Showroom', desc: 'Interactive WebGL spatial gallery with custom GLSL shaders and dynamic lighting.', tags: ['Three.js', 'WebGL', 'GLSL'], url: 'https://github.com' }
        ]
      },
      academic: {
        theme: 7, // Academic
        name: 'Dr. Tariq Al-Mansoor',
        nameAr: 'د. طارق المنصور',
        role: 'AI Researcher',
        bio: 'Doctoral researcher in Deep Learning, neural representations, and autonomous systems with published papers in NeurIPS & ICML.',
        bioAr: 'باحث دكتوراه في الذكاء الاصطناعي والتعلم العميق مع أبحاث علمية محكمة في مؤتمرات NeurIPS وICML العالمية.',
        location: 'Cambridge, MA',
        email: 'tariq@ai-research.edu',
        socials: { github: 'tariq-ai', twitter: 'tariq_research', linkedin: 'tariq-almansoor' },
        skills: ['Python', 'PyTorch', 'TensorFlow', 'CUDA', 'JAX', 'Mathematics', 'LaTeX', 'NumPy', 'Scikit-Learn'],
        projects: [
          { name: 'Sparse Latent Diffusion', desc: 'Novel pruning algorithm for latent diffusion models achieving 3.4x faster inference with minimal fidelity loss.', tags: ['PyTorch', 'Diffusion', 'CUDA'], url: 'https://arxiv.org' },
          { name: 'Graph Attention Memory', desc: 'Scalable reasoning memory network over dynamic knowledge graphs for zero-shot QA.', tags: ['JAX', 'GNN', 'Research'], url: 'https://arxiv.org' }
        ],
        education: [
          { degree: 'Ph.D. in Computer Science & Artificial Intelligence', school: 'MIT', year: '2021 - 2025' },
          { degree: 'M.Sc. in Machine Learning', school: 'Stanford University', year: '2019 - 2021' }
        ]
      }
    },

    /**
     * Load a developer persona preset
     */
    loadPersona(key) {
      const p = this.personas[key];
      if (!p) return;
      const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

      this.data.name = isAr ? (p.nameAr || p.name) : p.name;
      this.data.role = p.role;
      this.data.bio = isAr ? (p.bioAr || p.bio) : p.bio;
      this.data.location = p.location;
      this.data.email = p.email;
      this.data.theme = p.theme;
      this.data.socials = Object.assign({}, p.socials);
      this.data.skills = [...p.skills];
      this.data.projects = JSON.parse(JSON.stringify(p.projects));
      if (p.education) this.data.education = JSON.parse(JSON.stringify(p.education));
      if (p.bugbounty) this.data.bugbounty = JSON.parse(JSON.stringify(p.bugbounty));

      this.saveToStorage();
      this.emit('change', this.data);
      if (typeof window !== 'undefined' && typeof window.renderCurrentStep === 'function') {
        window.renderCurrentStep();
      }
      if (typeof window !== 'undefined' && typeof window.triggerPreview === 'function') {
        window.triggerPreview();
      }
      if (typeof Utils !== 'undefined' && typeof Utils.showToast === 'function') {
        Utils.showToast(isAr ? `تم تفعيل قالب ${p.role} بنجاح!` : `Activated ${p.role} persona!`, 'success');
      }
    },

    /**
     * Load generic demo data
     */
    loadDemoData() {
      this.loadPersona('fullstack');
    },

    /**
     * Clear all user inputs
     */
    clearFormData() {
      const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
      this.data = {
        name: '',
        bio: '',
        role: 'Software Engineer',
        email: '',
        location: '',
        photo: '',
        photoFile: null,
        theme: 1,
        fontFamily: 'Inter',
        customColors: { primary: '#2563EB', accent: '#D97706', bg: '#030712' },
        animations: true,
        contactForm: true,
        socials: { github: '', linkedin: '', twitter: '', devto: '', blog: '' },
        skills: [],
        projects: [],
        education: [],
        experience: [],
        certifications: [],
        publications: [],
        languages: [],
        bugbounty: []
      };
      this.saveToStorage();
      this.emit('change', this.data);
      if (typeof window !== 'undefined' && typeof window.renderCurrentStep === 'function') {
        window.renderCurrentStep();
      }
      if (typeof window !== 'undefined' && typeof window.triggerPreview === 'function') {
        window.triggerPreview();
      }
      if (typeof Utils !== 'undefined' && typeof Utils.showToast === 'function') {
        Utils.showToast(isAr ? 'تمت إعادة تعيين النموذج' : 'Form reset', 'info');
      }
    },

    /**
     * Save to localStorage
     */
    saveToStorage() {
      try {
        if (typeof localStorage !== 'undefined') {
          const serialized = JSON.stringify(this.data);
          localStorage.setItem(STORAGE_KEY, serialized);
        }
      } catch (e) {
        console.warn('Storage save error:', e);
      }
    },

    /**
     * Load from localStorage
     */
    loadFromStorage() {
      try {
        if (typeof localStorage !== 'undefined') {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            this.data = Object.assign({}, this.data, parsed);
            return true;
          }
        }
      } catch (e) {
        console.warn('Storage load error:', e);
      }
      return false;
    },

    /**
     * Get computed sanitized payload for template rendering
     */
    getData() {
      const d = this.data;
      const currentLang = (typeof I18N !== 'undefined' && I18N.current) || 'en';
      const isAr = currentLang === 'ar';
      const currentDir = isAr ? 'rtl' : 'ltr';

      const colors = d.customColors || { primary: '#2563EB', accent: '#D97706', bg: '#030712' };

      const socialsArray = Object.entries(d.socials || {})
        .filter(([_, val]) => val && String(val).trim())
        .map(([platform, val]) => ({
          platform,
          url: (typeof Utils !== 'undefined') ? Utils.socialUrl(platform, val) : val,
          icon: (typeof Utils !== 'undefined') ? Utils.socialIcon(platform) : 'fas fa-link',
          label: (typeof Utils !== 'undefined') ? Utils.socialLabel(platform) : platform
        }));

      const skillsArray = (d.skills || []).map(s => ({
        name: (typeof Utils !== 'undefined') ? Utils.sanitize(s) : s,
        icon: (typeof Utils !== 'undefined') ? Utils.skillIcon(s) : 'fas fa-code'
      }));

      const projectsArray = (d.projects || []).map(p => {
        let tagsArr = [];
        if (Array.isArray(p.tags)) tagsArr = p.tags;
        else if (typeof p.tags === 'string') tagsArr = p.tags.split(',').map(t => t.trim()).filter(Boolean);

        return {
          name: (typeof Utils !== 'undefined') ? Utils.sanitize(p.name || '') : p.name,
          desc: (typeof Utils !== 'undefined') ? Utils.sanitize(p.desc || '') : p.desc,
          tags: tagsArr.map(t => (typeof Utils !== 'undefined') ? Utils.sanitize(t) : t),
          url: (typeof Utils !== 'undefined') ? Utils.sanitizeURL(p.url || '') : p.url
        };
      });

      const educationArray = (d.education || []).map(e => ({
        degree: (typeof Utils !== 'undefined') ? Utils.sanitize(e.degree || '') : e.degree,
        school: (typeof Utils !== 'undefined') ? Utils.sanitize(e.school || '') : e.school,
        year: (typeof Utils !== 'undefined') ? Utils.sanitize(e.year || '') : e.year
      }));

      const bugbountyArray = (d.bugbounty || []).map(b => ({
        platform: (typeof Utils !== 'undefined') ? Utils.sanitize(b.platform || '') : b.platform,
        username: (typeof Utils !== 'undefined') ? Utils.sanitize(b.username || '') : b.username
      }));

      const initials = (typeof Utils !== 'undefined') ? Utils.getInitials(d.name) : 'DEV';

      // Section Titles dictionary
      const sectionTitles = {
        skills: isAr ? 'المهارات والتقنيات' : 'Skills & Technologies',
        skills_sub: isAr ? 'الأدوات واللغات التي أستخدمها في البناء' : 'Core tools & languages I use to build',
        projects: isAr ? 'أبرز المشاريع' : 'Featured Projects',
        projects_sub: isAr ? 'أعمال برمجية وتجارب تم بناؤها' : 'Selected engineering projects & software',
        education: isAr ? 'التعليم والمؤهلات' : 'Education & Credentials',
        experience: isAr ? 'الخبرات المهنية' : 'Work Experience',
        bugbounty: isAr ? 'صيد الثغرات والأمان' : 'Bug Bounty & Security',
        contact: isAr ? 'تواصل معي' : 'Get In Touch',
        contact_sub: isAr ? 'متاح دائماً للفرص والاستشارات البرمجية' : 'Open for engineering opportunities and collaboration'
      };

      const portfolioTexts = {
        viewProject: isAr ? 'عرض المشروع' : 'View Project',
        downloadCV: isAr ? 'تحميل السيرة الذاتية' : 'Download Resume',
        emailMe: isAr ? 'راسلني عبر البريد' : 'Send an Email',
        titleAcademic: isAr ? 'الباحث والأكاديمي' : 'Academic CV & Portfolio'
      };

      return {
        theme: d.theme || 1,
        name: (typeof Utils !== 'undefined') ? Utils.sanitize(d.name || '') : d.name,
        bio: (typeof Utils !== 'undefined') ? Utils.sanitize(d.bio || '') : d.bio,
        role: (typeof Utils !== 'undefined') ? Utils.sanitize(d.role || 'Software Engineer') : d.role,
        email: (typeof Utils !== 'undefined') ? Utils.sanitize(d.email || '') : d.email,
        location: (typeof Utils !== 'undefined') ? Utils.sanitize(d.location || '') : d.location,
        photo: (typeof Utils !== 'undefined') ? Utils.sanitizeURL(d.photo || '') : d.photo,
        initials: initials,
        year: new Date().getFullYear(),
        slug: (typeof Utils !== 'undefined') ? Utils.slugify(d.name || 'portfolio') : 'portfolio',
        lang: currentLang,
        dir: currentDir,
        colors: colors,
        skills: skillsArray,
        skillsArray: skillsArray,
        socials: socialsArray,
        socialsArray: socialsArray,
        projects: projectsArray,
        projectsArray: projectsArray,
        education: educationArray,
        educationArray: educationArray,
        bugbounty: bugbountyArray,
        bugbountyArray: bugbountyArray,
        contactForm: Boolean(d.contactForm),
        contactEmail: (typeof Utils !== 'undefined') ? Utils.sanitize(d.contactEmail || d.email || '') : (d.email || ''),
        animationsEnabled: d.animations !== false,
        fontUrl: (typeof DesignSystem !== 'undefined') ? DesignSystem.getFontUrl(d.fontFamily || 'Inter') : 'Inter:wght@400;600;700',
        fontFamilyCss: d.fontFamily || 'Inter',
        sectionTitles: sectionTitles,
        portfolioTexts: portfolioTexts
      };
    }
  };

  return FormState;
});
