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

export function clientIp(req: NextApiRequest): string {
  const xff = req.headers['x-forwarded-for'];
  const first = (Array.isArray(xff) ? xff[0] : xff || '').split(',')[0].trim();
  return first || req.socket.remoteAddress || 'unknown';
}

// Browser posts only come from our own site. (Forgeable by scripts; this is CSRF hygiene, not bot defence.)
export function sameOrigin(req: NextApiRequest): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;
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
// ponytail: fails open only while TURNSTILE_SECRET_KEY is unset, so the site keeps working until keys are added.
export async function humanOk(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY not set: bot check is NOT enforced');
    return true;
  }
  if (typeof token !== 'string' || !token) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    return !!(await r.json()).success;
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
