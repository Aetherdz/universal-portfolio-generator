/* =============================================
   js/form/step3-skills.js — Step 3: Technical Arsenal & Skills
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FormSteps = root.FormSteps || {};
    root.FormSteps.renderSkillsStep = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  return function renderSkillsStep(state) {
    const currentSkills = state.data.skills || [];
    const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

    const activeTab = window.activeSkillTab || 'all';
    const searchQuery = (window.skillSearchQuery || '').trim().toLowerCase();

    const categories = [
      {
        id: 'languages',
        name: isAr ? 'اللغات' : 'Languages',
        items: [
          'TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'C', 'C++', 'C#',
          'Java', 'Kotlin', 'Swift', 'PHP', 'Ruby', 'Dart', 'Zig', 'Scala',
          'Elixir', 'Bash', 'SQL', 'HTML5', 'CSS3'
        ]
      },
      {
        id: 'frontend',
        name: isAr ? 'الواجهة والتصميم' : 'Frontend',
        items: [
          'React', 'Next.js', 'Vue', 'Nuxt', 'Angular', 'Svelte', 'Astro',
          'Tailwind', 'Three.js', 'Redux', 'WebAssembly'
        ]
      },
      {
        id: 'backend',
        name: isAr ? 'الخوادم والواجهات' : 'Backend & APIs',
        items: [
          'Node.js', 'Express', 'NestJS', 'FastAPI', 'Django', 'Flask',
          'Spring Boot', 'Laravel', 'ASP.NET', 'GraphQL', 'gRPC', 'REST API', 'WebSockets'
        ]
      },
      {
        id: 'databases',
        name: isAr ? 'قواعد البيانات' : 'Databases',
        items: [
          'PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'MongoDB', 'Redis',
          'Elasticsearch', 'Kafka', 'RabbitMQ', 'Prisma'
        ]
      },
      {
        id: 'devops',
        name: isAr ? 'الأنظمة والسحابة' : 'Systems & DevOps',
        items: [
          'Linux', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Git',
          'GitHub Actions', 'CI/CD', 'Nginx', 'AWS', 'GCP', 'Azure',
          'Prometheus', 'Grafana'
        ]
      },
      {
        id: 'security',
        name: isAr ? 'الأمان والهندسة العكسية' : 'AppSec & RE',
        items: [
          'OWASP', 'Penetration Testing', 'API Security', 'Reverse Engineering',
          'Binary Exploitation', 'Cryptography', 'Malware Analysis', 'Forensics',
          'OSINT', 'Burp Suite', 'Metasploit', 'Wireshark', 'Nmap'
        ]
      },
      {
        id: 'mobile_ai',
        name: isAr ? 'الموبايل والذكاء' : 'Mobile & AI',
        items: [
          'React Native', 'Flutter', 'Android', 'iOS', 'SwiftUI',
          'Jetpack Compose', 'PyTorch', 'TensorFlow'
        ]
      }
    ];

    // Filter categories by active tab
    const filteredCategories = (activeTab === 'all')
      ? categories
      : categories.filter(c => c.id === activeTab);

    return `
      <!-- Step Header -->
      <div class="studio-step-header">
        <div>
          <h2 class="studio-step-title">
            <span class="step-icon-badge"><i class="fas fa-microchip"></i></span>
            <span>${I18N.t('form.step.skills')}</span>
          </h2>
          <p class="studio-step-desc">${I18N.t('form.step.skills_desc')}</p>
        </div>
        <div class="channel-count-badge">
          <span>${currentSkills.length}</span>
          <span class="channel-count-label">${isAr ? 'مهارة محددة' : 'Selected'}</span>
        </div>
      </div>

      <!-- Search & Custom Skill Bar -->
      <div class="skills-filter-row">
        <!-- Instant Search Filter -->
        <div class="skills-search-wrap">
          <i class="fas fa-magnifying-glass skills-search-icon"></i>
          <input type="text" id="skills-search-input" class="form-input skills-search-input"
            value="${Utils.sanitize(window.skillSearchQuery || '')}"
            placeholder="${isAr ? 'ابحث في الترسانة التقنية (TypeScript, Rust, Docker...)' : 'Instant search skills (e.g. TypeScript, Rust, Docker...)'}"
            oninput="filterSkills(this.value)">
          ${window.skillSearchQuery ? `
            <button type="button" class="skills-search-clear" onclick="filterSkills('')" title="Clear search">
              <i class="fas fa-times"></i>
            </button>
          ` : ''}
        </div>

        <!-- Add Custom Skill Field -->
        <div class="skills-custom-wrap">
          <input type="text" id="custom-skill-input" class="form-input skills-custom-input"
            placeholder="${isAr ? 'مهارة مخصصة (مثال: eBPF)' : 'Custom skill (e.g. eBPF)'}"
            onkeydown="if(event.key==='Enter'){event.preventDefault();addCustomSkill();}">
          <button type="button" class="btn btn-secondary btn-sm" onclick="addCustomSkill()">
            <i class="fas fa-plus"></i>
            <span>${isAr ? 'إضافة' : 'Add'}</span>
          </button>
        </div>
      </div>

      <!-- Active Selected Skills Chip Tray -->
      <div class="skills-selected-box">
        <div class="skills-selected-head">
          <div class="skills-selected-title">
            <i class="fas fa-layer-group text-accent"></i>
            <span>${isAr ? 'المهارات المحددة حالياً في ملفك' : 'Active Selected Arsenal'}</span>
            <span class="counter-pill">${currentSkills.length}</span>
          </div>
          ${currentSkills.length > 0 ? `
            <button type="button" class="btn-clear-skills" onclick="clearAllSkills()">
              <i class="fas fa-trash-can"></i>
              <span>${isAr ? 'مسح الكل' : 'Clear All'}</span>
            </button>
          ` : ''}
        </div>
        <div class="skills-chip-tray" id="selected-skills-box">
          ${currentSkills.length === 0 ? `
            <div class="skills-empty-state">
              <i class="fas fa-arrow-turn-down text-accent"></i>
              <span>${isAr ? 'انقر على المهارات أدناه لإضافتها إلى ترسانتك الشخصية' : 'Click any technology below to add it to your technical arsenal'}</span>
            </div>
          ` : currentSkills.map(skill => `
            <span class="skill-chip active" data-skill="${Utils.sanitize(skill)}">
              <i class="${Utils.skillIcon(skill)}"></i>
              <span>${Utils.sanitize(skill)}</span>
              <button type="button" class="skill-chip-remove" onclick="removeSkill('${Utils.sanitize(skill)}')" title="Remove">
                <i class="fas fa-times"></i>
              </button>
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="skills-tabs-bar">
        <button type="button" class="skills-tab-btn${activeTab === 'all' ? ' active' : ''}" onclick="selectSkillCategory('all')">
          ${isAr ? 'الكل' : 'All'}
        </button>
        ${categories.map(cat => `
          <button type="button" class="skills-tab-btn${activeTab === cat.id ? ' active' : ''}" onclick="selectSkillCategory('${cat.id}')">
            ${cat.name}
          </button>
        `).join('')}
      </div>

      <!-- Curated Category Grid -->
      <div class="skills-catalog-container">
        ${filteredCategories.map(cat => {
          const matchingItems = cat.items.filter(item => {
            if (!searchQuery) return true;
            return item.toLowerCase().includes(searchQuery);
          });

          if (matchingItems.length === 0) return '';

          return `
            <div class="skill-category-section">
              <div class="skill-category-header">${cat.name}</div>
              <div class="skills-badges-wrap">
                ${matchingItems.map(tech => {
                  const isActive = currentSkills.includes(tech);
                  return `
                    <button type="button" class="skill-badge${isActive ? ' active' : ''}" onclick="toggleSkill('${tech}')" title="${tech}">
                      <i class="${Utils.skillIcon(tech)}"></i>
                      <span>${tech}</span>
                      ${isActive ? '<i class="fas fa-check checkmark"></i>' : ''}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Step Navigation Footer -->
      <div class="step-nav-footer">
        <button type="button" class="btn btn-secondary px-5" onclick="prevStep()">
          <i class="fas fa-arrow-left text-xs"></i>
          <span>${I18N.t('btn.prev')}</span>
        </button>
        <button type="button" class="btn btn-primary px-6" onclick="nextStep()">
          <span>${I18N.t('btn.next')}</span>
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
    `;
  };
});
