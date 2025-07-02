// components/BotpressChat.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import styles from '../../styles/chatbot.module.css';

declare global {
  interface Window {
    botpress: {
      init: (config: any) => void; 
      sendEvent: (event: any) => void;
      on: (eventName: string, callback: (...args: any[]) => void) => void; 
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
const BOTPRESS_CDN_INJECT_URL = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js'; 

const BotpressChat: React.FC = () => {
  const { theme } = useTheme();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || initializedRef.current) {
      return;
    }

    let checkBotpressMethodsInterval: NodeJS.Timeout | undefined; 
    const HAS_VISITED_KEY = 'bp_has_visited_site'; 

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
        script.onload = () => resolve(); 
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };
        document.body.appendChild(script);
      });
    };

    const setupBotpress = async () => {
      try {
        await loadScript('bp-inject-script', BOTPRESS_CDN_INJECT_URL, true);
        
        initializedRef.current = true;

        const hasVisitedBefore = localStorage.getItem(HAS_VISITED_KEY);
        const shouldHideWidget = hasVisitedBefore === 'true'; 

        checkBotpressMethodsInterval = setInterval(() => {
            if (
                typeof window.botpress !== 'undefined' &&
                typeof window.botpress.init === 'function' &&
                typeof window.botpress.on === 'function' 
            ) {
                clearInterval(checkBotpressMethodsInterval);
                console.log("[Botpress] All core methods (init, on) are ready. Proceeding with setup.");

                if (!shouldHideWidget) { 
                    window.botpress.on("webchat:ready", () => {
                        console.log("[Botpress] 'webchat:ready' event received, attempting to auto-open for first-time user.");
                        if (window.botpress && !window.botpress.isWebchatOpen) { 
                            window.botpress.open();
                            console.log("[Botpress] Webchat auto-opened!");
                            localStorage.setItem(HAS_VISITED_KEY, 'true'); 
                        }
                    });
                } else {
                    console.log("[Botpress] User has visited before, chat will remain hidden. To test auto-open, clear localStorage.");
                }


                window.botpress.init({
                    "botId": BOT_ID,
                    "clientId": CLIENT_ID, 
                    // REMOVED: "selector": "#botpress-chat-container", 
                    "configuration": {
                        "hideWidget": shouldHideWidget, 
                        "composerPlaceholder": "Chat with bot",
                        "botConversationDescription": "Paytriot Payments Virtual Assistant",
                        "botName": "Paytriot Assistant",
                        // REMOVED containerWidth/Height as they are for selector mode
                        // "containerWidth": "350px", 
                        // "containerHeight": "500px", 
                        "enableConversationSuggestions": false,
                        "stylesheet": "",
                        "email": {
                            "title": "info@paytriot.co.uk",
                            "link": "info@paytriot.co.uk"
                        },
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

                (window.botpress as any)._isCustomInitialized = true;
                
                if (shouldHideWidget) { 
                    localStorage.setItem(HAS_VISITED_KEY, 'true'); 
                }

                // Keep this setTimeout for now, as the 'webchat:ready' timing is still a bit off
                // We'll remove it once 'webchat:ready' consistently auto-opens.
                if (!shouldHideWidget) {
                    setTimeout(() => {
                        if (window.botpress && !window.botpress.isWebchatOpen) {
                            console.log("[Botpress] Attempting to force-open webchat after 1 second (debug fallback).");
                            window.botpress.open();
                        }
                    }, 1000); 
                }

            } else {
                // console.log("[Botpress] Waiting for Botpress core methods (init, on) to be ready...");
            }
        }, 50); 

      } catch (error) {
        console.error('Critical error during script loading or initial setup:', error);
      }
    };

    setupBotpress();

    return () => {
      if (checkBotpressMethodsInterval) clearInterval(checkBotpressMethodsInterval);

      ['bp-inject-script'].forEach(id => { 
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
    // REMOVED the div itself as Botpress will inject into body
    // We only need the global styles now
    <>
      <style jsx global>{`
        /* Remove specific #botpress-chat-container rules as it's no longer the parent */
        /* #botpress-chat-container iframe { ... } */
        /* #botpress-chat-container .bpWebchat { ... } */

        /* Keep the rule to hide the FAB if you want it initially hidden, otherwise remove it */
        /* For standard FAB behavior, remove this rule entirely */
        .bpFab { /* This class is applied directly to the floating bubble */
          /* display: none !important; */ /* Uncomment this if you want to hide the FAB */
        }
      `}</style>
    </>
  );
};

export default BotpressChat;
