// components/BotpressChat.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/chatbot.module.css'; // Ensure this CSS isn't hiding anything

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
const BOTPRESS_INJECT_SCRIPT_URL = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js';
const TONEJS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js';


const BotpressChat: React.FC = () => {
  const { theme } = useTheme();
  const initializedRef = useRef(false);

  // ... (playWelcomeSound function) ...

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
          setTimeout(resolve, 100); // Increased timeout slightly here, can help with race conditions
          console.log(`[BotpressChat] Script loaded: ${id}`);
        };
        script.onerror = () => {
          console.error(`[BotpressChat] Failed to load script: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };
        document.body.appendChild(script);
      });
    };

    const initializeBotpressAndProactiveActions = async () => {
      try {
        await loadScript('bp-inject-script', BOTPRESS_INJECT_SCRIPT_URL, true);
        await Promise.all([
          loadScript('bp-content-script', BOTPRESS_CONTENT_SCRIPT_URL, true),
          loadScript('tonejs-script', TONEJS_SCRIPT_URL, true)
        ]);

        console.log('[BotpressChat] All core scripts initiated loading.');
        initializedRef.current = true;

        const tryInitBotpress = () => {
          // Check if botpress and its init function are available
          if (typeof window.botpress !== 'undefined' && typeof window.botpress.init === 'function' && !(window.botpress as any)._isCustomInitialized) {
            console.log('[BotpressChat] Attempting to call window.botpress.init()...');
            const initPromise = window.botpress.init({
              "botId": BOT_ID,
              "clientId": CLIENT_ID,
              "configuration": {
                "composerPlaceholder": "Chat with bot",
                "botConversationDescription": "Paytriot Payments Virtual Assistant",
                "botName": "Paytriot Assistant",
                "containerWidth": "350px",
                "containerHeight": "500px",
                "hideWidget": false,
                "enableConversationSuggestions": false,
                "stylesheet": "",
                "email": {},
                "phone": {},
                "termsOfService": {},
                "privacyPolicy": {}
              }
            });

            // IMPORTANT: Check if initPromise is actually a Promise before calling .then()
            if (initPromise && typeof initPromise.then === 'function') {
              initPromise.then(() => {
                (window.botpress as any)._isCustomInitialized = true;
                console.log('[BotpressChat] Botpress init() successful.');
              }).catch(error => {
                console.error('[BotpressChat] Error during Botpress init() promise:', error);
              });
            } else {
              console.error('[BotpressChat] window.botpress.init() did not return a valid Promise. Retrying...');
              // Retry if init() didn't return a promise, indicating it's not ready or failed internally
              initTimeout = setTimeout(tryInitBotpress, 200);
            }
          } else if (typeof window.botpress === 'undefined' || typeof window.botpress.init !== 'function') {
            console.log('[BotpressChat] window.botpress or init function not yet available. Retrying...');
            initTimeout = setTimeout(tryInitBotpress, 200);
          }
        };
        tryInitBotpress();

        webchatReadyInterval = setInterval(() => {
          if (typeof window.botpress !== 'undefined' && window.botpress.isWebchatReady && typeof window.botpress.onEvent === 'function') {
            clearInterval(webchatReadyInterval);
            console.log('[BotpressChat] Webchat is ready and onEvent is available!');

            const HAS_VISITED_KEY = 'bp_has_visited_session';
            let hasVisited = sessionStorage.getItem(HAS_VISITED_KEY);

            if (!hasVisited) {
                console.log('[BotpressChat] First-time visitor detected for this session.');
                sessionStorage.setItem(HAS_VISITED_KEY, 'true');

                window.botpress.sendEvent({
                    type: 'proactive_website_load',
                    payload: {
                        source: 'website_load_event_from_nextjs_code',
                        message: 'Initial page load'
                    }
                });
                console.log('[BotpressChat] Sent "proactive_website_load" event to Botpress.');

                playWelcomeSound();
            } else {
                console.log('[BotpressChat] Returning visitor for this session. Not sending proactive event.');
            }

            if (!(window.botpress as any)._hasMessageListener) {
              window.botpress.onEvent((event: any) => {
                if (event.type === 'message') {
                  console.log('[BotpressChat] Received message event:', event);
                }
              }, ['message']);
              (window.botpress as any)._hasMessageListener = true;
              console.log('[BotpressChat] Message listener set up.');
            }

          } else {
            // console.log('[BotpressChat] Waiting for webchat to be ready...'); // Keep this commented unless needed for verbose debugging
          }
        }, 300);
      } catch (error) {
        console.error('[BotpressChat] Critical error during script loading or initial setup:', error);
      }
    };

    initializeBotpressAndProactiveActions();

    return () => {
      if (webchatReadyInterval) clearInterval(webchatReadyInterval);
      if (initTimeout) clearTimeout(initTimeout);
      
      ['bp-inject-script', 'bp-content-script', 'tonejs-script'].forEach(id => {
        const scriptElement = document.getElementById(id);
        if (scriptElement && document.body.contains(scriptElement)) {
          document.body.removeChild(scriptElement);
          console.log(`[BotpressChat] Removed script: ${id}`);
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
    <>
    </>
  );
};

export default BotpressChat;
