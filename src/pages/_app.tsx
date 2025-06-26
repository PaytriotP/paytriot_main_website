import { useEffect } from 'react';
import CallToAction from '@/components/call-to-actions/CallToAction';
import Footer from '@/components/footer/Footer';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import '@/styles/globals.css';
import { Poppins } from '@next/font/google';
import { NextUIProvider } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import 'public/css/style.css';
import TrackingScript from '@/helpers/hooks/TrackingScript';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//code.tidio.co/g0m4mrkqkfhz3gdcgypmhso3x8tn9zju.js'; 
    script.async = true;
    document.body.appendChild(script);

    const botpressInjectScript = document.createElement('script');
    botpressInjectScript.src = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js';
    botpressInjectScript.defer = true; // Use defer for non-blocking load
    document.body.appendChild(botpressInjectScript);

    const botpressContentScript = document.createElement('script');
    botpressContentScript.src = 'https://files.bpcontent.cloud/2025/05/13/15/20250513151330-Y0FB3XP6.js';
    botpressContentScript.defer = true; // Use defer for non-blocking load
    document.body.appendChild(botpressContentScript);

    const toneJsScript = document.createElement('script');
    toneJsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js';
    toneJsScript.defer = true; // Use defer for non-blocking load
    document.body.appendChild(toneJsScript);

    return () => {
      document.body.removeChild(botpressInjectScript);
      document.body.removeChild(botpressContentScript);
      document.body.removeChild(toneJsScript);
    };
  }, []);
  return (
    <ThemeProvider attribute="data-theme" enableSystem={false}>
      <NextUIProvider>
        <main className={`bg ${poppins.className}`}>
          <GoogleAnalytics gaId="AW-16819203227"/>
          <TrackingScript/>
          <NavigationMenu />
          <Component {...pageProps} />
          <CallToAction />
          <Footer />
        </main>
      </NextUIProvider>
    </ThemeProvider>
  );
}
