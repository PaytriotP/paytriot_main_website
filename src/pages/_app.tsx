import { useEffect } from 'react';
import CallToAction from '@/components/call-to-actions/CallToAction';
import Footer from '@/components/footer/Footer';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import '@/styles/globals.css';
import { Poppins } from '@next/font/google';
import { NextUIProvider } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import 'public/css/style.css';
import TrackingScript from '@/helpers/hooks/TrackingScript';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//code.tidio.co/g0m4mrkqkfhz3gdcgypmhso3x8tn9zju.js';
    script.async = true;
    document.body.appendChild(script);

    const botpressInjectScript = document.createElement('script');
    botpressInjectScript.src = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js';
    botpressInjectScript.defer = true;
    document.body.appendChild(botpressInjectScript);

    const botpressContentScript = document.createElement('script');
    botpressContentScript.src = 'https://files.bpcontent.cloud/2025/05/13/15/20250513151330-Y0FB3XP6.js';
    botpressContentScript.defer = true;
    document.body.appendChild(botpressContentScript);

    const toneJsScript = document.createElement('script');
    toneJsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js';
    toneJsScript.defer = true;
    document.body.appendChild(toneJsScript);

    const playWelcomeSound = async () => {
      if (typeof window.Tone !== 'undefined') {
        try {
          if (window.Tone.context.state !== 'running') {
            await window.Tone.start();
            console.log('Tone.js AudioContext started.');
          }
          const synth = new window.Tone.Synth().toDestination();
          synth.triggerAttackRelease("C4", "8n");
          console.log('Welcome sound played.');
        } catch (error) {
          console.error('Error playing welcome sound:', error);
        }
      } else {
        console.warn('Tone.js not loaded or not ready for sound playback.');
      }
    };

    // Robust function to wait for Botpress to be fully ready
    // Increased retries and delay
    const waitForBotpressReady = (callback: () => void, retries = 100, delay = 300) => { // Increased retries to 100, delay to 300ms (total 30 seconds)
      if (typeof window.botpress !== 'undefined' && typeof window.botpress.onEvent === 'function') {
        console.log('Botpress onEvent is available.');
        callback();
      } else if (retries > 0) {
        console.log(`Waiting for window.botpress.onEvent... Retries left: ${retries}`);
        setTimeout(() => waitForBotpressReady(callback, retries - 1, delay), delay);
      } else {
        console.error('Botpress webchat did not become ready after multiple attempts.');
      }
    };

    const initBotpressAndOpen = () => {
      if (window.botpress && !window.botpress._isCustomizedAndProactiveInit) {
        window.botpress._isCustomizedAndProactiveInit = true;
        console.log('Botpress proactive setup initiated by _app.tsx');

        const performProactiveActions = () => {
          const onWebchatReady = (event: any) => {
            if (event.type === 'webchat/ready' || event.type === 'webchat/connected') {
              console.log('Botpress Webchat is fully ready. Attempting to auto-open, play sound, and send welcome event.');

              if (!window.botpress.isWebchatOpen) {
                window.botpress.open();
              }
              
              playWelcomeSound();

              window.botpress.sendEvent({
                type: 'proactive_website_load',
                payload: {
                  source: 'website_load_event'
                }
              });

              window.botpress.offEvent(onWebchatReady);
            }
          };

          window.botpress.onEvent(onWebchatReady, ['webchat/ready', 'webchat/connected']);

          if (window.botpress.isWebchatReady && !window.botpress.isWebchatOpen) {
            console.log('Webchat already ready on initial check. Attempting immediate open and sound.');
            window.botpress.open();
            playWelcomeSound();
            window.botpress.sendEvent({
              type: 'proactive_website_load',
              payload: { source: 'website_load_event_immediate' }
            });
            window.botpress.offEvent(onWebchatReady);
          }
        };

        waitForBotpressReady(performProactiveActions);

      } else if (window.botpress && window.botpress._isCustomizedAndProactiveInit) {
        console.log('Botpress proactive setup already initiated.');
      } else {
        console.warn('window.botpress is not available even after initial check. Auto-open and sound features might not work.');
      }
    };

    const initialDelayTimeout = setTimeout(() => {
      initBotpressAndOpen();
    }, 500);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(botpressInjectScript);
      document.body.removeChild(botpressContentScript);
      document.body.removeChild(toneJsScript);
      clearTimeout(initialDelayTimeout);
    };
  }, []);

  return (
    <ThemeProvider attribute="data-theme" enableSystem={false}>
      <NextUIProvider>
        <main className={`bg ${poppins.className}`}>
          <GoogleAnalytics gaId="AW-16819203227"/>
          <TrackingScript/>
          <NavigationMenu />
          <Component {...pageProps} />
          <CallToAction />
          <Footer />
        </main>
      </NextUIProvider>
    </ThemeProvider>
  );
}
