/* =============================================
   utils.js — Sanitization, Base64, Helpers & Icons
   Universal Portfolio Generator — Elite Edition
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
    // Fallback if DOMPurify is unavailable
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.trim();
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
    // Allow safe data images if user uploaded an image as base64
    if (/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,/i.test(clean)) {
      return clean;
    }
    // Block any javascript:, vbscript:, or unsafe data: protocol
    if (/^(javascript|vbscript|data):/i.test(clean)) {
      return '#';
    }
    // Strip quotes, angle brackets, and backslashes
    return clean.replace(/["'<>\\]/g, '');
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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return reject(new Error('Selected file is not an image'));
      }
      // 5MB limit
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
        // Fallback: return original URL if CORS canvas conversion times out
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
          // If canvas tainted by CORS, return original clean URL
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
    if (label) label.textContent = text || (typeof I18N !== 'undefined' ? I18N.t('loading.generating') : 'Loading...');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  },

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
  },

  showToast(message, type = 'success') {
    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      info: 'fa-circle-info',
      warn: 'fa-triangle-exclamation'
    };
    const colors = {
      success: 'bg-emerald-600 text-white shadow-emerald-500/20',
      error: 'bg-rose-600 text-white shadow-rose-500/20',
      info: 'bg-blue-600 text-white shadow-blue-500/20',
      warn: 'bg-amber-600 text-white shadow-amber-500/20'
    };

    const containerId = 'toast-container';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-medium ${colors[type] || colors.info} transform transition-all duration-300 translate-y-3 opacity-0`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info} text-base flex-shrink-0"></i><span class="flex-1 break-words">${this.sanitize(message)}</span>`;
    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // Skill icon mapping — covers Devicon + FontAwesome icons
  skillIcon(skill) {
    if (!skill) return 'fas fa-code';
    const trimmed = String(skill).trim();
    const icons = {
      // Languages
      'JavaScript': 'devicon-javascript-plain colored',
      'TypeScript': 'devicon-typescript-plain colored',
      'Python': 'devicon-python-plain colored',
      'Rust': 'devicon-rust-plain',
      'Go': 'devicon-go-original-wordmark',
      'Java': 'devicon-java-plain colored',
      'Kotlin': 'devicon-kotlin-plain colored',
      'Swift': 'devicon-swift-plain colored',
      'PHP': 'devicon-php-plain colored',
      'Ruby': 'devicon-ruby-plain colored',
      'C': 'devicon-c-plain colored',
      'C++': 'devicon-cplusplus-plain colored',
      'C#': 'devicon-csharp-plain colored',
      'Zig': 'devicon-zig-plain',
      'Scala': 'devicon-scala-plain colored',
      'Elixir': 'devicon-elixir-plain colored',
      'Haskell': 'devicon-haskell-plain',
      'Lua': 'devicon-lua-plain',
      'R': 'devicon-r-original',
      'Julia': 'devicon-julia-plain',
      'Dart': 'devicon-dart-plain colored',
      'Assembly': 'fas fa-microchip',
      'Shell Script': 'devicon-bash-plain',
      'Bash': 'devicon-bash-plain',
      'PowerShell': 'devicon-powershell-plain colored',
      'HTML5': 'devicon-html5-plain colored',
      'CSS3': 'devicon-css3-plain colored',
      'Sass': 'devicon-sass-original colored',
      'SQL': 'fas fa-database',

      // Frontend
      'React': 'devicon-react-original colored',
      'Vue': 'devicon-vuejs-plain colored',
      'Angular': 'devicon-angularjs-plain colored',
      'Svelte': 'devicon-svelte-plain colored',
      'Next.js': 'devicon-nextjs-original',
      'Nuxt': 'devicon-nuxtjs-plain colored',
      'Astro': 'devicon-astro-plain',
      'Solid.js': 'devicon-solidjs-plain',
      'Qwik': 'devicon-qwik-plain',
      'Remix': 'devicon-remix-original',
      'SvelteKit': 'devicon-svelte-plain colored',
      'Tailwind': 'devicon-tailwindcss-plain colored',
      'Bootstrap': 'devicon-bootstrap-plain colored',
      'Three.js': 'devicon-threejs-original',
      'Redux': 'devicon-redux-original colored',

      // Backend
      'Node.js': 'devicon-nodejs-plain colored',
      'Express': 'devicon-express-original',
      'Django': 'devicon-django-plain',
      'Flask': 'devicon-flask-original',
      'FastAPI': 'devicon-fastapi-plain colored',
      'Laravel': 'devicon-laravel-plain colored',
      'Spring Boot': 'devicon-spring-plain colored',
      'ASP.NET': 'devicon-dotnetcore-plain colored',
      'Gin': 'devicon-go-original-wordmark',
      'Echo': 'devicon-go-original-wordmark',
      'Actix': 'devicon-rust-plain',
      'NestJS': 'devicon-nestjs-plain colored',
      'Ruby on Rails': 'devicon-rails-plain colored',
      'Phoenix': 'devicon-phoenix-plain',
      'Symfony': 'devicon-symfony-original',

      // Database
      'MongoDB': 'devicon-mongodb-plain colored',
      'PostgreSQL': 'devicon-postgresql-plain colored',
      'MySQL': 'devicon-mysql-plain colored',
      'MariaDB': 'devicon-mariadb-original colored',
      'Redis': 'devicon-redis-plain colored',
      'SQLite': 'devicon-sqlite-plain',
      'Elasticsearch': 'devicon-elasticsearch-plain colored',
      'Cassandra': 'devicon-cassandra-plain',
      'DynamoDB': 'devicon-dynamodb-plain',
      'Firebase': 'devicon-firebase-plain colored',
      'Supabase': 'devicon-supabase-plain colored',
      'Neon': 'fas fa-database',
      'PlanetScale': 'fas fa-database',
      'Prisma': 'devicon-prisma-original',

      // DevOps & Cloud
      'Docker': 'devicon-docker-plain colored',
      'Kubernetes': 'devicon-kubernetes-plain colored',
      'AWS': 'devicon-amazonwebservices-original colored',
      'Azure': 'devicon-azure-plain colored',
      'GCP': 'devicon-googlecloud-plain colored',
      'Terraform': 'devicon-terraform-plain colored',
      'Ansible': 'devicon-ansible-plain',
      'Helm': 'devicon-helm-plain',
      'Cloudflare': 'devicon-cloudflare-plain',
      'Vercel': 'devicon-vercel-original',
      'Netlify': 'devicon-netlify-plain',
      'GitHub Actions': 'devicon-githubactions-plain colored',
      'CI/CD': 'fas fa-arrows-rotate',
      'Nginx': 'devicon-nginx-original colored',
      'Apache': 'devicon-apache-plain colored',
      'Prometheus': 'devicon-prometheus-original',
      'Grafana': 'devicon-grafana-original colored',
      'Datadog': 'devicon-datadog-plain',
      'Sentry': 'devicon-sentry-plain colored',
      'Linux': 'devicon-linux-plain',

      // Security
      'Burp Suite': 'fas fa-bug',
      'Metasploit': 'fas fa-skull',
      'Nmap': 'fas fa-network-wired',
      'Wireshark': 'fas fa-plug',
      'OWASP': 'fas fa-shield-halved',
      'Penetration Testing': 'fas fa-crosshairs',
      'Web Security': 'fas fa-globe',
      'API Security': 'fas fa-key',
      'Reverse Engineering': 'fas fa-microscope',
      'Binary Exploitation': 'fas fa-bolt',
      'Social Engineering': 'fas fa-user-secret',
      'OSINT': 'fas fa-search',
      'Threat Modeling': 'fas fa-diagram-project',
      'Cryptography': 'fas fa-lock',
      'Malware Analysis': 'fas fa-virus',
      'Forensics': 'fas fa-magnifying-glass-chart',
      'Cloud Security': 'fas fa-shield-cat',
      'Kubernetes Security': 'fas fa-shield-halved',
      'Zero Trust': 'fas fa-fingerprint',

      // AI / ML
      'Machine Learning': 'fas fa-robot',
      'Deep Learning': 'fas fa-brain',
      'LLM': 'fas fa-message',
      'AI Security': 'fas fa-shield-halved',
      'Prompt Engineering': 'fas fa-pen-nib',
      'TensorFlow': 'devicon-tensorflow-original colored',
      'PyTorch': 'devicon-pytorch-original colored',
      'OpenAI': 'devicon-openai-plain',
      'LangChain': 'fas fa-link',
      'Hugging Face': 'fas fa-face-smile',
      'RAG': 'fas fa-cubes-stacked',
      'Computer Vision': 'fas fa-eye',

      // Mobile
      'Flutter': 'devicon-flutter-plain colored',
      'React Native': 'devicon-react-original colored',
      'SwiftUI': 'devicon-swift-plain colored',
      'Jetpack Compose': 'devicon-jetpackcompose-plain colored',
      'Android': 'devicon-android-plain colored',
      'iOS': 'devicon-apple-original',
      'Kotlin Multiplatform': 'devicon-kotlin-plain colored',

      // Tools & API
      'Figma': 'devicon-figma-plain colored',
      'Git': 'devicon-git-plain colored',
      'Vim': 'devicon-vim-plain',
      'Neovim': 'devicon-neovim-plain',
      'Docker Compose': 'devicon-docker-plain colored',
      'Kafka': 'devicon-apachekafka-original',
      'RabbitMQ': 'devicon-rabbitmq-plain',
      'WebAssembly': 'devicon-wasm-plain',
      'GraphQL': 'devicon-graphql-plain colored',
      'gRPC': 'fas fa-plug-circle-check',
      'REST API': 'fas fa-sitemap',
      'WebSockets': 'fas fa-bolt-lightning',

      // Web3 / Blockchain
      'Solidity': 'devicon-solidity-plain',
      'Ethereum': 'fab fa-ethereum',
      'Web3': 'fab fa-ethereum',
      'Smart Contracts': 'fas fa-file-contract',
      'Rust Solana': 'devicon-rust-plain',
      'Foundry': 'fas fa-hammer',
      'Hardhat': 'devicon-hardhat-plain'
    };

    return icons[trimmed] || 'fas fa-code';
  },

  AVAILABLE_SKILLS: [
    // Languages
    'JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java', 'Kotlin',
    'Swift', 'PHP', 'Ruby', 'C', 'C++', 'C#', 'Zig', 'Scala',
    'Elixir', 'Haskell', 'Lua', 'R', 'Julia', 'Dart', 'Assembly',
    'Shell Script', 'Bash', 'PowerShell', 'HTML5', 'CSS3', 'SQL',
    // Frontend
    'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'Astro',
    'Solid.js', 'Qwik', 'Remix', 'SvelteKit', 'Tailwind', 'Redux', 'Three.js',
    // Backend
    'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Laravel',
    'Spring Boot', 'ASP.NET', 'Gin', 'Echo', 'Actix',
    'NestJS', 'Ruby on Rails', 'Phoenix', 'Symfony',
    // Database
    'MongoDB', 'PostgreSQL', 'MySQL', 'MariaDB', 'Redis',
    'SQLite', 'Elasticsearch', 'Cassandra', 'DynamoDB',
    'Firebase', 'Supabase', 'Neon', 'PlanetScale', 'Prisma',
    // DevOps & Cloud
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Terraform', 'Ansible', 'Helm', 'Cloudflare', 'Vercel',
    'Netlify', 'GitHub Actions', 'CI/CD', 'Nginx', 'Apache',
    'Prometheus', 'Grafana', 'Datadog', 'Sentry', 'Linux',
    // Security
    'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark',
    'OWASP', 'Penetration Testing', 'Web Security',
    'API Security', 'Reverse Engineering', 'Binary Exploitation',
    'Social Engineering', 'OSINT', 'Threat Modeling',
    'Cryptography', 'Malware Analysis', 'Forensics',
    'Cloud Security', 'Kubernetes Security', 'Zero Trust',
    // AI / ML
    'Machine Learning', 'Deep Learning', 'LLM', 'AI Security',
    'Prompt Engineering', 'TensorFlow', 'PyTorch', 'OpenAI',
    'LangChain', 'Hugging Face', 'RAG', 'Computer Vision',
    // Mobile
    'Flutter', 'React Native', 'SwiftUI', 'Jetpack Compose',
    'Android', 'iOS', 'Kotlin Multiplatform',
    // Tools
    'Figma', 'Git', 'Vim', 'Neovim',
    'Docker Compose', 'Kafka', 'RabbitMQ', 'WebAssembly',
    'GraphQL', 'gRPC', 'REST API', 'WebSockets',
    // Blockchain / Web3
    'Solidity', 'Ethereum', 'Web3', 'Smart Contracts',
    'Rust Solana', 'Foundry', 'Hardhat'
  ],

  SOCIAL_PLATFORMS: [
    'github', 'gitlab', 'stackoverflow', 'devto', 'medium', 'codepen', 'leetcode',
    'hackerone', 'bugcrowd', 'tryhackme', 'hackthebox',
    'twitter', 'linkedin', 'instagram', 'youtube', 'reddit', 'telegram', 'whatsapp',
    'dribbble', 'behance',
    'buymeacoffee',
    'blog'
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
      gitlab: `https://gitlab.com/${user}`,
      stackoverflow: `https://stackoverflow.com/users/${user}`,
      devto: `https://dev.to/${user}`,
      medium: `https://medium.com/@${user}`,
      codepen: `https://codepen.io/${user}`,
      leetcode: `https://leetcode.com/u/${user}`,
      hackerone: `https://hackerone.com/${user}`,
      bugcrowd: `https://bugcrowd.com/${user}`,
      tryhackme: `https://tryhackme.com/p/${user}`,
      hackthebox: `https://app.hackthebox.com/profile/${user}`,
      twitter: `https://x.com/${user}`,
      linkedin: `https://linkedin.com/in/${user}`,
      instagram: `https://instagram.com/${user}`,
      youtube: `https://youtube.com/@${user}`,
      reddit: `https://reddit.com/u/${user}`,
      telegram: `https://t.me/${user}`,
      whatsapp: `https://wa.me/${user.replace(/[^0-9]/g, '')}`,
      dribbble: `https://dribbble.com/${user}`,
      behance: `https://behance.net/${user}`,
      buymeacoffee: `https://buymeacoffee.com/${user}`,
      blog: clean.startsWith('http') ? clean : `https://${clean}`
    };
    return this.sanitizeURL(urls[platform] || clean);
  },

  socialIcon(platform) {
    const icons = {
      github: 'fab fa-github',
      gitlab: 'fab fa-gitlab',
      stackoverflow: 'fab fa-stack-overflow',
      devto: 'fab fa-dev',
      medium: 'fab fa-medium',
      codepen: 'fab fa-codepen',
      leetcode: 'fas fa-code',
      hackerone: 'fab fa-hackerone',
      bugcrowd: 'fas fa-bug',
      tryhackme: 'fas fa-mask',
      hackthebox: 'fas fa-cube',
      twitter: 'fab fa-x-twitter',
      linkedin: 'fab fa-linkedin-in',
      instagram: 'fab fa-instagram',
      youtube: 'fab fa-youtube',
      reddit: 'fab fa-reddit-alien',
      telegram: 'fab fa-telegram',
      whatsapp: 'fab fa-whatsapp',
      dribbble: 'fab fa-dribbble',
      behance: 'fab fa-behance',
      buymeacoffee: 'fas fa-mug-hot',
      blog: 'fas fa-globe'
    };
    return icons[platform] || 'fas fa-link';
  },

  socialLabel(platform) {
    const labels = {
      github: 'GitHub',
      gitlab: 'GitLab',
      stackoverflow: 'Stack Overflow',
      devto: 'Dev.to',
      medium: 'Medium',
      codepen: 'CodePen',
      leetcode: 'LeetCode',
      hackerone: 'HackerOne',
      bugcrowd: 'Bugcrowd',
      tryhackme: 'TryHackMe',
      hackthebox: 'HackTheBox',
      twitter: 'X (Twitter)',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      youtube: 'YouTube',
      reddit: 'Reddit',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      dribbble: 'Dribbble',
      behance: 'Behance',
      buymeacoffee: 'Buy Me a Coffee',
      blog: 'Website / Blog'
    };
    return labels[platform] || platform;
  },

  socialPlaceholder(platform) {
    const hints = {
      github: 'username',
      gitlab: 'username',
      stackoverflow: 'user ID',
      devto: 'username',
      medium: 'username',
      codepen: 'username',
      leetcode: 'username',
      hackerone: 'username',
      bugcrowd: 'username',
      tryhackme: 'username',
      hackthebox: 'user ID',
      twitter: 'handle',
      linkedin: 'username',
      instagram: 'username',
      youtube: 'channel',
      reddit: 'username',
      telegram: 'username',
      whatsapp: 'phone with country code',
      dribbble: 'username',
      behance: 'username',
      buymeacoffee: 'username',
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
