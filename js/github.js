/* =============================================
   github.js — GitHub Integration: Repo Sync & Pages Deploy
   Universal Portfolio Generator — Elite Edition
   ============================================= */

/**
 * Fetch and import user repositories from GitHub into FormState projects & skills
 */
async function syncGitHubRepos() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  
  // Try retrieving PAT and username from various inputs or state
  const patInput = document.getElementById('form-pat-input')?.value?.trim() || 
                   document.getElementById('pat-input')?.value?.trim() || 
                   FormState.data.githubPat || '';
                   
  let username = document.getElementById('deploy-username')?.value?.trim() || 
                 FormState.data.socials?.github || 
                 FormState.data.githubUsername || '';
                 
  // Clean username if user provided full GitHub URL or @
  username = username.replace(/^https?:\/\/github\.com\//i, '').replace(/^@/, '').trim();

  // If user entered username directly into the token input, detect it
  if (!username && patInput && !patInput.startsWith('ghp_') && !patInput.startsWith('github_pat_')) {
    username = patInput;
  }

  if (!username && !patInput) {
    const promptMsg = isAr 
      ? 'يرجى إدخال اسم حساب GitHub أو الرمز الشخصي للمزامنة' 
      : 'Please enter your GitHub username or Personal Access Token';
    Utils.showToast(promptMsg, 'warn');
    document.getElementById('form-pat-input')?.focus();
    return;
  }

  Utils.showLoading(isAr ? 'جارٍ جلب مستودعات GitHub...' : 'Fetching repositories from GitHub...');

  try {
    let repos = [];
    const headers = { 'Accept': 'application/vnd.github.v3+json' };
    if (patInput && (patInput.startsWith('ghp_') || patInput.startsWith('github_pat_'))) {
      headers['Authorization'] = `token ${patInput}`;
    }

    let apiUrl = '';
    if (patInput && (patInput.startsWith('ghp_') || patInput.startsWith('github_pat_')) && !username) {
      // Authenticated user endpoint
      apiUrl = 'https://api.github.com/user/repos?sort=updated&per_page=30&affiliation=owner';
    } else {
      apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`;
    }

    const res = await fetch(apiUrl, { headers });
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(isAr ? 'حساب GitHub غير موجود' : 'GitHub user not found');
      } else if (res.status === 401 || res.status === 403) {
        throw new Error(isAr ? 'رمز GitHub غير صالح أو تم تجاوز الحد المسموح' : 'Invalid GitHub token or API rate limit reached');
      } else {
        throw new Error(`GitHub API error: ${res.statusText}`);
      }
    }

    repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      Utils.hideLoading();
      Utils.showToast(isAr ? 'لم يتم العثور على مستودعات عامة في هذا الحساب' : 'No public repositories found for this user', 'info');
      return;
    }

    // Filter out forks if there are sufficient source repos
    let candidateRepos = repos.filter(r => !r.fork);
    if (candidateRepos.length < 3) {
      candidateRepos = repos;
    }

    // Sort by stargazers_count descending, then recent update
    candidateRepos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.updated_at) - new Date(a.updated_at));

    // Take top 6 repositories
    const topRepos = candidateRepos.slice(0, 6);

    let importedCount = 0;
    const newSkills = new Set(FormState.data.skills || []);

    topRepos.forEach(repo => {
      // Check if project already exists by url or name
      const exists = FormState.data.projects.some(p => 
        (p.url && p.url.toLowerCase() === repo.html_url.toLowerCase()) || 
        (p.name && p.name.toLowerCase() === repo.name.toLowerCase())
      );

      const tags = [];
      if (repo.language) {
        tags.push(repo.language);
        newSkills.add(repo.language);
      }
      if (Array.isArray(repo.topics)) {
        repo.topics.slice(0, 4).forEach(topic => {
          const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
          tags.push(cap);
        });
      }

      if (!exists) {
        FormState.data.projects.push({
          name: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          desc: repo.description || (isAr ? 'مشروع برمجي مفتوح المصدر على GitHub' : 'Open-source software project on GitHub'),
          tags: tags,
          url: repo.html_url
        });
        importedCount++;
      }
    });

    FormState.data.skills = Array.from(newSkills);

    if (username && !FormState.data.socials.github) {
      FormState.data.socials.github = username;
    }

    Utils.hideLoading();
    
    // Auto-save & re-render if current step is affected
    if (typeof FormState.autoSave === 'function') FormState.autoSave();
    if (FormState.currentStep === 3 || FormState.currentStep === 4) {
      FormState.renderStep(FormState.currentStep);
    }
    if (typeof triggerPreview === 'function') {
      triggerPreview();
    }

    const msg = isAr 
      ? `تم استيراد ${importedCount} مشروعاً بنجاح وتحديث المهارات!`
      : `Successfully imported ${importedCount} projects and updated skills!`;
    Utils.showToast(msg, 'success');
  } catch (err) {
    Utils.hideLoading();
    console.error('GitHub Sync Error:', err);
    Utils.showToast(err.message || 'Failed to sync repositories', 'error');
  }
}

/**
 * Deploy portfolio directly to GitHub Pages using GitHub REST / Octokit
 */
async function deployToGitHub() {
  const isAr = typeof I18N !== 'undefined' && I18N.current === 'ar';
  let username = document.getElementById('deploy-username')?.value?.trim() || FormState.data.socials?.github || '';
  username = username.replace(/^https?:\/\/github\.com\//i, '').replace(/^@/, '').trim();

  const pat = document.getElementById('pat-input')?.value?.trim() || FormState.data.githubPat || '';

  if (!username) {
    document.getElementById('deploy-username')?.focus();
    Utils.showToast(isAr ? 'يرجى إدخال اسم مستخدم GitHub' : 'Please enter your GitHub username', 'error');
    return;
  }
  if (!pat) {
    document.getElementById('pat-input')?.focus();
    Utils.showToast(isAr ? 'يرجى إدخال رمز الوصول الشخصي (GitHub PAT)' : 'Please enter your GitHub token with repo scope', 'error');
    return;
  }

  const repoName = 'portfolio';
  Utils.showLoading(isAr ? `جارٍ الاتصال بـ ${username}/${repoName}...` : `Deploying to ${username}/${repoName}...`);

  try {
    if (typeof Octokit === 'undefined') {
      throw new Error('Octokit client library not loaded');
    }

    const octokit = new Octokit({ auth: pat });

    let repoExists = false;
    try {
      await octokit.repos.get({ owner: username, repo: repoName });
      repoExists = true;
    } catch (_) {
      repoExists = false;
    }

    if (!repoExists) {
      Utils.showLoading(isAr ? `إنشاء مستودع جديد ${repoName}...` : `Creating new repository ${repoName}...`);
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: 'Modern developer portfolio generated with Universal Portfolio Generator',
        homepage: `https://${username}.github.io/${repoName}/`,
        auto_init: true
      });
      // Short delay for GitHub replication
      await new Promise(r => setTimeout(r, 2500));
    }

    const data = FormState.getData();
    const theme = getTheme(FormState.data.theme || 3);
    const portfolioHtml = theme.render(data);

    const { data: repo } = await octokit.repos.get({ owner: username, repo: repoName });
    const branch = repo.default_branch || 'main';

    let latestCommitSha = null;
    try {
      const { data: ref } = await octokit.git.getRef({ owner: username, repo: repoName, ref: `heads/${branch}` });
      latestCommitSha = ref.object.sha;
    } catch (_) {
      latestCommitSha = null;
    }

    Utils.showLoading(isAr ? 'رفع ملفات الموقع...' : 'Uploading portfolio files...');

    const files = [
      { path: 'index.html', content: portfolioHtml },
      { path: '.nojekyll', content: '' },
      { path: 'portfolio-config.json', content: JSON.stringify(data, null, 2) }
    ];

    const treeEntries = [];
    for (const file of files) {
      const encoded = btoa(unescape(encodeURIComponent(file.content)));
      const { data: blob } = await octokit.git.createBlob({
        owner: username,
        repo: repoName,
        content: encoded,
        encoding: 'base64'
      });
      treeEntries.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
    }

    let latestTreeSha;
    if (latestCommitSha) {
      const { data: commit } = await octokit.git.getCommit({ owner: username, repo: repoName, commit_sha: latestCommitSha });
      latestTreeSha = commit.tree.sha;
    }

    const { data: tree } = await octokit.git.createTree({
      owner: username,
      repo: repoName,
      base_tree: latestTreeSha || undefined,
      tree: treeEntries
    });

    const commitMessage = 'Build and publish portfolio [Universal Portfolio Generator]';
    let newCommit;
    if (latestCommitSha) {
      const res = await octokit.git.createCommit({
        owner: username,
        repo: repoName,
        message: commitMessage,
        tree: tree.sha,
        parents: [latestCommitSha]
      });
      newCommit = res.data;
      await octokit.git.updateRef({
        owner: username,
        repo: repoName,
        ref: `heads/${branch}`,
        sha: newCommit.sha
      });
    } else {
      const res = await octokit.git.createCommit({
        owner: username,
        repo: repoName,
        message: commitMessage,
        tree: tree.sha,
        parents: []
      });
      newCommit = res.data;
      await octokit.git.createRef({
        owner: username,
        repo: repoName,
        ref: `refs/heads/${branch}`,
        sha: newCommit.sha
      });
    }

    Utils.showLoading(isAr ? 'تفعيل وتأكيد GitHub Pages...' : 'Enabling GitHub Pages hosting...');
    try {
      await octokit.repos.enablePages({
        owner: username,
        repo: repoName,
        source: { branch: branch, path: '/' }
      });
    } catch (_) {
      // Often already enabled or handled automatically
    }

    const liveUrl = `https://${username}.github.io/${repoName}/`;

    Utils.hideLoading();

    const patInputEl = document.getElementById('pat-input');
    if (patInputEl) patInputEl.value = '';

    const resultEl = document.getElementById('deploy-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="p-4 rounded-xl text-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 animate-fadeIn">
          <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2 text-lg">
            <i class="fas fa-check"></i>
          </div>
          <h4 class="font-bold text-sm text-emerald-900 dark:text-emerald-200">${isAr ? 'تم النشر بنجاح على GitHub Pages!' : 'Successfully Deployed to GitHub Pages!'}</h4>
          <a href="${liveUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 underline font-semibold mt-2 break-all hover:text-blue-700">
            <span>${liveUrl}</span>
            <i class="fas fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
          <p class="text-[11px] text-mono-500 dark:text-mono-400 mt-2">
            ${isAr ? 'قد يستغرق ظهور الموقع دقيقة إلى دقيقتين حتى تكتمل معالجة GitHub Pages.' : 'GitHub Pages build may take 1-2 minutes to be publicly visible.'}
          </p>
        </div>
      `;
    }

    Utils.showToast(isAr ? 'تم النشر بنجاح!' : 'Deployed successfully!', 'success');
  } catch (err) {
    Utils.hideLoading();
    console.error('GitHub Deploy Error:', err);
    Utils.showToast((isAr ? 'فشل النشر: ' : 'Deployment failed: ') + (err.message || 'Unknown error'), 'error');
  }
}
