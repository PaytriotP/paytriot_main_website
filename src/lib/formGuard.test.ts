import { test, expect } from 'bun:test';
import { isName, isPhone, isEmail, isWebsite } from './validate';
import { clean, esc, cell, limited, emailReal, humanOk } from './formGuard';

test('the spam record that got through is now rejected', async () => {
  expect(isName('x')).toBe(false);
  expect(isPhone('+')).toBe(false);
  expect(isWebsite('')).toBe(false);
  expect(await emailReal('spam@test.com')).toBe(false);
});

test('real data passes', () => {
  expect(isName('John Smith')).toBe(true);
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
