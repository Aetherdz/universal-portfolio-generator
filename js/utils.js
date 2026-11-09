/* =============================================
   utils.js — Sanitization, Base64, Helpers, Icons & Skills Curation
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

const Utils = {
  /**
   * Strip all HTML tags and attributes for strict plain-text sanitization.
   */
  sanitize(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') str = String(str);
    if (typeof DOMPurify !== 'undefined') {
      return DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
    }
    if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
      const div = document.createElement('div');
      div.textContent = str;
      return (div.innerHTML || div.textContent || String(str)).trim();
    }
    return String(str).trim();
  },

  /**
   * Sanitizes rich text while permitting safe inline formatting tags.
   */
  sanitizeHTML(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') str = String(str);
    if (typeof DOMPurify !== 'undefined') {
      return DOMPurify.sanitize(str, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'code', 'span', 'br', 'mark'],
        ALLOWED_ATTR: ['href', 'target', 'class', 'rel', 'title']
      });
    }
    return this.sanitize(str);
  },

  /**
   * Strictly sanitize URLs to prevent XSS (javascript:, data: script injection, vbscript:).
   */
  sanitizeURL(url) {
    if (!url) return '';
    const clean = String(url).trim();
    if (/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,/i.test(clean)) {
      return clean;
    }
    if (/^(javascript|vbscript|data):/i.test(clean)) {
      return '#';
    }
    return clean.replace(/["'<>\\]/g, '');
  },

  /**
   * Check whether a given term is a hosting provider, buzzword, or non-engineering fluff.
   */
  isNonSkill(term) {
    if (!term || typeof term !== 'string') return false;
    const clean = term.trim().toLowerCase();
    const banned = [
      'vps', 'vercel', 'netlify', 'heroku', 'cpanel', 'digitalocean', 'hostinger',
      'render', 'railway', 'linode', 'shared hosting', 'firebase', 'supabase',
      'neon', 'planetscale', 'cloudflare', 'social engineering', 'prompt engineering',
      'zero trust', 'cloud security', 'kubernetes security', 'ai security', 'web security',
      'llm', 'rag', 'smart contracts', 'web3', 'ethereum', 'rust solana'
    ];
    return banned.includes(clean);
  },

  /**
   * Get capital letter initials for avatar monogram fallback
   */
  getInitials(name) {
    if (!name || typeof name !== 'string') return 'P';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  },

  /**
   * Read file into Base64 Data URL
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      if (!file.type.startsWith('image/')) {
        return reject(new Error('Selected file is not an image'));
      }
      if (file.size > 5 * 1024 * 1024) {
        return reject(new Error('Image exceeds 5MB limit'));
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  /**
   * Convert external image URL to Base64 (with timeout and fallback)
   */
  urlToBase64(url) {
    return new Promise((resolve) => {
      if (!url) return resolve(null);
      if (url.startsWith('data:')) return resolve(url);

      const cleanUrl = this.sanitizeURL(url);
      if (cleanUrl === '#') return resolve(null);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        resolve(cleanUrl);
      }, 4000);

      img.onload = () => {
        if (timedOut) return;
        clearTimeout(timeout);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } catch (e) {
          resolve(cleanUrl);
        }
      };

      img.onerror = () => {
        if (timedOut) return;
        clearTimeout(timeout);
        resolve(cleanUrl);
      };

      img.src = cleanUrl;
    });
  },

  slugify(str) {
    if (!str) return 'portfolio';
    return String(str).toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'portfolio';
  },

  truncate(str, len = 100) {
    if (!str || str.length <= len) return str || '';
    return str.slice(0, len).trim() + '...';
  },

  formatDate(date) {
    if (!date) return '';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (_) {
      return '';
    }
  },

  debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  },

  deepClone(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (_) {
      return Object.assign({}, obj);
    }
  },

  downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    if (typeof saveAs !== 'undefined') {
      saveAs(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  },

  downloadJSON(data, filename = 'portfolio-config.json') {
    this.downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
  },

  downloadHTML(html, filename = 'index.html') {
    this.downloadFile(html, filename, 'text/html;charset=utf-8');
  },

  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (e) {
      console.warn('Clipboard write failed:', e);
      return false;
    }
  },

  loadJSONFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error('No file selected'));
      const reader = new FileReader();
      reader.onload = () => {
        try {
          resolve(JSON.parse(reader.result));
        } catch (e) {
          reject(new Error('Invalid JSON format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },

  showLoading(text) {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    const label = document.getElementById('loading-text');
    if (label) label.textContent = text || (typeof I18N !== 'undefined' ? I18N.t('loading.generating') : 'Processing...');
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
  },

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.style.display = 'none';
  },

  showToast(message, type = 'success') {
    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      info: 'fa-circle-info',
      warn: 'fa-triangle-exclamation'
    };

    const containerId = 'toast-container';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className = 'wb-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `wb-toast wb-toast-${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span class="wb-toast-text">${this.sanitize(message)}</span>`;
    container.appendChild(toast);

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        toast.classList.add('visible');
      });
    } else {
      setTimeout(() => {
        toast.classList.add('visible');
      }, 16);
    }

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        if (typeof toast.remove === 'function') toast.remove();
      }, 260);
    }, 3200);
  },

  /**
   * Skill icon mapping — covers Devicon + FontAwesome icons
   * Strictly curated: zero hosting providers or vague buzzwords.
   */
  skillIcon(skill) {
    if (!skill) return 'fas fa-code';
    const trimmed = String(skill).trim();
    const icons = {
      // 1. Languages
      'TypeScript': 'devicon-typescript-plain colored',
      'JavaScript': 'devicon-javascript-plain colored',
      'Python': 'devicon-python-plain colored',
      'Rust': 'devicon-rust-plain',
      'Go': 'devicon-go-original-wordmark',
      'C': 'devicon-c-plain colored',
      'C++': 'devicon-cplusplus-plain colored',
      'C#': 'devicon-csharp-plain colored',
      'Java': 'devicon-java-plain colored',
      'Kotlin': 'devicon-kotlin-plain colored',
      'Swift': 'devicon-swift-plain colored',
      'PHP': 'devicon-php-plain colored',
      'Ruby': 'devicon-ruby-plain colored',
      'Dart': 'devicon-dart-plain colored',
      'Zig': 'devicon-zig-plain',
      'Scala': 'devicon-scala-plain colored',
      'Elixir': 'devicon-elixir-plain colored',
      'Bash': 'devicon-bash-plain',
      'SQL': 'fas fa-database',
      'HTML5': 'devicon-html5-plain colored',
      'CSS3': 'devicon-css3-plain colored',

      // 2. Frontend & UI
      'React': 'devicon-react-original colored',
      'Next.js': 'devicon-nextjs-original',
      'Vue': 'devicon-vuejs-plain colored',
      'Nuxt': 'devicon-nuxtjs-plain colored',
      'Angular': 'devicon-angularjs-plain colored',
      'Svelte': 'devicon-svelte-plain colored',
      'Astro': 'devicon-astro-plain',
      'Tailwind': 'devicon-tailwindcss-plain colored',
      'Three.js': 'devicon-threejs-original',
      'Redux': 'devicon-redux-original colored',
      'WebAssembly': 'devicon-wasm-plain',

      // 3. Backend & APIs
      'Node.js': 'devicon-nodejs-plain colored',
      'Express': 'devicon-express-original',
      'NestJS': 'devicon-nestjs-plain colored',
      'FastAPI': 'devicon-fastapi-plain colored',
      'Django': 'devicon-django-plain',
      'Flask': 'devicon-flask-original',
      'Spring Boot': 'devicon-spring-plain colored',
      'Laravel': 'devicon-laravel-plain colored',
      'ASP.NET': 'devicon-dotnetcore-plain colored',
      'GraphQL': 'devicon-graphql-plain colored',
      'gRPC': 'fas fa-network-wired',
      'REST API': 'fas fa-server',
      'WebSockets': 'fas fa-bolt',

      // 4. Databases & Messaging
      'PostgreSQL': 'devicon-postgresql-plain colored',
      'MySQL': 'devicon-mysql-plain colored',
      'MariaDB': 'devicon-mariadb-original colored',
      'SQLite': 'devicon-sqlite-plain',
      'MongoDB': 'devicon-mongodb-plain colored',
      'Redis': 'devicon-redis-plain colored',
      'Elasticsearch': 'devicon-elasticsearch-plain colored',
      'Kafka': 'devicon-apachekafka-original',
      'RabbitMQ': 'devicon-rabbitmq-plain',
      'Prisma': 'devicon-prisma-original',

      // 5. Systems, Cloud & DevOps
      'Linux': 'devicon-linux-plain',
      'Docker': 'devicon-docker-plain colored',
      'Kubernetes': 'devicon-kubernetes-plain colored',
      'Terraform': 'devicon-terraform-plain colored',
      'Ansible': 'devicon-ansible-plain',
      'Git': 'devicon-git-plain colored',
      'GitHub Actions': 'devicon-githubactions-plain colored',
      'CI/CD': 'fas fa-arrows-rotate',
      'Nginx': 'devicon-nginx-original colored',
      'AWS': 'devicon-amazonwebservices-original colored',
      'GCP': 'devicon-googlecloud-plain colored',
      'Azure': 'devicon-azure-plain colored',
      'Prometheus': 'devicon-prometheus-original',
      'Grafana': 'devicon-grafana-original colored',

      // 6. Application Security & Reverse Engineering
      'OWASP': 'fas fa-shield-halved',
      'Penetration Testing': 'fas fa-crosshairs',
      'API Security': 'fas fa-key',
      'Reverse Engineering': 'fas fa-microscope',
      'Binary Exploitation': 'fas fa-terminal',
      'Cryptography': 'fas fa-lock',
      'Malware Analysis': 'fas fa-bug',
      'Forensics': 'fas fa-magnifying-glass-chart',
      'OSINT': 'fas fa-search',
      'Burp Suite': 'fas fa-shield-virus',
      'Metasploit': 'fas fa-skull',
      'Wireshark': 'fas fa-ethernet',
      'Nmap': 'fas fa-sitemap',

      // 7. Mobile & AI Frameworks
      'React Native': 'devicon-react-original colored',
      'Flutter': 'devicon-flutter-plain colored',
      'Android': 'devicon-android-plain colored',
      'iOS': 'devicon-apple-original',
      'SwiftUI': 'devicon-swift-plain colored',
      'Jetpack Compose': 'devicon-jetpackcompose-plain colored',
      'PyTorch': 'devicon-pytorch-original colored',
      'TensorFlow': 'devicon-tensorflow-original colored'
    };

    return icons[trimmed] || 'fas fa-code';
  },

  /**
   * Strictly curated Engineering & Security Skills Catalog
   */
  AVAILABLE_SKILLS: [
    // Languages
    'TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'C', 'C++', 'C#',
    'Java', 'Kotlin', 'Swift', 'PHP', 'Ruby', 'Dart', 'Zig', 'Scala',
    'Elixir', 'Bash', 'SQL', 'HTML5', 'CSS3',

    // Frontend & UI
    'React', 'Next.js', 'Vue', 'Nuxt', 'Angular', 'Svelte', 'Astro',
    'Tailwind', 'Three.js', 'Redux', 'WebAssembly',

    // Backend & APIs
    'Node.js', 'Express', 'NestJS', 'FastAPI', 'Django', 'Flask',
    'Spring Boot', 'Laravel', 'ASP.NET', 'GraphQL', 'gRPC', 'REST API', 'WebSockets',

    // Databases & Messaging
    'PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'MongoDB', 'Redis',
    'Elasticsearch', 'Kafka', 'RabbitMQ', 'Prisma',

    // Systems, Cloud & DevOps
    'Linux', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Git',
    'GitHub Actions', 'CI/CD', 'Nginx', 'AWS', 'GCP', 'Azure',
    'Prometheus', 'Grafana',

    // Application Security & Reverse Engineering
    'OWASP', 'Penetration Testing', 'API Security', 'Reverse Engineering',
    'Binary Exploitation', 'Cryptography', 'Malware Analysis', 'Forensics',
    'OSINT', 'Burp Suite', 'Metasploit', 'Wireshark', 'Nmap',

    // Mobile & AI Frameworks
    'React Native', 'Flutter', 'Android', 'iOS', 'SwiftUI',
    'Jetpack Compose', 'PyTorch', 'TensorFlow'
  ],

  SOCIAL_PLATFORMS: [
    'github', 'linkedin', 'twitter', 'telegram', 'hackerone', 'bugcrowd',
    'tryhackme', 'hackthebox', 'devto', 'medium', 'stackoverflow',
    'leetcode', 'youtube', 'blog'
  ],

  socialUrl(platform, value) {
    if (!value) return '';
    const clean = String(value).trim();
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      return this.sanitizeURL(clean);
    }
    const user = clean.replace(/^@/, '').trim();
    const urls = {
      github: `https://github.com/${user}`,
      linkedin: `https://linkedin.com/in/${user}`,
      twitter: `https://x.com/${user}`,
      telegram: `https://t.me/${user}`,
      hackerone: `https://hackerone.com/${user}`,
      bugcrowd: `https://bugcrowd.com/${user}`,
      tryhackme: `https://tryhackme.com/p/${user}`,
      hackthebox: `https://app.hackthebox.com/profile/${user}`,
      devto: `https://dev.to/${user}`,
      medium: `https://medium.com/@${user}`,
      stackoverflow: `https://stackoverflow.com/users/${user}`,
      leetcode: `https://leetcode.com/u/${user}`,
      youtube: `https://youtube.com/@${user}`,
      blog: clean.startsWith('http') ? clean : `https://${clean}`
    };
    return this.sanitizeURL(urls[platform] || clean);
  },

  socialIcon(platform) {
    const icons = {
      github: 'fab fa-github',
      linkedin: 'fab fa-linkedin-in',
      twitter: 'fab fa-x-twitter',
      telegram: 'fab fa-telegram',
      hackerone: 'fas fa-shield-halved',
      bugcrowd: 'fas fa-bug',
      tryhackme: 'fas fa-mask',
      hackthebox: 'fas fa-cube',
      devto: 'fab fa-dev',
      medium: 'fab fa-medium',
      stackoverflow: 'fab fa-stack-overflow',
      leetcode: 'fas fa-code',
      youtube: 'fab fa-youtube',
      blog: 'fas fa-globe'
    };
    return icons[platform] || 'fas fa-link';
  },

  socialLabel(platform) {
    const labels = {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'X (Twitter)',
      telegram: 'Telegram',
      hackerone: 'HackerOne',
      bugcrowd: 'Bugcrowd',
      tryhackme: 'TryHackMe',
      hackthebox: 'HackTheBox',
      devto: 'DEV Community',
      medium: 'Medium',
      stackoverflow: 'Stack Overflow',
      leetcode: 'LeetCode',
      youtube: 'YouTube',
      blog: 'Website / Blog'
    };
    return labels[platform] || platform;
  },

  socialPlaceholder(platform) {
    const hints = {
      github: 'username',
      linkedin: 'in/username',
      twitter: 'handle',
      telegram: 'username',
      hackerone: 'username',
      bugcrowd: 'username',
      tryhackme: 'username',
      hackthebox: 'userID',
      devto: 'username',
      medium: 'username',
      stackoverflow: 'user-id',
      leetcode: 'username',
      youtube: 'channel',
      blog: 'https://yourwebsite.com'
    };
    return hints[platform] || 'username';
  }
};

if (typeof window !== 'undefined') {
  window.Utils = Utils;
} else if (typeof globalThis !== 'undefined') {
  globalThis.Utils = Utils;
}
