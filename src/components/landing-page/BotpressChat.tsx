// components/BotpressChat.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import styles from '../../styles/chatbot.module.css';

declare global {
  interface Window {
    botpress: {
      init: (config: any) => Promise<void>;
      sendEvent: (event: any) => void;
      // CORRECTED: Declaring 'on' method as per user's embed code
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
// Using the inject.js URL from the user's provided embed code
const BOTPRESS_CDN_INJECT_URL = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js'; 

const BotpressChat: React.FC = () => {
  const { theme } = useTheme();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || initializedRef.current) {
      return;
    }

    let checkBotpressObjectInterval: NodeJS.Timeout | undefined;
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
        script.onload = resolve; // Resolve immediately after script loads
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };
        document.body.appendChild(script);
      });
    };

    const setupBotpress = async () => {
      try {
        // 1. Load the Botpress inject script from CDN
        await loadScript('bp-inject-script', BOTPRESS_CDN_INJECT_URL, true);
        
        initializedRef.current = true;

        const hasVisitedBefore = localStorage.getItem(HAS_VISITED_KEY);
        const shouldHideWidget = hasVisitedBefore === 'true';

        // Use a simple poll to wait for window.botpress and its init function to be available.
        // This is a common practice for third-party scripts that load asynchronously.
        checkBotpressObjectInterval = setInterval(() => {
            if (typeof window.botpress !== 'undefined' && typeof window.botpress.init === 'function') {
                clearInterval(checkBotpressObjectInterval);
                console.log("[Botpress] window.botpress object and init function are ready.");

                // 2. Set up the event listener *immediately* after window.botpress is available.
                // This mirrors the user's test.html structure, where 'on' is called early.
                if (!shouldHideWidget) { // Only auto-open for first-time users
                    // Ensure 'on' method is available before calling it, to prevent TypeErrors
                    if (typeof window.botpress.on === 'function') {
                        window.botpress.on("webchat:ready", () => {
                            console.log("[Botpress] 'webchat:ready' event received, attempting to auto-open.");
                            if (window.botpress && !window.botpress.isWebchatOpen) { 
                                window.botpress.open();
                                console.log("[Botpress] Webchat auto-opened!");
                                localStorage.setItem(HAS_VISITED_KEY, 'true'); 
                            }
                        });
                    } else {
                        console.error("[Botpress] Error: window.botpress.on is not a function after loading inject.js. Auto-open functionality might be affected.");
                    }
                }

                // 3. Initialize the Botpress webchat with the provided configuration
                window.botpress.init({
                    "botId": BOT_ID,
                    "clientId": CLIENT_ID, // clientId is a top-level property in user's embed code
                    "selector": "#botpress-chat-container", // Using our existing React container
                    "configuration": {
                        "hideWidget": shouldHideWidget, // Conditional visibility based on user's request
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
                        "footer": "[⚡ by Botpress](https://botpress.com/?from=webchat)" // Added from user's embed code
                    }
                }).then(() => {
                    (window.botpress as any)._isCustomInitialized = true;
                    // For returning users, ensure localStorage flag is set.
                    // For first-time users, it's set after the chat successfully opens via the 'on' listener.
                    if (shouldHideWidget) { 
                        localStorage.setItem(HAS_VISITED_KEY, 'true'); 
                    }
                }).catch(error => {
                    console.error('Error during Botpress init() promise:', error);
                });
            } else {
                // This console log is commented out to reduce noise, but indicates polling is active
                // console.log("[Botpress] Waiting for window.botpress object and init function to be ready...");
            }
        }, 50); // Check every 50ms for Botpress object and its core functions

      } catch (error) {
        console.error('Critical error during script loading or initial setup:', error);
      }
    };

    setupBotpress();

    return () => {
      if (checkBotpressObjectInterval) clearInterval(checkBotpressObjectInterval);

      // Clean up the injected script element when the component unmounts
      ['bp-inject-script'].forEach(id => { 
        const scriptElement = document.getElementById(id);
        if (scriptElement && document.body.contains(scriptElement)) {
          document.body.removeChild(scriptElement);
        }
      });

      // Reset internal flags for potential re-initialization if component remounts
      if (window.botpress) {
        (window.botpress as any)._isCustomInitialized = false;
        (window.botpress as any)._hasProactiveActionsRun = false;
        (window.botpress as any)._hasMessageListener = false;
      }
      initializedRef.current = false;
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Effect to handle theme changes (dark/light mode)
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <div id="botpress-chat-container" className={styles.chatContainer}>
      {/* Global styles for the embedded iframe and hiding the default button */}
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
          display: none !important; /* This hides the default floating chat bubble */
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
