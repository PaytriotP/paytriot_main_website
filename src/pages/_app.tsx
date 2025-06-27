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

const BOT_ID = "cb70fa70-47b7-40bb-9347-843e0a92544a";
const CLIENT_ID = "451136e6-64d4-4f4b-bbaf-5ae20dda4630";
const BOTPRESS_CONTENT_SCRIPT_URL = 'https://files.bpcontent.cloud/2025/05/13/15/20250513151330-Y0FB3XP6.js';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = '//code.tidio.co/g0m4mrkqkfhz3gdcgypmhso3x8tn9zju.js'; // IMPORTANT: Verify/Update this URL
    script.async = true;
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.body.appendChild(script);
    }


   
    const botpressInjectScript = document.createElement('script');
    botpressInjectScript.src = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js';
    botpressInjectScript.defer = true;
    if (!document.querySelector(`script[src="${botpressInjectScript.src}"]`)) {
      document.body.appendChild(botpressInjectScript);
    }

    
    const botpressContentScript = document.createElement('script');
    botpressContentScript.src = BOTPRESS_CONTENT_SCRIPT_URL;
    botpressContentScript.defer = true;
    if (!document.querySelector(`script[src="${botpressContentScript.src}"]`)) {
      document.body.appendChild(botpressContentScript);
    }


    
    const toneJsScript = document.createElement('script');
    toneJsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js';
    toneJsScript.defer = true;
    if (!document.querySelector(`script[src="${toneJsScript.src}"]`)) {
      document.body.appendChild(toneJsScript);
    }


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

    
    const performProactiveActions = () => {
      if (window.botpress && !window.botpress._hasProactiveActionsRun) {
        window.botpress._hasProactiveActionsRun = true;
        console.log('Botpress Webchat is fully ready. Attempting to auto-open, play sound, and send welcome event.');

        if (typeof window.botpress.isWebchatOpen === 'boolean' && !window.botpress.isWebchatOpen) {
          window.botpress.open();
        } else {
          console.log('Botpress Webchat is already open or isWebchatOpen status is unavailable.');
        }
        
        playWelcomeSound();

        window.botpress.sendEvent({
          type: 'proactive_website_load',
          payload: {
            source: 'website_load_event'
          }
        });
      } else {
        console.log('Proactive actions already run or window.botpress not available for proactive actions.');
      }
    };

    
    const waitForBotpressOnEventReady = (callback: () => void, retries = 100, delay = 300) => {
      if (typeof window.botpress !== 'undefined' && typeof window.botpress.onEvent === 'function') {
        console.log('window.botpress.onEvent is available.');
        callback();
      } else if (retries > 0) {
        console.log(`Waiting for window.botpress.onEvent... Retries left: ${retries}`);
        setTimeout(() => waitForBotpressOnEventReady(callback, retries - 1, delay), delay);
      } else {
        console.error('Botpress webchat did not become ready (onEvent unavailable) after multiple attempts.');
      }
    };

   
    const initBotpressAndProactiveActions = () => {
      if (typeof window.botpress !== 'undefined') {
        if (!window.botpress._isInitializedCustom) {
          window.botpress.init({
            "botId": BOT_ID,
            "clientId": CLIENT_ID,
            "configuration": {
                "website": {},
                "email": {},
                "phone": {},
                "termsOfService": {},
                "privacyPolicy": {}
            }
          });
          window.botpress._isInitializedCustom = true;
          console.log('Botpress SDK explicitly initialized by _app.tsx');
        } else {
          console.log('Botpress SDK already initialized by custom logic.');
        }

        waitForBotpressOnEventReady(performProactiveActions);

      } else {
        console.warn('window.botpress is not available. Retrying Botpress initialization...');
        setTimeout(initBotpressAndProactiveActions, 500); 
      }
    };

   
    const initialStartTimeout = setTimeout(() => {
      initBotpressAndProactiveActions();
    }, 1000); 

    
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(botpressInjectScript);
      document.body.removeChild(botpressContentScript);
      document.body.removeChild(toneJsScript);
      clearTimeout(initialStartTimeout);
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
