# Using Antigravity Effectively with This Project

This project includes configurations tailored for **Antigravity**, a powerful agentic AI coding assistant. While Cursor uses specialized agents and rules, Antigravity operates using native **Modes**, **Artifacts**, **Workflows**, and **Skills**.

## How Antigravity Works (vs Cursor)

Antigravity natively supports much of what Cursor required custom agents and commands to do.

| Cursor Concept | Antigravity Equivalent | How it Works |
|---|---|---|
| **Rules (`.cursor/rules`)** | **Skills (`.agents/skills`)** | Antigravity reads `SKILL.md` files for domain knowledge. We've consolidated your project stack into the `project-rules` skill. |
| **Agents (`.cursor/agents`)**| **Modes (Native)** | Antigravity natively switches between `PLANNING`, `EXECUTION`, and `VERIFICATION` modes. It doesn't need external agent definitions. |
| **Commands (`.cursor/commands`)** | **Workflows (`.agents/workflows`)** | Workflows are explicit step-by-step guides for the agent (e.g., TDD, verify). |
| **`/plan` Command** | **PLANNING Mode** | Antigravity natively researches and proposes an `implementation_plan.md` artifact. |
| **`/verify` Command** | **VERIFICATION Mode** | Antigravity natively tests and summarizes results in a `walkthrough.md` artifact. |

---

## The Antigravity Workflow

When you ask Antigravity to build a feature, it natively follows a structured loop:

1. **PLANNING**: It analyzes your request, reads the `project-rules` skill, and drafts an `implementation_plan.md`. It will ask you for approval.
2. **EXECUTION**: Once approved, it executes the code changes safely, using tools sequentially or in parallel.
3. **VERIFICATION**: After coding, it verifies the work (running Vitest, TypeScript, build) and documents the final proof-of-work in `walkthrough.md`.

*You don't need to manually invoke specialized agents; Antigravity handles orchestration natively.*

---

## Active Skills

All project guidelines (React 19, shadcn/Tailwind, Zustand, Zod, Vitest) are consolidated into:
- `.agents/skills/project-rules/SKILL.md`

Antigravity automatically refers to this when planning or modifying code. It enforces:
- **Architecture**: Vite 7, React Router 7, Zustand, TanStack Query
- **Styling**: shadcn/ui + Tailwind CSS 4
- **Formatting**: kebab-case filenames, PascalCase components
- **Testing**: Vitest 4 + React Testing Library (80% coverage)

---

## Custom Workflows

You can explicitly ask Antigravity to run specific workflows:

### 1. Test-Driven Development (TDD)
**Prompt**: *"Run the tdd workflow to add a currency formatter utility"*
**What it does**: Forces Antigravity to strictly write a failing Vitest test first (RED), implement the code (GREEN), and refactor.

### 2. Pre-PR Verification
**Prompt**: *"Run the verify workflow"*
**What it does**: Runs type-checking, linting, tests, and a test build to ensure your code is completely ready for a PR.

---

## Tips for Maximum Effectiveness with Antigravity

1. **Be specific in your initial prompt**: "Build a user profile page with an avatar upload using our form patterns." Antigravity will handle the rest.
2. **Review the `implementation_plan.md`**: Always check the plan Antigravity generates during the PLANNING phase before it touches code to catch architectural issues.
3. **Use Workflows explicitly**: Mention specific workflows if you want Antigravity to follow a set pattern (like TDD).
4. **Leverage Artifacts**: Check your workspace's `.gemini/antigravity/brain/<id>/` folder for task checklists and verification walkthroughs.
