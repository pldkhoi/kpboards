---
description: Rebuild high-level codemaps for architecture, frontend, backend/service, and data flow.
---

# Update Codemaps Workflow

1. Scan project structure and key dependency edges:
   - route entrypoints
   - feature modules
   - shared UI and utility layers
   - API/query/store boundaries
2. Generate or update codemaps:
   - `docs/CODEMAPS/architecture.md`
   - `docs/CODEMAPS/frontend.md`
   - `docs/CODEMAPS/services.md`
   - `docs/CODEMAPS/data.md`
3. Add freshness timestamp to each file.
4. Summarize structural changes and estimate diff impact.
5. If architecture churn is large, call it out explicitly before finalizing.

Keep codemaps token-lean: focus on module relationships, not implementation details.
