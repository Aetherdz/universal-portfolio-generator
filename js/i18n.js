/* =============================================
   i18n.js — Arabic / English Translation System
   Universal Portfolio Generator — Elite Edition
   ============================================= */
const I18N = {
  current: 'en',
  dirs: { en: 'ltr', ar: 'rtl' },
  strings: {
    'app.title': {
      en: 'Universal Portfolio Generator',
      ar: 'أداة إنشاء المحفظة الشخصية الاحترافية'
    },
    'app.step1': { en: 'Profile', ar: 'الملف الشخصي' },
    'app.step2': { en: 'Social', ar: 'التواصل الاجتماعي' },
    'app.step3': { en: 'Skills', ar: 'المهارات' },
    'app.step4': { en: 'Projects', ar: 'المشاريع' },
    'app.step5': { en: 'Theme', ar: 'القالب والمظهر' },

    'btn.demo': { en: 'Load Demo', ar: 'بيانات تجريبية' },
    'btn.clear': { en: 'Reset', ar: 'إعادة ضبط' },

    'form.profile.title': { en: 'Personal Information', ar: 'المعلومات الشخصية' },
    'form.profile.fullName': { en: 'Full Name *', ar: 'الاسم الكامل *' },
    'form.profile.bio': { en: 'Bio / Tagline', ar: 'نبذة تعريفية سريعة' },
    'form.profile.role': { en: 'Primary Role *', ar: 'المسمى المهني *' },
    'form.profile.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
    'form.profile.location': { en: 'Location / Country', ar: 'الدولة / الموقع' },
    'form.profile.photo': { en: 'Profile Photo', ar: 'الصورة الشخصية' },
    'form.profile.placeholder.name': { en: 'e.g. Alex Morgan', ar: 'مثال: أحمد عبد الله' },
    'form.profile.placeholder.bio': { en: 'Passionate developer building resilient systems and scalable experiences.', ar: 'مهندس برمجيات وباحث أمني شغوف ببناء أنظمة موثوقة وعالية الأداء.' },

    'form.role.softwareengineer': { en: 'Software Engineer', ar: 'مهندس برمجيات' },
    'form.role.securityresearcher': { en: 'Security Researcher', ar: 'باحث أمني' },
    'form.role.bugbountyhunter': { en: 'Bug Bounty Hunter', ar: 'صياد ثغرات' },
    'form.role.techfounder': { en: 'Tech Founder', ar: 'مؤسس تقني' },
    'form.role.uiuxdesigner': { en: 'UI/UX Designer', ar: 'مصمم واجهات وتجربة مستخدم' },
    'form.role.datascientist': { en: 'Data Scientist', ar: 'عالم بيانات وذكاء اصطناعي' },

    'form.social.title': { en: 'Online Presence & Social Links', ar: 'الحسابات وروابط التواصل' },
    'form.social.subtitle': { en: 'Connect your developer and professional channels for instant networking', ar: 'اربط حساباتك التقنية والمهنية ليتمكن الزوار من التواصل معك مباشرة' },

    'form.education.title': { en: 'Education & Degrees', ar: 'التعليم والشهادات' },
    'form.education.add': { en: 'Add Degree', ar: 'إضافة مؤهل' },
    'form.education.degree': { en: 'Degree / Major', ar: 'الشهادة / التخصص' },
    'form.education.school': { en: 'Institution / University', ar: 'الجامعة أو المعهد' },
    'form.education.year': { en: 'Year', ar: 'السنة' },

    'form.bugbounty.title': { en: 'Bug Bounty & Security', ar: 'منصات صيد الثغرات' },
    'form.bugbounty.add': { en: 'Add Platform', ar: 'إضافة منصة' },
    'form.bugbounty.username': { en: 'Username / Handle', ar: 'اسم المستخدم أو المعرف' },

    'form.skills.title': { en: 'Skills & Technologies', ar: 'المهارات والتقنيات' },
    'form.skills.search': { en: 'Search 75+ skills...', ar: 'ابحث في أكثر من 75 مهارة...' },

    'form.projects.title': { en: 'Featured Projects', ar: 'أبرز المشاريع والأعمال' },
    'form.projects.add': { en: '+ Add Project', ar: '+ إضافة مشروع' },
    'form.projects.name': { en: 'Project Title', ar: 'اسم المشروع' },
    'form.projects.desc': { en: 'Description & Impact', ar: 'نبذة عن المشروع وأهميته' },
    'form.projects.tags': { en: 'Tech Stack / Tags (comma separated)', ar: 'التقنيات المستخدمة (مفصولة بفواصل)' },
    'form.projects.url': { en: 'Project URL (Demo / Repo)', ar: 'رابط المشروع أو الكود' },

    'form.theme.title': { en: 'Select Your Signature Theme', ar: 'اختر قالبك المفضل' },
    'form.theme.select': { en: 'Pick a high-fidelity aesthetic for your generated portfolio', ar: 'اختر تصميماً احترافياً يعبر عن شخصيتك وخبراتك' },

    'theme.1': { en: 'Aether (Futuristic)', ar: 'أثير (مستقبلي نيون)' },
    'theme.2': { en: 'Terminal (Hacker CLI)', ar: 'ترمينال (سطر الأوامر)' },
    'theme.3': { en: 'Minimal (Swiss Modern)', ar: 'أنيق (سويسري بسيط)' },
    'theme.4': { en: 'Bento Grid (Linear Modular)', ar: 'بنتو (شبكة تفاعلية)' },
    'theme.5': { en: 'Glassmorphic (Frosted Aura)', ar: 'بلوري (زجاجي فاخر)' },
    'theme.6': { en: 'Dark Premium (Cyber Midnight)', ar: 'ليلي فاخر (مظلم متألق)' },
    'theme.7': { en: 'Academic (Scholar CV)', ar: 'أكاديمي (سيرة علمية)' },

    'form.controls.palette': { en: 'Color Palette', ar: 'نظام الألوان' },
    'form.controls.font': { en: 'Typography Font', ar: 'نوع الخط' },
    'form.controls.glass': { en: 'Glassmorphism Controls', ar: 'تأثير الزجاج الشفاف' },
    'form.controls.animations': { en: 'Page Animations', ar: 'التأثيرات الحركية' },
    'form.controls.contact': { en: 'Contact Form Section', ar: 'نموذج التواصل السريع' },
    'form.controls.enableContact': { en: 'Enable interactive contact section', ar: 'تفعيل قسم ونموذج المراسلة' },
    'form.controls.github': { en: 'GitHub Repositories Sync', ar: 'مزامنة مستودعات GitHub' },
    'form.controls.githubDesc': { en: 'Instantly pull your top GitHub repositories into your projects list', ar: 'استيراد أفضل مستودعاتك البرمجية من GitHub وإضافتها لمشاريعك بضغطة زر' },
    'form.controls.githubPlaceholder': { en: 'GitHub Username or Personal Access Token (ghp_...)', ar: 'اسم المستخدم أو الرمز الشخصي (ghp_...)' },
    'form.controls.tokenNote': { en: 'Public repos work with username alone! Private repos require token with repo scope. Tokens are never stored.', ar: 'المستودعات العامة تعمل باسم المستخدم فقط! الرمز الشخصي لا يُحفظ أبداً ويبقى في ذاكرة المتصفح.' },
    'form.controls.sync': { en: 'Sync GitHub Repos', ar: 'مزامنة المستودعات' },
    'form.controls.deploy': { en: 'Deploy to GitHub', ar: 'نشر على GitHub' },
    'form.controls.blur': { en: 'Blur', ar: 'درجة الضبابية' },
    'form.controls.opacity': { en: 'Opacity', ar: 'الشفافية' },
    'form.controls.radius': { en: 'Radius', ar: 'استدارة الحواف' },

    'btn.next': { en: 'Next Step →', ar: 'الخطوة التالية ←' },
    'btn.prev': { en: '← Previous', ar: '→ السابق' },
    'btn.finish': { en: 'Generate Portfolio ✨', ar: 'إنشاء الموقع ✨' },

    'modal.generate.title': { en: 'Ready to Generate Your Portfolio!', ar: 'جاهز لإنشاء موقعك الشخصي!' },
    'modal.generate.desc': { en: 'Your responsive, secure portfolio will be prepared for export & deployment.', ar: 'سيتم بناء موقعك المتجاوب والآمن بالكامل ليكون جاهزاً للتحميل والنشر المباشر.' },
    'modal.cancel': { en: 'Keep Editing', ar: 'متابعة التعديل' },
    'modal.generate.btn': { en: 'Build Now!', ar: 'إنشاء الآن!' },

    'export.deploy': { en: 'Deploy to GitHub Pages', ar: 'نشر على GitHub Pages' },
    'export.zip': { en: 'Download Complete ZIP', ar: 'تحميل ملف ZIP كامل' },
    'export.html': { en: 'Download Standalone HTML', ar: 'تحميل صفحة HTML مستقلة' },
    'export.copyHtml': { en: 'Copy HTML Code', ar: 'نسخ كود HTML' },
    'export.openTab': { en: 'Open in New Tab', ar: 'فتح في نافذة كاملة' },
    'export.saveConfig': { en: 'Export JSON Config', ar: 'تصدير إعدادات JSON' },
    'export.loadConfig': { en: 'Import JSON Config', ar: 'استيراد إعدادات JSON' },
    'export.success': { en: 'Portfolio generated successfully! Choose your preferred export below.', ar: 'تم إنشاء موقعك بنجاح! اختر طريقة التصدير أو النشر المفضلة أدناه.' },

    'success.demo': { en: 'Loaded high-fidelity demo portfolio profile!', ar: 'تم تحميل بيانات الملف التجريبي المتكامل بنجاح!' },
    'success.cleared': { en: 'Form has been reset.', ar: 'تمت إعادة ضبط النموذج بنجاح.' },
    'success.copied': { en: 'Portfolio HTML copied to clipboard!', ar: 'تم نسخ كود الموقع إلى الحافظة بنجاح!' },
    'success.zipped': { en: 'ZIP package downloaded successfully!', ar: 'تم تحميل حزمة ZIP المضغوطة بنجاح!' },
    'success.htmlDownloaded': { en: 'Single-file portfolio HTML downloaded!', ar: 'تم تحميل ملف HTML المستقل بنجاح!' },
    'success.configSaved': { en: 'Configuration exported to JSON!', ar: 'تم تصدير ملف الإعدادات بنجاح!' },
    'success.configLoaded': { en: 'Configuration restored successfully!', ar: 'تم استيراد الإعدادات وتطبيقها بنجاح!' },
    'success.deployed': { en: 'Deployed successfully to GitHub Pages!', ar: 'تم النشر بنجاح على GitHub Pages!' },

    'loading.generating': { en: 'Rendering your responsive portfolio...', ar: 'جارٍ تجهيز وبناء صفحات الموقع...' },
    'loading.deploying': { en: 'Deploying to GitHub Pages repository...', ar: 'جارٍ النشر إلى GitHub Pages...' },
    'loading.zipping': { en: 'Bundling project files into ZIP archive...', ar: 'جارٍ تجميع وتجهيز الملفات المضغوطة...' },
    'loading.syncing': { en: 'Connecting to GitHub API...', ar: 'جارٍ الاتصال بواجهة برمجة GitHub...' }
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

    if (typeof FormState !== 'undefined' && typeof FormState.renderStep === 'function') {
      FormState.renderStep(FormState.currentStep);
    }
    if (typeof triggerPreview === 'function') {
      triggerPreview();
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
