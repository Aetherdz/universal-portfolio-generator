/* =============================================
   preview.js — Live Responsive Preview Engine
   Universal Portfolio Generator — Elite Edition
   ============================================= */
let _previewTimeout = null;
let _previewExpanded = false;

function initPreview() {
  // Viewport switcher buttons
  document.querySelectorAll('.viewport-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
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

  // Expand / Wide toggle button if present
  const expandBtn = document.getElementById('preview-expand');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      _previewExpanded = !_previewExpanded;
      const panel = document.getElementById('preview-panel');
      if (panel) {
        if (_previewExpanded) {
          panel.classList.remove('w-[420px]');
          panel.classList.add('w-[680px]');
          expandBtn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
          expandBtn.title = 'Compact sidebar';
        } else {
          panel.classList.remove('w-[680px]');
          panel.classList.add('w-[420px]');
          expandBtn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
          expandBtn.title = 'Expand preview';
        }
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

  // Initial preview render
  renderPreview();
}

function renderPreview() {
  clearTimeout(_previewTimeout);
  _previewTimeout = setTimeout(() => {
    try {
      if (typeof FormState === 'undefined' || typeof getTheme !== 'function') return;
      const data = FormState.getData();
      const theme = getTheme(FormState.data.theme || 3);
      const html = theme.render(data);

      const frame = document.getElementById('preview-frame');
      if (frame) {
        frame.srcdoc = html;
      }
    } catch (e) {
      console.warn('Live preview render notice:', e);
    }
  }, 180);
}

function triggerPreview() {
  if (typeof FormState !== 'undefined' && typeof FormState.emit === 'function') {
    FormState.emit('change', FormState.data);
  }
  renderPreview();
}
