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
    const appendGoogleAdsScript = () => {
      const googleAdsScript = document.createElement('script');
      googleAdsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16819203227'; // Google Tag ID
      googleAdsScript.async = true;
      googleAdsScript.id = 'google-ads-script'; // Added an ID for cleanup

      // Append Google Ads script to the head
      document.getElementsByTagName('head')[0].appendChild(googleAdsScript);

      googleAdsScript.onload = () => {
        // Initialize Google Tag
        window.gtag('js', new Date());
        window.gtag('config', 'AW-16819203227'); // Google Tag ID

        // Check if this session has already tracked the footfall visit event
        const hasTrackedFootfall = sessionStorage.getItem('hasTrackedFootfallVisit');

        // If the footfall event hasn't been tracked for this session, track it
        if (!hasTrackedFootfall) {
          window.gtag('event', 'footfall_visit', {
            send_to: 'AW-16819203227',
            event_category: 'Footfall',
            event_label: 'Landing Page Visit',
            value: 1.0,
            currency: 'GBP',  // Currency (adjust if needed)
          });

          // Mark that the footfall event has been tracked for this session
          sessionStorage.setItem('hasTrackedFootfallVisit', 'true');
        }
      };
    };

    // Append Google Ads script to the head
    appendGoogleAdsScript();

    // Clean up the scripts on unmount
    return () => {
      document.getElementsByTagName('head')[0].removeChild(visitorQueueScript);

      const googleAdsScript = document.getElementById('google-ads-script');
      if (googleAdsScript) {
        document.getElementsByTagName('head')[0].removeChild(googleAdsScript);
      }
    };
  }, []);

  return null;
};

export default TrackingScript;
