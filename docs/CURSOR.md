# Using Cursor Effectively with This Project

This project includes a pre-configured `.cursor/` directory with rules, agents, commands, and skills that make Cursor's AI assistant deeply aware of the project's stack, patterns, and conventions.

## How It Works

Cursor reads files from `.cursor/` to give the AI context about your project:

```
.cursor/
├── rules/       # Always-on project context (stack, patterns, security)
├── agents/      # Specialized AI agents for specific tasks
├── commands/    # Slash commands you can invoke
└── skills/      # Reusable knowledge modules
```

---

## Rules (Always Active)

Rules are loaded automatically based on their `alwaysApply` or `globs` settings. You don't need to do anything — they inform the AI about your project behind the scenes.

| Rule                      | What It Does                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `dev.mdc`                 | Tells the AI your full stack (React 19, Vite 7, shadcn/Tailwind, Zustand, Zod, etc.), project structure, and coding conventions |
| `common-patterns.mdc`     | Provides code patterns for TanStack Query hooks, Zustand stores, Zod forms, shadcn components, and Axios usage                  |
| `testing.mdc`             | Enforces Vitest + Testing Library patterns, TDD workflow, 80% coverage target                                                   |
| `security.mdc`            | Security checklist — XSS prevention, env var safety, input validation                                                           |
| `performance.mdc`         | React memoization tips, Vite build optimization, TanStack Query caching                                                         |
| `git-workflow.mdc`        | Conventional commits format, PR workflow, Husky hooks                                                                           |
| `hooks.mdc`               | Pre/post tool hooks — auto-format, TypeScript checking, console.log warnings                                                    |
| `agent-orchestration.mdc` | Guides the AI on when to use specialized agents                                                                                 |
| `review.mdc`              | Code review checklist (activated when reviewing code)                                                                           |
| `research.mdc`            | Research mode guidelines (activated when exploring/investigating)                                                               |

**Tip**: Rules are what make the AI "just know" about your project. If the AI suggests Redux instead of Zustand, or Yup instead of Zod, the rules correct it automatically.

---

## Slash Commands

Type these in the Cursor chat to invoke specific workflows:

### Development Workflow

| Command          | When to Use                        | What It Does                                                                                                  |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/plan`          | Before starting a new feature      | Creates a step-by-step implementation plan, identifies risks, waits for your confirmation before writing code |
| `/tdd`           | When implementing features         | Enforces test-driven development: write tests first (RED), implement (GREEN), refactor (REFACTOR)             |
| `/build-fix`     | When build is broken               | Incrementally fixes TypeScript, Vite, and ESLint errors one at a time                                         |
| `/verify`        | Before committing or creating a PR | Runs build + type-check + lint + tests and produces a pass/fail report                                        |
| `/verify quick`  | Quick sanity check                 | Only runs build + type-check                                                                                  |
| `/verify pre-pr` | Before opening a PR                | Full checks plus security scan                                                                                |

### Quality & Review

| Command           | When to Use           | What It Does                                                                      |
| ----------------- | --------------------- | --------------------------------------------------------------------------------- |
| `/code-review`    | After writing code    | Reviews uncommitted changes for security issues, code quality, and best practices |
| `/test-coverage`  | After adding features | Analyzes coverage gaps and generates missing tests to reach 80%+                  |
| `/refactor-clean` | During maintenance    | Finds and safely removes dead code, unused exports, and unused dependencies       |

### Project Management

| Command                     | When to Use              | What It Does                                        |
| --------------------------- | ------------------------ | --------------------------------------------------- |
| `/checkpoint create <name>` | At milestones            | Saves a named checkpoint (git state + verification) |
| `/checkpoint verify <name>` | After changes            | Compares current state against a checkpoint         |
| `/eval`                     | To evaluate work quality | Runs evaluation against project standards           |
| `/learn`                    | When patterns emerge     | Captures reusable patterns for future sessions      |

### Example Workflow

```
1. /plan Add user profile page with avatar upload
   → AI creates implementation plan, you review and confirm

2. /tdd
   → AI writes tests first, then implements to pass them

3. /build-fix  (if needed)
   → Fixes any build errors

4. /code-review
   → Reviews your changes for security and quality

5. /verify pre-pr
   → Full verification before creating PR
