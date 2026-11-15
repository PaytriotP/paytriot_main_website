import { test, expect } from 'bun:test';
import { isName, isPhone, isEmail, isWebsite } from './validate';
import { clean, esc, cell, limited, emailReal, humanOk } from './formGuard';

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
