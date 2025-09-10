// import ContactForm from '@/components/contact-page/ContactForm';
// import { Button } from '@nextui-org/react';
// import Head from 'next/head';
// import Image from 'next/image';

// import iconDirectionSvg from 'public/images/icon-direction.svg';

// export default function ContactUs() {
//   const openGoogleMaps = () => {
//     window.open('https://goo.gl/maps/AeuwB3ftnZ8JWBNn6', '_blank');
//   };
//   return (
//     <>
//       <Head>
//         {/* Required meta tags */}
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="description" content="Paytriot Payments Contact Us"/>

//         <title>Contact Us | Paytriot</title>
//       </Head>
//       <main>
//         <section className="contact">
//           <div className="container">
//             <h1 className="text-center">Contact Us</h1>
//             <p className="p-18 text-center">Get in touch with us</p>
//             <div className="row">
//               <ContactForm />
//               <div className="col-lg-4 d-flex justify-content-center">
//                 <div className="contact-wrap d-flex flex-column align-items-center">
//                   <div className="contact-icon mb-4">
//                     <Image src={iconDirectionSvg} alt="" className="w-100" />
//                   </div>
//                   <h4 className="mb-3 text-center">Address</h4>
//                   <p className="p-14 text-opacity text-center mb-5">
//                     The Charter Building, <br/>
//                     Charter Place, <br/>
//                     Uxbridge, <br/>
//                     UB8 1JG
//                   </p>
//                   <Button
//                     rounded
//                     size="xl"
//                     color="warning"
//                     onClick={openGoogleMaps}
//                   >
//                     View in Maps
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <br />
//       </main>
//     </>
//   );
// }

import ContactForm from '@/components/contact-page/ContactForm';
import Head from 'next/head';
import Image from 'next/image';
import iconDirectionSvg from 'public/images/icon-direction.svg';
import iconSafeSecureSvg from 'public/images/icon-safe-secure.svg';
import iconSupportSvg from 'public/images/icon-support.svg';
import iconWalletSvg from 'public/images/icon-wallet.svg';
import iconRatesSvg from 'public/images/icon-rates.svg';
import styles from '../styles/contact-us.module.css';
import { useEffect } from 'react';

