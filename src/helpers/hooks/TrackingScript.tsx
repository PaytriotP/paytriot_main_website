import React, { useEffect } from 'react';

const TrackingScript: React.FC = () => {
  useEffect(() => {
    // VisitorQueue tracking ID function
    const vqTrackId = (): string => 'e2f1458b-ba3d-4fe0-bfea-6adcf2f59cc2';

    // Create the script element for VisitorQueue tracking
    const visitorQueueScript = document.createElement('script');
    visitorQueueScript.src = `//t.visitorqueue.com/p/tracking.min.js?id=${vqTrackId()}`;
    visitorQueueScript.id = 'vq_tracking';
    visitorQueueScript.async = true;
    visitorQueueScript.setAttribute('data-id', vqTrackId());

    // Append VisitorQueue tracking script to the head
    document.getElementsByTagName('head')[0].appendChild(visitorQueueScript);

    // Google Ads tracking script
    const googleAdsScript = document.createElement('script');
    googleAdsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16819203227'; // Google Tag ID
    googleAdsScript.async = true;

    // Append Google Ads script to the head
    document.getElementsByTagName('head')[0].appendChild(googleAdsScript);

    googleAdsScript.onload = () => {
      // Initialize Google Tag
      window.gtag('js', new Date());
      window.gtag('config', 'AW-16819203227'); // Google Tag ID

      // If you want to send an initial conversion event after the script loads, you can do it here
      // Example: You can trigger the conversion event in your component using window.gtag('event', 'conversion', {...})
    };

    // Clean up the scripts on unmount
    return () => {
      document.getElementsByTagName('head')[0].removeChild(visitorQueueScript);
      document.getElementsByTagName('head')[0].removeChild(googleAdsScript);
    };
  }, []);

  return null;
};

export default TrackingScript;
