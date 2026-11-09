/* =============================================
   js/form/state.js — Reactive State Store & Personas
   Universal Portfolio Studio — v3.8 Workbench Architecture
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
  const STORAGE_KEY = 'universal_portfolio_data_v3';
  const _listeners = {};

  const sanitizeSkillList = (skills) => {
    if (!Array.isArray(skills)) return [];
    const isNonSkill = (typeof Utils !== 'undefined' && Utils.isNonSkill) ? Utils.isNonSkill : () => false;
    const seen = new Set();
    const result = [];
    skills.forEach(s => {
      if (!s) return;
      const str = String(s).trim();
      if (!str || isNonSkill(str)) return;
      const lower = str.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        result.push(str);
      }
    });
    return result;
  };

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
      role: 'Full-Stack Software Engineer',
      email: '',
      location: '',
      photo: '',
      photoFile: null,
      theme: 1, // Default: 1 (Aether)
      fontFamily: 'Plus Jakarta Sans',
      customColors: {
        primary: '#3b82f6',
        accent: '#06b6d4',
        bg: '#07080a'
      },
      glassmorphism: {
        blur: 16,
        opacity: 0.08,
        radius: 24
      },
      animations: true,
      contactForm: true,
      socials: {
        github: '',
        linkedin: '',
        twitter: '',
        telegram: '',
        devto: '',
        blog: ''
      },
      skills: ['TypeScript', 'JavaScript', 'React', 'Node.js', 'Python', 'Docker'],
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
          tags: ['Python', 'OWASP', 'FastAPI'],
          url: 'https://github.com'
        }
      ],
      experience: [
        {
          role: 'Senior Software Engineer',
          company: 'Vanguard Systems',
          year: '2022 - Present',
          desc: 'Architecting distributed event-driven systems and microservices handling 50k+ req/sec.'
        }
      ],
      education: [
        {
          degree: 'B.Sc. Computer Science',
          school: 'University of Science & Technology',
          year: '2018 - 2022'
        }
      ],
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
          { name: 'Distributed Cloud Mesh', desc: 'Microservices mesh engine built with Go and WebSockets for zero-downtime clustering.', tags: ['Go', 'Docker', 'Kubernetes'], url: 'https://github.com' },
          { name: 'HyperFlow React Engine', desc: 'Real-time collaborative canvas with zero-latency state sync and WebAssembly acceleration.', tags: ['TypeScript', 'React', 'WebAssembly'], url: 'https://github.com' }
        ],
        experience: [
          { role: 'Principal Architect', company: 'CloudScale Labs', year: '2022 - Present', desc: 'Designing high-throughput cloud infrastructure and real-time distributed microservices.' }
        ],
        education: [
          { degree: 'B.Sc. Computer Science', school: 'UC Berkeley', year: '2017 - 2021' }
        ],
        bugbounty: []
      },
      cybersecurity: {
        theme: 2, // Terminal
        name: 'Marcus Zero',
        nameAr: 'طارق سيف الدين',
        role: 'Security Researcher & Bug Bounty Hunter',
        bio: 'Offensive security specialist, reverse engineer, and Bug Bounty hunter focusing on cloud infrastructure & API exploits.',
        bioAr: 'باحث أمني ومكتشف ثغرات سيبرانية متخصص في تدقيق البنية التحتية السحابية وحماية الواجهات البرمجية.',
        location: 'Berlin / Remote',
        email: 'zero@recon.sec',
        socials: { github: 'marcus-zero', twitter: 'sec_zero', hackerone: 'zero_h1', tryhackme: 'zero_sec', hackthebox: '34821' },
        skills: ['Python', 'Rust', 'Bash', 'OWASP', 'Penetration Testing', 'Reverse Engineering', 'Binary Exploitation', 'Burp Suite', 'Linux', 'Cryptography'],
        projects: [
          { name: 'Aether Recon Framework', desc: 'Distributed OSINT reconnaissance engine with automated asset discovery and subdomain takeover verification.', tags: ['Python', 'OSINT', 'FastAPI'], url: 'https://github.com' },
          { name: 'API Shield Sentinel', desc: 'Automated fuzzing and AST validation engine for REST and GraphQL endpoints against OWASP Top 10.', tags: ['Rust', 'GraphQL', 'OWASP'], url: 'https://github.com' }
        ],
        experience: [
          { role: 'Lead Vulnerability Researcher', company: 'ZeroDay Defense', year: '2021 - Present', desc: 'Auditing critical infrastructure, uncovering 0-days, and triaging security disclosures.' }
        ],
        education: [
          { degree: 'B.Sc. Cyber Security', school: 'Technical University of Munich', year: '2018 - 2022' }
        ],
        bugbounty: [
          { platform: 'HackerOne', username: 'zero_h1' },
          { platform: 'Bugcrowd', username: 'm_zero' },
          { platform: 'HackTheBox', username: '34821' }
        ]
      },
      creative: {
        theme: 4, // Bento Grid
        name: 'Elena Rostova',
        nameAr: 'ليلى المنصور',
        role: 'Creative Technologist & UI Engineer',
        bio: 'Crafting spatial interfaces, fluid micro-interactions, and visual design systems at the intersection of design and engineering.',
        bioAr: 'مصممة واجهات ومطورة تجارب بصرية تفاعلية تدمج بين دقة التصميم وقوة الأداء البرمجي.',
        location: 'Paris, France',
        email: 'elena@creative.studio',
        socials: { github: 'elena-ux', twitter: 'elena_design', linkedin: 'elena-rostova', devto: 'elenaux' },
        skills: ['TypeScript', 'Three.js', 'React', 'Tailwind', 'Next.js', 'HTML5', 'CSS3', 'WebAssembly'],
        projects: [
          { name: 'Aurora Design System', desc: 'Tokenized design library with glassmorphic depth, spring physics, and WCAG AA tokens.', tags: ['React', 'Tailwind', 'TypeScript'], url: 'https://github.com' },
          { name: 'Kinetic 3D Showroom', desc: 'Interactive WebGL spatial gallery with custom GLSL shaders and dynamic lighting.', tags: ['Three.js', 'WebAssembly', 'React'], url: 'https://github.com' }
        ],
        experience: [
          { role: 'Creative UI Lead', company: 'Studio Framer', year: '2022 - Present', desc: 'Directing interactive UI engineering, motion systems, and 3D web experiences.' }
        ],
        education: [
          { degree: 'M.A. Interaction Design', school: 'École des Beaux-Arts Paris', year: '2019 - 2021' }
        ],
        bugbounty: []
      },
      academic: {
        theme: 7, // Academic
        name: 'Dr. Tariq Al-Mansoor',
        nameAr: 'د. طارق المنصور',
        role: 'AI Researcher & Scientist',
        bio: 'Doctoral researcher in Deep Learning, neural representations, and autonomous systems with published papers in NeurIPS & ICML.',
        bioAr: 'باحث دكتوراه في الذكاء الاصطناعي والتعلم العميق مع أبحاث علمية محكمة في مؤتمرات NeurIPS وICML العالمية.',
        location: 'Cambridge, MA',
        email: 'tariq@ai-research.edu',
        socials: { github: 'tariq-ai', twitter: 'tariq_research', linkedin: 'tariq-almansoor' },
        skills: ['Python', 'PyTorch', 'TensorFlow', 'SQL', 'Bash', 'C++', 'Git', 'Linux'],
        projects: [
          { name: 'Sparse Latent Diffusion', desc: 'Novel pruning algorithm for latent diffusion models achieving 3.4x faster inference with minimal fidelity loss.', tags: ['PyTorch', 'Python'], url: 'https://arxiv.org' },
          { name: 'Graph Attention Memory', desc: 'Scalable reasoning memory network over dynamic knowledge graphs for zero-shot QA.', tags: ['PyTorch', 'Python', 'SQL'], url: 'https://arxiv.org' }
        ],
        experience: [
          { role: 'Postdoctoral AI Scientist', company: 'Cognitive Computing Labs', year: '2023 - Present', desc: 'Leading research on sparse tensor computation and efficient multimodal representation models.' }
        ],
        education: [
          { degree: 'Ph.D. in Computer Science & Artificial Intelligence', school: 'MIT', year: '2020 - 2024' },
          { degree: 'M.Sc. in Machine Learning', school: 'Stanford University', year: '2018 - 2020' }
        ],
        bugbounty: []
      }
    },

    /**
     * Compute completeness score (0-100%)
     */
    getCompletenessScore() {
      const d = this.data;
      let score = 0;
      if (d.name && d.name.trim().length > 1) score += 20;
      if (d.role && d.role.trim().length > 1) score += 10;
      if (d.bio && d.bio.trim().length > 5) score += 15;
      if (d.photo && d.photo.trim().length > 0) score += 10;
      if (d.email || d.location) score += 10;

      const activeSocials = Object.values(d.socials || {}).filter(v => v && String(v).trim().length > 0);
      if (activeSocials.length >= 1) score += 10;

      const cleanSkills = sanitizeSkillList(d.skills);
      if (cleanSkills.length >= 3) score += 15;
      else if (cleanSkills.length > 0) score += 8;

      if (Array.isArray(d.projects) && d.projects.length >= 1) score += 10;

      score = Math.min(100, Math.max(0, score));
      return {
        score,
        percent: `${score}%`,
        ready: score >= 70
      };
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
      this.data.skills = sanitizeSkillList(p.skills);
      this.data.projects = JSON.parse(JSON.stringify(p.projects));
      if (p.experience) this.data.experience = JSON.parse(JSON.stringify(p.experience));
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
        fontFamily: 'Plus Jakarta Sans',
        customColors: { primary: '#3b82f6', accent: '#06b6d4', bg: '#07080a' },
        glassmorphism: { blur: 16, opacity: 0.08, radius: 24 },
        animations: true,
        contactForm: true,
        socials: { github: '', linkedin: '', twitter: '', telegram: '', devto: '', blog: '' },
        skills: [],
        projects: [],
        education: [],
        experience: [],
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
        Utils.showToast(isAr ? 'تمت إعادة تعيين النموذج' : 'Form reset successfully', 'info');
      }
    },

    /**
     * Save to localStorage
     */
    saveToStorage() {
      try {
        if (typeof localStorage !== 'undefined') {
          this.data.skills = sanitizeSkillList(this.data.skills);
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
          const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('universal_portfolio_data_v2');
          if (raw) {
            const parsed = JSON.parse(raw);
            this.data = Object.assign({}, this.data, parsed);
            this.data.skills = sanitizeSkillList(this.data.skills);
            if (!this.data.glassmorphism) {
              this.data.glassmorphism = { blur: 16, opacity: 0.08, radius: 24 };
            }
            if (!Array.isArray(this.data.experience)) {
              this.data.experience = [];
            }
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

      const colors = d.customColors || { primary: '#3b82f6', accent: '#06b6d4', bg: '#07080a' };
      const glassmorphism = d.glassmorphism || { blur: 16, opacity: 0.08, radius: 24 };

      const socialsArray = Object.entries(d.socials || {})
        .filter(([_, val]) => val && String(val).trim())
        .map(([platform, val]) => ({
          platform,
          url: (typeof Utils !== 'undefined') ? Utils.socialUrl(platform, val) : val,
          icon: (typeof Utils !== 'undefined') ? Utils.socialIcon(platform) : 'fas fa-link',
          label: (typeof Utils !== 'undefined') ? Utils.socialLabel(platform) : platform
        }));

      const cleanSkills = sanitizeSkillList(d.skills);
      const skillsArray = cleanSkills.map(s => ({
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

      const experienceArray = (d.experience || []).map(e => ({
        role: (typeof Utils !== 'undefined') ? Utils.sanitize(e.role || '') : e.role,
        company: (typeof Utils !== 'undefined') ? Utils.sanitize(e.company || '') : e.company,
        year: (typeof Utils !== 'undefined') ? Utils.sanitize(e.year || '') : e.year,
        desc: (typeof Utils !== 'undefined') ? Utils.sanitize(e.desc || '') : e.desc
      }));

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
        skills: isAr ? 'المهارات والتقنيات' : 'Technical Arsenal',
        skills_sub: isAr ? 'الأدوات واللغات التي أستخدمها في البناء' : 'Core engineering languages, frameworks & platforms',
        projects: isAr ? 'أبرز المشاريع' : 'Featured Projects',
        projects_sub: isAr ? 'أعمال برمجية وتجارب تم بناؤها' : 'Selected engineering systems & open-source software',
        education: isAr ? 'التعليم والمؤهلات' : 'Education & Credentials',
        experience: isAr ? 'الخبرات المهنية' : 'Work Experience',
        bugbounty: isAr ? 'صيد الثغرات والأمان' : 'Security Profiles & Bug Bounty',
        contact: isAr ? 'تواصل معي' : 'Get In Touch',
        contact_sub: isAr ? 'متاح دائماً للفرص والاستشارات البرمجية' : 'Open for engineering opportunities and collaboration'
      };

      const portfolioTexts = {
        title: isAr ? 'المعرض الشخصي' : 'Portfolio',
        cv: isAr ? 'السيرة الذاتية' : 'Resume / CV',
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
        glassmorphism: glassmorphism,
        skills: skillsArray,
        skillsArray: skillsArray,
        socials: socialsArray,
        socialsArray: socialsArray,
        projects: projectsArray,
        projectsArray: projectsArray,
        experience: experienceArray,
        experienceArray: experienceArray,
        education: educationArray,
        educationArray: educationArray,
        bugbounty: bugbountyArray,
        bugbountyArray: bugbountyArray,
        contactForm: Boolean(d.contactForm),
        contactEmail: (typeof Utils !== 'undefined') ? Utils.sanitize(d.contactEmail || d.email || '') : (d.email || ''),
        animationsEnabled: d.animations !== false,
        fontUrl: (typeof DesignSystem !== 'undefined') ? DesignSystem.getFontUrl(d.fontFamily || 'Plus Jakarta Sans') : 'Plus+Jakarta+Sans:wght@400;600;700',
        fontFamilyCss: d.fontFamily || 'Plus Jakarta Sans',
        sectionTitles: sectionTitles,
        portfolioTexts: portfolioTexts
      };
    }
  };

  return FormState;
});
