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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover secure payment solutions and affordable merchant services designed to help your business grow. Fast, reliable, and tailored to your needs."/>
        

        <title> Secure Payment Solutions & Affordable Merchant Services </title>
      </Head>
      
       <TrackingScript />
      
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
