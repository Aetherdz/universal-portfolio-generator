/* =============================================
   js/github.js — GitHub Integration: Repo Sync & Pages Deploy
   Pure Native Fetch Architecture (Zero External Dependencies)
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

/**
 * Fetch and import user repositories from GitHub into FormState projects & skills
 */
async function syncGitHubRepos(preferredUser) {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

  let username = (preferredUser && typeof preferredUser === 'string')
    ? preferredUser.trim()
    : (document.getElementById('step4-github-user')?.value?.trim() ||
       document.getElementById('deploy-username')?.value?.trim() ||
       FormState.data.socials?.github || '');

  // Strip full URL or @
  username = username.replace(/^https?:\/\/github\.com\//i, '').replace(/^@/, '').trim();

  if (!username) {
    const promptMsg = isAr
      ? 'يرجى إدخال اسم مستخدم GitHub للمزامنة'
      : 'Please enter a GitHub username to sync repositories';
    if (typeof Utils !== 'undefined') {
      Utils.showToast(promptMsg, 'warn');
    }
    const input = document.getElementById('step4-github-user');
    if (input) input.focus();
    return;
  }

  const patInput = document.getElementById('pat-input')?.value?.trim() || '';

  if (typeof Utils !== 'undefined') {
    Utils.showLoading(isAr ? `جارٍ جلب مستودعات @${username} من GitHub...` : `Fetching repositories for @${username}...`);
  }

  try {
    const headers = { 'Accept': 'application/vnd.github.v3+json' };
    if (patInput && (patInput.startsWith('ghp_') || patInput.startsWith('github_pat_'))) {
      headers['Authorization'] = `token ${patInput}`;
    }

    const apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`;
    const res = await fetch(apiUrl, { headers });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(isAr ? 'حساب GitHub غير موجود' : 'GitHub user not found');
      } else if (res.status === 401 || res.status === 403) {
        throw new Error(isAr ? 'تم تجاوز حد طلبات GitHub API أو الرمز غير صالح' : 'GitHub API rate limit reached or token invalid');
      } else {
        throw new Error(`GitHub API error: ${res.statusText}`);
      }
    }

    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      if (typeof Utils !== 'undefined') {
        Utils.hideLoading();
        Utils.showToast(isAr ? 'لم يتم العثور على مستودعات عامة لهذا الحساب' : 'No public repositories found for this user', 'info');
      }
      return;
    }

    // Filter out forks if there are at least 3 source repos
    let candidateRepos = repos.filter(r => !r.fork);
    if (candidateRepos.length < 3) {
      candidateRepos = repos;
    }

    // Sort by stargazers_count desc, then updated_at
    candidateRepos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.updated_at) - new Date(a.updated_at));

    const topRepos = candidateRepos.slice(0, 6);
    let importedCount = 0;

    if (!Array.isArray(FormState.data.projects)) FormState.data.projects = [];
    const existingSkills = new Set((FormState.data.skills || []).map(s => s.toLowerCase()));
    const isNonSkill = (typeof Utils !== 'undefined' && Utils.isNonSkill) ? Utils.isNonSkill : () => false;

    topRepos.forEach(repo => {
      const exists = FormState.data.projects.some(p =>
        (p.url && p.url.toLowerCase() === repo.html_url.toLowerCase()) ||
        (p.name && p.name.toLowerCase() === repo.name.toLowerCase())
      );

      const tags = [];
      if (repo.language && !isNonSkill(repo.language)) {
        tags.push(repo.language);
        if (!existingSkills.has(repo.language.toLowerCase())) {
          existingSkills.add(repo.language.toLowerCase());
          FormState.data.skills.push(repo.language);
        }
      }

      if (Array.isArray(repo.topics)) {
        repo.topics.slice(0, 4).forEach(topic => {
          if (!isNonSkill(topic)) {
            const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
            tags.push(cap);
            if (!existingSkills.has(cap.toLowerCase())) {
              existingSkills.add(cap.toLowerCase());
              FormState.data.skills.push(cap);
            }
          }
        });
      }

      if (!exists) {
        FormState.data.projects.push({
          name: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          desc: repo.description || (isAr ? 'مشروع برمجي مفتوح المصدر على GitHub' : 'Open-source software system on GitHub'),
          tags: tags.length ? tags : ['Open Source'],
          url: repo.html_url
        });
        importedCount++;
      }
    });

    if (!FormState.data.socials) FormState.data.socials = {};
    if (!FormState.data.socials.github) {
      FormState.data.socials.github = username;
    }

    if (typeof Utils !== 'undefined') {
      Utils.hideLoading();
    }

    FormState.saveToStorage();

    if (typeof renderCurrentStep === 'function') {
      renderCurrentStep();
    }
    if (typeof triggerPreview === 'function') {
      triggerPreview();
    }

    const msg = isAr
      ? `تم استيراد ${importedCount} مشروعاً بنجاح وتحديث المهارات!`
      : `Successfully synced ${importedCount} repositories and updated technical arsenal!`;
    if (typeof Utils !== 'undefined') {
      Utils.showToast(msg, 'success');
    }
  } catch (err) {
    if (typeof Utils !== 'undefined') {
      Utils.hideLoading();
      Utils.showToast(err.message || 'Failed to sync repositories', 'error');
    }
    console.error('GitHub Sync Error:', err);
  }
}

/**
 * Deploy portfolio directly to GitHub Pages using Native fetch against GitHub REST API
 * (Zero Octokit dependency required!)
 */
async function deployToGitHub() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';

  let username = document.getElementById('deploy-username')?.value?.trim() || FormState.data.socials?.github || '';
  username = username.replace(/^https?:\/\/github\.com\//i, '').replace(/^@/, '').trim();

  const pat = document.getElementById('pat-input')?.value?.trim() || '';

  if (!username) {
    document.getElementById('deploy-username')?.focus();
    if (typeof Utils !== 'undefined') {
      Utils.showToast(isAr ? 'يرجى إدخال اسم مستخدم GitHub' : 'Please enter your GitHub username', 'error');
    }
    return;
  }
  if (!pat) {
    document.getElementById('pat-input')?.focus();
    if (typeof Utils !== 'undefined') {
      Utils.showToast(isAr ? 'يرجى إدخال رمز الوصول الشخصي (PAT مع صلاحية repo)' : 'Please enter your GitHub Personal Access Token (repo scope)', 'error');
    }
    return;
  }

  const repoName = 'portfolio';
  const apiBase = 'https://api.github.com';
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${pat}`,
    'Content-Type': 'application/json'
  };

  const showLoading = (typeof Utils !== 'undefined') ? Utils.showLoading : () => {};
  const hideLoading = (typeof Utils !== 'undefined') ? Utils.hideLoading : () => {};
  const showToast = (typeof Utils !== 'undefined') ? Utils.showToast : () => {};

  showLoading(isAr ? `جارٍ الاتصال بحساب GitHub @${username}...` : `Connecting to GitHub repository ${username}/${repoName}...`);

  try {
    // 1. Verify if repository exists
    let repoRes = await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}`, { headers });
    let defaultBranch = 'main';

    if (repoRes.status === 404) {
      showLoading(isAr ? `إنشاء مستودع جديد ${repoName}...` : `Creating new repository ${repoName}...`);
      const createRes = await fetch(`${apiBase}/user/repos`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: repoName,
          description: 'Modern developer portfolio built with Universal Portfolio Studio',
          homepage: `https://${username}.github.io/${repoName}/`,
          auto_init: true
        })
      });

      if (!createRes.ok) {
        const errJson = await createRes.json().catch(() => ({}));
        throw new Error(errJson.message || `Failed to create repository (${createRes.status})`);
      }

      // Wait 2.5 seconds for GitHub internal replication
      await new Promise(r => setTimeout(r, 2500));
      repoRes = await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}`, { headers });
    }

    if (!repoRes.ok) {
      throw new Error(`Failed to access repository ${repoName} (${repoRes.status})`);
    }

    const repoData = await repoRes.json();
    defaultBranch = repoData.default_branch || 'main';

    // 2. Get latest commit SHA on branch
    let latestCommitSha = null;
    const refRes = await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/git/ref/heads/${defaultBranch}`, { headers });
    if (refRes.ok) {
      const refData = await refRes.json();
      latestCommitSha = refData.object?.sha || null;
    }

    // 3. Render complete standalone portfolio HTML
    const portfolioData = FormState.getData();
    const theme = (typeof getTheme === 'function' ? getTheme(FormState.data.theme || 1) : null) ||
                  (typeof THEMES !== 'undefined' ? THEMES[0] : null);

    if (!theme || typeof theme.render !== 'function') {
      throw new Error('Theme engine not available to render portfolio');
    }
    const portfolioHtml = theme.render(portfolioData);

    showLoading(isAr ? 'رفع ملفات الموقع إلى GitHub...' : 'Uploading files to repository...');

    // 4. Create blobs for index.html, .nojekyll, portfolio-config.json
    const files = [
      { path: 'index.html', content: portfolioHtml },
      { path: '.nojekyll', content: '' },
      { path: 'portfolio-config.json', content: JSON.stringify(portfolioData, null, 2) }
    ];

    const treeEntries = [];

    for (const f of files) {
      const encoded = btoa(unescape(encodeURIComponent(f.content)));
      const blobRes = await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content: encoded, encoding: 'base64' })
      });

      if (!blobRes.ok) {
        throw new Error(`Failed to create Git blob for ${f.path}`);
      }
      const blobData = await blobRes.json();
      treeEntries.push({
        path: f.path,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha
      });
    }

    // 5. Get base tree SHA if latest commit exists
    let latestTreeSha = null;
    if (latestCommitSha) {
      const commitRes = await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/git/commits/${latestCommitSha}`, { headers });
      if (commitRes.ok) {
        const commitData = await commitRes.json();
        latestTreeSha = commitData.tree?.sha || null;
      }
    }

    // 6. Create Git Tree
    const treePayload = { tree: treeEntries };
    if (latestTreeSha) treePayload.base_tree = latestTreeSha;

    const treeRes = await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify(treePayload)
    });

    if (!treeRes.ok) {
      throw new Error(`Failed to create Git tree (${treeRes.status})`);
    }
    const treeData = await treeRes.json();

    // 7. Create Git Commit
    const commitMessage = 'Build and publish portfolio [Universal Portfolio Studio v3.8]';
    const commitPayload = {
      message: commitMessage,
      tree: treeData.sha,
      parents: latestCommitSha ? [latestCommitSha] : []
    };

    const newCommitRes = await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify(commitPayload)
    });

    if (!newCommitRes.ok) {
      throw new Error(`Failed to create Git commit (${newCommitRes.status})`);
    }
    const newCommitData = await newCommitRes.json();

    // 8. Update or create branch ref
    if (latestCommitSha) {
      await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/git/refs/heads/${defaultBranch}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ sha: newCommitData.sha, force: true })
      });
    } else {
      await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/git/refs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ref: `refs/heads/${defaultBranch}`, sha: newCommitData.sha })
      });
    }

    // 9. Enable GitHub Pages
    showLoading(isAr ? 'تأكيد تفعيل استضافة GitHub Pages...' : 'Enabling GitHub Pages hosting...');
    try {
      await fetch(`${apiBase}/repos/${encodeURIComponent(username)}/${repoName}/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source: { branch: defaultBranch, path: '/' }
        })
      });
    } catch (_) {
      // Frequently already enabled or automatic
    }

    const liveUrl = `https://${username}.github.io/${repoName}/`;
    hideLoading();

    const patInputEl = document.getElementById('pat-input');
    if (patInputEl) patInputEl.value = '';

    const resultEl = document.getElementById('deploy-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="deploy-success-card">
          <div class="deploy-success-icon">
            <i class="fas fa-check"></i>
          </div>
          <h4 class="deploy-success-title">${isAr ? 'تم النشر بنجاح على GitHub Pages!' : 'Successfully Deployed to GitHub Pages!'}</h4>
          <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="deploy-live-link">
            <span>${liveUrl}</span>
            <i class="fas fa-arrow-up-right-from-square"></i>
          </a>
          <p class="deploy-success-hint">
            ${isAr ? 'قد يستغرق ظهور الموقع دقيقة إلى دقيقتين حتى تنتهي GitHub Pages من معالجة البناء الأولى.' : 'GitHub Pages build typically takes 1-2 minutes to be publicly visible worldwide.'}
          </p>
        </div>
      `;
    }

    showToast(isAr ? 'تم النشر بنجاح!' : 'Deployed successfully to GitHub Pages!', 'success');
  } catch (err) {
    hideLoading();
    console.error('GitHub Deploy Error:', err);
    showToast((isAr ? 'فشل النشر: ' : 'Deployment failed: ') + (err.message || 'Unknown error'), 'error');
  }
}