```

---

## Agents

Agents are specialized AI personas. Cursor activates them automatically when relevant, or you can invoke them through commands.

| Agent                    | Specialty                        | Auto-Activated When...                        |
| ------------------------ | -------------------------------- | --------------------------------------------- |
| **planner**              | Implementation planning          | You use `/plan` or ask for a complex feature  |
| **architect**            | System design decisions          | Architectural questions arise                 |
| **tdd-guide**            | Test-driven development          | You use `/tdd` or ask to implement with tests |
| **code-reviewer**        | Code quality review              | You use `/code-review` or ask for a review    |
| **security-reviewer**    | Security vulnerability detection | Code touches auth, user input, API endpoints  |
| **build-error-resolver** | Fixing build/type errors         | Build fails (`yarn build` errors)             |
| **e2e-runner**           | End-to-end testing               | Critical user flows need testing              |
| **refactor-cleaner**     | Dead code cleanup                | You use `/refactor-clean`                     |
| **doc-updater**          | Documentation updates            | Docs need syncing with code changes           |

**Tip**: You don't need to explicitly call agents. The orchestration rule (`agent-orchestration.mdc`) tells the AI when to use each agent. For example, if you say "this build is broken", it automatically engages the build-error-resolver agent.

---

## Skills

Skills are reusable knowledge modules in `.cursor/skills/`. They provide deep domain knowledge that the AI can reference.

| Skill                 | What It Provides                              |
| --------------------- | --------------------------------------------- |
| `coding-standards`    | Universal TypeScript/React coding standards   |
| `frontend-patterns`   | React patterns, state management, performance |
| `security-review`     | Security checklists and patterns              |
| `tdd-workflow`        | TDD methodology and test patterns             |
| `eval-harness`        | Evaluation framework for code quality         |
| `verification-loop`   | Systematic verification patterns              |
| `continuous-learning` | Pattern extraction from sessions              |
| `strategic-compact`   | Context management for long sessions          |

---

## Tips for Maximum Effectiveness

### 1. Start with `/plan` for anything non-trivial

The planner agent prevents you from diving into code before thinking through the approach. It catches architectural issues early.

### 2. Use `/verify` before every commit

It takes seconds and catches issues that would otherwise show up in CI.

### 3. Let the AI know the file conventions

If you're creating a new file, the AI already knows to use kebab-case (`my-component.tsx`) and to place it in the right directory. Just describe what you need.

### 4. Ask for patterns, not just code

Instead of "write a form", say "write a contact form using our Zod + RHF pattern". The AI knows the project patterns from `common-patterns.mdc` and will generate consistent code.

### 5. Leverage the review cycle

After implementing, say "review this" or use `/code-review`. The code-reviewer agent checks for security issues, missing error handling, theming consistency, and more.

### 6. Use Plan Mode for big decisions

When Cursor suggests switching to Plan Mode, accept it. Plan Mode is read-only and helps think through architecture before writing code.

### 7. Multi-step tasks get todo lists

For complex tasks, the AI creates and tracks a todo list. This keeps both you and the AI aligned on progress.

---

## MCP (Model Context Protocol)

MCP servers extend Cursor with tools for UI components, browser testing, and more. This project configures:

- **shadcn** — Browse and install shadcn/ui components via natural language
- **cursor-ide-browser** — Navigate, screenshot, and interact with the browser (built-in)

See [MCP.md](./MCP.md) for setup, example prompts, and troubleshooting.

---

## Customizing

### Adding a new rule

Create a `.mdc` file in `.cursor/rules/`:

```yaml
---
description: When this rule should activate
alwaysApply: true # or use globs for file-specific rules
---
# Rule content in markdown
```

### Adding a new command

Create a `.md` file in `.cursor/commands/`. The filename becomes the slash command (e.g., `my-command.md` → `/my-command`).

### Adding a new agent

Create a `.md` file in `.cursor/agents/` with the agent's role, tools, and behavior.

---

## Troubleshooting

**AI suggests wrong patterns (e.g., Redux instead of Zustand)**
The rules should prevent this. If it happens, remind the AI: "Check the project rules — we use Zustand, not Redux."

**AI creates files with wrong naming**
Say: "All files should be kebab-case per our conventions."

**AI doesn't know about a project convention**
Add it to `.cursor/rules/dev.mdc` or create a new rule file.

**Commands don't seem to work**
Make sure the `.cursor/commands/` directory exists and the file has a `.md` extension.
