import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/chatbot.module.css';

declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => Promise<void>;
      sendEvent: (event: any) => void;
    };
  }
}

const BotpressChat: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const injectScript = document.createElement('script');
      injectScript.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
      injectScript.defer = true;
      document.body.appendChild(injectScript);

      const configScript = document.createElement('script');
      configScript.src = "https://files.bpcontent.cloud/2025/05/13/15/20250513151330-Y0FB3XP6.js";
      configScript.defer = true;
      document.body.appendChild(configScript);

      injectScript.onload = () => {
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            "botId": "cb70fa70-47b7-40bb-9347-843e0a92544a",
            "host": "https://cdn.botpress.cloud/webchat",
            "clientId": "451136e6-64d4-4f4b-bbaf-5ae20dda4630",
            "stylesheet": "false",
            "headless": true,
            "enableConversationSuggestions": false,
            "buttonIconUrl": "",
            "botName": "Paytriot Assistant",
            "containerWidth": "350px",
            "containerHeight": "500px",
            "hideWidget": true,
          }).then(() => {
            window.botpressWebChat.sendEvent({ type: 'webchat/show' });
            window.botpressWebChat.sendEvent({
              type: 'trigger',
              name: 'user_start_conversation',
              payload: { text: 'hey' }
            });
          });
        }
      };

      return () => {
        if (document.body.contains(injectScript)) {
          document.body.removeChild(injectScript);
        }
        if (document.body.contains(configScript)) {
          document.body.removeChild(configScript);
        }
      };
    }
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
