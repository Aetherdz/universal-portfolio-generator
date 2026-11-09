/* =============================================
   js/app.js — Core Orchestrator, Command Palette & UI Wiring
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

// === Handlebars Global Template Helpers ===
if (typeof Handlebars !== 'undefined') {
  Handlebars.registerHelper('t', function(key) {
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
    const dict = {
      'skills': isAr ? 'المهارات والتقنيات' : 'Technical Arsenal',
      'projects': isAr ? 'المشاريع والأعمال' : 'Featured Projects',
      'education': isAr ? 'التعليم والمؤهلات' : 'Education & Credentials',
      'experience': isAr ? 'الخبرات المهنية' : 'Work Experience',
      'bugbounty': isAr ? 'صيد الثغرات والأمان' : 'Security Profiles & Bug Bounty',
      'about': isAr ? 'نبذة' : 'About Me',
      'contact': isAr ? 'تواصل معي' : 'Get In Touch'
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
    return (typeof Utils !== 'undefined') ? Utils.truncate(str, typeof len === 'number' ? len : 100) : str;
  });
}

// === Command Palette Actions Registry ===
const COMMAND_ACTIONS = [
  // Navigation
  { id: 'nav-1', group: 'Navigation', icon: 'fas fa-user-astronaut', label: 'Jump to 01: Profile & Identity', action: () => goToStep(1) },
  { id: 'nav-2', group: 'Navigation', icon: 'fas fa-network-wired', label: 'Jump to 02: Network & Channels', action: () => goToStep(2) },
  { id: 'nav-3', group: 'Navigation', icon: 'fas fa-microchip', label: 'Jump to 03: Technical Arsenal', action: () => goToStep(3) },
  { id: 'nav-4', group: 'Navigation', icon: 'fas fa-cubes', label: 'Jump to 04: Work & Credentials', action: () => goToStep(4) },
  { id: 'nav-5', group: 'Navigation', icon: 'fas fa-palette', label: 'Jump to 05: Theme & Deployment', action: () => goToStep(5) },

  // Themes
  { id: 'th-1', group: 'Themes', icon: 'fas fa-bolt', label: 'Switch Theme: Aether (Futuristic Cyber)', action: () => selectTheme(1) },
  { id: 'th-2', group: 'Themes', icon: 'fas fa-terminal', label: 'Switch Theme: Terminal (Hacker CLI)', action: () => selectTheme(2) },
  { id: 'th-3', group: 'Themes', icon: 'fas fa-cube', label: 'Switch Theme: Minimal (Swiss Modernism)', action: () => selectTheme(3) },
  { id: 'th-4', group: 'Themes', icon: 'fas fa-layer-group', label: 'Switch Theme: Bento Grid (Linear Modular)', action: () => selectTheme(4) },
  { id: 'th-5', group: 'Themes', icon: 'fas fa-wand-magic-sparkles', label: 'Switch Theme: Glassmorphic (Frosted Aura)', action: () => selectTheme(5) },
  { id: 'th-6', group: 'Themes', icon: 'fas fa-moon', label: 'Switch Theme: Dark Premium (OLED Midnight)', action: () => selectTheme(6) },
  { id: 'th-7', group: 'Themes', icon: 'fas fa-graduation-cap', label: 'Switch Theme: Academic (Scholarly CV)', action: () => selectTheme(7) },

  // Personas
  { id: 'p-fullstack', group: 'Developer Personas', icon: 'fas fa-laptop-code', label: 'Load Persona: Full-Stack & Cloud Architect', action: () => FormState.loadPersona('fullstack') },
  { id: 'p-cyber', group: 'Developer Personas', icon: 'fas fa-shield-halved', label: 'Load Persona: Security Researcher & Bug Bounty', action: () => FormState.loadPersona('cybersecurity') },
  { id: 'p-creative', group: 'Developer Personas', icon: 'fas fa-paintbrush', label: 'Load Persona: Creative UI Technologist', action: () => FormState.loadPersona('creative') },
  { id: 'p-academic', group: 'Developer Personas', icon: 'fas fa-atom', label: 'Load Persona: AI Researcher & Academic', action: () => FormState.loadPersona('academic') },

  // Ship & Actions
  { id: 'act-html', group: 'Export & Deployment', icon: 'fas fa-file-code', label: 'Export: Download Standalone HTML', action: () => downloadHTML() },
  { id: 'act-zip', group: 'Export & Deployment', icon: 'fas fa-file-zipper', label: 'Export: Download Production ZIP', action: () => downloadZIP() },
  { id: 'act-copy', group: 'Export & Deployment', icon: 'fas fa-copy', label: 'Export: Copy HTML to Clipboard', action: () => copyHTML() },
  { id: 'act-json-exp', group: 'Export & Deployment', icon: 'fas fa-arrow-down', label: 'Config: Export JSON File', action: () => exportConfig() },
  { id: 'act-json-imp', group: 'Export & Deployment', icon: 'fas fa-arrow-up', label: 'Config: Import JSON File', action: () => importConfig() },
  { id: 'act-reset', group: 'Actions', icon: 'fas fa-rotate-left', label: 'Action: Reset All Form Data', action: () => FormState.clearFormData() },
  { id: 'act-lang', group: 'Preferences', icon: 'fas fa-globe', label: 'Switch Language: English / عربي', action: () => I18N.toggle() },
  { id: 'act-theme-ui', group: 'Preferences', icon: 'fas fa-circle-half-stroke', label: 'Toggle Dark / Light Studio Interface', action: () => toggleStudioTheme() }
];

let _selectedCmdIndex = 0;
let _filteredActions = [...COMMAND_ACTIONS];

function openCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  const input = document.getElementById('cmd-search-input');
  if (input) {
    input.value = '';
    input.focus();
  }
  _selectedCmdIndex = 0;
  renderCommandList('');
}

function closeCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.style.display = 'none';
}

function renderCommandList(query = '') {
  const container = document.getElementById('cmd-list');
  if (!container) return;

  const q = (query || '').trim().toLowerCase();
  _filteredActions = COMMAND_ACTIONS.filter(item => {
    if (!q) return true;
    return item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q);
  });

  if (_filteredActions.length === 0) {
    container.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: var(--fg-subtle); font-size: 0.8125rem;">
        No commands found matching "${Utils.sanitize(query)}"
      </div>
    `;
    return;
  }

  // Ensure index within bounds
  if (_selectedCmdIndex >= _filteredActions.length) {
    _selectedCmdIndex = 0;
  }

  // Group items
  const groups = {};
  _filteredActions.forEach((item, idx) => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push({ item, idx });
  });

  let html = '';
  Object.entries(groups).forEach(([groupName, items]) => {
    html += `<div class="cmd-group-label">${groupName}</div>`;
    items.forEach(({ item, idx }) => {
      const isSel = idx === _selectedCmdIndex;
      html += `
        <div class="cmd-item${isSel ? ' selected' : ''}" onclick="executeCommand(${idx})" onmouseenter="_selectedCmdIndex=${idx};renderCommandList(document.getElementById('cmd-search-input')?.value || '')">
          <div class="cmd-item-lead">
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
          </div>
          <span class="cmd-item-shortcut">↵</span>
        </div>
      `;
    });
  });

  container.innerHTML = html;
}

function executeCommand(idx) {
  const cmd = _filteredActions[idx];
  if (cmd && typeof cmd.action === 'function') {
    closeCommandPalette();
    cmd.action();
  }
}

function toggleStudioTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('upg-ui-theme', isDark ? 'dark' : 'light');

  const themeIcon = document.getElementById('theme-toggle')?.querySelector('i');
  if (themeIcon) {
    themeIcon.className = isDark ? 'fas fa-sun text-amber-400' : 'fas fa-moon text-muted';
  }
}

// === Master Initialization ===
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Core Form State & Storage
  if (typeof FormState !== 'undefined') {
    FormState.init();
    if (typeof FormState.on === 'function') {
      FormState.on('change', () => {
        if (typeof renderPreview === 'function') renderPreview();
        if (typeof updateStepIndicator === 'function') updateStepIndicator();
      });
    }
  }

  // Initial Step Render
  if (typeof renderCurrentStep === 'function') {
    renderCurrentStep();
  }

  // Initial Simulator Engine
  if (typeof initPreview === 'function') {
    initPreview();
  }

  // Language Switcher Toggle
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      I18N.toggle();
    });
  }

  // Dark / Light Theme Sync
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('upg-ui-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    const themeIcon = themeToggle?.querySelector('i');
    if (themeIcon) themeIcon.className = 'fas fa-moon text-muted';
  } else {
    // Default to Dark Mode for high-contrast OLED developer experience
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    const themeIcon = themeToggle?.querySelector('i');
    if (themeIcon) themeIcon.className = 'fas fa-sun text-amber-400';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleStudioTheme);
  }

  // Wire Rail Tabs & Mobile Stepper Pills
  document.querySelectorAll('.wb-rail-tab, .mobile-step-pill').forEach(btn => {
    btn.addEventListener('click', function() {
      const step = this.dataset.step;
      if (step && typeof goToStep === 'function') {
        goToStep(step);
      }
    });
  });

  // Mobile Live Preview Drawer Toggle
  const previewToggle = document.getElementById('preview-toggle');
  const previewPanel = document.getElementById('preview-panel');
  if (previewToggle && previewPanel) {
    previewToggle.addEventListener('click', () => {
      previewPanel.classList.toggle('open');
      if (typeof renderPreview === 'function') renderPreview();
    });
  }

  // Mobile Bottom-Bar Preview Button
  const mobilePreviewBtn = document.getElementById('mobile-btn-preview');
  if (mobilePreviewBtn && previewPanel) {
    mobilePreviewBtn.addEventListener('click', () => {
      previewPanel.classList.toggle('open');
      if (typeof renderPreview === 'function') renderPreview();
    });
  }

  // Command Palette Open Trigger
  const cmdTrigger = document.getElementById('cmd-palette-trigger');
  if (cmdTrigger) {
    cmdTrigger.addEventListener('click', openCommandPalette);
  }

  // Command Search Input Real-Time Filter
  const cmdSearchInput = document.getElementById('cmd-search-input');
  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', (e) => {
      _selectedCmdIndex = 0;
      renderCommandList(e.target.value);
    });

    cmdSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (_selectedCmdIndex < _filteredActions.length - 1) {
          _selectedCmdIndex++;
          renderCommandList(cmdSearchInput.value);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (_selectedCmdIndex > 0) {
          _selectedCmdIndex--;
          renderCommandList(cmdSearchInput.value);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(_selectedCmdIndex);
      }
    });
  }

  // Global Keyboard Shortcuts (⌘K / Ctrl+K and ESC)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const modal = document.getElementById('cmd-palette-modal');
      if (modal && !modal.classList.contains('hidden') && modal.style.display !== 'none') {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape') {
      closeCommandPalette();
      // Dismiss tip modal
      const tipModal = document.getElementById('tip-modal');
      if (tipModal) {
        tipModal.classList.add('hidden');
        tipModal.style.display = 'none';
      }
      // Close mobile preview drawer
      if (previewPanel && previewPanel.classList.contains('open')) {
        previewPanel.classList.remove('open');
      }
    }
  });

  // Tip Modal Dismiss Wire
  const tipOk = document.getElementById('tip-modal-ok');
  if (tipOk) {
    tipOk.addEventListener('click', () => {
      const tipModal = document.getElementById('tip-modal');
      if (tipModal) {
        tipModal.classList.add('hidden');
        tipModal.style.display = 'none';
      }
    });
  }

  // Backdrop dismiss for Modals
  ['cmd-palette-modal', 'tip-modal'].forEach(id => {
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

  console.log('Universal Portfolio Studio v3.8 Workbench Initialized');
});
