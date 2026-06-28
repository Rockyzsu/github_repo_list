import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import { getRepos } from './src/github.js';
import { generateMarkdown } from './src/output.js';

const TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT_FILE = process.env.OUTPUT_FILE || 'repos.md';

async function main() {
  if (!TOKEN) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    console.error('Usage: GITHUB_TOKEN=your_token node index.js');
    process.exit(1);
  }

  try {
    console.log('Fetching repositories...');
    const repos = await getRepos(TOKEN);
    console.log(`Found ${repos.length} repositories`);

    const markdown = generateMarkdown(repos);
    writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
    console.log(`Saved to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
