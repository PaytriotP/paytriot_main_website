import { test, expect } from 'bun:test';
import { isName, isPhone, isEmail, isWebsite } from './validate';
import { clean, esc, cell, limited, emailReal, humanOk, isAttack, bodyHasAttack, sameOrigin } from './formGuard';

test('the spam record that got through is now rejected', async () => {
  expect(isName('x')).toBe(false);
  expect(isPhone('+')).toBe(false);
  expect(isWebsite('')).toBe(false);
  expect(await emailReal('spam@test.com')).toBe(false);
});

test('well-formed but obviously fake data is rejected', () => {
  expect(isName('xx')).toBe(false);
  expect(isPhone('+448888888888')).toBe(false);
  expect(isEmail('x@x.com')).toBe(false);
  expect(isWebsite('www.test.com')).toBe(false);
  expect(isWebsite('https://yourwebsite.com/')).toBe(false);
  expect(isName('asdfgh')).toBe(false);
  expect(isName('test user')).toBe(false);
  expect(isName('kjhgfd')).toBe(false);
  expect(isEmail('asdf@gmail.com')).toBe(false);
  expect(isEmail('test@gmail.com')).toBe(false);
});

test('real data passes', () => {
  expect(isName('John Smith')).toBe(true);
  expect(isName('Mary-Ann O\'Neil')).toBe(true);
  expect(isName('Lynn Smyth')).toBe(true);
  expect(isName('Ng Wei')).toBe(true);
  expect(isEmail('john.smith@gmail.com')).toBe(true);
  expect(isPhone('+44 (0)20 1234 5678')).toBe(true);
  expect(isEmail('a.b@paytriot.co.uk')).toBe(true);
  expect(isWebsite('https://www.paytriot.co.uk/x')).toBe(true);
});

test('injection payloads are neutralised', () => {
  expect(isName('<script>alert(1)</script>')).toBe(false);
  expect(isEmail('a@b.com\nBcc: x@y.com')).toBe(false);
  expect(clean('Hi\r\nBcc: evil@x.com')).toBe('Hi Bcc: evil@x.com');
  expect(esc('<img src=x onerror=alert(1)>')).not.toContain('<');
  expect(cell('=HYPERLINK("http://x")')).toStartWith("'=");
});

test('rate limit trips after 5, bot check fails closed once keyed', async () => {
  for (let i = 0; i < 5; i++) expect(limited('1.1.1.1')).toBe(false);
  expect(limited('1.1.1.1')).toBe(true);
  process.env.TURNSTILE_SECRET_KEY = 'x';
  expect(await humanOk('', '1.1.1.1')).toBe(false);
  delete process.env.TURNSTILE_SECRET_KEY;
});

test('contact form SQL injection probes are rejected', () => {
  for (const n of [
    "QA';WAITFOR DELAY '0:0:5'--", "QA'", "QA' AND '1'='1", "QA' AND SLEEP(5)-- -", "QA'||pg_sleep(5)||'", 'QA',
  ]) expect(isName(n)).toBe(false);
  expect(isPhone('440000000000')).toBe(false);
  expect(isEmail("QA'")).toBe(false);
  expect(isName("Mary-Ann O'Neil")).toBe(true);
});

test('22 Nov 2026 scanner rows (sqlmap, SSRF callback, XSS) are rejected', () => {
  expect(isName("x' AND SLEEP(5)#")).toBe(false);
  expect(isName("x' AND (SELECT SLEEP(5))-- -")).toBe(false);
  expect(isName('ptx7"><svg onload=alert(1)>')).toBe(false);
  expect(isName('QA Probe')).toBe(false);
  expect(isWebsite('http://103.145.60.218:18088/i13650c1795387273')).toBe(false);
  expect(isEmail('not-an-email')).toBe(false);
  expect(isPhone('1')).toBe(false);
});

test('attack payloads in any field are caught', () => {
  for (const s of [
    "x' AND SLEEP(5)-- -", "x' AND (SELECT SLEEP(5))-- -", "x' AND SLEEP(5)#", "x'||pg_sleep(5)||'",
    "x';SELECT pg_sleep(5)-- -", "x';WAITFOR DELAY '0:0:5'--", "x' AND 1=1-- -", "' OR '1'='1",
    '1 UNION ALL SELECT password FROM users', 'ptx7"><svg onload=alert(1)>', '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>', 'javascript:alert(1)', '${7*7}', '{{7*7}}', '../../etc/passwd', 'a%00b',
  ]) expect(isAttack(s)).toBe(true);
  expect(bodyHasAttack({ type: 'quote', ecommercePlatform: ['Shopify', '<svg/onload=1>'] })).toBe(true);
  expect(bodyHasAttack({ '<x': 'y' })).toBe(true);
});

test('real enquiries are not flagged', () => {
  for (const s of [
    "Mary-Ann O'Neil", "We're a UK retailer; turnover < 2m a year", 'Fees < 3% please', "Smiths' and 2 others",
    'We sell online & in-store (approx. 500 orders/month) -- need card + Apple Pay', 'Onboarding: what do I need?',
    'https://www.shop.co.uk/products?id=5&ref=home', 'Our dev said: use $ amounts, e.g. $100', 'john.smith@gmail.com',
    'Need to sleep on it, call me Monday', 'Q&A: 1) setup 2) fees',
  ]) expect(isAttack(s)).toBe(false);
});

test('API only accepts same-site JSON posts', () => {
  const req = (h: Record<string, string>) => ({ headers: { host: 'www.paytriot.co.uk', ...h } }) as any;
  expect(sameOrigin(req({ origin: 'https://www.paytriot.co.uk', 'content-type': 'application/json' }))).toBe(true);
  expect(sameOrigin(req({ 'content-type': 'application/json' }))).toBe(false); // script, no Origin
  expect(sameOrigin(req({ origin: 'https://evil.com', 'content-type': 'application/json' }))).toBe(false);
  expect(sameOrigin(req({ origin: 'https://www.paytriot.co.uk', 'content-type': 'application/x-www-form-urlencoded' }))).toBe(false);
});
