import LottiePlayer from '@/components/LottiePlayer';
import useScrollPosition from '@/helpers/hooks/useScrollPosition';
import { Collapse, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';
import Script from 'next/script';
import walletHeaderSvgJson from 'public/animation/wallet/wallet-header.json';
import iconDebitCardSvg from 'public/images/icon-debit-card.svg';
import iconExchangeSvg from 'public/images/icon-exchange.svg';
import iconTopUpSvg from 'public/images/icon-topup.svg';
import iconWalletSvg from 'public/images/icon-wallet.svg';
import { useEffect, useState } from 'react';

import Head from 'next/head';

export default function WalletPage() {
  const [accordionOpen, setAccordionOpen] = useState([
    true,
    false,
    false,
    false
  ]);
  const scrollPosition = useScrollPosition();
  // Calculate the vertical scrolling breakpoints

  // Update the state of `accordionOpen` based on the user's scroll position
  useEffect(() => {
    //console.log(window.innerHeight)
    const breakpoints =
      typeof window !== 'undefined'
        ? [
            window.innerHeight * 0.12,
            window.innerHeight * 0.27,
            window.innerHeight * 0.33,
            window.innerHeight * 0.43
          ]
        : [];
    const handleScroll = () => {
      const currentScrollPosition = scrollPosition;
      breakpoints.forEach((breakpoint, index) => {
        if (currentScrollPosition >= breakpoint) {
          toggleAccordion(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const toggleAccordion = (index: number) => {
    setAccordionOpen(prevState => {
      const newState = prevState.map((isOpen, i) => i === index);
      return newState;
    });
  };

  return (
    <>
      <Head>
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Explore Paytriot Payments' secure wallet solutions. Accept digital wallet payments easily and safely."/>

        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
        />
        <title>Wallet | Paytriot Payments</title>
      </Head>
    
      <section className="wallet">
        <div className="container accordion-body-container">
          <div className="row">
            <h1 className="text-capitalize mb-5 Typography_heading__h1__0c7YX">Paytriot Wallet</h1>
            <div className="col-lg-5 accordion">
              <Grid.Container gap={2}>
                <Grid>
                  <Collapse.Group splitted>
                    <Collapse
                      className="accordian-nextui-custom"
                      expanded={accordionOpen[0]}
                      title={
                        <div className="accordian-custom-title">
                          <Image src={iconWalletSvg} alt="" />
                          <h3 className="p-18 ms-3">Accept Paytriot Wallet</h3>
                        </div>
                      }
                    >
                    <Text>
                      Add the Paytriot wallet to your store and allow customers globally to pay via their Paytriot Wallet. 
                    </Text>
                    </Collapse>
                    <Collapse
                      className="accordian-nextui-custom"
                      expanded={accordionOpen[1]}
                      title={
                        <div className="accordian-custom-title">
                          <Image src={iconExchangeSvg} alt="" />
                          <h3 className="p-18 ms-3">Exchange Currencies</h3>
                        </div>
                      }
                    >
                      <Text>
                      Exchange currencies within your Paytriot Wallet with competitive FX rates than traditional bank accounts.
                      </Text>
                    </Collapse>
                    <Collapse
                      className="accordian-nextui-custom"
                      expanded={accordionOpen[2]}
                      title={
                        <div className="accordian-custom-title">
                          <Image src={iconDebitCardSvg} alt="" />
                          <h3 className="p-18 ms-3">Debit Card</h3>
                        </div>
                      }
                    >
                      <Text>
                        Add a debit to your wallet and use your Paytriot funds to spend at stores and online all over the world. Coming soon
                      </Text>
                    </Collapse>
                    <Collapse
                      className="accordian-nextui-custom"
                      expanded={accordionOpen[3]}
                      title={
                        <div className="accordian-custom-title">
                          <Image src={iconTopUpSvg} alt="" />
                          <h3 className="p-18 ms-3">Top Up and Withdrawals</h3>
                        </div>
                      }
                    >
                      <Text>
                        Top up your Paytriot wallet using your credit or debit card and use your funds to spend at thousands of sites accepting the Paytriot wallet online. 
                      </Text>
                    </Collapse>
                  </Collapse.Group>
                </Grid>
              </Grid.Container>
            </div>
            <div
              className="col-lg-6 offset-1 position-relative"
              id="lottie-wrap"
            >
              {' '}
              <div
                className="lottie-container position-sticky top-0"
                style={{ minHeight: '750px' }}
              >
                <LottiePlayer animationData={walletHeaderSvgJson} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <a
              href="contact-us"
              className="btn btn-primary w-100 mt-3"
              role="button"
              data-bs-toggle="button"
            >
              Sign up as a business
            </a>
            <a
              href="contact-us"
              className="btn btn-primary w-100 mt-3"
              role="button"
              data-bs-toggle="button"
            >
              Sign up as a User
            </a>
          </div>
        </div>
      </section>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Script src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js" />
    </>
  );
}
