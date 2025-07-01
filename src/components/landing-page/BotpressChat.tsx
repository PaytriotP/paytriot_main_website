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
    // Removed HAS_VISITED_KEY and related logic for this debugging step

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

        // Force hideWidget to false for debugging
        const shouldHideWidget = false; // TEMPORARY: FOR DEBUGGING

        checkBotpressMethodsInterval = setInterval(() => {
            if (
                typeof window.botpress !== 'undefined' &&
                typeof window.botpress.init === 'function' &&
                typeof window.botpress.on === 'function'
            ) {
                clearInterval(checkBotpressMethodsInterval);
                console.log("[Botpress] All core methods (init, on) are ready. Proceeding with setup.");

                // TEMPORARY: Removed auto-open on 'webchat:ready' to debug base visibility
                // window.botpress.on("webchat:ready", () => { ... });

                // Initialize Botpress with hideWidget: false
                window.botpress.init({
                    "botId": BOT_ID,
                    "clientId": CLIENT_ID, 
                    "selector": "#botpress-chat-container", 
                    "configuration": {
                        "hideWidget": shouldHideWidget, // Will be false
                        "composerPlaceholder": "Chat with bot",
                        "botConversationDescription": "Paytriot Payments Virtual Assistant",
                        "botName": "Paytriot Assistant",
                        "containerWidth": "350px", 
                        "containerHeight": "500px", 
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
                        "footer": "[⚡ by Botpress](https://botpress.com/?from=webchat)" 
                    }
                });

                (window.botpress as any)._isCustomInitialized = true;
                
                // No localStorage update here for HAS_VISITED_KEY as we are debugging auto-open

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
