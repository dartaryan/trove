---
title: "Agentic Search Beats RAG for Code Understanding"
type: pattern
category: orbit
tags: [agentic-search, rag, claude-code, architecture]
projects: [ORBIT, Training]
source: "Observed in Claude Code behavior, validated across multiple codebases"
date_added: 2026-04-01
status: raw
---

# Agentic Search Beats RAG for Code Understanding

## TL;DR

For codebase understanding, Claude Code's approach of iteratively reading files, following imports, and building context on-the-fly consistently outperforms pre-indexed RAG systems. The agent decides what to read based on what it's already learned — no pre-processing needed.

## Details

### The RAG approach (traditional)

1. Pre-index the codebase into vector embeddings
2. User asks a question
3. Retrieve top-K relevant chunks by semantic similarity
4. LLM answers based on retrieved chunks

**Problems:**
- Chunks lose context (a function without its imports is incomplete)
- Embedding similarity doesn't capture *structural* relationships (call chains, inheritance)
- Index must be rebuilt when code changes
- Fixed chunk size means either too little context or too much noise

### The agentic search approach (Claude Code)

1. User asks a question
2. Agent reads the most likely entry point (e.g., the file mentioned, or `src/index.ts`)
3. Agent notices imports, follows them — reads those files
4. Agent identifies the relevant code path, reads deeper
5. Agent builds understanding iteratively, stopping when confident

**Why it works better:**
- **Context follows structure** — the agent reads files in dependency order, just like a human developer would
- **Adaptive depth** — simple questions need 2-3 files; complex ones trigger deeper exploration
- **Always current** — no index to maintain; reads the actual files
- **Reasoning at each step** — the agent decides *what to read next* based on *what it just learned*

### The key insight

RAG treats code as text. Agentic search treats code as a *graph* of interconnected modules. Code is inherently structured — functions call other functions, types compose, modules depend on modules. An agent that follows these connections naturally builds the right context.

### When RAG still wins

- **Massive codebases** (100K+ files) where agentic search would be too slow
- **Keyword lookups** across the entire codebase (grep-like queries)
- **Repeated queries** against a stable corpus (documentation, not code)

## Why This Matters for Ben

- Core ORBIT insight: design multi-agent systems that explore rather than pre-index
- Training sessions: this is the "aha moment" — show Claude navigating a codebase live vs. a RAG system returning disconnected chunks
- Architecture decisions: when building AI tools, default to agentic patterns for code, RAG for documents

## Teaching Angle

**Side-by-side demo (10 min):**
1. Show a RAG system answering "how does authentication work?" — it returns 5 chunks, some irrelevant
2. Show Claude Code answering the same question — watch it read `auth/index.ts`, follow the middleware chain, find the token validation logic, and explain the full flow
3. Key line: "The agent doesn't search *for* the answer. It *traces* the answer through the code, like a senior developer would."

**Analogy for non-technical audience:** "RAG is like searching a book's index. Agentic search is like reading the book, following the footnotes, and building understanding as you go."

## Links

- Claude Code documentation: https://docs.anthropic.com/en/docs/claude-code
- ORBIT methodology: Internal
