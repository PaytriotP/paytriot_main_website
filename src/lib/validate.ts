// Shared by browser (UX hints) and API routes (the real check). Keep it pure: no node imports.

const LETTER = /[A-Za-zÀ-ɏͰ-ӿ]/g;

export const isName = (s: string) =>
  /^[^<>]{2,80}$/.test(s) && (s.match(LETTER) || []).length >= 2; // rejects "x", "12", "<b>"

export const isPhone = (s: string) => {
  const digits = s.replace(/\D/g, '').length;
  return /^\+?[0-9\s\-()]{7,25}$/.test(s) && digits >= 7 && digits <= 15; // rejects "+"
};

export const isEmail = (s: string) =>
  s.length <= 254 && /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[A-Za-z]{2,}$/.test(s);

export const isWebsite = (s: string) =>
  s.length <= 200 &&
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s<>"']*)?$/i.test(s);
