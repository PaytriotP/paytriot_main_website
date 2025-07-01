// components/BotpressChat.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import styles from '../../styles/chatbot.module.css';

declare global {
  interface Window {
    botpress: {
      init: (config: any) => Promise<void>;
      sendEvent: (event: any) => void;
      onEvent: (callback: (event: any) => void, eventTypes?: string[]) => void; // Correct method is onEvent
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

const BotpressChat: React.FC = () => {
  const { theme } = useTheme();
  const initializedRef = useRef(false);

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
        ]);

        initializedRef.current = true;

        const HAS_VISITED_KEY = 'bp_has_visited_site';
        const hasVisitedBefore = localStorage.getItem(HAS_VISITED_KEY);
        const shouldHideWidget = hasVisitedBefore === 'true';

        // --- CORRECTED: Use onEvent instead of on ---
        if (!shouldHideWidget) { // Only attempt to auto-open for first-time users
          window.botpress.onEvent(() => { // Changed from .on to .onEvent
            console.log("[Botpress] Webchat is ready, attempting to auto-open for first-time user.");
            // Check if already open to prevent redundant calls and potential issues
            if (window.botpress && !window.botpress.isWebchatOpen) { 
                window.botpress.open();
                console.log("[Botpress] Webchat auto-opened!");
                // Set the visited flag ONLY after successful auto-opening (expansion)
                localStorage.setItem(HAS_VISITED_KEY, 'true'); 
            }
          }, ["webchat:ready"]); // Specify the event type
        }
        // --- END CORRECTED ---

        const tryInitBotpress = () => {
          if (typeof window.botpress !== 'undefined' && typeof window.botpress.init === 'function' && !(window.botpress as any)._isCustomInitialized) {
            const initPromise = window.botpress.init({
              "botId": BOT_ID,
              "clientId": CLIENT_ID,
              "selector": "#botpress-chat-container",
              "configuration": {
                "hideWidget": shouldHideWidget, 
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
                
                // If it's a returning user, ensure localStorage flag is set (robustness)
                // For first-time users, the flag is now set after window.botpress.open() in onEvent
                if (shouldHideWidget) { 
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

      ['bp-content-script'].forEach(id => {
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
