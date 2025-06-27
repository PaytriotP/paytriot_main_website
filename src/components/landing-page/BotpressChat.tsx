import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/chatbot.module.css';

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

const BotpressChat: React.FC = () => {
  const { theme } = useTheme();

  const BOT_ID = "cb70fa70-47b7-40bb-9347-843e0a92544a";
  const CLIENT_ID = "451136e6-64d4-4f4b-bbaf-5ae20dda4630";
  const BOTPRESS_CONTENT_SCRIPT_URL = 'https://files.bpcontent.cloud/2025/05/13/15/20250513151330-Y0FB3XP6.js';


  const playWelcomeSound = async () => {
    if (typeof window.Tone !== 'undefined') {
      try {
        if (window.Tone.context.state !== 'running') {
          await window.Tone.start();
        }
        const synth = new window.Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "8n");
      } catch (error) {
        console.error('[BotpressChat] Error playing welcome sound:', error);
      }
    } else {
      console.warn('[BotpressChat] Tone.js not loaded or not ready for sound playback. Skipping welcome sound.');
    }
  };

  useEffect(() => {
    let webchatReadyInterval: NodeJS.Timeout;
    let initTimeout: NodeJS.Timeout;

    const scriptsToLoad = [
      { id: 'bp-inject-script', src: 'https://cdn.botpress.cloud/webchat/v3.0/inject.js', defer: true },
      { id: 'bp-content-script', src: BOTPRESS_CONTENT_SCRIPT_URL, defer: true },
      { id: 'tonejs-script', src: 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js', defer: true }
    ];

    const loadScript = (scriptObj: { id: string; src: string; defer: boolean }) => {
      return new Promise<void>((resolve, reject) => {
        if (document.getElementById(scriptObj.id)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.id = scriptObj.id;
        script.src = scriptObj.src;
        script.defer = scriptObj.defer;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error(`Failed to load script: ${scriptObj.src}`));
        };
        document.body.appendChild(script);
      });
    };

    const initializeBotpressAndProactiveActions = async () => {
      try {
        await Promise.all(scriptsToLoad.map(loadScript));

        if (typeof window.botpress !== 'undefined' && typeof window.botpress.init === 'function' && !(window.botpress as any)._isCustomInitialized) {
            await window.botpress.init({
                "botId": BOT_ID,
                "clientId": CLIENT_ID,
                "configuration": {
                    "composerPlaceholder": "Chat with bot",
                    "botConversationDescription": "Paytriot Payments Virtual Assistant",
                    "botName": "Paytriot Assistant",
                    "containerWidth": "350px",
                    "containerHeight": "500px",
                    "hideWidget": true,
                    "enableConversationSuggestions": false,
                    "stylesheet": "",
                    "email": {},
                    "phone": {},
                    "termsOfService": {},
                    "privacyPolicy": {}
                }
            });
            (window.botpress as any)._isCustomInitialized = true;
        } else if (typeof window.botpress !== 'undefined' && (window.botpress as any)._isCustomInitialized) {
        } else {
            initTimeout = setTimeout(initializeBotpressAndProactiveActions, 200);
            return;
        }

        webchatReadyInterval = setInterval(() => {
          if (typeof window.botpress !== 'undefined' && window.botpress.isWebchatReady && typeof window.botpress.onEvent === 'function') {
            clearInterval(webchatReadyInterval);

            if (!(window.botpress as any)._hasProactiveActionsRun) {
              (window.botpress as any)._hasProactiveActionsRun = true;

              if (!window.botpress.isWebchatOpen) {
                window.botpress.open();
              }
              
              playWelcomeSound();

              window.botpress.sendEvent({
                type: 'proactive_website_load',
                payload: { source: 'website_load_event_from_cdn_ui' }
              });
            } else {
            }

            if (!(window.botpress as any)._hasMessageListener) {
              window.botpress.onEvent((event: any) => {
                if (event.type === 'message') {
                }
              }, ['message']);
              (window.botpress as any)._hasMessageListener = true;
            }

          } else {
          }
        }, 300);
      } catch (error) {
        console.error('[BotpressChat] Critical error during script loading or initial Botpress setup:', error);
      }
    };

    initializeBotpressAndProactiveActions();

    return () => {
      if (webchatReadyInterval) clearInterval(webchatReadyInterval);
      if (initTimeout) clearTimeout(initTimeout);
      
      scriptsToLoad.forEach(scriptObj => {
        const scriptElement = document.getElementById(scriptObj.id);
        if (scriptElement && document.body.contains(scriptElement)) {
          document.body.removeChild(scriptElement);
        }
      });

      if (window.botpress) {
        (window.botpress as any)._isCustomInitialized = false;
        (window.botpress as any)._hasProactiveActionsRun = false;
        (window.botpress as any)._hasMessageListener = false;
      }
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
