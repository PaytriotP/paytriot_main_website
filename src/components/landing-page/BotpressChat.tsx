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
      config?: { 
        configuration: any; 
      };
    };
  }
}

const BOT_ID = "4f12b3b0-c7fb-4ee3-a215-d6d439e02106";
const CLIENT_ID = "5c80e257-8014-4480-981e-53f9008ace00";
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
                          "composerPlaceholder": "Ask me anything...",
                          "botConversationDescription": "A brief description of your chatbot",
                          "botName": "Paytriot Assistant",
                          "enableConversationSuggestions": false,
                          "stylesheet": "",
                          "email": {
                              "title": "info@paytriot.co.uk",
                              "link": "info@paytriot.co.uk"
                          },
                          "phone": {
                              "title": "+44 (0203) 884 1611",
                              "link": "+44 (0203) 884 1611"
                          },
                          "termsOfService": {
                              "title": "Terms of service",
                              "link": "https://www.paytriot.co.uk/terms-and-conditions"
                          },
                          "privacyPolicy": {
                              "title": "Privacy policy",
                              "link": "https://www.paytriot.co.uk/privacy-policy"
                          },
                          "version": "v1",
                          "website": {},
                          "themeMode": theme === 'dark' ? 'dark' : 'light', 
                          "color": theme === 'dark' ? '#ffa126' : '#ffa126',
                          "variant": "solid",
                          "headerVariant": "glass",
                          "fontFamily": "rubik",
                          "radius": 4,
                          "feedbackEnabled": false,
                          "allowUserFileUpload": false
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
