/* =============================================
   js/themes/registry.js — Core ThemeRegistry with Plugin Support
   Universal Portfolio Generator — Elite Edition
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const registry = factory();
    root.ThemeRegistry = registry;
    root.THEMES = registry.getAll();
    root.getTheme = function (id) {
      return registry.get(id);
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  const _themes = new Map();
  const _plugins = [];

  const ThemeRegistry = {
    /**
     * Map of registered themes
     */
    _themes,

    /**
     * Registered plugins list
     */
    _plugins,

    /**
     * Register a new theme definition
     * @param {Object} theme - Theme object { id, nameKey, icon, description, render }
     */
    register(theme) {
      if (!theme || typeof theme.id === 'undefined') {
        console.warn('[ThemeRegistry] Invalid theme definition:', theme);
        return this;
      }

      const numericId = parseInt(theme.id, 10);
      if (isNaN(numericId)) {
        console.warn('[ThemeRegistry] Invalid theme ID:', theme.id);
        return this;
      }

      // Allow plugins to inspect or augment the theme
      _plugins.forEach(plugin => {
        if (typeof plugin.themeRegistered === 'function') {
          try {
            plugin.themeRegistered(theme);
          } catch (err) {
            console.error(`[ThemeRegistry] Plugin error on themeRegistered:`, err);
          }
        }
      });

      _themes.set(numericId, theme);
      this._syncLegacyThemesArray();
      return this;
    },

    /**
     * Retrieve a theme by its numeric ID
     * @param {number|string} id
     */
    get(id) {
      const numericId = parseInt(id, 10);
      return _themes.get(numericId) || _themes.get(3) || Array.from(_themes.values())[0];
    },

    /**
     * Get all registered themes ordered by ID
     */
    getAll() {
      return Array.from(_themes.values()).sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));
    },

    /**
     * Check if a theme is registered
     * @param {number|string} id
     */
    has(id) {
      return _themes.has(parseInt(id, 10));
    },

    /**
     * Unregister a theme
     * @param {number|string} id
     */
    unregister(id) {
      const result = _themes.delete(parseInt(id, 10));
      this._syncLegacyThemesArray();
      return result;
    },

    /**
     * Register a plugin with hooks
     * Supported hooks:
     *   - install(registry)
     *   - themeRegistered(theme)
     *   - beforeRender(data, theme)
     *   - afterRender(html, data, theme)
     * @param {Object} plugin
     */
    use(plugin) {
      if (!plugin) return this;
      if (typeof plugin === 'function') {
        plugin(this);
        return this;
      }
      _plugins.push(plugin);
      if (typeof plugin.install === 'function') {
        try {
          plugin.install(this);
        } catch (err) {
          console.error('[ThemeRegistry] Error installing plugin:', err);
        }
      }
      return this;
    },

    /**
     * Render a theme with plugin lifecycle hooks
     * @param {number|string} id
     * @param {Object} data
     * @returns {string} HTML string
     */
    render(id, data) {
      const theme = this.get(id);
      if (!theme || typeof theme.render !== 'function') {
        throw new Error(`Theme #${id} does not have a valid render function`);
      }

      let renderData = data;
      // beforeRender lifecycle
      _plugins.forEach(plugin => {
        if (typeof plugin.beforeRender === 'function') {
          try {
            const transformed = plugin.beforeRender(renderData, theme);
            if (transformed && typeof transformed === 'object') {
              renderData = transformed;
            }
          } catch (err) {
            console.error('[ThemeRegistry] Plugin beforeRender error:', err);
          }
        }
      });

      let html = theme.render(renderData);

      // afterRender lifecycle
      _plugins.forEach(plugin => {
        if (typeof plugin.afterRender === 'function') {
          try {
            const transformed = plugin.afterRender(html, renderData, theme);
            if (typeof transformed === 'string') {
              html = transformed;
            }
          } catch (err) {
            console.error('[ThemeRegistry] Plugin afterRender error:', err);
          }
        }
      });

      return html;
    },

    /**
     * Synchronize window.THEMES and globalThis.THEMES
     * @private
     */
    _syncLegacyThemesArray() {
      const all = this.getAll();
      if (typeof window !== 'undefined') {
        window.THEMES = all;
      }
      if (typeof globalThis !== 'undefined') {
        globalThis.THEMES = all;
      }
    }
  };

  // Consume any themes that were loaded prior to registry
  const rootObj = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : null;
  if (rootObj && Array.isArray(rootObj.__PENDING_THEMES__)) {
    rootObj.__PENDING_THEMES__.forEach(t => ThemeRegistry.register(t));
    delete rootObj.__PENDING_THEMES__;
  }

  return ThemeRegistry;
});
