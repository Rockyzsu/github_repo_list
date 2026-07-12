const GITHUB_API = 'https://api.github.com';

export async function getRepos(token) {
  const repos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `${GITHUB_API}/user/repos?page=${page}&per_page=100&sort=updated`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'github-scaner',
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (data.length === 0) hasMore = false;
    else {
      for (const repo of data) {
        repos.push({
          name: repo.name,
          visibility: repo.private ? 'private' : 'public',
          description: repo.description || '',
          url: repo.html_url,
          ssh_url: repo.ssh_url,
          updatedAt: repo.updated_at.slice(0, 10),
        });
      }
      page++;
    }
  }

  return repos;
}
