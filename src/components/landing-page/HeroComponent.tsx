import LottiePlayer from '@/components/LottiePlayer';
import { orange } from '@material-ui/core/colors';
import { Button } from '@nextui-org/react';
import { PopupButton } from '@typeform/embed-react';

import Link from 'next/link';
import headerAnimationJson from 'public/animation/landing-page/header.json';

export default function HeroComponent() {
  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: 50,
    border: 'none',
    background: 'orange',
    color: 'white',
    fontSize: 19,
    cursor: 'pointer',
    width: '248px',
    height: "64px"
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 ps-lg-5 d-flex flex-column justify-content-center align-items-center mb-5 mb-lg-0">
            <div className="text-wrap d-flex flex-column align-items-lg-start align-items-center">
              <h1 className="mb-lg-5 mb-4 text-center text-lg-start hero-component"><span className="gradient-text ">Rates from 0% </span>   Monthly Flat Fee Stop paying per transaction</h1>
              <p className="p-18 mb-5 text-center text-lg-start">
              Paytriot now offers a monthly fee for businesses looking to start processing or switching. 
              </p>
{/*               <Link
                href="/SignupForm"
                className="btn btn-primary"
                role="button"
                data-bs-toggle="button"
              >
                Start Now
              </Link> */}
              {/* <Link href="/contact-us" style={{ textDecoration: 'none' }}>
                <Button rounded size="xl" color="warning">
                  Start Now
                </Button> }

              </Link> */}
                  <PopupButton id="uJkBAIlB" size={60} style={buttonStyle} className="my-button">
                    Start Now
                  </PopupButton>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <LottiePlayer animationData={headerAnimationJson} />
          </div>
        </div>
      </div>
    </>
  );
}
