#!/bin/bash
# SessionStart hook: prep the repo for Claude Code on the web.
#
#   1. Install workspace dependencies so `pnpm test` / `pnpm lint` /
#      `pnpm -F demo dev` work in fresh containers.
#   2. Install the Chromium build that the Playwright MCP server (see
#      .mcp.json) expects. Using `@playwright/mcp install-browser` picks
#      the exact revision its bundled Playwright pins, so the MCP's
#      browser_* tools resolve a browser with no hard-coded path.
#
# Both steps are idempotent. The hook is a no-op outside the cloud
# environment so local sessions are unaffected.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

echo "session-start: installing workspace dependencies" >&2
pnpm install >&2

echo "session-start: installing Playwright MCP browser" >&2
npx -y @playwright/mcp@latest install-browser chromium >&2
