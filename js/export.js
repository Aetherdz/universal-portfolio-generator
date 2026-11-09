/* =============================================
   export.js — ZIP, Standalone HTML & Config Export/Import
   Universal Portfolio Generator — Elite Edition
   ============================================= */

/**
 * Download complete portfolio as standalone HTML
 */
function downloadHTML() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  try {
    const data = FormState.getData();
    const theme = getTheme(FormState.data.theme || 3);
    const portfolioHtml = theme.render(data);
    const filename = `${data.slug || 'portfolio'}.html`;

    Utils.downloadHTML(portfolioHtml, filename);
    Utils.showToast(isAr ? 'تم تحميل ملف HTML المستقل!' : 'Single-file HTML downloaded!', 'success');
    showDownloadTip();
  } catch (e) {
    console.error('HTML export error:', e);
    Utils.showToast((isAr ? 'فشل تحميل HTML: ' : 'Failed to download HTML: ') + e.message, 'error');
  }
}

/**
 * Copy portfolio HTML directly to clipboard
 */
async function copyHTML() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  try {
    const data = FormState.getData();
    const theme = getTheme(FormState.data.theme || 3);
    const portfolioHtml = theme.render(data);

    const ok = await Utils.copyToClipboard(portfolioHtml);
    if (ok) {
      Utils.showToast(isAr ? 'تم نسخ كود HTML إلى الحافظة بنجاح!' : 'HTML code copied to clipboard!', 'success');
    } else {
      Utils.showToast(isAr ? 'تعذر النسخ التلقائي' : 'Unable to copy to clipboard', 'warn');
    }
  } catch (e) {
    console.error('Copy HTML error:', e);
    Utils.showToast('Copy failed: ' + e.message, 'error');
  }
}

/**
 * Open rendered portfolio in a full new browser window / tab
 */
function openPreviewTab() {
  try {
    const data = FormState.getData();
    const theme = getTheme(FormState.data.theme || 3);
    const portfolioHtml = theme.render(data);

    const blob = new Blob([portfolioHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (e) {
    console.error('Open preview tab error:', e);
  }
}

/**
 * Bundle portfolio into a complete production ZIP archive
 */
async function downloadZIP() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  Utils.showLoading(isAr ? 'جارٍ حزم ملفات المشروع في ZIP...' : 'Bundling project files into ZIP...');

  try {
    const data = FormState.getData();
    const theme = getTheme(FormState.data.theme || 3);
    const portfolioHtml = theme.render(data);

    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip library not available');
    }

    const zip = new JSZip();

    // Primary standalone HTML
    zip.file('index.html', portfolioHtml);

    // Backup config JSON for easy restoration
    const exportConfigData = {
      version: '2.0',
      generator: 'Universal Portfolio Generator',
      exportedAt: new Date().toISOString(),
      portfolio: FormState.data
    };
    zip.file('portfolio-config.json', JSON.stringify(exportConfigData, null, 2));

    // Custom CSS override file for local modifications
    zip.file('custom.css', `/* Custom Styles Override */\n/* The portfolio styles are self-contained in index.html */\n/* Add any additional custom styles here if needed */\n`);

    // Complete deployment README
    const readmeContent = `# ${data.name || 'Developer'} — Portfolio

Generated with **Universal Portfolio Generator**.

## Quick Start
1. Double click \`index.html\` to view locally in your browser.
2. Edit \`index.html\` directly in any text editor.

## Free Hosting Options
### 1. GitHub Pages
- Create a new GitHub repository named \`${data.slug || 'portfolio'}\` or \`<your-username>.github.io\`.
- Push the contents of this ZIP to the repository.
- Go to **Settings > Pages** and set source to \`main\` branch \`/\` root.

### 2. Vercel / Netlify / Cloudflare Pages
- Drag and drop this unzipped folder into [Vercel](https://vercel.com) or [Netlify Drop](https://app.netlify.com/drop).
- Your portfolio will be live worldwide in seconds with free SSL.
`;
    zip.file('README.md', readmeContent);

    // .nojekyll for GitHub Pages asset compatibility
    zip.file('.nojekyll', '');

    // Optional CNAME
    if (FormState.data.customDomain) {
      zip.file('CNAME', FormState.data.customDomain.trim());
    }

    // Generate ZIP Blob
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    const filename = `${data.slug || 'portfolio'}-site.zip`;
    if (typeof saveAs !== 'undefined') {
      saveAs(blob, filename);
    } else {
      Utils.downloadFile(blob, filename, 'application/zip');
    }

    Utils.hideLoading();
    Utils.showToast(isAr ? 'تم تحميل ملف ZIP بنجاح!' : 'Portfolio ZIP downloaded successfully!', 'success');
    showDownloadTip();
  } catch (e) {
    Utils.hideLoading();
    console.error('ZIP error:', e);
    Utils.showToast((isAr ? 'فشل إنشاء ZIP: ' : 'Failed to create ZIP: ') + e.message, 'error');
  }
}

/**
 * Export portfolio config to JSON file
 */
function exportConfig() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  const data = FormState.data;
  const exportData = {
    version: '2.0',
    generator: 'Universal Portfolio Generator',
    generated: new Date().toISOString(),
    portfolio: Utils.deepClone(data)
  };
  Utils.downloadJSON(exportData, `${Utils.slugify(data.name || 'portfolio')}-config.json`);
  Utils.showToast(isAr ? 'تم تصدير الإعدادات بنجاح!' : 'Configuration exported to JSON!', 'success');
}

