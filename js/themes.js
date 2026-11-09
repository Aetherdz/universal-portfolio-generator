/* =============================================
   themes.js — Backwards-Compatible Entry Point & Themes Bundle
   Universal Portfolio Generator — Elite Edition
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./themes/registry'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./themes/registry'));
  } else {
    factory(root.ThemeRegistry);
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function (ThemeRegistry) {
  const root = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this;

  // In Node.js / CommonJS environment: auto-load modular themes if not loaded
  if (typeof module === 'object' && module.exports && ThemeRegistry) {
    try {
      const aether = require('./themes/aether');
      const terminal = require('./themes/terminal');
      const minimal = require('./themes/minimal');
      const bento = require('./themes/bento');
      const glassmorphic = require('./themes/glassmorphic');
      const darkPremium = require('./themes/dark-premium');
      const academic = require('./themes/academic');

      [aether, terminal, minimal, bento, glassmorphic, darkPremium, academic].forEach(t => {
        if (t && t.id) ThemeRegistry.register(t);
      });
    } catch (e) {
      // Ignore if relative require is resolved differently
    }
  }

  const registry = ThemeRegistry || (root && root.ThemeRegistry);

  const getTheme = function (id) {
    if (registry && typeof registry.get === 'function') {
      return registry.get(id);
    }
    return null;
  };

  const THEMES = registry && typeof registry.getAll === 'function' ? registry.getAll() : (root.THEMES || []);

  if (root) {
    root.ThemeRegistry = registry;
    root.THEMES = THEMES;
    root.getTheme = getTheme;
  }

  return {
    ThemeRegistry: registry,
    THEMES,
    getTheme
  };
});
