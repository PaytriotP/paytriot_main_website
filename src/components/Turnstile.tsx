import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const ts = () => (window as any).turnstile;

// Forms require a token only when the widget is configured.
export const turnstileOn = !!KEY;
export const resetTurnstile = () => ts()?.reset();

// Visible "Verify you are human" box. Usually ticks itself; asks for a click only when Cloudflare is unsure.
// onToken gets the token when solved and '' when it expires or fails, so forms can lock the submit button.
export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const cb = useRef(onToken);
  cb.current = onToken;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!KEY || !ready || !box.current) return;
    const id = ts().render(box.current, {
      sitekey: KEY,
      theme: 'light',
      retry: 'auto',
      'refresh-expired': 'auto',
      callback: (t: string) => {
        setFailed(false);
        cb.current(t);
      },
      'expired-callback': () => cb.current(''),
      'error-callback': () => {
        setFailed(true);
        cb.current('');
        return true; // handled: stops Turnstile throwing an uncaught error (e.g. 300030); it retries itself
      },
    });
    return () => ts()?.remove(id);
  }, [ready]);

  if (!KEY) return null;
  return (
    <div style={{ margin: '16px 0' }}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
      />
      <div ref={box} />
      {failed && (
        <p role="alert" style={{ fontSize: 14, color: '#b42318', marginTop: 8 }}>
          Verification could not complete. Please disable ad-blocking or wallet extensions for this site, or refresh the page.
        </p>
      )}
    </div>
  );
}
