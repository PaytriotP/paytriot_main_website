import Head from 'next/head';

import FeatureComponent from '@/components/landing-page/FeatureComponent';
import GetPaidComponent from '@/components/landing-page/GetPaidComponent';
import LandingHero from '@/components/landing-page/LandingHero';
import SuperChargeComponent from '@/components/landing-page/SuperChargeComponent';
import WhatWeDoComponent from '@/components/landing-page/WhatWeDoComponent';
import TrackingScript from '@/helpers/hooks/TrackingScript';

export default function Home() {
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {`
          {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Secure Payment Solutions & Affordable Merchant Services",
          "description": "Discover secure payment solutions and affordable merchant services designed to help your business grow. Fast, reliable, and tailored to your needs.",
          "url": "https://www.paytriot.co.uk",
          "mainEntity": {
          "@type": "WebPage",
          "name": "Paytriot Home Page",
          "description": "The homepage of Paytriot showcasing secure payment solutions and merchant services designed to help your business grow."
          }
          }
          `}
        </script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover secure payment solutions and affordable merchant services designed to help your business grow. Fast, reliable, and tailored to your needs."/>
        

        <title> Secure Payment Solutions & Affordable Merchant Services </title>
        {/* Open Graph (Facebook & LinkedIn) */}
        <meta property="og:title" content="Secure Payment Solutions & Affordable Merchant Services" />
        <meta property="og:description" content="Discover secure payment solutions and affordable merchant services designed to help your business grow. Fast, reliable, and tailored to your needs." />
        <meta property="og:url" content="https://www.paytriot.co.uk/" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card (Twitter Preview) */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Secure Payment Solutions & Affordable Merchant Services" />
        <meta name="twitter:description" content="Discover secure payment solutions and affordable merchant services designed to help your business grow. Fast, reliable, and tailored to your needs." />
      </Head>
      
      <main>
        <LandingHero />
        <WhatWeDoComponent />
        <FeatureComponent />
        <SuperChargeComponent />
        <GetPaidComponent />
      </main>
    </>
  );
}
