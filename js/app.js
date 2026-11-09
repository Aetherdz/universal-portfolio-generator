/* =============================================
   app.js — Core Orchestrator & UI Event Wiring
   Universal Portfolio Generator — Elite Edition
   ============================================= */

// === Handlebars Helpers ===
if (typeof Handlebars !== 'undefined') {
  Handlebars.registerHelper('t', function(key) {
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
    const dict = {
      'skills': isAr ? 'المهارات والتقنيات' : 'Skills & Technologies',
      'projects': isAr ? 'المشاريع والأعمال' : 'Projects & Work',
      'education': isAr ? 'التعليم والمؤهلات' : 'Education & Credentials',
      'experience': isAr ? 'الخبرات المهنية' : 'Work Experience',
      'bugbounty': isAr ? 'صيد الثغرات والأمان' : 'Bug Bounty & Security',
      'about': isAr ? 'نبذة' : 'About Me',
      'contact': isAr ? 'تواصل معي' : 'Contact Me'
    };
    return dict[key] || (typeof I18N !== 'undefined' ? I18N.t(key) : key);
  });

  Handlebars.registerHelper('eq', function(a, b) { return a === b; });
  Handlebars.registerHelper('ne', function(a, b) { return a !== b; });
  Handlebars.registerHelper('or', function(a, b) { return a || b; });
  Handlebars.registerHelper('and', function(a, b) { return a && b; });
  Handlebars.registerHelper('firstChar', function(str) {
    return (str || '').trim().charAt(0).toUpperCase();
  });
  Handlebars.registerHelper('truncate', function(str, len) {
    return Utils.truncate(str, typeof len === 'number' ? len : 100);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS scroll animations if present
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 500, once: true, offset: 40 });
  }

  // Initialize Core State & Live Preview
  if (typeof FormState !== 'undefined') {
    FormState.init();

    // Reactive subscription: state changes trigger debounced preview
    if (typeof FormState.on === 'function') {
      FormState.on('change', () => {
        if (typeof renderPreview === 'function') renderPreview();
      });
    }
  }

  if (typeof initPreview === 'function') {
    initPreview();
  }

  // Language Toggle
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      I18N.toggle();
    });
  }

  // System Dark Mode Detection & Sync
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');

  const savedTheme = localStorage.getItem('upg-ui-theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
    document.documentElement.classList.add('dark');
    if (themeIcon) themeIcon.className = 'fas fa-sun text-sm text-amber-400';
  } else {
    document.documentElement.classList.remove('dark');
    if (themeIcon) themeIcon.className = 'fas fa-moon text-sm text-mono-500';
  }

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('upg-ui-theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
      if (themeIcon) {
        themeIcon.className = e.matches ? 'fas fa-sun text-sm text-amber-400' : 'fas fa-moon text-sm text-mono-500';
      }
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('upg-ui-theme', isDark ? 'dark' : 'light');
      if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun text-sm text-amber-400' : 'fas fa-moon text-sm text-mono-500';
      }
    });
  }

  // Preview Panel Toggle & Mobile Bottom-Sheet Controller
  const previewToggle = document.getElementById('preview-toggle');
  const mobilePreviewBtn = document.getElementById('mobile-btn-preview');
  const previewPanel = document.getElementById('preview-panel');
  const previewClose = document.getElementById('preview-close');

  function togglePreviewPanel() {
    if (!previewPanel) return;
    const isOpen = previewPanel.classList.contains('open');
    if (isOpen) {
      previewPanel.classList.remove('open');
      previewToggle?.classList.remove('active');
      mobilePreviewBtn?.classList.remove('active');
      document.body.classList.remove('preview-modal-open');
    } else {
      previewPanel.classList.add('open');
      previewToggle?.classList.add('active');
      mobilePreviewBtn?.classList.add('active');
      if (window.innerWidth < 1024) {
        document.body.classList.add('preview-modal-open');
      }
      if (typeof renderPreview === 'function') {
        renderPreview();
      }
    }
  }

  if (previewToggle) {
    previewToggle.addEventListener('click', togglePreviewPanel);
  }

  if (mobilePreviewBtn) {
    mobilePreviewBtn.addEventListener('click', togglePreviewPanel);
  }

  if (previewClose) {
    previewClose.addEventListener('click', () => {
      previewPanel?.classList.remove('open');
      previewToggle?.classList.remove('active');
      mobilePreviewBtn?.classList.remove('active');
      document.body.classList.remove('preview-modal-open');
    });
  }

  // Backdrop click dismiss for mobile bottom-sheet
  if (previewPanel) {
    previewPanel.addEventListener('click', (e) => {
      if (window.innerWidth < 1024 && e.target === previewPanel) {
        previewPanel.classList.remove('open');
        previewToggle?.classList.remove('active');
        mobilePreviewBtn?.classList.remove('active');
        document.body.classList.remove('preview-modal-open');
      }
    });
  }

  // Export Buttons Wiring
  const btnZip = document.getElementById('btn-zip');
  if (btnZip && typeof downloadZIP === 'function') {
    btnZip.addEventListener('click', downloadZIP);
  }

  const btnHtml = document.getElementById('btn-html');
  if (btnHtml && typeof downloadHTML === 'function') {
    btnHtml.addEventListener('click', downloadHTML);
  }

  const btnCopyHtml = document.getElementById('btn-copy-html');
  if (btnCopyHtml && typeof copyHTML === 'function') {
    btnCopyHtml.addEventListener('click', copyHTML);
  }

  const btnTab = document.getElementById('btn-tab');
  if (btnTab && typeof openPreviewTab === 'function') {
    btnTab.addEventListener('click', openPreviewTab);
  }

  // GitHub Pages Deploy Section Toggle
  const btnDeploy = document.getElementById('btn-deploy');
  if (btnDeploy) {
    btnDeploy.addEventListener('click', () => {
      const sec = document.getElementById('deploy-section');
      if (sec) {
        sec.classList.toggle('hidden');
        sec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  const btnDeployGo = document.getElementById('btn-deploy-go');
  if (btnDeployGo && typeof deployToGitHub === 'function') {
    btnDeployGo.addEventListener('click', deployToGitHub);
  }

  // Generate confirmation modal handlers
  const modalConfirm = document.getElementById('modal-confirm');
  if (modalConfirm && typeof confirmGenerate === 'function') {
    modalConfirm.addEventListener('click', confirmGenerate);
  }

  const modalCancel = document.getElementById('modal-cancel');
  if (modalCancel && typeof cancelGenerate === 'function') {
    modalCancel.addEventListener('click', cancelGenerate);
  }

  // Tip Modal Dismiss
  const tipModalOk = document.getElementById('tip-modal-ok');
  if (tipModalOk) {
    tipModalOk.addEventListener('click', () => {
      const m = document.getElementById('tip-modal');
      if (m) {
        m.classList.add('hidden');
        m.style.display = 'none';
      }
    });
  }

  // Close modals on backdrop click
  ['generate-modal', 'tip-modal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.add('hidden');
          this.style.display = 'none';
        }
      });
    }
  });

  // ESC key dismisses modals and preview panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['generate-modal', 'tip-modal'].forEach(id => {
        const m = document.getElementById(id);
        if (m) {
          m.classList.add('hidden');
          m.style.display = 'none';
        }
      });
      if (window.innerWidth < 900 && previewPanel?.classList.contains('open')) {
        previewPanel.classList.remove('open');
        previewToggle?.classList.remove('active');
      }
    }
  });

  console.log('Universal Portfolio Generator — Elite Edition initialized');
});
