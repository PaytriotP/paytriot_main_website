import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import React, { useState, useEffect } from "react";

import iconArrowDownSvg from 'public/images/icon-arrow-down.svg';
import imgAboutHero from 'public/images/img-about-hero.png';
import imgCustomer1 from 'public/images/img-customer-1.png';
import imgCustomer2 from 'public/images/img-customer-2.png';
import imgCustomer3 from 'public/images/img-customer-3.png';

import imgAboutWedo from 'public/images/img-about-wedo.png';
import imgRatingSvg from 'public/images/img-rating.svg';

export default function AboutUs() {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [buttonName, setButtonName] = useState("Button");


  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      //console.log(position);
      setScrollPosition(position);
      if (position > 1200 &&  position < 1325) {
        setButtonName("2015");
      } else if (position >= 1300 && position < 1519){
        setButtonName("2016")
      } else if (position >= 1519 && position < 1705){
        setButtonName("2017")
      } else if (position >= 1705 && position < 1886){
        setButtonName("2018")
      } else if (position >= 1886 && position < 2082){
        setButtonName("2019")
      } else if (position >= 2082 && position < 2283){
        setButtonName("2022")
      }else {
        setButtonName("Paytriot");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);


  return (
    <>
      <Head>
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Paytriot Payments About Us"/>

        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
        />
        <title>About Us | Paytriot</title>
      </Head>
      <section className="hero" id="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 ps-lg-5 d-flex flex-column justify-content-center align-items-start">
              <h1 className="mb-lg-5">Who Are We</h1>
              <p className="p-18 mb-lg-5">
                Paytriot Payment has been established for 10 years helping online businesses accept payments. 
                We are now revolutionising the payment industry by charging a monthly flat fee for smaller businesses allowing them to accept Credit and Debit Cards without taking a percentage of their profits allowing them to scale. 
              </p>
              <Link
                href="#"
                className="p-18 meet-us"
                role="button"
                data-bs-toggle="button"
              >
                Meet Us <Image src={iconArrowDownSvg} alt="" className="ms-4" />
              </Link>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <Image
                src={imgAboutHero}
                alt=""
                className="about-hero-no-padding w-100"
              />
            </div>
          </div>
        </div>
      </section>
{/*       <section className="our-story" id="our-story">
        <div className="container">
          <h2 className="text-center">Our Story</h2>
          <div className="story-wrapper position-relative">
            <div className="yearbtn position-sticky">{buttonName}</div>
            <div className="row">
              <div className="col-lg-6" />
              <div className="col-lg-6 border-lineL position-relative">
                <div className="story-box">
                  <p className="p-18">
                    Paytriot establish a business ready to assist online businesses to accept card payments at a competitive rate.
                  </p>
                </div>
                <div className="story-bullet-outer position-absolute top-50">
                  <div className="story-bullet" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="story-box dekstop">
                  <p className="p-18">

                  </p>
                  <p className="p-18">
                    Paytriot establishes a Payment Gateway allowing merchants to use a Paytriot branded payment form on their websites to accept payments securely. 
                  </p>
                </div>
              </div>
              <div className="col-lg-6 border-lineL position-relative">
                <div className="story-box mobile">
                  <p className="p-18">
                  </p>
                  <p className="p-18">
                    Paytriot establishes a Payment Gateway allowing merchants to use a Paytriot branded payment form on their websites to accept payments securely. 
                  </p>
                </div>
                <div className="story-bullet-outer position-absolute top-50">
                  <div className="story-bullet" />
                </div>
              </div>
              <div className="col-lg-6" />
              <div className="col-lg-6 border-lineL position-relative">
                <div className="story-box">
                  <p className="p-18">
                  </p>
                  <p className="p-18">
                    Paytriot moves its head office to Uxbridge, London with staff for our developers, customer service and sales team.
                  </p>
                </div>
                <div className="story-bullet-outer position-absolute top-50">
                  <div className="story-bullet" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="story-box dekstop">
                  <p className="p-18">
                  </p>
                  <p className="p-18">
                  Paytriot becomes PCI DSS Level 1 Compliant , the highest level of compliance achievable in the  payments market.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 border-lineL position-relative">
                <div className="story-box mobile">
                  <p className="p-18">
                  </p>
                  <p className="p-18">
                  Paytriot becomes PCI DSS Level 1 Compliant , the highest level of compliance achievable in the  payments market.
                  </p>
                </div>
                <div className="story-bullet-outer position-absolute top-50">
                  <div className="story-bullet" />
                </div>
              </div>
              <div className="col-lg-6" />
              <div className="col-lg-6 border-lineL position-relative">
                <div className="story-box">
                  <p className="p-18">
                  </p>
                  <p className="p-18">
                  Paytriot registers with Visa and MasterCard. Bringing all our services in-house including boarding of merchants, underwriting and card issuing. 
                  </p>
                </div>
                <div className="story-bullet-outer position-absolute top-50">
                  <div className="story-bullet" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="story-box dekstop">
                  <p className="p-18">
                  </p>
                  <p className="p-18">
                    Paytriot introduces a subscription based service for smaller businesses. Charging a monthly fee only without the need for merchants to pay a % and one off fees per transaction.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 border-lineL position-relative">
                <div className="story-box mobile">
                  <p className="p-18">

                  </p>
                  <p className="p-18">
                    Paytriot introduces a subscription based service for smaller businesses. Charging a monthly fee only without the need for merchants to pay a % and one off fees per transaction.
                  </p>
                </div>
                <div className="story-bullet-outer position-absolute top-50">
                  <div className="story-bullet" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="customer-say" id="customer-say">
        <div className="container">
          <h2 className="text-center">What Our Customers Say?</h2>
          <div className="row">
            <div className="col-4">
              <div className="testi-wrap d-flex flex-column align-items-center">
                <Image src={imgCustomer2} alt="" className="cust-prof" />
                <h4 className="mt-4">Bilal Latif</h4>
                <h5 className="fst-italic">Finance Director</h5>
                <div className="rating-wrap d-flex my-4">
                  <Image src={imgRatingSvg} alt="" />
                </div>
                <p className="p-16 text-opacity">
                  “A very cost effective solution that simplified our booking system. We can now accept cards from more countries and settle in different currencies. Would recommend Paytriot Payments to any business.”
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="testi-wrap d-flex flex-column align-items-center">
                <Image src={imgCustomer1} alt="" className="cust-prof" />
                <h4 className="mt-4">Wendy Young</h4>
                <h5 className="fst-italic">Director / Hilton</h5>
                <div className="rating-wrap d-flex my-4">
                  <Image src={imgRatingSvg} alt="" />
                </div>
                <p className="p-16 text-opacity">
                  “Paytriot Payments compared rates from multiple acquirers, their gateway is very user friendly and offered us the best solution after a very consultative approach.”
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="testi-wrap d-flex flex-column align-items-center">
                <Image src={imgCustomer3} alt="" className="cust-prof" />
                <h4 className="mt-4">Eugene Andrews</h4>
                <h5 className="fst-italic">Manager / Hampton by Hilton</h5>
                <div className="rating-wrap d-flex my-4">
                  <Image src={imgRatingSvg} alt="" />
                </div>
                <p className="p-16 text-opacity">
                  “Paytriot Payments has integrated a perfect solution for our booking system. The changeover was simple and was extremely impressed with the service.”
                </p>
              </div>
            </div>
          </div> */}
      <section className="customer-say" id="customer-say">
  <div className="container">
    <h2 className="text-center">What Our Customers Say?</h2>
    {/* Added testi-mobile-carousel class */}
    <div className="row testi-mobile-carousel">
      <div className="col-12 col-md-4">
        <div className="testi-wrap d-flex flex-column align-items-center">
          <Image src={imgCustomer2} alt="" className="cust-prof" />
          <h4 className="mt-4">Bilal Latif</h4>
          <h5 className="fst-italic">Finance Director</h5>
          <div className="rating-wrap d-flex my-4">
            <Image src={imgRatingSvg} alt="" />
          </div>
          <p className="p-16 text-opacity">
            “A very cost effective solution that simplified our booking system. We can now accept cards from more countries and settle in different currencies. Would recommend Paytriot Payments to any business.”
          </p>
        </div>
      </div>
      
      <div className="col-12 col-md-4">
        <div className="testi-wrap d-flex flex-column align-items-center">
          <Image src={imgCustomer1} alt="" className="cust-prof" />
          <h4 className="mt-4">Wendy Young</h4>
          <h5 className="fst-italic">Director / Hilton</h5>
          <div className="rating-wrap d-flex my-4">
            <Image src={imgRatingSvg} alt="" />
          </div>
          <p className="p-16 text-opacity">
            “Paytriot Payments compared rates from multiple acquirers, their gateway is very user friendly and offered us the best solution after a very consultative approach.”
          </p>
        </div>
      </div>
      
      <div className="col-12 col-md-4">
        <div className="testi-wrap d-flex flex-column align-items-center">
          <Image src={imgCustomer3} alt="" className="cust-prof" />
          <h4 className="mt-4">Eugene Andrews</h4>
          <h5 className="fst-italic">Manager / Hampton by Hilton</h5>
          <div className="rating-wrap d-flex my-4">
            <Image src={imgRatingSvg} alt="" />
          </div>
          <p className="p-16 text-opacity">
            “Paytriot Payments has integrated a perfect solution for our booking system. The changeover was simple and was extremely impressed with the service.”
          </p>
        </div>
      </div>
    </div>
          {/* Slider main container */}
          {/* <div className="swiper swipercust">
            {/* Additional required wrapper */}
          {/* <div className="swiper-wrapper"> */}
          {/* Slides */}
          {/* <div className="swiper-slide">
                <div className="testi-wrap d-flex flex-column align-items-center">
                  <Image src={imgCustomer1} alt="" className="cust-prof" />
                  <h4 className="mt-4">Jessica Hun</h4>
                  <h5 className="fst-italic">Marketing Manager</h5>
                  <div className="rating-wrap d-flex my-4">
                    <Image src={imgRatingSvg} alt="" />
                  </div>
                  <p className="p-16 text-opacity text-center">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras tempus libero vitae vehicula suscipit.”
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testi-wrap d-flex flex-column align-items-center">
                  <Image src={imgCustomer2} alt="" className="cust-prof" />
                  <h4 className="mt-4">August Malik</h4>
                  <h5 className="fst-italic">Photographer</h5>
                  <div className="rating-wrap d-flex my-4">
                    <Image src={imgRatingSvg} alt="" />
                  </div>
                  <p className="p-16 text-opacity text-center">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras tempus libero vitae vehicula suscipit.”
                  </p>
                </div>
              </div> */}
          {/* <div className="swiper-slide">
                <div className="testi-wrap d-flex flex-column align-items-center">
                  <Image src={imgCustomer3} alt="" className="cust-prof" />
                  <h4 className="mt-4">Bernedetta Carol</h4>
                  <h5 className="fst-italic">Co-Founder</h5>
                  <div className="rating-wrap d-flex my-4">
                    <Image src={imgRatingSvg} alt="" />
                  </div>
                  <p className="p-16 text-opacity text-center">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras tempus libero vitae vehicula suscipit.”
                  </p>
                </div>
              </div> */}
          {/* Slides */}
          {/* <div className="swiper-slide">
                <div className="testi-wrap d-flex flex-column align-items-center">
                  <Image src={imgCustomer1} alt="" className="cust-prof" />
                  <h4 className="mt-4">Jessica Hun</h4>
                  <h5 className="fst-italic">Marketing Manager</h5>
                  <div className="rating-wrap d-flex my-4">
                    <Image src={imgRatingSvg} alt="" />
                  </div>
                  <p className="p-16 text-opacity text-center">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras tempus libero vitae vehicula suscipit.”
                  </p>
                </div>
              </div> */}
          {/* <div className="swiper-slide">
                <div className="testi-wrap d-flex flex-column align-items-center">
                  <Image src={imgCustomer2} alt="" className="cust-prof" />
                  <h4 className="mt-4">August Malik</h4>
                  <h5 className="fst-italic">Photographer</h5>
                  <div className="rating-wrap d-flex my-4">
                    <Image src={imgRatingSvg} alt="" />
                  </div>
                  <p className="p-16 text-opacity text-center">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras tempus libero vitae vehicula suscipit.”
                  </p>
                </div>
              </div> */}
          {/* <div className="swiper-slide">
                <div className="testi-wrap d-flex flex-column align-items-center">
                  <Image src={imgCustomer3} alt="" className="cust-prof" />
                  <h4 className="mt-4">Bernedetta Carol</h4>
                  <h5 className="fst-italic">Co-Founder</h5>
                  <div className="rating-wrap d-flex my-4">
                    <Image src={imgRatingSvg} alt="" />
                  </div>
                  <p className="p-16 text-opacity text-center">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras tempus libero vitae vehicula suscipit.”
                  </p>
                </div>
              </div> */}
          {/* </div> */}
          {/* If we need pagination */}
          {/* <div className="swiper-pagination" /> */}
          {/* If we need navigation buttons */}
          {/* <div class="swiper-button-prev"></div> */}
          {/* <div class="swiper-button-next"></div> */}
          {/* If we need scrollbar */}
          {/* <div class="swiper-scrollbar"></div> */}
          {/* </div> */}
        </div>
      </section>
      <section className="wedo-about" id="wedo-about">
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            <div className="col-lg-6 ">
              <Image src={imgAboutWedo} alt="" className="w-100" />
            </div>
            <div className="col-lg-5 offset-lg-1 d-flex flex-column justify-content-center mb-5 mb-lg-0">
              <div className="wedo-wrap">
                <h2 className="mb-5">What We Do</h2>
                <p className="p-18 mb-5">
                  Payriot Payments has many years experience in all aspects of
                  the International and online financial world. This allows us
                  to offer the best solution, one which is tailored to the exact
                  requirements of your business.
                </p>
                <Link
                  href="wallet"
                  className="btn btn-primary"
                  role="button"
                  data-bs-toggle="button"
                >
                  Paytriot Wallet{' '}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