export default function ContactUs() {
  useEffect(() => {
        if (window.innerWidth <= 768) {
      const contactFormElement = document.getElementById('contact-form');
      if (contactFormElement) {
        contactFormElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, []);

  return (
    <>
      <Head>
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Paytriot Payments Contact Us" />

        <title>Contact Us | Paytriot</title>
      </Head>
      <main className={styles.main}>
        {/* Removed Hero Section as per new design */}
        <section className={styles['contact-section']}>
          <div className={styles.container}>
            <div className={styles.subtitle}>Get in touch with us</div>
            <h1 className={styles.title}>
              Powering Payments for Every Business — Talk to a Specialist Today
            </h1>
            <div className={styles.description}>
              Supporting hard-to-place industries with fast setup and expert
              help
            </div>
            <div className={styles.stats}>
              <div className={styles['stat-item']}>
                <div className={styles['stat-value']}>5,000+</div>
                <div className={styles['stat-label']}>Merchants Approved</div>
              </div>
              <div className={styles['stat-item']}>
                <div className={styles['stat-value']}>99.8%</div>
                <div className={styles['stat-label']}>Uptime Guarantee</div>
              </div>
              <div className={styles['stat-item']}>
                <div className={styles['stat-value']}>24-48hrs</div>
                <div className={styles['stat-label']}>Quick Setup</div>
              </div>
              <div className={styles['stat-item']}>
                <div className={styles['stat-value']}>140+</div>
                <div className={styles['stat-label']}>Currencies</div>
              </div>
            </div>
            {/* Trustworthy Headline and Subheadline */}
            <div className={styles['contact-content']}>
              <div className={styles['contact-form-column']}>
                {/* Card-like form wrapper for visual separation */}
                <div className={styles['contact-form-card']} id="contact-form">
                  {/* Best Form Header */}
                  <div className={styles['contact-form-header']}>
                    <div className={styles['contact-form-title']}>
                      Let's Set Up Your Payments — Fast, Simple, Done!
                    </div>
                    <div className={styles['contact-form-subtitle']}>
                      Fill in your details and we'll be in touch within 24 hours
                      to get you fully set up.
                    </div>
                  </div>
                  <ContactForm />
                </div>
                {/* Testimonials Section - moved below the form */}
                <section className={styles['testimonials-section']}>
                  <h2 className={styles['text-center']}>
                    What Our Customers Say
                  </h2>
                  <div className={styles['testimonials-row']}>
                    <div className={styles['testimonial-col']}>
                      <div className={styles['testimonial-stars']}>★★★★★</div>
                      <p className={styles['testimonial-text']}>
                        "Very good company. Easy to deal with and go out of their way to help you quickly."
                      </p>
                      <div className={styles['testimonial-author']}>
                        Peter F
                      </div>
                      <div className={styles['testimonial-role']}>
                        CEO, Gaming Solutions Ltd
                      </div>
                    </div>
                    <div className={styles['testimonial-col']}>
                      <div className={styles['testimonial-stars']}>★★★★★</div>
                      <p className={styles['testimonial-text']}>
                        "Setup was incredibly fast – we were processing payments
                        in 24 hours. Google Pay integration boosted our mobile
                        sales significantly."
                      </p>
                      <div className={styles['testimonial-author']}>
                        Sarah Chen
                      </div>
                      <div className={styles['testimonial-role']}>
                        Founder, EcoStore
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <aside className={styles['aside-column']}>
                <div className={styles['contact-wrap-card']}>
                  <div className={styles['contact-icon']}>
                    <Image src={iconDirectionSvg} alt="" className="w-100" />
                  </div>
                  <h4 className={styles['mb-3']}>Address</h4>
                  <p className={styles['p-14']}>
                    Eagle Court,
                    <br />
                    Vine Street,
                    <br />
                    Uxbridge,
                    <br />
                    UB8 1JG
                  </p>
                  <button
                    className={styles['btn-warning']}
                    onClick={() =>
                      window.open(
                        'https://maps.app.goo.gl/pjvSx1ek4cyFxhze6',
                        '_blank'
                      )
                    }
                  >
                    View in Maps
                  </button>
                </div>
                <div className={styles['contact-info-card']}>
                  <h5 className={styles['mb-2']}>Get in Touch</h5>
                  <div>
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+44(0203)8841611">+44 (0203)884 1611</a>
                  </div>
                  <div>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:info@paytriot.co.uk">info@paytriot.co.uk</a>
                  </div>
                  <div>
                    <strong>Hours:</strong> Mon-Fri 9AM-5PM GMT
                  </div>
                </div>
                <div className={styles['why-choose-paytriot-card']}>
                  <h5 className={styles['mb-2']}>
                    Why Businesses Choose Paytriot
                  </h5>
                  <ul>
                    <li>
                      <div className={styles['why-choose-paytriot-item']}>
                        <div
                          className={styles['why-choose-paytriot-icon-wrapper']}
                        >
                          <Image
                            src={iconSafeSecureSvg}
                            alt="High-Risk Approved Icon"
                            width={24}
                            height={24}
                            className={styles['why-choose-paytriot-icon']}
                          />
                        </div>
                        <div className={styles['why-choose-paytriot-content']}>
                          <strong
                            className={styles['why-choose-paytriot-strong']}
                          >
                            High-Risk Approved
                          </strong>
                          <h4 className={styles['why-choose-paytriot-h4']}>
                            Flexible Underwriting for Complex Business Models
                          </h4>
                          <div
                            className={styles['why-choose-paytriot-details']}
                          >
                            <p className={styles['why-choose-paytriot-p']}>
                              We support a wide range of industries — including
                              those often underserved — with a pragmatic,
                              solution-oriented approach to merchant approval.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles['why-choose-paytriot-item']}>
                        <div
                          className={styles['why-choose-paytriot-icon-wrapper']}
                        >
                          <Image
                            src={iconSupportSvg}
                            alt="UK Support Icon"
                            width={24}
                            height={24}
                            className={styles['why-choose-paytriot-icon']}
                          />
                        </div>
                        <div className={styles['why-choose-paytriot-content']}>
                          <strong
                            className={styles['why-choose-paytriot-strong']}
                          >
                            UK Support
                          </strong>
                          <h4 className={styles['why-choose-paytriot-h4']}>
                            Dedicated UK-Based Support Team
                          </h4>
                          <div
                            className={styles['why-choose-paytriot-details']}
                          >
                            <p className={styles['why-choose-paytriot-p']}>
                              Speak directly with experienced professionals who
                              understand your market and can provide immediate,
                              tailored assistance when you need it most.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles['why-choose-paytriot-item']}>
                        <div
                          className={styles['why-choose-paytriot-icon-wrapper']}
                        >
                          <Image
                            src={iconWalletSvg}
                            alt="Mobile Wallet Integration Icon"
                            width={24}
                            height={24}
                            className={styles['why-choose-paytriot-icon']}
                          />
                        </div>
                        <div className={styles['why-choose-paytriot-content']}>
                          <strong
                            className={styles['why-choose-paytriot-strong']}
                          >
                            Mobile Wallet Integration
                          </strong>
                          <h4 className={styles['why-choose-paytriot-h4']}>
                            Apple Pay & Google Pay Enabled by Default
                          </h4>
                          <div
                            className={styles['why-choose-paytriot-details']}
                          >
                            <p className={styles['why-choose-paytriot-p']}>
                              Offer your customers seamless, modern checkout
                              options with integrated mobile wallet support
                              across all approved accounts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles['why-choose-paytriot-item']}>
                        <div
                          className={styles['why-choose-paytriot-icon-wrapper']}
                        >
                          <Image
                            src={iconRatesSvg}
                            alt="24hr Setup Icon"
                            width={24}
                            height={24}
                            className={styles['why-choose-paytriot-icon']}
                          />
                        </div>
                        <div className={styles['why-choose-paytriot-content']}>
                          <strong
                            className={styles['why-choose-paytriot-strong']}
                          >
                            24hr Setup
                          </strong>
                          <h4 className={styles['why-choose-paytriot-h4']}>
                            Fast, Streamlined Onboarding Within 24 Hours
                          </h4>
                          <div
                            className={styles['why-choose-paytriot-details']}
                          >
                            <p className={styles['why-choose-paytriot-p']}>
                              Get up and running quickly with our efficient
                              onboarding process — designed to minimise delays
                              and help you start accepting payments faster.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

