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

"use client"

import ContactForm from "@/components/contact-page/ContactForm"
import { Button } from "@nextui-org/react"
import Head from "next/head"
import Image from "next/image"

import iconDirectionSvg from "public/images/icon-direction.svg"

export default function ContactUs() {
  const openGoogleMaps = () => {
    window.open("https://goo.gl/maps/AeuwB3ftnZ8JWBNn6", "_blank")
  }

  return (
    <>
      <Head>
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Paytriot Payments Contact Us" />
        <title>Contact Us | Paytriot</title>
        {/* Font Awesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <main>
        <section className="contact py-5">
          <div className="container">
            {/* Header - Removed Paytriot logo */}
            <div className="text-center mb-5">
              <h1 className="text-center display-4 fw-bold mb-3">Contact Us</h1>
              <p className="p-18 text-center fs-5 text-muted mb-3">Get in touch with us</p>
              <div className="d-flex align-items-center justify-content-center">
                <i className="fas fa-clock me-2" style={{ color: "#E67E22" }}></i>
                <span className="fw-semibold" style={{ color: "#E67E22" }}>
                  We'll get back to you within 24 hours
                </span>
              </div>
            </div>

            <div className="row g-4">
              {/* Contact Form */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-lg h-100">
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <h2 className="card-title fs-3 fw-bold mb-2">Send us a message</h2>
                      <p className="text-muted">Fill out the form below and our team will respond promptly</p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded-3 bg-light">
                          <i className="fas fa-clock fs-5 mb-2" style={{ color: "#E67E22" }}></i>
                          <p className="small fw-semibold mb-1">24hr Response</p>
                          <p className="text-muted small mb-0">Guaranteed reply</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded-3 bg-light">
                          <i className="fas fa-shield-alt fs-5 mb-2" style={{ color: "#E67E22" }}></i>
                          <p className="small fw-semibold mb-1">Secure & Private</p>
                          <p className="text-muted small mb-0">Your data is safe</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded-3 bg-light">
                          <i className="fas fa-users fs-5 mb-2" style={{ color: "#E67E22" }}></i>
                          <p className="small fw-semibold mb-1">Expert Team</p>
                          <p className="text-muted small mb-0">Payment specialists</p>
                        </div>
                      </div>
                    </div>

                    <ContactForm />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="col-lg-4 d-flex justify-content-center">
                <div className="w-100">
                  {/* Address Card */}
                  <div className="card border-0 shadow-lg mb-4">
                    <div className="card-body text-center p-4">
                      <div className="contact-wrap d-flex flex-column align-items-center">
                        <div className="contact-icon mb-4 p-3 rounded-3 shadow-sm bg-white">
                          <Image
                            src={iconDirectionSvg || "/placeholder.svg"}
                            alt=""
                            className="w-100"
                            style={{ maxWidth: "60px" }}
                          />
                        </div>
                        <h4 className="mb-3 text-center fw-bold">Address</h4>
                        <p className="p-14 text-opacity text-center mb-4 lh-lg text-muted">
                          The Charter Building, <br />
                          Charter Place, <br />
                          Uxbridge, <br />
                          UB8 1JG
                        </p>
                        <Button
                          rounded
                          size="xl"
                          color="warning"
                          onClick={openGoogleMaps}
                          className="shadow-sm"
                          style={{
                            background: "linear-gradient(135deg, #E67E22, #F39C12)",
                            border: "none",
                          }}
                        >
                          <i className="fas fa-map-marker-alt me-2"></i>
                          View in Maps
                        </Button>
                      </div>

                      {/* Additional Contact Methods */}
                      <div className="mt-4 pt-4 border-top">
                        <div className="d-flex align-items-center mb-3">
                          <div
                            className="rounded-3 d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "rgba(230, 126, 34, 0.1)",
                            }}
                          >
                            <i className="fas fa-envelope" style={{ color: "#E67E22" }}></i>
                          </div>
                          <div className="text-start">
                            <p className="fw-semibold mb-0 small">Email Us</p>
                            <p className="text-muted mb-0 small">info@paytriot.co.uk</p>
                          </div>
                        </div>

                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-3 d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "rgba(230, 126, 34, 0.1)",
                            }}
                          >
                            <i className="fas fa-phone" style={{ color: "#E67E22" }}></i>
                          </div>
                          <div className="text-start">
                            <p className="fw-semibold mb-0 small">Call Us</p>
                            <p className="text-muted mb-0 small">+44 (0) 20 1234 5678</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div
                    className="card border-0 shadow-lg text-white"
                    style={{
                      background: "linear-gradient(135deg, #E67E22, #F39C12)",
                    }}
                  >
                    <div className="card-body text-center p-4">
                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <i className="fas fa-star fs-4"></i>
                      </div>
                      <h5 className="fw-bold mb-2">Trusted by 10,000+ Businesses</h5>
                      <p className="small mb-3" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                        Join thousands of satisfied customers who trust Paytriot for their payment processing needs.
                      </p>
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="me-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="fas fa-star text-warning"></i>
                          ))}
                        </div>
                        <span className="small fw-semibold">4.9/5 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
      </main>
    </>
  )
}
