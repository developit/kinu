// Launcher for the Playwright MCP server (referenced by .mcp.json).
//
// Wraps `npx @playwright/mcp` and resolves `--executable-path` to whatever
// Chromium build Playwright has on this machine. The MCP package bundles its
// own Playwright version, which often expects a newer browser revision than
// the one present in a given environment (e.g. the Claude Code cloud
// container) -- without an explicit path it fails with "Executable doesn't
// exist". Detecting the path here keeps .mcp.json environment-agnostic and
// works on Linux, macOS and Windows.

import {spawn} from 'node:child_process';
import {existsSync, readdirSync} from 'node:fs';
import {homedir} from 'node:os';
import {join} from 'node:path';

const MCP_ARGS = [
  '-y', '@playwright/mcp@latest',
  '--headless', '--no-sandbox', '--isolated',
  '--caps', 'devtools',
];

// Directories Playwright may keep browser builds in.
function browsersRoots() {
  const roots = [];
  const env = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (env && env !== '0') roots.push(env);
  if (process.platform === 'win32') {
    const local = process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local');
    roots.push(join(local, 'ms-playwright'));
  } else if (process.platform === 'darwin') {
    roots.push(join(homedir(), 'Library', 'Caches', 'ms-playwright'));
  } else {
    roots.push(join(homedir(), '.cache', 'ms-playwright'));
  }
  return roots.filter(existsSync);
}

// Path to the chrome executable inside a `chromium-<rev>` build dir, per OS.
function chromeExec(buildDir) {
  const rel = {
    win32: join('chrome-win', 'chrome.exe'),
    darwin: join('chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
    linux: join('chrome-linux', 'chrome'),
  }[process.platform] ?? join('chrome-linux', 'chrome');
  const full = join(buildDir, rel);
  return existsSync(full) ? full : null;
}

// Highest-revision Playwright Chromium installed across all known roots.
function findChromium() {
  let best = null;
  for (const root of browsersRoots()) {
    let entries;
    try { entries = readdirSync(root); } catch { continue; }
    for (const name of entries) {
      const m = /^chromium-(\d+)$/.exec(name);
      if (!m) continue;
      const exec = chromeExec(join(root, name));
      if (!exec) continue;
      const rev = Number(m[1]);
      if (!best || rev > best.rev) best = {rev, path: exec};
    }
  }
  return best;
}

const args = [...MCP_ARGS];
const chromium = findChromium();
if (chromium) {
  args.push('--executable-path', chromium.path);
  console.error(`[playwright-mcp] Chromium r${chromium.rev}: ${chromium.path}`);
} else {
  console.error('[playwright-mcp] no installed Chromium found; letting Playwright MCP resolve its own');
}

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(npx, args, {stdio: 'inherit'});
child.on('error', err => {
  console.error(`[playwright-mcp] failed to start: ${err.message}`);
  process.exit(1);
});
child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => child.kill(sig));
}
