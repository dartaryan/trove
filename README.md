# TROVE -- Ben's Idea Vault

A curated collection of tools, patterns, insights, and teaching material. Managed by the TROVE agent, browsable via GitHub Pages.

**[Browse the Vault](https://dartaryan.github.io/trove/)**

---

## Categories

| Category | Description |
|----------|-------------|
| `teaching` | Training material, demos, workshop tools |
| `tailorplayed` | Board game design insights and patterns |
| `orbit` | ORBIT methodology and multi-agent patterns |
| `devtools` | Developer tools, utilities, workflow enhancers |
| `market` | Market intelligence, competitive insights |
| `general` | Everything else worth keeping |

## Document Schema

Each vault item is a markdown file with YAML frontmatter:

```yaml
---
title: "..."
type: tool | pattern | demo | concept | resource | datapoint | idea
category: teaching | tailorplayed | orbit | devtools | market | general
tags: [...]
projects: [...]
source: "..."
date_added: 2026-04-01
status: raw
---

## TL;DR
## Details
## Why This Matters for Ben
## Teaching Angle
## Links
```

## How It Works

```
TROVE Agent --> pushes .md to vault/ --> GitHub Actions builds index --> GitHub Pages deploys
```

1. The TROVE agent creates structured markdown documents and pushes them to the `vault/` directory
2. On every push to `main`, a GitHub Actions workflow runs `scripts/build-index.js`
3. The build script scans all vault items and compiles `site/data.json`
4. GitHub Pages deploys the `site/` directory with the browsing app

## Adding Items Manually

1. Create a `.md` file in the appropriate `vault/<category>/` directory
2. Include the YAML frontmatter (see schema above)
3. Write the body sections
4. Push to `main`

## Local Development

```bash
npm install
npm run build        # generates site/data.json
npx serve site       # preview at localhost:3000
```
