import Image from 'next/image';
import Link from 'next/link';

import imgBgPaytriotAds from 'public/images/bg-paytriots-ads.png';
import logoAppStoreSvg from 'public/images/logo-appstore.svg';
import logoPlayStoreSvg from 'public/images/logo-googleplay.svg';
import iconWhiteCheckSvg from 'public/images/icon-check-white.svg';

export default function CallToAction() {
  return (
    <>
      <section className="call-to-action" id="call-to-action">
        <div className="container overflow-hidden">
          <div className="row">
            <div className="col-lg-6 offset-lg-1 d-flex align-items-center justify-content-center">
              <div className="txt-wrap d-flex flex-column align-items-lg-start align-items-center py-5">
                <h2 className="mb-4 mb-lg-5 text-center text-lg-start">
                  Accept payments with Paytriot
                </h2>
                <div className="label-wrap d-flex flex-column flex-lg-row mb-5">
                  <div className="label-item d-flex align-items-center me-lg-5 mb-3 mb-lg-0">
                    <div className="icon-small me-1">
                      <Image src={iconWhiteCheckSvg} alt="" />
                    </div>
                    <label htmlFor="label-14" className="label-14">
                      Quick Boarding
                    </label>
                  </div>
                  <div className="label-item d-flex align-items-center me-lg-5 mb-3 mb-lg-0">
                    <div className="icon-small me-1">
                      <Image src={iconWhiteCheckSvg} alt="" />
                    </div>
                    <label htmlFor="label-14" className="label-14">
                      UK Support team
                    </label>
                  </div>
                  <div className="label-item d-flex align-items-center">
                    <div className="icon-small me-1">
                      <Image src={iconWhiteCheckSvg} alt="" />
                    </div>
                    <label htmlFor="label-14" className="label-14">
                      Competitive Pricing
                    </label>
                  </div>
                </div>
                <div className="btn-wrap d-flex">
                  <Link
                    href="https://play.google.com/store/apps/details?id=co.uk.paytriot.mob.app&pli=1 "
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary me-3"
                    role="button"
                    data-bs-toggle="button"
                  >
                    <Image src={logoPlayStoreSvg} alt="" className="w-100" />
                  </Link>
                  <Link
                    href="https://apps.apple.com/gb/app/paytriot-wallet/id1458486345"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                    role="button"
                    data-bs-toggle="button"
                  >
                    <Image src={logoAppStoreSvg} alt="" className="w-100" />
                  </Link>
                </div>
              </div>
            </div>
{/*             <div className="col-lg-4 d-flex d-lg-block align-items-start">
              <Image src={imgBgPaytriotAds} alt="" className="" /> */}
             <div className="w-full lg:w-4/12 flex justify-center lg:justify-start relative h-64 md:h-96 mt-8 lg:mt-0">
              <Image
                src={imgBgPaytriotAds}
                alt="Paytriot Ad showing a person holding a phone"
                fill 
                style={{ objectFit: 'contain' }} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
