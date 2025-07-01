import dynamic from 'next/dynamic';
// import LottiePlayer from '@/components/LottiePlayer';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

import easyMoneyJson from 'public/animation/bank-account/easy-money-transfer/easymoney.json';
import oneAccountMultipleAccessJson from 'public/animation/bank-account/one-account-multiple-access/bank.json';
import paytriotDashboardJson from 'public/animation/landing-page/paytriot-dashboard/paytriot-dashboard.json';
import servicesDashboardJson from 'public/animation/services/service-dashboard.json';

import iconAcceptanceSvg from 'public/images/icon-acceptance.svg';
import iconCurrencySvg from 'public/images/icon-currency.svg';
import iconRatesSvg from 'public/images/icon-rates.svg';
import iconWalletSvg from 'public/images/icon-wallet.svg';

const DynamicLottiePlayer = dynamic(
  () => import('@/components/LottiePlayer'), 
  { ssr: false }
);

export default function BankAccount() {
  return (
    <>
      <Head>
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Paytriot Payments Bank Account"/>

        <title>E-Money Account | Paytriot</title>
      </Head>
      <main>
{/*         <section className="banking">
          <div className="container">
            <h1 className="text-center mb-4">
              New Age E-Money Account for You
            </h1>
            <p className="p-18 text-center mb-5">
              A Simple &amp; Powerful E-Money Account is Here
            </p>
            <LottiePlayer animationData={servicesDashboardJson} />
          </div>
        </section> */}
        <section className="banking">
          <div className="container">
            <h1 className="text-center mb-4">New Age E-Money Account for You</h1>
            <p className="p-18 text-center mb-5">
              A Simple &amp; Powerful E-Money Account is Here
            </p>
            <DynamicLottiePlayer animationData={servicesDashboardJson} />
          </div>
        </section>
        
        <section className="account">
          <div className="container">
            <h2 className="text-center">
              One Account with Many <br />
              Benefits
            </h2>
            <div className="row">
              <div className="col-lg-3">
                <div className="acc-wrap d-flex flex-column align-items-center justify-content-between">
                  <Image src={iconWalletSvg} alt="" className="w-100" />
                  <p className="p-16 text-center mt-4">
                    Zero-Balance E-Money Account. No Average monthly balance
                    charges
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="acc-wrap d-flex flex-column align-items-center justify-content-between">
                  <Image src={iconCurrencySvg} alt="" className="w-100" />
                  <p className="p-16 text-center mt-4">
                    Free transactions to All E-Money accounts
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="acc-wrap d-flex flex-column align-items-center justify-content-between">
                  <Image src={iconRatesSvg} alt="" className="w-100" />
                  <p className="p-16 text-center mt-4">
                    Easy bulk transfers anytime anywhere
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="acc-wrap d-flex flex-column align-items-center justify-content-between">
                  <Image src={iconAcceptanceSvg} alt="" className="w-100" />
                  <p className="p-16 text-center mt-4">
                    Reconcile payments easily &amp; download statements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
{/*         <section className="companion">
          <div className="container">
            <h2 className="text-center">Your New Business Companion</h2>
            <div className="row">
              <div className="col-lg-6">
                <LottiePlayer animationData={easyMoneyJson} />
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center">
                <div className="txt-wrap">
                  <h2>Easy money transfers in seconds</h2>
                  <p className="p-18 mt-4">
                    Transfer funds from your E-Money Account with speed. We support Faster Payments, SEPA and SWIFT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="txt-wrap">
                  <h2>One Account, Multiple Access</h2>
                  <p className="p-18 mt-4">
                    Setup your E-Money Account with multiple currencies and access it online or via your app on iOS or Android..
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <LottiePlayer animationData={oneAccountMultipleAccessJson} />
              </div>
            </div>
          </div>
        </section> */}
          <section className="companion">
          <div className="container">
            <h2 className="text-center">Your New Business Companion</h2>
            <div className="row">
              <div className="col-lg-6">
                <DynamicLottiePlayer animationData={easyMoneyJson} />
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center">
                <div className="txt-wrap">
                  <h2>Easy money transfers in seconds</h2>
                  <p className="p-18 mt-4">
                    Transfer funds from your E-Money Account with speed. We support
                    Faster Payments, SEPA and SWIFT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="txt-wrap">
                  <h2>One Account, Multiple Access</h2>
                  <p className="p-18 mt-4">
                    Setup your E-Money Account with multiple currencies and access
                    it online or via your app on iOS or Android..
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <DynamicLottiePlayer animationData={oneAccountMultipleAccessJson} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
        integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
        crossOrigin="anonymous"
      />
    </>
  );
}