/**
 * Import portfolio config from JSON file
 */
function importConfig() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';

  input.onchange = async (e) => {
    if (!e.target.files?.[0]) return;
    try {
      const json = await Utils.loadJSONFile(e.target.files[0]);
      const incoming = json.portfolio || json;
      if (incoming && (incoming.name !== undefined || incoming.skills !== undefined)) {
        Object.assign(FormState.data, incoming);
        if (typeof FormState.autoSave === 'function') FormState.autoSave();
        FormState.renderStep(FormState.currentStep);
        if (typeof triggerPreview === 'function') triggerPreview();
        Utils.showToast(isAr ? 'تم استيراد الإعدادات بنجاح!' : 'Configuration imported successfully!', 'success');
      } else {
        throw new Error('Unrecognized config schema');
      }
    } catch (err) {
      console.error('Config import failed:', err);
      Utils.showToast(isAr ? 'ملف إعدادات غير صالح' : 'Invalid configuration file: ' + err.message, 'error');
    }
  };

  input.click();
}

/**
 * Random developer tip on export
 */
function showDownloadTip() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  const tips = isAr ? [
    '💡 يمكنك تعديل نصوص وألوان ملف index.html مباشرة باستخدام أي محرر أكواد.',
    '🚀 استضف موقعك مجاناً وبسرعة فائقة عبر GitHub Pages أو Vercel.',
    '📱 جميع القوالب مصممة لتكون متجاوبة بالكامل مع مختلف شاشات الهواتف والأجهزة اللوحية.',
    '🎨 يمكنك تجربة القوالب السبعة المختلفة بضغطة زر دون فقدان بياناتك.',
    '⚡ كود الموقع خفيف وسريع ولا يحتاج لأي خادم خلفي أو قاعدة بيانات.'
  ] : [
    '💡 You can customize colors, fonts, and content directly in index.html with any code editor.',
    '🚀 Deploy for free in seconds using GitHub Pages, Vercel, or Netlify.',
    '📱 Every theme is ultra-responsive, tested on mobile, tablet, and widescreen viewports.',
    '🎨 Switch between all 7 themes anytime without losing your entered profile data.',
    '⚡ Single-file architecture ensures zero-latency performance and high SEO scores.'
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];
  const titleEl = document.getElementById('tip-modal-title');
  const textEl = document.getElementById('tip-modal-text');
  const modal = document.getElementById('tip-modal');

  if (titleEl) titleEl.textContent = isAr ? '💡 نصيحة المطور' : '💡 Pro Tip';
  if (textEl) textEl.textContent = tip;
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}
