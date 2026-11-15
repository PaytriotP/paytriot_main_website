// Shared by browser (UX hints) and API routes (the real check). Keep it pure: no node imports.

// Keyboard-mash / placeholder words people type into required fields.
const JUNK = /^(test|testing|tester|asdf|asdfg|asdfgh|qwe|qwer|qwerty|zxcv|abc|abcd|abcde|dummy|fake|sample|name|none|null|na|spam|random|xyz|aaa|bbb)$/i;
const junkWord = (s: string) => s.split(/[\s._\-+]+/).some(w => JUNK.test(w));

const LETTER = /[A-Za-zÀ-ɏͰ-ӿ]/g;

export const isName = (s: string) =>
  /^[^<>]{2,80}$/.test(s) &&
  (s.match(LETTER) || []).length >= 2 &&
  !/^(.)\1+$/i.test(s.replace(/[\s.\-']/g, '')) &&
  !junkWord(s) &&
  !s.split(/\s+/).some(w => w.length >= 4 && !/[aeiouy]/i.test(w)); // rejects "x", "xx", "asdf", "test", "kjhgfd", "12", "<b>"

export const isPhone = (s: string) => {
  const digits = s.replace(/\D/g, '').length;
  return (
    /^\+?[0-9\s\-()]{7,25}$/.test(s) &&
    digits >= 7 &&
    digits <= 15 &&
    !/(\d)\1{6,}/.test(s.replace(/\D/g, '')) // rejects "+448888888888"
  );
};

export const isEmail = (s: string) =>
  s.length <= 254 &&
  !junkWord(s.split('@')[0]) &&
  /^[^\s@<>"',;]+@[^\s@<>"',;.]{2,}(\.[^\s@<>"',;]+)*\.[A-Za-z]{2,}$/.test(s); // 1-letter domain ("x@x.com") rejected

// Placeholder / sample sites people type to get past a required field.
const FAKE_SITE = /^(www\.)?(test|example|domain|website|yoursite|yourwebsite|mysite|mywebsite|abc|xyz|asdf)\.[a-z.]{2,}$/i;

export const isWebsite = (s: string) =>
  s.length <= 200 &&
  !FAKE_SITE.test(s.replace(/^https?:\/\//i, '').split('/')[0]) &&
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s<>"']*)?$/i.test(s);
