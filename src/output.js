export function generateMarkdown(repos) {
  const lines = [];
  lines.push('# My GitHub Repositories\n');
  lines.push(`> Generated at: ${new Date().toISOString().replace('T', ' ').slice(0, 19)}\n`);
  lines.push(`Total repositories: **${repos.length}**\n`);
  lines.push('---\n');

  for (const repo of repos) {
    const visibilityBadge = repo.visibility === 'public'
      ? '![Public](https://img.shields.io/badge/visibility-public-brightgreen)'
      : '![Private](https://img.shields.io/badge/visibility-private-red)';

    lines.push(`## ${repo.name} ${visibilityBadge}\n`);
    if (repo.description) {
      lines.push(`> ${repo.description}\n`);
    }
    lines.push(`- **URL**: [${repo.url}](${repo.url})`);
    lines.push(`- **Repo**: ${repo.ssh_url}`);
    lines.push(`- **Last updated**: ${repo.updatedAt}`);
    lines.push('');
    lines.push('---\n');
  }

  return lines.join('\n');
}
