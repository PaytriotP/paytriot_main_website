import React from 'react';
import LottiePlayer from '@/components/LottiePlayer';
import Image from 'next/image';

import acceptCurrencyJson from 'public/animation/landing-page/currency/accept-currency.json';
import receiveCurrencyJson from 'public/animation/landing-page/currency/receive-currency.json';
import iconCurrencySvg from 'public/images/icon-currency.svg';
import iconWalletSvg from 'public/images/icon-wallet.svg';

export default function GetPaidComponent() {

  const trackConversion = () => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16819203227/ubhlCKfY44oaEJvZgtQ-', // Your conversion ID
        value: 1.0,
        currency: 'GBP', // Your desired currency
      });
    }
  };

  return (
    <>
      <section className="getpaid">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 offset-lg-1 d-flex flex-column align-items-center mb-lg-0 mb-5">
              <div className="label-wrap d-flex align-items-center mb-3">
                <div className="icon-toolkit me-2">
                  <Image src={iconCurrencySvg} alt="" className="" />
                </div>
                <h3 className="text-capitalize mb-0">Accept currency in</h3>
              </div>
              <LottiePlayer animationData={acceptCurrencyJson} />
            </div>
            <div className="col-lg-5 d-flex flex-column align-items-center">
              <div className="label-wrap d-flex align-items-center mb-3">
                <div className="icon-toolkit me-2">
                  <Image src={iconWalletSvg} alt="" className="" />
                </div>
                <h3 className="text-capitalize mb-0">and get paid in</h3>
              </div>
              <LottiePlayer animationData={receiveCurrencyJson} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
