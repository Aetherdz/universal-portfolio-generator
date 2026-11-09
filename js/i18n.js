/* =============================================
   i18n.js — Arabic / English Translation System
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

const I18N = {
  current: 'en',
  dirs: { en: 'ltr', ar: 'rtl' },
  strings: {
    'app.title': {
      en: 'Universal Portfolio Studio',
      ar: 'استوديو المعارض البرمجية العالمي'
    },
    'app.tagline': {
      en: 'v3.8 Workbench · 7 Elevated Themes · Zero-Dependency Export',
      ar: 'الإصدار 3.8 · 7 قوالب متقدمة · تصدير مستقل بدون أي تبعيات'
    },

    // Step Stepper Navigation
    'app.step1': { en: '01 Identity', ar: '01 الهوية' },
    'app.step2': { en: '02 Network', ar: '02 التواصل' },
    'app.step3': { en: '03 Arsenal', ar: '03 المهارات' },
    'app.step4': { en: '04 Work & History', ar: '04 الأعمال والخبرة' },
    'app.step5': { en: '05 Theme & Ship', ar: '05 المظهر والنشر' },

    'app.step1_short': { en: 'Identity', ar: 'الهوية' },
    'app.step2_short': { en: 'Network', ar: 'التواصل' },
    'app.step3_short': { en: 'Arsenal', ar: 'المهارات' },
    'app.step4_short': { en: 'Work', ar: 'الأعمال' },
    'app.step5_short': { en: 'Ship', ar: 'النشر' },

    'mobile.editor': { en: 'Editor', ar: 'المحرر' },
    'mobile.preview': { en: 'Preview', ar: 'المعاينة' },

    'form.step.profile': { en: 'Profile & Identity', ar: 'الملف الشخصي والهوية' },
    'form.step.profile_desc': {
      en: 'Define your core identity, avatar, primary engineering role, and contact coordinates.',
      ar: 'حدد هويتك الأساسية، صورتك، دورك البرمجي، وبيانات الاتصال الخاصة بك.'
    },
    'form.step.social': { en: 'Network & Channels', ar: 'الحسابات وشبكات التواصل' },
    'form.step.social_desc': {
      en: 'Connect your GitHub, LinkedIn, bug bounty handles, and developer channels.',
      ar: 'اربط حساباتك على GitHub، LinkedIn، ومنصات صيد الثغرات وروابطك المهنية.'
    },
    'form.step.skills': { en: 'Technical Arsenal', ar: 'الترسانة التقنية والمهارات' },
    'form.step.skills_desc': {
      en: 'Strictly curated engineering languages, frameworks, systems, and security tooling.',
      ar: 'مجموعة منتقاة بدقة من لغات البرمجة، أطر العمل، البنية السحابية، وأدوات الأمان.'
    },
    'form.step.projects': { en: 'Work, Credentials & Security', ar: 'المشاريع والخبرات والأمان' },
    'form.step.projects_desc': {
      en: 'Featured projects with 1-click GitHub sync, work history, education, and bug bounty platforms.',
      ar: 'أبرز المشاريع مع مزامنة سريعة من GitHub، وسجل الخبرات المهنية والشهادات الأكاديمية.'
    },
    'form.step.theme': { en: 'Theme, Tokens & Deployment', ar: 'القالب والألوان ومحطة النشر' },
    'form.step.theme_desc': {
      en: 'Choose from 7 signature themes, curated color palettes, custom typography, and ship anywhere.',
      ar: 'اختر من بين 7 قوالب استثنائية، لوحات ألوان مدروسة، خطوط متناسقة، وانشر موقعك فوراً.'
    },

    'btn.demo': { en: 'Load Sample', ar: 'بيانات نموذجية' },
    'btn.clear': { en: 'Reset', ar: 'إعادة ضبط' },
    'btn.next': { en: 'Next Stage →', ar: 'المرحلة التالية ←' },
    'btn.prev': { en: '← Previous', ar: '→ السابق' },
    'btn.finish': { en: 'Export Portfolio', ar: 'تصدير المعرض الشخصي' },

    // Profile Step
    'form.profile.fullName': { en: 'Full Name *', ar: 'الاسم الكامل *' },
    'form.profile.bio': { en: 'Bio / Tagline (with character counter)', ar: 'نبذة تعريفية سريعة' },
    'form.profile.role': { en: 'Primary Role / Title *', ar: 'المسمى الوظيفي الأساسي *' },
    'form.profile.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'form.profile.location': { en: 'Location / Coordinates', ar: 'الموقع الجغرافي / الدولة' },
    'form.profile.photo': { en: 'Profile Photo / Avatar', ar: 'الصورة الشخصية' },
    'form.profile.placeholder.name': { en: 'e.g. Alex Vance', ar: 'مثال: أحمد عبد الرحمن' },
    'form.profile.placeholder.bio': { en: 'Building resilient cloud infrastructure, distributed systems, and real-time interactive user interfaces.', ar: 'مهندس برمجيات وباحث أمني شغوف ببناء أنظمة سحابية موزعة وحلول متقدمة للويب.' },
    'form.profile.removePhoto': { en: 'Remove Photo', ar: 'إزالة الصورة' },

    // Work Experience
    'form.experience.title': { en: 'Work Experience', ar: 'الخبرات المهنية' },
    'form.experience.add': { en: '+ Add Experience', ar: '+ إضافة خبرة' },
    'form.experience.role': { en: 'Role / Job Title', ar: 'المسمى الوظيفي' },
    'form.experience.company': { en: 'Company / Organization', ar: 'الشركة أو المؤسسة' },
    'form.experience.year': { en: 'Period (e.g. 2022 - Present)', ar: 'الفترة (مثال: 2022 - الآن)' },
    'form.experience.desc': { en: 'Key Achievements & Impact', ar: 'أبرز الإنجازات والمسؤوليات' },

    // Education
    'form.education.title': { en: 'Education & Credentials', ar: 'التعليم والمؤهلات' },
    'form.education.add': { en: '+ Add Credential', ar: '+ إضافة مؤهل' },
    'form.education.degree': { en: 'Degree / Specialization', ar: 'الشهادة / التخصص' },
    'form.education.school': { en: 'Institution / University', ar: 'الجامعة أو المعهد' },
    'form.education.year': { en: 'Years (e.g. 2018 - 2022)', ar: 'السنوات (مثال: 2018 - 2022)' },

    // Bug Bounty
    'form.bugbounty.title': { en: 'Bug Bounty & Security Profiles', ar: 'ملفات صيد الثغرات والأمان' },
    'form.bugbounty.add': { en: '+ Add Profile', ar: '+ إضافة منصة' },
    'form.bugbounty.platform': { en: 'Platform', ar: 'المنصة' },
    'form.bugbounty.username': { en: 'Handle / User ID', ar: 'اسم المستخدم أو المعرف' },

    // Projects
    'form.projects.title': { en: 'Featured Projects', ar: 'أبرز المشاريع' },
    'form.projects.add': { en: '+ Add Project', ar: '+ إضافة مشروع' },
    'form.projects.name': { en: 'Project Title', ar: 'اسم المشروع' },
    'form.projects.desc': { en: 'Technical Description & Impact', ar: 'الوصف الفني والتأثير' },
    'form.projects.tags': { en: 'Technologies / Tags (comma separated)', ar: 'التقنيات المستخدمة (مفصولة بفواصل)' },
    'form.projects.url': { en: 'Project URL (Demo or Repository)', ar: 'رابط المشروع أو الكود' },
    'form.projects.syncBar': { en: '1-Click GitHub Repository Sync', ar: 'مزامنة مستودعات GitHub المباشرة' },
    'form.projects.syncBtn': { en: 'Sync Repos', ar: 'مزامنة المشاريع' },
    'form.projects.syncPlaceholder': { en: 'GitHub username (e.g. torvalds)', ar: 'اسم مستخدم GitHub (مثال: torvalds)' },

    // Skills
    'form.skills.searchPh': { en: 'Search technical arsenal...', ar: 'ابحث في الترسانة التقنية...' },
    'form.skills.customPh': { en: 'Add custom tech (e.g. WebAssembly, eBPF, Zig...)', ar: 'أضف مهارة مخصصة (مثال: WebAssembly, eBPF...)' },
    'form.skills.selected': { en: 'Active Selected Arsenal', ar: 'المهارات المحددة حالياً' },
    'form.skills.clearAll': { en: 'Clear All', ar: 'مسح الكل' },
    'form.skills.add': { en: 'Add', ar: 'إضافة' },

    // Themes
    'theme.1': { en: 'Aether (Futuristic Cyber)', ar: 'أثير (مستقبلي نيون)' },
    'theme.2': { en: 'Terminal (Hacker Matrix CLI)', ar: 'ترمينال (سطر الأوامر)' },
    'theme.3': { en: 'Minimal (Swiss Modernism)', ar: 'أنيق (سويسري بسيط)' },
    'theme.4': { en: 'Bento Grid (Linear Modular)', ar: 'بنتو (شبكة تفاعلية)' },
    'theme.5': { en: 'Glassmorphic (Frosted Aura)', ar: 'بلوري (زجاجي فاخر)' },
    'theme.6': { en: 'Dark Premium (OLED Midnight)', ar: 'ليلي فاخر (مظلم متألق)' },
    'theme.7': { en: 'Academic (Scholarly CV)', ar: 'أكاديمي (سيرة علمية)' },

    // Export & Deploy
    'export.deploy': { en: 'Deploy to GitHub Pages', ar: 'نشر على GitHub Pages' },
    'export.zip': { en: 'Production ZIP Package', ar: 'حزمة ZIP للإنتاج' },
    'export.html': { en: 'Standalone HTML File', ar: 'ملف HTML مستقل' },
    'export.copyHtml': { en: 'Copy HTML Code', ar: 'نسخ كود HTML' },
    'export.saveConfig': { en: 'Export JSON', ar: 'تصدير JSON' },
    'export.loadConfig': { en: 'Import JSON', ar: 'استيراد JSON' },

    'loading.generating': { en: 'Synthesizing responsive portfolio...', ar: 'جارٍ بناء وتجهيز صفحات المعرض...' },
    'loading.deploying': { en: 'Publishing directly to GitHub Pages...', ar: 'جارٍ النشر المباشر إلى GitHub Pages...' },
    'loading.syncing': { en: 'Connecting to GitHub REST API...', ar: 'جارٍ الاتصال بواجهة GitHub...' }
  },

  t(key) {
    return this.strings[key]?.[this.current] || key;
  },

  setLang(lang) {
    if (!['en', 'ar'].includes(lang)) return;
    this.current = lang;
    const dir = this.dirs[lang] || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;

    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang === 'ar' ? 'English' : 'عربي';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (k && this.strings[k]) {
        el.textContent = this.t(k);
      }
    });

    if (typeof FormState !== 'undefined') {
      if (typeof window.renderCurrentStep === 'function') {
        window.renderCurrentStep();
      }
      if (typeof window.triggerPreview === 'function') {
        window.triggerPreview();
      }
    }
  },

  toggle() {
    this.setLang(this.current === 'en' ? 'ar' : 'en');
  }
};

if (typeof window !== 'undefined') {
  window.I18N = I18N;
} else if (typeof globalThis !== 'undefined') {
  globalThis.I18N = I18N;
}
