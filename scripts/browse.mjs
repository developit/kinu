#!/usr/bin/env node
// Headless Chromium driver for the cloud container.
//
// Playwright + the chromium browser are pre-installed under
//   /opt/node22/lib/node_modules/playwright
//   /opt/pw-browsers/chromium-1194/chrome-linux/chrome
// so this script needs no per-repo install.
//
// Usage:
//   scripts/browse.mjs screenshot [url] [-o out.png] [--full] [-w W] [-h H]
//   scripts/browse.mjs inspect    [url]                     # JSON: console+errors+title
//   scripts/browse.mjs eval       [url] "<expression>"      # eval JS in page, print JSON
//   scripts/browse.mjs dom        [url] [selector]          # outerHTML (default: body)
//
// `url` defaults to the running dev server (.devserver/port). Relative paths
// like `/foo` are resolved against it.

import {existsSync, mkdirSync, readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, resolve} from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';

// Playwright is installed globally; ESM ignores NODE_PATH so resolve via CJS
// then dynamically import the resolved file.
const req = createRequire(import.meta.url);
const GLOBAL_MODULES = ['/opt/node22/lib/node_modules'];
const playwrightEntry = req.resolve('playwright', {paths: GLOBAL_MODULES});
const playwrightMod = await import(pathToFileURL(playwrightEntry).href);
const {chromium} = playwrightMod.default ?? playwrightMod;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const STATE_DIR = resolve(ROOT, '.devserver');

const CHROME_PATH =
  process.env.CHROME_PATH ||
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

function devServerUrl() {
  const portFile = resolve(STATE_DIR, 'port');
  if (!existsSync(portFile)) return null;
  return `http://127.0.0.1:${readFileSync(portFile, 'utf8').trim()}`;
}

function resolveUrl(arg) {
  const base = devServerUrl();
  if (!arg) {
    if (!base) throw new Error('no URL given and dev server is not running');
    return base;
  }
  if (/^https?:\/\//.test(arg)) return arg;
  if (!base) throw new Error(`relative URL "${arg}" but dev server is not running`);
  return new URL(arg, base).toString();
}

function parseFlags(args, spec) {
  const out = {_: []};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a in spec) {
      out[spec[a]] = spec[a].startsWith('flag:') ? true : args[++i];
    } else if (a.startsWith('--')) {
      const key = a.slice(2);
      out[key] = args[i + 1] && !args[i + 1].startsWith('-') ? args[++i] : true;
    } else {
      out._.push(a);
    }
  }
  return out;
}

async function launchBrowser() {
  return await chromium.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
}

async function newPage(browser) {
  const ctx = await browser.newContext({viewport: {width: 1280, height: 800}});
  const page = await ctx.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  const failures = [];
  page.on('console', m =>
    consoleMessages.push({type: m.type(), text: m.text(), location: m.location()})
  );
  page.on('pageerror', e => pageErrors.push({message: e.message, stack: e.stack}));
  page.on('requestfailed', r =>
    failures.push({url: r.url(), failure: r.failure()?.errorText, method: r.method()})
  );
  return {page, consoleMessages, pageErrors, failures};
}

async function withPage(fn) {
  const browser = await launchBrowser();
  const {page, consoleMessages, pageErrors, failures} = await newPage(browser);
  try {
    return await fn({page, consoleMessages, pageErrors, failures});
  } finally {
    await browser.close().catch(() => {});
  }
}

async function gotoOrFail(page, url) {
  const resp = await page.goto(url, {waitUntil: 'networkidle', timeout: 15000}).catch(e => {
    throw new Error(`navigation to ${url} failed: ${e.message}`);
  });
  return resp;
}

const [, , cmd, ...rest] = process.argv;

async function main() {
  switch (cmd) {
    case 'screenshot': {
      const flags = parseFlags(rest, {'-o': 'out', '-w': 'width', '-h': 'height'});
      const url = resolveUrl(flags._[0]);
      const out = resolve(ROOT, flags.out || '.devserver/screenshot.png');
      mkdirSync(dirname(out), {recursive: true});
      await withPage(async ({page}) => {
        if (flags.width || flags.height)
          await page.setViewportSize({
            width: Number(flags.width) || 1280,
            height: Number(flags.height) || 800,
          });
        await gotoOrFail(page, url);
        await page.screenshot({path: out, fullPage: !!flags.full});
      });
      console.log(out);
      break;
    }
    case 'inspect': {
      const url = resolveUrl(rest[0]);
      const result = await withPage(async ({page, consoleMessages, pageErrors, failures}) => {
        const resp = await gotoOrFail(page, url);
        return {
          url: page.url(),
          title: await page.title(),
          status: resp?.status(),
          console: consoleMessages,
          errors: pageErrors,
          requestFailures: failures,
        };
      });
      console.log(JSON.stringify(result, null, 2));
      break;
    }
    case 'eval': {
      const url = resolveUrl(rest[0]);
      const expr = rest.slice(1).join(' ');
      if (!expr) throw new Error('eval requires an expression');
      const value = await withPage(async ({page}) => {
        await gotoOrFail(page, url);
        return await page.evaluate(`(async()=>{ return (${expr}); })()`);
      });
      console.log(JSON.stringify(value, null, 2));
      break;
    }
    case 'dom': {
      const url = resolveUrl(rest[0]);
      const selector = rest[1] || 'body';
      const html = await withPage(async ({page}) => {
        await gotoOrFail(page, url);
        return await page.$eval(selector, el => el.outerHTML);
      });
      console.log(html);
      break;
    }
    default:
      console.error(
        'usage: browse.mjs <screenshot|inspect|eval|dom> [...]\n' +
        '  see top of script for full help'
      );
      process.exit(2);
  }
}

main().catch(e => {
  console.error(e.stack || e.message || e);
  process.exit(1);
});
