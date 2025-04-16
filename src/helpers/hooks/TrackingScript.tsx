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

    // DO NOT inject Google Ads script here if using <GoogleAnalytics /> in _app.tsx
    // Just wait for gtag to be available and fire the event

    const trackFootfall = () => {
      if (
        typeof window.gtag === 'function' &&
        !sessionStorage.getItem('hasTrackedFootfallVisit')
      ) {
        window.gtag('event', 'footfall_visit', {
          send_to: 'AW-16819203227',
          event_category: 'Footfall',
          event_label: 'Landing Page Visit',
          value: 1.0,
          currency: 'GBP',
        });
        sessionStorage.setItem('hasTrackedFootfallVisit', 'true');
      }
    };

    const interval = setInterval(() => {
      if (typeof window.gtag === 'function') {
        trackFootfall();
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default TrackingScript;
