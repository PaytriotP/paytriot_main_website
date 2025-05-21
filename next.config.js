/** @type {import('next').NextConfig} */
require('dotenv').config()

const bearerToken = process.env.bearerToken;


const nextConfig = {
  images: {
    domains: ['images.ctfassets.net']
  },

  compress: true,

  reactStrictMode: true,
  async redirects() {
    //  permanent: false - 307 redirection
    //  permanent: true - 308 redirection
    return [
      {
        source: '//newsdetail/:slug',
        destination: '/blog/:slug',
        permanent: false
     },
      //Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
      {
        source: '/home/newsdetail/:slug*',
        destination: '/blog/:slug*',
        permanent: false
      },
      //Regex Path Matching - The regex below will match `/post/123` but not `/post/abc`
      {
        source: '/post/:slug(\\d{1,})',
        destination: '/news/:slug',
        permanent: false
       },
      
       {
        source: '/blog/page/about-us',
        destination: '/about-us',
        permanent: true,
        basePath: false
      },
      {
        source: '/blog/wallet',
        destination: '/wallet',
        permanent: true,
        basePath: false
      },
      
      {
        source: '/blog/page/services',
        destination: '/services',
        permanent: true,
        basePath: false
       },
      {
        source: '/blog/page/wallet',
        destination: '/wallet',
        permanent: true,
        basePath: false
      },
       {
        source: '/blog/page/contact-us',
        destination: '/contact-us',
        permanent: true,
        basePath: false
       },
       {
        source: '/blog/page/partners',
        destination: '/partners',
        permanent: true,
        basePath: false
       },
       {
        source: '/blog/page/e-money-account',
        destination: '/e-money-account',
        permanent: true,
        basePath: false
       },
       {
        source: '/blog/page/pricing',
        destination: '/pricing',
        permanent: true,
        basePath: false
       },
       {
        source: '/blog/page/blog',
        destination: '/blog',
        permanent: true,
        basePath: false
       },
       {
        source: '/blog/page/terms-and-conditions',
        destination: '/terms-and-conditions',
        permanent: true,
        basePath: false
       },
       {
        source: '/blog/page/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
        basePath: false
       },
       {
        source: '/news/page/',
        destination: '/blog',
        permanent: true,
        basePath: false
       },
       {
        source: '/home/about',
        destination: '/about-us',
        permanent: true,
        basePath: false
       },
      {
        source: '/login',
        destination: '/contact-us', // or '/wallet' if it makes sense
        permanent: true,
        basePath: false
      },
      {
        source: '/Home/ContactUs',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/Home/Contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/Home/contact-us', // Lowercase variation
        destination: '/contact-us',
        permanent: true,
      },

      // /home/directdebit variations
      {
        source: '/home/directdebit', // Non-trailing slash
        destination: '/services',
        permanent: true,
      },
      {
        source: '/home/directdebit/', // Trailing slash
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37', // Specific blog post
        permanent: true,
      },

      // Blog/NewsDetail consolidations and cleaning
      {
        source: '/blog/supermarkets-merchant-account-and-payment-gateway', // Cleaned from %C2%A0
        destination: '/blog/services', // Specific blog post
        permanent: true,
      },
      {
        source: '/home/newsdetail/cable-&-other-pay-tv-services,-merchant-account-and-payment-acquiring',
        destination: '/blog/home-entertainment-merchant-account-and-payment-gateway',
        permanent: true,
      },
      // Chiropractors group
      {
        source: '/blog/chiropractors,-payment-gateway-and-merchant-account', // Cleaned
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/home/newsdetail/chiropractors,-payment-gateway-and-merchant-account', // Cleaned
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/home/newsdetail/chiropractors,-payment-gateway-and-merchant-account1', // Cleaned, number 1
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      // Circus
      {
        source: '/home/newsdetail/circus,-credit-card-processing-and-payment-gateway.', // Cleaned
        destination: '/blog/circus-credit-card-processing-and-payment-gateway-50',
        permanent: true,
      },
      // Competitions group
      {
        source: '/blog/competitions,-credit-card-processing-and-merchant-services.', // Cleaned
        destination: '/blog/competitions-credit-card-processing-and-merchant-services-47-47',
        permanent: true,
      },
      {
        source: '/home/newsdetail/competitions-credit-card-processing-and-merchant-services.-47', // Cleaned
        destination: '/blog/competitions-credit-card-processing-and-merchant-services-47-47',
        permanent: true,
      },
      // Entertainers
      {
        source: '/blog/entertainers-payment-gateway-and-merchant-account', // Cleaned
        destination: '/blog/circus-credit-card-processing-and-payment-gateway-50', // Re-directing to circus blog post as per your mapping
        permanent: true,
      },
      // Football Clubs
      {
        source: '/blog/football-clubs-merchant-account-and-payment-gateway1', // Cleaned, number 1
        destination: '/blog/football-clubs-merchant-account-and-payment-gateway',
        permanent: true,
      },
      // Footwear
      {
        source: '/blog/footwear,-merchant-account-and-payment-gateway', // Cleaned
        destination: '/blog/footwear-merchant-account-and-payment-gateway-51',
        permanent: true,
      },
      // Golf Courses
      {
        source: '/home/newsdetail/golf-courses,-merchant-account-and-credit-card-processing', // Cleaned
        destination: '/blog/golf-courses-merchant-account-and-credit-card-processing-53',
        permanent: true,
      },
      // Hairdressers
      {
        source: '/home/newsdetail/hairdressers,-merchant-account-and-payment-gateway.', // Cleaned
        destination: '/blog/hairdressers-merchant-account-and-payment-gateway-52',
        permanent: true,
      },
      // High-Risk Businesses group
      {
        source: '/home/newsdetail/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks',
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      {
        source: '/home/newsdetail/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37/',
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      {
        source: '/home/newsdetail/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks/',
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      {
        source: '/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks', // Root level path
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      // Radios / Electronics
      {
        source: '/home/newsdetail/radios,-televisions-&amp;-hi-fis,-electronic-store,-merchant-account-and-payment-acquiring.', // Cleaned. Test this one very carefully!
        destination: '/blog/paytriot-payments-for-online-computer-stores-uk-europe',
        permanent: true,
      },
      // Supermarkets
      {
        source: '/home/newsdetail/supermarkets-merchant-account-and-payment-gateway', // Cleaned
        destination: '/blog/services', // Your new destination
        permanent: true,
      },
      // /services-2/
      {
        source: '/services-2', // Non-trailing slash
        destination: '/services',
        permanent: true,
      },
      // /terms/
      {
        source: '/terms', // Non-trailing slash
        destination: '/terms-and-conditions',
        permanent: true,
      },
      // /privacy-policy/
      {
        source: '/privacy-policy/',
        destination: '/privacy-policy',
        permanent: true,
      },
      // /merchant-services/
      {
        source: '/merchant-services/',
        destination: '/merchant-services',
        permanent: true,
      },
      // /partners/
      {
        source: '/partners/',
        destination: '/partners',
        permanent: true,
      },
      // /404 page redirect to homepage
      {
        source: '/404',
        destination: '/', // Redirecting to root as a general 404 handler
        permanent: true,
      },
      // Consolidating various /Home/ paths
      {
        source: '/Home/e-money-account',
        destination: '/e-money-account',
        permanent: true,
      },
      {
        source: '/Home/partners',
        destination: '/partners',
        permanent: true,
      },
      {
        source: '/Home/pricing',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/Home/services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/Home/wallet',
        destination: '/wallet',
        permanent: true,
      },

      // Consolidating `blog/page/bank-account`, `home/e-money-account`, `home/news/category/e-money-account`
      {
        source: '/blog/page/bank-account',
        destination: '/blog/e-money-account',
        permanent: true,
      },
      {
        source: '/home/e-money-account', // Already covered, but good for explicit clarity if needed
        destination: '/e-money-account',
        permanent: true,
      },
      {
        source: '/home/news/category/e-money-account',
        destination: '/blog/e-money-account',
        permanent: true,
      },

      // News Category redirects
      {
        source: '/home/news/category/contact-us',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/home/news/category/partners',
        destination: '/partners',
        permanent: true,
      },
      {
        source: '/home/news/category/pricing',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/home/news/category/services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/:path*', // Catch-all for doc.paytriot.co.uk
        has: [{
          type: 'host',
          value: 'doc.paytriot.co.uk',
        }],
        destination: '/services', // Your specified destination
        permanent: true,
      },
      // Specific doc.paytriot.co.uk path
      {
        source: '/ptr-merchant-api/1.0',
        has: [{
          type: 'host',
          value: 'doc.paytriot.co.uk',
        }],
        destination: '/services',
        permanent: true,
      },
      {
        source: '/ptr-merchant-api/1.0/', // With trailing slash
        has: [{
          type: 'host',
          value: 'doc.paytriot.co.uk',
        }],
        destination: '/services',
        permanent: true,
      },
      // Gateway subdomain
      {
        source: '/__zenedge/c',
        has: [{
          type: 'host',
          value: 'gateway.paytriot.co.uk',
        }],
        destination: 'https://gateway.paytriot.co.uk/admin/login.php', // Full external URL
        permanent: true,
      },
      // MMS subdomain
      {
        source: '/tel:0800%203687345',
        has: [{
          type: 'host',
          value: 'mms.paytriot.co.uk',
        }],
        destination: 'https://mms.paytriot.co.uk/admin/login.php', // Full external URL
        permanent: true,
      },
      // Wallet subdomain
      {
        source: '/en/auth/login/',
        has: [{
          type: 'host',
          value: 'wallet.paytriot.co.uk',
        }],
        destination: 'https://mms.paytriot.co.uk/admin/login.php', // Full external URL
        permanent: true,
      },
    ];
  },

  webpack: config => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
          esModule: false
        }
      }
    });
    return config;
  },

  env: {
    Bearer_Token: process.env.Bearer_Token,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN
  },

  
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;


