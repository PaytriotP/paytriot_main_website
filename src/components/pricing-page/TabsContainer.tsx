import { useState } from 'react';

import LottiePlayer from '@/components/LottiePlayer';
import pricingHighRiskJson from 'public/animation/pricing/pricing-high-risk-business.json';
import pricingLargeBusinessJson from 'public/animation/pricing/pricing-large-business.json';

import BusinessRateCalculator from '@/components/pricing-page/BusinessRateCalculator';

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState('smallbusiness');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div>
        <section className="tabs-container">
          <div className="container">
            <ul className="nav justify-content-lg-center">
              <li className="nav-item">
                <a
                  className={`nav-link secondary ${
                    activeTab === 'smallbusiness' ? 'active' : ''
                  }`}
                  id="home-tab"
                  onClick={() => handleTabClick('smallbusiness')}
                >
                  Small Business
                </a>
              </li>
              <li className="nav-item mx-lg-5">
                <a
                  className={`nav-link secondary ${
                    activeTab === 'largebusiness' ? 'active' : ''
                  }`}
                  id="home-tab"
                  onClick={() => handleTabClick('largebusiness')}
                >
                  Large Business
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link secondary ${
                    activeTab === 'highriskbusiness' ? 'active' : ''
                  }`}
                  id="home-tab"
                  onClick={() => handleTabClick('highriskbusiness')}
                >
                  High Risk Business
                </a>
              </li>
            </ul>
            <div className="tab-content" id="tabContent">
              {activeTab === 'smallbusiness' && (
                <div
                  className={`tab-pane fade ${
                    activeTab === 'smallbusiness' ? 'show active' : ''
                  }`}
                  id="smallbusiness"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <BusinessRateCalculator />
                </div>
              )}

              {activeTab === 'largebusiness' && (
  <div
    className={`tab-pane fade ${
      activeTab === 'largebusiness' ? 'show active' : ''
    }`}
    id="largebusiness"
    role="tabpanel"
    aria-labelledby="about-tab"
  >
    <div className="business-tab">
      <div className="row pt-5">
        <div className="col-6 d-flex flex-column justify-content-center txt-wrap">
          <h3 className="text-capitalize fw-bold mb-4">
            If you are a business processing over £100,000 a year,
          </h3>
          <p className="p-16 mb-5">
            get in touch for custom pricing for your business.
            Paytriot’s rates are very competitive and offer
            savings of 40-50% current provider rates
          </p>
          <div className="btn-wrap">
            <a
              href="#"
              className="btn btn-primary"
              role="button"
              data-bs-toggle="button"
            >
              Get In Touch
            </a>
          </div>
        </div>
        <div className="col-6">
          {/* Added the new wrapper div */}
          <div className="lottie-wrapper">
            <LottiePlayer
              animationData={pricingLargeBusinessJson}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)}
{activeTab === 'highriskbusiness' && (
  <div
    className={`tab-pane fade show ${
      activeTab === 'highriskbusiness' ? 'show active' : ''
    }`}
    id="highriskbusiness"
    role="tabpanel"
    aria-labelledby="album-tab"
  >
    <div className="business-tab">
      <div className="row pt-5">
        <div className="col-6 d-flex flex-column justify-content-center txt-wrap">
          <h3 className="text-capitalize fw-bold mb-4">
            If your business falls under high risk,
          </h3>
          <p className="p-16 mb-5">
            you would need a speciality account from Paytriot in
            order to process payments. Paytriot has helped
            thousands of high risk businesses obtain a merchant
            account. Get in touch and our sales team will provide
            the most competitive rates on the market for your
            website.
          </p>
          <div className="btn-wrap">
            <a
              href="#"
              className="btn btn-primary"
              role="button"
              data-bs-toggle="button"
            >
              Get In Touch
            </a>
          </div>
        </div>
        <div className="col-6">
          {/* Added the new wrapper div */}
          <div className="lottie-wrapper">
            <LottiePlayer animationData={pricingHighRiskJson} />
          </div>
        </div>
      </div>
    </div>
  </div>
)}
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TabsContainer;
