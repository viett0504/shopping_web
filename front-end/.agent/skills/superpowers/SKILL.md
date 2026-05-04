# Superpowers Development Workflow

## Purpose

Use this skill when implementing, refactoring, debugging, or reviewing code. The agent must work like a careful senior engineer: understand first, plan first, then implement safely.

## Core Rules

Before coding:
1. Read the relevant files.
2. Restate the goal in concrete terms.
3. Identify affected frontend/backend files.
4. Create an implementation plan.
5. Ask only when a blocking requirement is missing. Otherwise make a reasonable assumption and continue.

During coding:
1. Make small, focused changes.
2. Do not rewrite unrelated files.
3. Preserve existing architecture and naming conventions.
4. Prefer TypeScript-safe code.
5. Handle loading, error, and empty states in UI.
6. Handle validation, permissions, and exceptions in backend.

Testing:
1. After changes, run the smallest relevant checks first.
2. For frontend: npm run build or npm run lint if available.
3. For backend NestJS: npm run test or targeted Jest test if available.
4. If tests cannot be run, explain exactly why.

Review:
1. Review your own diff.
2. Look for type errors, wrong imports, missing DTO validation, missing guards, bad API paths, and broken UI states.
3. Summarize changed files and why.

## Required Workflow

For every non-trivial task, follow this order:

1. Explore
2. Plan
3. Implement
4. Test
5. Review
6. Summarize

Never jump straight into code for large tasks.