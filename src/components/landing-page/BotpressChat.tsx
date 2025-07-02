// components/BotpressChat.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

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
      config?: { // Added 'config' property
        configuration: any; // You can refine this type if you want to be more specific
      };
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
    if (typeof window === 'undefined') {
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
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    const setupBotpress = async () => {
      try {
        await loadScript('bp-inject-script', BOTPRESS_CDN_INJECT_URL, true);
        
        if (!initializedRef.current) {
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

                  if (!shouldHideWidget) { 
                      window.botpress.on("webchat:ready", () => {
                          if (window.botpress && !window.botpress.isWebchatOpen) { 
                              window.botpress.open();
                              localStorage.setItem(HAS_VISITED_KEY, 'true'); 
                          }
                      });
                  }

                  window.botpress.init({
                      "botId": BOT_ID,
                      "clientId": CLIENT_ID, 
                      "configuration": {
                          "hideWidget": shouldHideWidget, 
                          "composerPlaceholder": "Ask me anything...", // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          "botConversationDescription": "A brief description of your chatbot", // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          "botName": "Paytriot Assistant", // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          "enableConversationSuggestions": false,
                          "stylesheet": "",
                          "email": {
                              "title": "info@paytriot.co.uk", // From Screenshot 2025-07-02 at 12.50.02 PM.png
                              "link": "info@paytriot.co.uk" // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          },
                          "phone": {
                              "title": "+44 (0203) 884 1611", // From Screenshot 2025-07-02 at 12.50.02 PM.png
                              "link": "+44 (0203) 884 1611" // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          },
                          "termsOfService": {
                              "title": "Terms of service",
                              "link": "https://www.paytriot.co.uk/terms-and-conditions" // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          },
                          "privacyPolicy": {
                              "title": "Privacy policy",
                              "link": "https://www.paytriot.co.uk/privacy-policy" // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          },
                          "version": "v1",
                          "website": {},
                          "themeMode": theme === 'dark' ? 'dark' : 'light', 
                          "color": theme === 'dark' ? '#f79a20' : '#f79a20',
                          "variant": "soft", // From Screenshot 2025-07-02 at 12.48.54 PM.png
                          "headerVariant": "glass", // From Screenshot 2025-07-02 at 12.48.54 PM.png
                          "fontFamily": "rubik", // From Screenshot 2025-07-02 at 12.48.54 PM.png
                          "radius": 4, // From Screenshot 2025-07-02 at 12.48.54 PM.png
                          "feedbackEnabled": false, // From Screenshot 2025-07-02 at 12.50.02 PM.png (Message feedback: Disabled)
                          "footer": "[⚡ by Botpress](https://botpress.com/?from=webchat)", // From Screenshot 2025-07-02 at 12.50.02 PM.png
                          "allowUserFileUpload": false // From Screenshot 2025-07-02 at 12.50.02 PM.png (Allow user file upload: Disabled)
                      }
                  });

                  (window.botpress as any)._isCustomInitialized = true;
                  
                  if (shouldHideWidget) { 
                      localStorage.setItem(HAS_VISITED_KEY, 'true'); 
                  }

                  if (!shouldHideWidget) {
                      setTimeout(() => {
                          if (window.botpress && !window.botpress.isWebchatOpen) {
                              window.botpress.open();
                          }
                      }, 1000); 
                  }
              }
          }, 50); 
        }

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
  }, [theme]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    if (window.botpress && window.botpress.config && window.botpress.config.configuration) {
        window.botpress.config.configuration.themeMode = theme === 'dark' ? 'dark' : 'light';
    }
  }, [theme]);

  return (
    <>
      <style jsx global>{`
        
      `}</style>
    </>
  );
};

export default BotpressChat;
