/* =============================================
   js/preview.js — Live Responsive Device Simulator & Viewport Engine
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

let _previewTimeout = null;

function initPreview() {
  // Viewport switcher buttons (desktop / tablet 768px / mobile 375px)
  document.querySelectorAll('.sim-btn[data-viewport]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-btn[data-viewport]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const vp = btn.dataset.viewport;
      const wrapper = document.getElementById('preview-wrapper');
      if (!wrapper) return;

      wrapper.classList.remove('tablet', 'mobile');
      if (vp === 'tablet') wrapper.classList.add('tablet');
      if (vp === 'mobile') wrapper.classList.add('mobile');

      renderPreview();
    });
  });

  // Simulator Theme Quick-Switcher select
  const themeSelect = document.getElementById('preview-theme-select');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const themeId = parseInt(e.target.value, 10);
      if (typeof selectTheme === 'function') {
        selectTheme(themeId);
      }
    });
  }

  // Refresh preview button
  const refreshBtn = document.getElementById('preview-refresh');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      renderPreview();
      const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
      if (typeof Utils !== 'undefined') {
        Utils.showToast(isAr ? 'تم تحديث المعاينة الحية' : 'Preview refreshed', 'info');
      }
    });
  }

  // Open in new tab button
  const externalBtn = document.getElementById('preview-newtab');
  if (externalBtn) {
    externalBtn.addEventListener('click', () => {
      if (typeof openPreviewTab === 'function') openPreviewTab();
    });
  }

  // Mobile drawer close button
  const closeBtn = document.getElementById('preview-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const stage = document.getElementById('preview-panel');
      if (stage) stage.classList.remove('open');
    });
  }

  // Initial preview render
  renderPreview();
}

function renderPreview() {
  clearTimeout(_previewTimeout);
  _previewTimeout = setTimeout(() => {
    try {
      if (typeof FormState === 'undefined') return;
      const data = FormState.getData();

      // Get current theme from registry or fallback
      const themeId = FormState.data.theme || 1;
      const theme = (typeof getTheme === 'function' ? getTheme(themeId) : null) ||
                    (typeof THEMES !== 'undefined' ? THEMES[0] : null);

      if (!theme || typeof theme.render !== 'function') return;

      const html = theme.render(data);

      const frame = document.getElementById('preview-frame');
      if (frame) {
        frame.srcdoc = html;
      }

      // Sync editable URL bar
      const urlText = document.getElementById('simulator-url');
      if (urlText) {
        urlText.textContent = `https://${data.slug || 'portfolio'}.github.io/portfolio`;
      }

      // Sync Simulator quick-theme dropdown
      const themeSelect = document.getElementById('preview-theme-select');
      if (themeSelect && themeSelect.value !== String(themeId)) {
        themeSelect.value = String(themeId);
      }
    } catch (e) {
      console.warn('Live preview render notice:', e);
    }
  }, 120);
}

// Aliases for global compatibility
window.updatePreview = renderPreview;
window.renderPreview = renderPreview;
