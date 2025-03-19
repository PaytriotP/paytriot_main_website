import LottiePlayer from '@/components/LottiePlayer';

import paytriotWalletJson from 'public/animation/landing-page/paytriot-wallet/paytriot-wallet.json';
import paytriotAPIJson from 'public/animation/landing-page/paytriot-api/paytriot-api.json';
import logoAppStoreSvg from 'public/images/logo-appstore.svg';
import logoPlayStoreSvg from 'public/images/logo-googleplay.svg';
import paytriotDashboardJson from 'public/animation/landing-page/paytriot-dashboard/paytriot-dashboard.json';
import Link from 'next/link';
import Image from 'next/image';

export default function FeatureComponent() {
  return (
    <>
      <section className="feature">
        <div className="container">
          <div className="row position-sticky top-0">
            <div className="col-lg-5 d-flex align-items-center mb-lg-0 mb-5">
              <div className="txt-wrap d-flex flex-column align-items-center align-items-lg-start">
                <h2 className="mb-4 text-center text-lg-start">
                  Paytriot Wallet
                </h2>
                <p className="p-18 mb-5 text-center text-lg-start">
                  Paytriot has their own dedicated wallet solution. Sign up to a
                  Paytriot wallet account to securely use your email and
                  password to pay at websites that accept Paytriot Payments.
                </p>
                <div className="btn-wrap d-flex">
                  <Link
                    href="https://play.google.com/store/apps/details?id=co.uk.paytriot.mob.app&pli=1 "
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary store me-3"
                    role="button"
                    data-bs-toggle="button"
                  >
                    <Image src={logoPlayStoreSvg} alt="Download Paytriot Wallet for High-Risk Payment Processing - Google Play Store" className="w-100" />
                  </Link>
                  <Link
                    href="https://apps.apple.com/gb/app/paytriot-wallet/id1458486345"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary store"
                    role="button"
                    data-bs-toggle="button"
                  >
                    <Image src={logoAppStoreSvg} alt="Secure High-Risk Merchant Payments with Paytriot Wallet - Apple App Store" className="w-100" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex justify-content-center justify-content-lg-end">
              <LottiePlayer
                animationData={paytriotWalletJson}
                style={{ maxWidth: '50%', height: 'auto' }}
              />
            </div>
          </div>
          <div className="row position-sticky top-0">
            <div className="col-lg-5 d-flex align-items-center mb-lg-0 mb-5">
              <div className="txt-wrap">
                <h2 className="mb-lg-4 text-center text-lg-start">
                  Paytriot API
                </h2>
                <p className="p-18 mb-lg-5 text-center text-lg-start">
                  Paytriot has their own dedicated wallet solution. Sign up to a
                  Paytriot wallet account to securely use your email and
                  password to pay at websites that accept Paytriot Payments.
                </p>
                <div className="btn-wrap d-flex d-lg-block justify-content-center">
                  <Link
                    href="#"
                    className="btn btn-primary"
                    role="button"
                    data-bs-toggle="button"
                  >
                    Check Documentation
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex d-lg-block justify-content-center justify-content-lg-end">
              {/* @TODO Use CSS API code instead */}

              <LottiePlayer animationData={paytriotAPIJson} />
            </div>
          </div>
          <div className="row position-sticky top-0">
            <div className="col-lg-5 d-flex align-items-center mb-lg-0 mb-5">
              <div className="txt-wrap">
                <h2 className="mb-lg-4 text-center text-lg-start">
                  Paytriot Dashboard
                </h2>
                <p className="p-18 mb-lg-5 text-center text-lg-start">
                View all your transactions on Paytriot’s state of the art dashboard. Add your bank details and verify your business to start processing LIVE transactions. 
                </p>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex d-lg-block justify-content-center justify-content-lg-end">
              <LottiePlayer animationData={paytriotDashboardJson} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
