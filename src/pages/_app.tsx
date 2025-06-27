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
    // Existing Tidio script loading
    const script = document.createElement('script'); // Renamed from tidioScript
    script.src = '//code.tidio.co/g0m4mrkqkfhz3gdcgypmhso3x8tn9zju.js';
    script.async = true;
    document.body.appendChild(script);

    // Botpress Webchat inject.js script
    const botpressInjectScript = document.createElement('script');
    botpressInjectScript.src = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js';
    botpressInjectScript.defer = true;
    document.body.appendChild(botpressInjectScript);

    // Botpress content script (this one initializes the bot on 'window.botpress')
    const botpressContentScript = document.createElement('script');
    botpressContentScript.src = 'https://files.bpcontent.cloud/2025/05/13/15/20250513151330-Y0FB3XP6.js';
    botpressContentScript.defer = true;
    document.body.appendChild(botpressContentScript);

    // Load Tone.js for sound effects
    const toneJsScript = document.createElement('script');
    toneJsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js';
    toneJsScript.defer = true; // Use defer for non-blocking load
    document.body.appendChild(toneJsScript);

    // Function to play a simple sound (e.g., a "ding" sound)
    const playWelcomeSound = async () => {
      // Ensure Tone.js is loaded and audio context is ready
      if (typeof window.Tone !== 'undefined') {
        try {
          // Tone.js requires starting the audio context, which might need a user gesture.
          // We attempt to start it here.
          if (window.Tone.context.state !== 'running') {
            await window.Tone.start();
            console.log('Tone.js AudioContext started.');
          }
          const synth = new window.Tone.Synth().toDestination();
          synth.triggerAttackRelease("C4", "8n"); // Play a C4 note for an 8th note duration
          console.log('Welcome sound played.');
        } catch (error) {
          console.error('Error playing welcome sound:', error);
        }
      } else {
        console.warn('Tone.js not loaded or not ready for sound playback.');
      }
    };

    // Robust function to wait for Botpress to be fully ready
    const waitForBotpressReady = (callback, retries = 50, delay = 200) => {
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

    // Logic for Botpress initialization, auto-open, and sending initial event
    const initBotpressAndOpen = () => {
      // Flag to ensure this proactive setup runs only once per page load
      if (window.botpress && !window.botpress._isCustomizedAndProactiveInit) {
        window.botpress._isCustomizedAndProactiveInit = true;
        console.log('Botpress proactive setup initiated by _app.tsx');

        // This callback runs once onEvent is confirmed to be available
        const performProactiveActions = () => {
          // Once Botpress is ready (connected), open chat, play sound, and send welcome event
          const onWebchatReady = (event) => {
            if (event.type === 'webchat/ready' || event.type === 'webchat/connected') {
              console.log('Botpress Webchat is fully ready. Attempting to auto-open, play sound, and send welcome event.');

              // Only open if the chat is not already open
              if (!window.botpress.isWebchatOpen) {
                window.botpress.open();
              }
              
              playWelcomeSound();

              // Send a custom event to trigger the welcome message in Botpress flow
              window.botpress.sendEvent({
                type: 'proactive_website_load', // Unique custom event type for your flow
                payload: {
                  source: 'website_load_event'
                }
              });

              // Remove this listener to prevent multiple triggers
              window.botpress.offEvent(onWebchatReady);
            }
          };

          // Listen for the webchat ready event
          window.botpress.onEvent(onWebchatReady, ['webchat/ready', 'webchat/connected']);

          // Fallback check: if webchat is already ready by the time this useEffect runs,
          // (e.g., very fast loads, or component re-render without page reload)
          if (window.botpress.isWebchatReady && !window.botpress.isWebchatOpen) {
            console.log('Webchat already ready on initial check. Attempting immediate open and sound.');
            window.botpress.open();
            playWelcomeSound();
            window.botpress.sendEvent({
              type: 'proactive_website_load',
              payload: { source: 'website_load_event_immediate' }
            });
            window.botpress.offEvent(onWebchatReady); // Ensure listener is also removed
          }
        };

        // Start waiting for botpress.onEvent to be available, then perform actions
        waitForBotpressReady(performProactiveActions);

      } else if (window.botpress && window.botpress._isCustomizedAndProactiveInit) {
        console.log('Botpress proactive setup already initiated.');
      } else {
        console.warn('window.botpress is not available even after initial check. Auto-open and sound features might not work.');
      }
    };

    // Initial delay to ensure all script tags are appended and begin loading
    const initialDelayTimeout = setTimeout(() => {
      initBotpressAndOpen();
    }, 500); // Start trying to initialize after 0.5 seconds

    // Cleanup function: remove all dynamically added scripts
    return () => {
      document.body.removeChild(script); // Renamed in cleanup
      document.body.removeChild(botpressInjectScript);
      document.body.removeChild(botpressContentScript);
      document.body.removeChild(toneJsScript);
      clearTimeout(initialDelayTimeout);
      // Event listeners should be managed by their respective `offEvent` calls.
    };
  }, []); // Empty dependency array ensures this runs only once on mount

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
