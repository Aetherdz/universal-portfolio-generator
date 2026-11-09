/* =============================================
   design-tokens.js — Universal Design System
   Palettes, Typography, Micro-tokens & CSS Custom Properties
   Universal Portfolio Generator — Elite Edition
   ============================================= */
const DesignSystem = {
  // === Curated Cohesive Color Palettes ===
  palettes: {
    default: {
      id: 'default',
      name: 'Sapphire Modern',
      primary: '#2563EB',
      accent: '#D97706',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      muted: '#E2E8F0',
      border: '#CBD5E1'
    },
    dracula: {
      id: 'dracula',
      name: 'Dracula Dark',
      primary: '#BD93F9',
      accent: '#FF79C6',
      bg: '#282A36',
      surface: '#383A4A',
      text: '#F8F8F2',
      muted: '#44475A',
      border: '#6272A4'
    },
    nord: {
      id: 'nord',
      name: 'Nordic Frost',
      primary: '#88C0D0',
      accent: '#BF616A',
      bg: '#ECEFF4',
      surface: '#FFFFFF',
      text: '#2E3440',
      muted: '#D8DEE9',
      border: '#CBD5E1'
    },
    monokai: {
      id: 'monokai',
      name: 'Monokai Pro',
      primary: '#A6E22E',
      accent: '#FD971F',
      bg: '#272822',
      surface: '#383830',
      text: '#F8F8F2',
      muted: '#49483E',
      border: '#57564A'
    },
    tailwind: {
      id: 'tailwind',
      name: 'Modern Sky',
      primary: '#3B82F6',
      accent: '#10B981',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      muted: '#F1F5F9',
      border: '#E2E8F0'
    },
    night: {
      id: 'night',
      name: 'Night Owl',
      primary: '#82AAFF',
      accent: '#C792EA',
      bg: '#011627',
      surface: '#0B2545',
      text: '#D6DEEB',
      muted: '#1B3A60',
      border: '#2C4A6E'
    },
    rose: {
      id: 'rose',
      name: 'Crimson Rose',
      primary: '#E11D48',
      accent: '#FB7185',
      bg: '#FFF1F2',
      surface: '#FFFFFF',
      text: '#1C0A0E',
      muted: '#FFE4E6',
      border: '#FECDD3'
    },
    emerald: {
      id: 'emerald',
      name: 'Jade Forest',
      primary: '#059669',
      accent: '#10B981',
      bg: '#ECFDF5',
      surface: '#FFFFFF',
      text: '#06281D',
      muted: '#D1FAE5',
      border: '#A7F3D0'
    },
    cyberpunk: {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon',
      primary: '#00FFF0',
      accent: '#FF00AA',
      bg: '#0A0A1A',
      surface: '#12122A',
      text: '#E0E0FF',
      muted: '#1A1A3E',
      border: '#00FFF044'
    },
    catppuccin: {
      id: 'catppuccin',
      name: 'Catppuccin Pastel',
      primary: '#89B4FA',
      accent: '#F5C2E7',
      bg: '#1E1E2E',
      surface: '#28293D',
      text: '#CDD6F4',
      muted: '#3B3C52',
      border: '#45475A'
    }
  },

  /** Get palette by ID */
  getPalette(id) {
    return this.palettes[id] || this.palettes.default;
  },

  /** Get CSS custom property declarations string */
  getPaletteCSS(id) {
    const p = this.getPalette(id);
    return [
      `--color-primary: ${p.primary};`,
      `--color-accent: ${p.accent};`,
      `--color-bg: ${p.bg};`,
      `--color-surface: ${p.surface};`,
      `--color-text: ${p.text};`,
      `--color-muted: ${p.muted};`,
      `--color-border: ${p.border};`
    ].join('\n');
  },

  /** Apply active palette to documentElement */
  applyPalette(id) {
    const p = this.getPalette(id);
    const root = document.documentElement;
    root.style.setProperty('--color-primary', p.primary);
    root.style.setProperty('--color-accent', p.accent);
    root.style.setProperty('--color-bg', p.bg);
    root.style.setProperty('--color-surface', p.surface);
    root.style.setProperty('--color-text', p.text);
    root.style.setProperty('--color-muted', p.muted);
    root.style.setProperty('--color-border', p.border);
  },

  fontFamilies: [
    'Inter', 'JetBrains Mono', 'Space Grotesk', 'Fira Code',
    'Archivo', 'DM Sans', 'Crimson Pro', 'Plus Jakarta Sans',
    'Outfit', 'Sora', 'Montserrat'
  ],

  /** Google Fonts URL specifier */
  getFontUrl(family) {
    const map = {
      'Inter': 'Inter:wght@400;500;600;700',
      'JetBrains Mono': 'JetBrains+Mono:wght@400;500;600;700',
      'Space Grotesk': 'Space+Grotesk:wght@400;500;600;700',
      'Fira Code': 'Fira+Code:wght@400;500;600;700',
      'Archivo': 'Archivo:wght@400;500;600;700',
      'DM Sans': 'DM+Sans:wght@400;500;700',
      'Crimson Pro': 'Crimson+Pro:wght@400;600;700',
      'Plus Jakarta Sans': 'Plus+Jakarta+Sans:wght@400;500;600;700',
      'Outfit': 'Outfit:wght@400;500;600;700',
      'Sora': 'Sora:wght@400;600;700',
      'Montserrat': 'Montserrat:wght@400;500;600;700'
    };
    return map[family] || 'Inter:wght@400;500;600;700';
  }
};

/* Apply default palette */
if (typeof document !== 'undefined') {
  DesignSystem.applyPalette('default');
}

if (typeof window !== 'undefined') {
  window.DesignSystem = DesignSystem;
} else if (typeof globalThis !== 'undefined') {
  globalThis.DesignSystem = DesignSystem;
}
