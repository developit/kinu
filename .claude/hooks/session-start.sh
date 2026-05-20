#!/bin/bash
# SessionStart hook: prep the repo for Claude Code on the web.
#
#   1. Install workspace dependencies so `pnpm test` / `pnpm lint` /
#      `pnpm -F demo dev` work in fresh containers.
#   2. Install `mcp-later`, the lazy proxy that wraps the Playwright MCP
#      server in .mcp.json so it only boots when a browser_* tool is
#      actually called.
#   3. Install the Chromium build that the Playwright MCP server expects.
#      Using `@playwright/mcp install-browser` picks the exact revision
#      its bundled Playwright pins, so the browser_* tools resolve a
#      browser with no hard-coded path.
#   4. Warm mcp-later's cache so the very first initialize / tools/list
#      is served from disk instead of booting the real server.
#
# All steps are idempotent. The hook is a no-op outside the cloud
# environment so local sessions are unaffected.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

PW_MCP_ARGS=(npx -y @playwright/mcp@latest \
  --headless --no-sandbox --isolated --caps devtools)

echo "session-start: installing workspace dependencies" >&2
pnpm install >&2

echo "session-start: installing mcp-later proxy" >&2
npm install -g mcp-later >&2

echo "session-start: installing Playwright MCP browser" >&2
npx -y @playwright/mcp@latest install-browser chromium >&2

echo "session-start: warming mcp-later cache" >&2
mcp-later --warmup "${PW_MCP_ARGS[@]}" >&2
