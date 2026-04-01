---
title: "Repomix — Pack Entire Codebases for Claude"
type: tool
category: devtools
tags: [codebase, claude, context, developer-tools]
projects: [ORBIT, Training]
source: "https://github.com/yamadashy/repomix"
date_added: 2026-04-01
status: raw
---

# Repomix — Pack Entire Codebases for Claude

## TL;DR

Repomix flattens an entire repository into a single text file optimized for LLM context windows. One command gives Claude full codebase awareness without manual file-by-file pasting.

## Details

Repomix is a CLI tool that:

1. **Scans** a repository (respects `.gitignore`)
2. **Concatenates** all files with clear delimiters and file path headers
3. **Counts tokens** and warns if you're exceeding context limits
4. **Outputs** a single `.txt` or `.xml` file ready to paste into Claude

### Key features

- **Smart filtering** — skip `node_modules`, binaries, lock files automatically
- **Token counting** — shows exact token count per file and total
- **Output formats** — plain text, XML (with file path attributes), or markdown
- **Config file** — `.repomixrc` for per-project customization
- **Tree output** — includes the directory tree at the top for orientation

### Usage

```bash
npx repomix                           # pack current directory
npx repomix --output codebase.xml     # XML format
npx repomix --include "src/**"        # only src/
npx repomix --style xml               # structured XML output
```

### Why XML format matters

Claude performs better with XML-structured input. The XML output wraps each file in `<file path="src/foo.ts">` tags, making it trivial for Claude to reference specific files by path. This is measurably better than plain concatenation for code review and refactoring tasks.

## Why This Matters for Ben

- **ORBIT workflows**: When an Orchestrator agent needs full codebase awareness before planning, Repomix provides it in one shot
- **Training demos**: Show participants how to give Claude "project memory" — paste the Repomix output and Claude understands the entire architecture
- **Client work**: For OptiPlan or any freelance project, Repomix + Claude = instant onboarding to any codebase

## Teaching Angle

**Live demo (3 min):**
1. Run `npx repomix` on a sample repo
2. Show the token count: "This 50-file project fits in 40K tokens"
3. Paste into Claude, ask an architecture question
4. Claude answers with full context — no hallucination about file structure

**Key insight to teach:** "The bottleneck isn't Claude's intelligence — it's what you put in the context window. Repomix solves the input problem."

## Links

- Repository: https://github.com/yamadashy/repomix
- npm: https://www.npmjs.com/package/repomix
