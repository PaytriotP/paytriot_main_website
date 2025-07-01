// components/BotpressChat.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/chatbot.module.css'; // Assuming you have this CSS module as previously discussed

declare global {
  interface Window {
    Tone: any;
    botpress: {
      init: (config: any) => Promise<void>;
      sendEvent: (event: any) => void;
      onEvent: (callback: (event: any) => void, eventTypes?: string[]) => void;
      open: () => void;
      close: () => void;
      isWebchatOpen: boolean;
      isWebchatReady: boolean;
      _isCustomInitialized?: boolean;
      _hasProactiveActionsRun?: boolean;
      _hasMessageListener?: boolean;
    };
  }
}

const BOT_ID = "cb70fa70-47b7-40bb-9347-843e0a92544a";
const CLIENT_ID = "451136e6-64d4-4f4b-bbaf-5ae20dda4630";
const BOTPRESS_CONTENT_SCRIPT_URL = 'https://files.bpcontent.cloud/2025/05/13/15/20250513151330-Y0FB3XP6.js';
const TONEJS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js';

const BotpressChat: React.FC = () => {
  const { theme } = useTheme();
  const initializedRef = useRef(false);

  const playWelcomeSound = async () => {
    if (typeof window.Tone !== 'undefined') {
      try {
        if (window.Tone.context.state !== 'running') {
          await window.Tone.start();
        }
        const synth = new window.Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "8n");
      } catch (error) {
        console.error('Error playing welcome sound:', error);
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined' || initializedRef.current) {
      return;
    }

    let webchatReadyInterval: NodeJS.Timeout | undefined;
    let initTimeout: NodeJS.Timeout | undefined;

    const loadScript = (id: string, src: string, defer: boolean) => {
      return new Promise<void>((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.defer = defer;
        script.onload = () => {
          setTimeout(resolve, 100);
        };
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };
        document.body.appendChild(script);
      });
    };

    const initializeBotpress = async () => {
      try {
        await Promise.all([
          loadScript('bp-content-script', BOTPRESS_CONTENT_SCRIPT_URL, true),
          loadScript('tonejs-script', TONEJS_SCRIPT_URL, true)
        ]);

        initializedRef.current = true;

        const tryInitBotpress = () => {
          if (typeof window.botpress !== 'undefined' && typeof window.botpress.init === 'function' && !(window.botpress as any)._isCustomInitialized) {
            const initPromise = window.botpress.init({
              "botId": BOT_ID,
              "clientId": CLIENT_ID,
              "selector": "#botpress-chat-container",
              "configuration": {
                "hideWidget": false, // This is the key for auto-opening
                "composerPlaceholder": "Chat with bot",
                "botConversationDescription": "Paytriot Payments Virtual Assistant",
                "botName": "Paytriot Assistant",
                "containerWidth": "350px",
                "containerHeight": "500px",
                "enableConversationSuggestions": false,
                "stylesheet": "",
                "email": {},
                "phone": {},
                "termsOfService": {},
                "privacyPolicy": {},
                "version": "v1",
                "website": {},
                "color": "#f79a20",
                "variant": "soft",
                "headerVariant": "glass",
                "themeMode": "light",
                "fontFamily": "rubik",
                "radius": 4,
                "feedbackEnabled": false,
              }
            });

            if (initPromise && typeof initPromise.then === 'function') {
              initPromise.then(() => {
                (window.botpress as any)._isCustomInitialized = true;
                // Play sound immediately after init if desired for auto-open
                playWelcomeSound();
              }).catch(error => {
                console.error('Error during Botpress init() promise:', error);
                initTimeout = setTimeout(tryInitBotpress, 200);
              });
            } else {
              initTimeout = setTimeout(tryInitBotpress, 200);
            }
          } else if (typeof window.botpress === 'undefined' || typeof window.botpress.init !== 'function') {
            initTimeout = setTimeout(tryInitBotpress, 200);
          }
        };
        tryInitBotpress();

        webchatReadyInterval = setInterval(() => {
          if (typeof window.botpress !== 'undefined' && window.botpress.isWebchatReady) {
            clearInterval(webchatReadyInterval);
            // No proactive event sending here, just auto-open via hideWidget: false
          }
        }, 300);

      } catch (error) {
        console.error('Critical error during script loading or initial setup:', error);
      }
    };

    initializeBotpress();

    return () => {
      if (webchatReadyInterval) clearInterval(webchatReadyInterval);
      if (initTimeout) clearTimeout(initTimeout);

      ['bp-content-script', 'tonejs-script'].forEach(id => { // Only remove dynamically loaded scripts
        const scriptElement = document.getElementById(id);
        if (scriptElement && document.body.contains(scriptElement)) {
          document.body.removeChild(scriptElement);
        }
      });

      if (window.botpress) {
        (window.botpress as any)._isCustomInitialized = false;
        (window.botpress as any)._hasProactiveActionsRun = false;
        (window.botpress as any)._hasMessageListener = false;
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <div id="botpress-chat-container" className={styles.chatContainer}>
      <style jsx global>{`
        #botpress-chat-container iframe {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          z-index: 1000 !important;
        }
        #botpress-chat-container .bpFab {
          display: none !important;
        }
        #botpress-chat-container .bpWebchat {
            position: unset !important;
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            max-width: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default BotpressChat;
