// Server-only helpers for form API routes (uses node:dns, do not import from components).
import { promises as dns } from 'dns';
import type { NextApiRequest } from 'next';

// Strip control chars; single-line fields also lose newlines (blocks header/subject injection).
export function clean(v: unknown, max = 200, multiline = false): string {
  if (typeof v !== 'string') return '';
  let s = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (!multiline) s = s.replace(/\s+/g, ' ');
  return s.trim().slice(0, max);
}

// HTML-escape anything user-supplied before it goes into an email body.
export const esc = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

// Stop spreadsheet formula injection if a sheet is ever exported/opened in Excel.
export const cell = (v: string) => (/^[=+\-@]/.test(v) ? `'${v}` : v);

// Vercel sets x-real-ip itself; a client-sent x-forwarded-for value could otherwise spoof the IP.
export function clientIp(req: NextApiRequest): string {
  const real = req.headers['x-real-ip'];
  if (typeof real === 'string' && real) return real.trim();
  const xff = req.headers['x-forwarded-for'];
  const first = (Array.isArray(xff) ? xff[0] : xff || '').split(',')[0].trim();
  return first || req.socket.remoteAddress || 'unknown';
}

// Browser posts only come from our own site, as JSON. Browsers always send Origin on POST, so a
// missing one means a script. (Scripts can forge both; this is CSRF hygiene, Turnstile is the bot defence.)
export function sameOrigin(req: NextApiRequest): boolean {
  const origin = req.headers.origin;
  if (!origin || !String(req.headers['content-type']).startsWith('application/json')) return false;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

// ponytail: in-memory per-instance limiter. On serverless each instance has its own map;
// move to Upstash/Redis if bursts get through.
const hits = new Map<string, number[]>();
export function limited(ip: string, max = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

// Cloudflare Turnstile. This is the check that stops scripts posting straight to the API.
// Fails closed in production: if the key ever goes missing, forms stop rather than open up to bots.
export async function humanOk(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY not set: bot check is NOT enforced');
    return process.env.VERCEL_ENV !== 'production';
  }
  if (typeof token !== 'string' || !token) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const out = await r.json();
    // Token must have been solved on our own site, not harvested from another one.
    return !!out.success && /(^|\.)paytriot\.co\.uk$/.test(out.hostname || '');
  } catch {
    return false;
  }
}

const FAKE_DOMAINS = [
  'test.com', 'example.com', 'example.org', 'example.net', 'mailinator.com', 'guerrillamail.com',
  'tempmail.com', '10minutemail.com', 'yopmail.com', 'trashmail.com', 'sharklasers.com',
];

// Reject throwaway domains and domains that cannot receive mail (no MX, no A record).
export async function emailReal(email: string): Promise<boolean> {
  const domain = email.split('@')[1].toLowerCase();
  if (FAKE_DOMAINS.includes(domain)) return false;
  try {
    return (await dns.resolveMx(domain)).length > 0;
  } catch (e: any) {
    if (!['ENOTFOUND', 'ENODATA'].includes(e?.code)) return true; // DNS hiccup: don't lose a real lead
    try {
      return (await dns.resolve4(domain)).length > 0;
    } catch {
      return false;
    }
  }
}

export const linkCount = (s: string) => (s.match(/https?:\/\/|www\./gi) || []).length;

// Known attack payloads: SQL injection timing/union probes, HTML/script injection, template
// injection, path traversal. Real enquiries never contain these, so any hit rejects the whole post.
const ATTACK = [
  /<[a-z!\/?]/i, // any HTML tag: <svg, <script, <!--, </p  ("fees < 2%" still fine)
  /\bon(load|error|focus|blur|click|begin|toggle|start|mouse\w*|key\w*|pointer\w*|animation\w*)\s*=/i,
  /javascript\s*:|vbscript\s*:|data\s*:\s*text\/html/i,
  /\b(sleep|pg_sleep|benchmark)\s*\(|waitfor\s+delay|\bunion\b.{0,20}\bselect\b|information_schema|\bxp_cmdshell\b/i,
  /'\s*(or|and)\s+('|\(|\d+\s*[=<>])|'\s*;|'\s*\|\||'\s*--|'\s*#/i, // x' OR 1=1, x';, x'||, x'--, x'#
  /\$\{|\{\{|<%|\$\(/, // ${...}, {{...}}, <%...%>, $(...)
  /\.\.[\/\\]|%2e%2e|%00|\u0000/i,
];
export const isAttack = (s: string) => ATTACK.some(r => r.test(s));

// Every string anywhere in the posted body, so fields we don't read are checked too.
export function bodyHasAttack(v: unknown, depth = 0): boolean {
  if (typeof v === 'string') return isAttack(v);
  if (depth > 3 || !v || typeof v !== 'object') return false;
  return Object.entries(v).some(([k, x]) => isAttack(k) || bodyHasAttack(x, depth + 1));
}
