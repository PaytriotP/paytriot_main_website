import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const ts = () => (window as any).turnstile;

// Cloudflare adds a hidden "cf-turnstile-response" input; read it at submit time.
export const turnstileToken = () =>
  document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value || '';
export const resetTurnstile = () => ts()?.reset();

// Renders nothing until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. Invisible unless Cloudflare needs a challenge.
export default function Turnstile() {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!KEY || !ready || !box.current) return;
    const id = ts().render(box.current, { sitekey: KEY, appearance: 'interaction-only' });
    return () => ts()?.remove(id);
  }, [ready]);

  if (!KEY) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
      />
      <div ref={box} />
    </>
  );
}
