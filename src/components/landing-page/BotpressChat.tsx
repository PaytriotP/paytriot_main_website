// components/BotpressChat.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import styles from '../../styles/chatbot.module.css';

declare global {
  interface Window {
    Tone: any; // Tone.js related, removed from usage but type still here for now
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
// Tone.js script URL can be removed if not needed at all for any future feature
const TONEJS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js'; 

const BotpressChat: React.FC = () => {
  const { theme } = useTheme();
  const initializedRef = useRef(false);

  // Removed playWelcomeSound and its calls

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
          // A small delay to ensure the script is fully parsed/ready, if needed
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
          // Only load Tone.js if you actually plan to use it for *any* sound
          // Otherwise, remove this line to avoid the "AudioContext" warning
          loadScript('tonejs-script', TONEJS_SCRIPT_URL, true) 
        ]);

        initializedRef.current = true;

        // --- Start of User Recognition Logic ---
        const HAS_VISITED_KEY = 'bp_has_visited_site';
        const hasVisitedBefore = localStorage.getItem(HAS_VISITED_KEY);

        // If 'hasVisitedBefore' is 'true', hide the widget. Otherwise, show it.
        const shouldHideWidget = hasVisitedBefore === 'true';
        // --- End of User Recognition Logic ---

        const tryInitBotpress = () => {
          if (typeof window.botpress !== 'undefined' && typeof window.botpress.init === 'function' && !(window.botpress as any)._isCustomInitialized) {
            const initPromise = window.botpress.init({
              "botId": BOT_ID,
              "clientId": CLIENT_ID,
              "selector": "#botpress-chat-container",
              "configuration": {
                "hideWidget": shouldHideWidget, // <-- THIS IS NOW CONDITIONAL
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
                
                // If it's the first visit (and it auto-opened), mark as visited
                if (!shouldHideWidget) {
                    localStorage.setItem(HAS_VISITED_KEY, 'true');
                }
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

      ['bp-content-script', 'tonejs-script'].forEach(id => {
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
      {/* These global styles are crucial for embedding and should remain */}
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
          display: none !important; /* Hides the floating button */
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
