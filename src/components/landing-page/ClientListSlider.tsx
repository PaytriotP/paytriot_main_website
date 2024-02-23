import Image from 'next/image';


// import logoHiltonHoverPng from 'public/images/logo-hilton-hover.png';
import logoHiltonLightPng from 'public/images/logo-hilton.png';
// import logoHiltonDarkPng from 'public/images/logo-hilton-dark.png';

import logoShopifyLightPng from 'public/images/logo-shopify.svg';

// import logoPizzahutHoverPng from 'public/images/logo-pizzahut-hover.png';
import logoPizzahutLightPng from 'public/images/logo-pizzahut.png';
// import logoPizzahutDarkPng from 'public/images/logo-pizzahut-dark.png';

// import logoMatraHoverPng from 'public/images/logo-matra-hover.png';
import logoMatraLightPng from 'public/images/logo-matra.png';
// import logoMatraDarkPng from 'public/images/logo-matra-dark.png';

// import logoNitrousHoverPng from 'public/images/logo-matra-hover.png';
import logoNitrousLightPng from 'public/images/logo-nitrous.png';
// import logoNitrousDarkPng from 'public/images/logo-matra-dark.png';

// import logoHamptonHoverPng from 'public/images/logo-matra-hover.png';
import logoHamptonLightPng from 'public/images/logo-hampton.png';
// import logoHamptonDarkPng from 'public/images/logo-matra-dark.png';

export default function ClientListSlider() {
  return (
    <>
      <div className="client-list">
        <div className="inner-client-img">
          <Image src={logoShopifyLightPng} alt="" className="w-100 client-img" />
        </div>
        <div className="inner-client-img">
          <Image
            src={logoPizzahutLightPng}
            alt=""
            className="w-100 client-img"
          />
        </div>
        <div className="inner-client-img">
          <Image src={logoMatraLightPng} alt="" className="w-100 client-img" />
        </div>
        <div className="inner-client-img">
          <Image src={logoHiltonLightPng} alt="" className="w-100 client-img" />
        </div>
        <div className="inner-client-img">
          <Image
            src={logoNitrousLightPng}
            alt=""
            className="w-100 client-img"
          />
        </div>
        <div className="inner-client-img">
          <Image
            src={logoHamptonLightPng}
            alt=""
            className="w-100 client-img"
          />
        </div>
      </div>
    </>
  );
}
