import React, { useEffect } from 'react';

const TrackingScript: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inject VisitorQueue tracking script
    const vqTrackId = 'e2f1458b-ba3d-4fe0-bfea-6adcf2f59cc2';
    if (!document.getElementById('vq_tracking')) {
      const visitorQueueScript = document.createElement('script');
      visitorQueueScript.src = `//t.visitorqueue.com/p/tracking.min.js?id=${vqTrackId}`;
      visitorQueueScript.id = 'vq_tracking';
      visitorQueueScript.async = true;
      visitorQueueScript.setAttribute('data-id', vqTrackId);
      document.head.appendChild(visitorQueueScript);
    }

    // Inject Google Ads gtag script only once
    if (!document.getElementById('google-ads-script')) {
      const googleAdsScript = document.createElement('script');
      googleAdsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16819203227';
      googleAdsScript.async = true;
      googleAdsScript.id = 'google-ads-script';
      document.head.appendChild(googleAdsScript);

      googleAdsScript.onload = () => {
         // Ensure dataLayer exists before pushing to it
        if (!window.dataLayer) {
          window.dataLayer = [];
        }

        // Define gtag function
        function gtag(...args: any[]) {
          (window.dataLayer as any[]).push(args);
        }
        // Attach gtag to window object
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', 'AW-16819203227');

        // Track footfall visit once per session
        if (!sessionStorage.getItem('hasTrackedFootfallVisit')) {
          gtag('event', 'footfall_visit', {
            send_to: 'AW-16819203227',
            event_category: 'Footfall',
            event_label: 'Landing Page Visit',
            value: 1.0,
            currency: 'GBP',
          });
          sessionStorage.setItem('hasTrackedFootfallVisit', 'true');
        }
      };
    }
  }, []);

  return null;
};

export default TrackingScript;
