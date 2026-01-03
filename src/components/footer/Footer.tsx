import Image from 'next/image';
import Link from 'next/link';

import icoEmailSvg from 'public/images/icon-email.svg';
import iconFacebookSvg from 'public/images/icon-facebook.svg';
import iconLinkedInSvg from 'public/images/icon-linkedin.svg';
import iconTwitterSvg from 'public/images/icon-twitter.svg';
import iconYoutubeSvg from 'public/images/icon-youtube.svg';
import logoSvg from 'public/images/img-logo.svg';
import logoMasterCardSvg from 'public/images/logo-mastercard.svg';
import logoOthelistSvg from 'public/images/logonewOlist.svg';
import logoVisaSvg from 'public/images/logo-visa.svg';

export default function Footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="row">

          {/* LEFT */}
          <div className="col-lg-4 mb-4 mb-lg-0 d-flex flex-column justify-content-between">
            <div className="brand-wrap">
              <div className="footer-brand mb-4 mb-lg-5">
                <Image
                  src={logoSvg}
                  alt="Paytriot Payments"
                  width={160}
                  height={40}
                  className="logo-footer img-logo"
                />
              </div>

              <p className="label-14 mb-4 mb-lg-0">
                Paytriot Payments has many years experience in all aspects of
                the International and online financial world.
              </p>
            </div>

            <div className="socmed d-flex mb-4">
              <div className="icon-small icon1">
                <Link href="https://www.facebook.com/paytriotP/" target="_blank">
                  <Image src={iconFacebookSvg} alt="Facebook" width={20} height={20} />
                </Link>
              </div>

              <div className="icon-small icon2">
                <Link href="https://twitter.com/paytriotp?lang=en" target="_blank">
                  <Image src={iconTwitterSvg} alt="Twitter" width={20} height={20} />
                </Link>
              </div>

              <div className="icon-small icon3">
                <Link href="https://www.linkedin.com/company/paytriot-payments/" target="_blank">
                  <Image src={iconLinkedInSvg} alt="LinkedIn" width={20} height={20} />
                </Link>
              </div>

              <div className="icon-small icon4">
                <Link href="https://www.youtube.com/channel/UC2bC4orFLMu6DuB4FzEjuaw" target="_blank">
                  <Image src={iconYoutubeSvg} alt="YouTube" width={20} height={20} />
                </Link>
              </div>

              <div className="icon-small icon5">
                <Link href="mailto:info@paytriot.co.uk">
                  <Image src={icoEmailSvg} alt="Email" width={20} height={20} />
                </Link>
              </div>
            </div>

            <span className="d-inline-block d-lg-none label-14">
              © 2025 Paytriot Ltd
            </span>
          </div>

          {/* MIDDLE */}
          <div className="col-lg-3 offset-lg-1 pt-lg-3 mb-4">
            <h4 style={{ paddingLeft: '1.2rem' }}>Useful Links</h4>

            <div className="nav-item-wrap d-flex justify-content-between justify-content-lg-start mt-3">
              <ul className="nav-footer ps-0 me-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="https://www.paytriot.co.uk/about-us">About us</Link></li>
                <li><Link href="/">Testimonial</Link></li>
                <li><Link href="https://www.paytriot.co.uk/partners">Clients</Link></li>
              </ul>

              <ul className="nav-footer ps-0 me-4">
                <li><Link href="https://www.paytriot.co.uk/services">Service</Link></li>
                <li><Link href="https://www.paytriot.co.uk/e-money-account">E-Money Account</Link></li>
                <li><Link href="https://www.paytriot.co.uk/partners">Partners</Link></li>
                <li><Link href="https://www.paytriot.co.uk/wallet">Wallet</Link></li>
                <li><Link href="https://www.paytriot.co.uk/contact-us">Contact us</Link></li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="contact-card mb-4">
              <h4>Contact Details</h4>

              <div className="address-wrap">
                <p className="label-14"><span>Address:</span> Eagle Court, Vine Street, Uxbridge, UB8 1JG</p>
                <p className="label-14"><span>Phone:</span> +44 (0203) 884 1611</p>
                <p className="label-14"><span>Email:</span> info@paytriot.co.uk</p>
              </div>
            </div>

            <div className="logo-payment d-flex align-items-center ps-lg-4">
              <Image src={logoOthelistSvg} alt="Othelist" width={50} height={28} className="me-5" />
              <Image src={logoMasterCardSvg} alt="Mastercard" width={45} height={28} className="me-5" />
              <Image src={logoVisaSvg} alt="Visa" width={45} height={28} />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="trademarks d-lg-flex justify-content-between d-none">
          <p className="label-10 me-3">
            © 2025 Paytriot Ltd is a registered company headquartered at Eagle Court,
            Vine Street, Uxbridge in the United Kingdom, number 09910014.
          </p>

          <div className="terms-policy">
            <Link href="/terms-and-conditions" className="label-14 me-3">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy" className="label-14">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
