import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VAULT_DIR = path.resolve('vault');
const OUTPUT = path.resolve('site/data.json');

function findMarkdownFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(full));
    } else if (entry.name.endsWith('.md') && entry.name !== '.gitkeep') {
      files.push(full);
    }
  }
  return files;
}

function extractTldr(body) {
  const match = body.match(/## TL;DR\s*\n([\s\S]*?)(?=\n## |\n$|$)/);
  return match ? match[1].trim() : '';
}

function buildSlug(filePath) {
  return path.basename(filePath, '.md');
}

const mdFiles = findMarkdownFiles(VAULT_DIR);
const items = [];

for (const file of mdFiles) {
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);

  const relativePath = path.relative(path.resolve('.'), file).replace(/\\/g, '/');

  items.push({
    title: data.title || buildSlug(file),
    type: data.type || 'idea',
    category: data.category || 'general',
    tags: data.tags || [],
    projects: data.projects || [],
    source: data.source || '',
    date_added: data.date_added instanceof Date
      ? data.date_added.toISOString().split('T')[0]
      : data.date_added ? String(data.date_added) : '',
    status: data.status || 'raw',
    path: relativePath,
    slug: buildSlug(file),
    tldr: extractTldr(content),
    body: content.trim(),
  });
}

items.sort((a, b) => b.date_added.localeCompare(a.date_added));

const byCategory = {};
const byType = {};
const byStatus = {};

for (const item of items) {
  byCategory[item.category] = (byCategory[item.category] || 0) + 1;
  byType[item.type] = (byType[item.type] || 0) + 1;
  byStatus[item.status] = (byStatus[item.status] || 0) + 1;
}

const output = {
  items,
  stats: {
    total: items.length,
    by_category: byCategory,
    by_type: byType,
    by_status: byStatus,
    latest_date: items.length > 0 ? items[0].date_added : null,
  },
  generated_at: new Date().toISOString(),
};

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

console.log(`Built index: ${items.length} items -> ${OUTPUT}`);
