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

        if (!document.getElementById('hotjar_tracking')) {
      const hjScript = document.createElement('script');
      hjScript.innerHTML = `
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6413372,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      hjScript.id = 'hotjar_tracking';
      document.head.appendChild(hjScript);
    }

    // DO NOT inject Google Ads script here if using <GoogleAnalytics /> in _app.tsx
    // Just wait for gtag to be available and fire the event

    const trackFootfall = () => {
      if (
        typeof window.gtag === 'function' &&
        !sessionStorage.getItem('hasTrackedFootfallVisit')
      ) {
        window.gtag('event', 'page_view', {
          send_to: 'AW-16819203227/ubhlCKfY44oaEJvZgtQ-',
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
