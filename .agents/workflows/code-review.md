---
description: Comprehensive security and quality review of uncommitted changes.
---

# Code Review Workflow

When asked to perform a code review, follow these exact steps to review uncommitted changes before the user commits or creates a PR:

1. **Get Changed Files**: Run `git diff --name-only HEAD` (or against `main` if requested) to identify changed files.
2. **Security Review (CRITICAL)**: Analyze each changed file for:
   - Hardcoded credentials, API keys, tokens.
   - SQL injection or XSS vulnerabilities.
   - Missing input validation (ensure Zod is used for forms/APIs).
   - Insecure dependencies or path traversal risks.
3. **Code Quality Review (HIGH)**:
   - Flag functions > 50 lines or files > 800 lines.
   - Flag nesting depth > 4 levels.
   - Check for missing error handling.
   - Flag `console.log` statements or unresolved `TODO/FIXME` comments.
   - Verify missing JSDoc for public APIs.
4. **Best Practices Review (MEDIUM)**:
   - Ensure mutation patterns are avoided (use immutable state/Zustand).
   - Check for missing tests for new functionality.
   - Verify accessibility (a11y) considerations.
5. **Generate Report**: Present a concise markdown report categorizing issues by Severity (CRITICAL, HIGH, MEDIUM, LOW) with file locations, descriptions, and suggested fixes. 
6. **Blocker**: Explicitly advise the user NOT to commit if CRITICAL or HIGH issues are found. If permitted, proactively offer to apply the fixes.
