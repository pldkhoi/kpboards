# MCP (Model Context Protocol) Setup

This project configures MCP servers so Cursor's AI can discover UI components, test in the browser, and work with API documentation.

## Configuration

MCP servers are defined in [`.cursor/mcp.json`](../.cursor/mcp.json). Cursor merges this with global config (`~/.cursor/mcp.json`); project config takes priority.

**Restart Cursor** after changing MCP config for changes to take effect.

---

## Installed MCP Servers

### 1. shadcn (UI Component Discovery)

**Purpose**: Browse, search, and install shadcn/ui components using natural language.

**Config** (in `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

**Setup**:

1. Ensure the config is in `.cursor/mcp.json`
2. Open Cursor Settings → Tools & MCP → enable the `shadcn` server
3. Restart Cursor

**Example prompts**:

- "Create a contact form using components from the shadcn registry"
- "Add the button, dialog and card components to my project"
- "Show me all available components in the shadcn registry"
- "Find me a login form from the shadcn registry"
- "Install the dropdown menu component"

**Project setup**: This project uses `components.json` (shadcn config). The MCP works with the default shadcn/ui registry; no extra registry config is needed. For private registries, see [shadcn MCP docs](https://ui.shadcn.com/docs/mcp).

---

### 2. Cursor IDE Browser (Built-in)

**Purpose**: Navigate, take screenshots, and interact with the browser for UI verification and E2E-style testing.

If available in your Cursor version, the built-in **cursor-ide-browser** MCP provides tools such as:

- `browser_navigate` — Navigate to a URL (e.g. `http://localhost:3000`)
- `browser_take_screenshot` — Capture full page or element screenshots
- `browser_snapshot` — Get DOM snapshot for AI analysis
- `browser_click`, `browser_type`, `browser_fill` — Interact with the page
- `browser_console_messages` — Inspect console output

**Example prompts**:

- "Navigate to localhost:3000 and take a screenshot of the landing page"
- "Open the dashboard and check for console errors"
- "Take a screenshot of the header component"

**Note**: This server is built into Cursor. If you don't see it, check Cursor Settings → Tools & MCP. No project config is required.

---

### 3. API Mocking / Documentation (Optional)

**Current state**: This project uses Axios + TanStack Query; see [API.md](./API.md). There is no OpenAPI spec yet.

**When you add an OpenAPI spec**, you can add an API MCP server:

#### Option A: OpenAPI MCP Server (for API discovery)

Exposes OpenAPI endpoints as MCP tools so the AI can discover and call your API:

```json
{
  "mcpServers": {
    "openapi": {
      "command": "npx",
      "args": ["-y", "mcp-openapi-server", "--spec", "./openapi.json"]
    }
  }
}
```

Install: `npm install -g mcp-openapi-server` or use npx as above.

#### Option B: Mock servers for development

For mocking API responses during development:

- **MSW (Mock Service Worker)** — Already used in tests (`vi.mock`). See [API.md](./API.md#mocking-in-tests).
- **MockLoop MCP** — Generates mock APIs from OpenAPI specs; requires Python.

---

## Quick Reference

| MCP Server         | Purpose                      | Config in project     | Enable in Cursor |
| ------------------ | ---------------------------- | --------------------- | ---------------- |
| shadcn             | Component discovery/install  | ✅ `.cursor/mcp.json` | Settings → MCP   |
| cursor-ide-browser | Browser testing, screenshots | Built-in              | Settings → MCP   |
| openapi (optional) | API discovery/calls          | Add when spec exists  | Settings → MCP   |

---

## Troubleshooting

### shadcn MCP not responding

1. **Network** — Ensure you can reach the shadcn registry
2. **components.json** — Verify it exists in the project root
3. **Restart** — Fully restart Cursor after config changes
4. **Logs** — View → Output → select `MCP: project-*` to see MCP logs
5. **Cache** — Try `npx clear-npx-cache` if tools don't appear

### No tools or prompts

- Re-enable the MCP server in Cursor Settings → Tools & MCP
- Ensure the server shows a green status indicator
- Check that `.cursor/mcp.json` is valid JSON

### Browser MCP not available

The built-in browser MCP may not be available in all Cursor versions. For E2E testing, use Playwright: `bun run test:e2e` (see [E2E.md](./E2E.md)).

---

## See Also

- [shadcn MCP documentation](https://ui.shadcn.com/docs/mcp)
- [Cursor MCP docs](https://docs.cursor.com/context/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [CURSOR.md](./CURSOR.md) — Project Cursor setup (rules, commands, agents)
