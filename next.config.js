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

      // Specific /home/newsdetail/ items - ENSURE EXACT MATCH, including hidden chars like \u00A0
      {
        source: '/home/newsdetail/cable-&-other-pay-tv-services,-merchant-account-and-payment-acquiring',
        destination: '/blog/home-entertainment-merchant-account-and-payment-gateway',
        permanent: true,
      },
      // FIX: Add specific rule for chiropractors with \u00A0 from /home/newsdetail/
      {
        source: '/home/newsdetail/chiropractors,-payment-gateway-and-merchant-account%C2%A0',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/home/newsdetail/chiropractors,-payment-gateway-and-merchant-account1',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      // FIX: Add specific rule for chiropractors with \u00A01 from /home/newsdetail/
      {
        source: '/home/newsdetail/chiropractors,-payment-gateway-and-merchant-account%C2%A01',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/home/newsdetail/circus,-credit-card-processing-and-payment-gateway.',
        destination: '/blog/circus-credit-card-processing-and-payment-gateway-50',
        permanent: true,
      },
      // FIX: Add specific rule for circus with \u00A0 from /home/newsdetail/
      {
        source: '/home/newsdetail/circus,-credit-card-processing-and-payment-gateway.%C2%A0',
        destination: '/blog/circus-credit-card-processing-and-payment-gateway-50',
        permanent: true,
      },

      {
        source: '/home/newsdetail/entertainers-payment-gateway-and-merchant-account%C2%A0',
        destination: '/blog/circus-credit-card-processing-and-payment-gateway-50',
        permanent: true,
      },
      
      {
        source: '/home/newsdetail/competitions-credit-card-processing-and-merchant-services.-47',
        destination: '/blog/competitions-credit-card-processing-and-merchant-services-47-47',
        permanent: true,
      },
      {
        source: '/home/newsdetail/golf-courses,-merchant-account-and-credit-card-processing',
        destination: '/blog/golf-courses-merchant-account-and-credit-card-processing-53',
        permanent: true,
      },
      {
        source: '/home/newsdetail/hairdressers,-merchant-account-and-payment-gateway.',
        destination: '/blog/hairdressers-merchant-account-and-payment-gateway-52',
        permanent: true,
      },
      // FIX: Add specific rule for hairdressers without trailing dot from /home/newsdetail/
      {
        source: '/home/newsdetail/hairdressers,-merchant-account-and-payment-gateway',
        destination: '/blog/hairdressers-merchant-account-and-payment-gateway-52',
        permanent: true,
      },
      {
        source: '/home/newsdetail/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks',
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      {
        source: '/home/newsdetail/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37/', // Trailing slash
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      {
        source: '/home/newsdetail/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks/', // Another variation, ensure distinct if needed
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      // FIX: Add specific rule for radios from /home/newsdetail/ (with trailing dot, and with/without \u00A0 if applicable)
      {
        source: '/home/newsdetail/radios, televisions & hi-fis, electronic store,-merchant-account-and-payment-acquiring.', // Decoded path with trailing dot
        destination: '/blog/paytriot-payments-for-online-computer-stores-uk-europe',
        permanent: true,
      },
      {
        source: '/home/newsdetail/radios, televisions & hi-fis, electronic store,-merchant-account-and-payment-acquiring', // Decoded path without trailing dot
        destination: '/blog/paytriot-payments-for-online-computer-stores-uk-europe',
        permanent: true,
      },
      {
        source: '/home/newsdetail/radios,%C2%A0televisions%C2%A0&%C2%A0hi-fis,%C2%A0electronic%C2%A0store,-merchant-account-and-payment-acquiring', // With literal \u00A0 and trailing dot
        destination: '/blog/paytriot-payments-for-online-computer-stores-uk-europe',
        permanent: true,
      },
      {
        source: '/home/newsdetail/radios,-televisions-&amp;-hi-fis,-electronic-store,-merchant-account-and-payment-acquiring.',
        destination: '/blog/paytriot-payments-for-online-computer-stores-uk-europe',
        permanent: true,
      },
      {
        source: '/home/newsdetail/supermarkets-merchant-account-and-payment-gateway',
        destination: '/blog/services', // As per your original rule
        permanent: true,
      },
      // FIX: Add specific rule for supermarkets with \u00A0 from /home/newsdetail/
      {
        source: '/blog/supermarkets-merchant-account-and-payment-gateway%C2%A0',
        destination: '/blog/services',
        permanent: true,
      },

      // END: Specific /home/newsdetail/ items

      // GENERAL /home/newsdetail or similar WILDCARD/REGEX rules
      // This will catch any /home/newsdetail/... that wasn't caught by a more specific rule above.
      {
        source: '/home/newsdetail/:slug*',
        destination: '/blog/:slug*',
        permanent: true, // Changed to true for SEO if these are old blog posts
      },
      // This rule is very specific due to '//'. If it's meant for paths like yourdomain.com//newsdetail/..., it's fine.
      // If it's for standard /newsdetail/..., it should be source: '/newsdetail/:slug'.
      {
        source: '//newsdetail/:slug',
        destination: '/blog/:slug',
        permanent: true, // Changed to true
      },
      // Regex Path Matching
      {
        source: '/post/:slug(\\d{1,})', // Matches /post/123 but not /post/abc
        destination: '/news/:slug',
        permanent: true, // Changed to true
      },

      // Other specific page redirects
      {
        source: '/blog/page/about-us',
        destination: '/about-us',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/wallet', // Note: This is a direct /blog/wallet, not /blog/page/wallet
        destination: '/wallet',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/services',
        destination: '/services',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/wallet',
        destination: '/wallet',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/contact-us',
        destination: '/contact-us',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/partners',
        destination: '/partners',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/e-money-account',
        destination: '/e-money-account',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/pricing',
        destination: '/pricing',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/blog',
        destination: '/blog',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/terms-and-conditions',
        destination: '/terms-and-conditions',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/page/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
        basePath: false,
      },
      {
        source: '/news/page/', // Catches /news/page/ and redirects to /blog
        destination: '/blog',
        permanent: true,
        basePath: false,
      },
      {
        source: '/home/about',
        destination: '/about-us',
        permanent: true,
        basePath: false,
      },
      {
        source: '/login',
        destination: '/contact-us', // or '/wallet' if it makes sense - kept as /contact-us
        permanent: true,
        basePath: false,
      },
      // FIX: Add redirect for /home/register
      {
        source: '/home/register',
        destination: '/contact-us', // Assuming contact-us is the new registration point
        permanent: true,
      },
      // Consolidating /Home/ContactUs variations
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
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },

      // Blog/NewsDetail consolidations and cleaning (specific blog posts not starting with /home/newsdetail/)
      {
        source: '/blog/supermarkets-merchant-account-and-payment-gateway',
        destination: '/blog/services', // Redirecting specific blog post to /services
        permanent: true,
      },
      // FIX: Add specific rule for supermarkets with \u00A0
      {
        source: '/blog/supermarkets-merchant-account-and-payment-gateway\u00A0',
        destination: '/blog/services',
        permanent: true,
      },
      {
        source: '/blog/chiropractors,-payment-gateway-and-merchant-account',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      // FIX: Add specific rule for chiropractors with \u00A0
      {
        source: '/blog/chiropractors,-payment-gateway-and-merchant-account\u00A0',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      // FIX: Add specific rule for chiropractors with \u00A01
      {
        source: '/blog/chiropractors,-payment-gateway-and-merchant-account\u00A01',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/blog/competitions,-credit-card-processing-and-merchant-services.',
        destination: '/blog/competitions-credit-card-processing-and-merchant-services-47-47',
        permanent: true,
      },
      // FIX: Add specific rule for competitions without trailing dot
      {
        source: '/blog/competitions,-credit-card-processing-and-merchant-services',
        destination: '/blog/competitions-credit-card-processing-and-merchant-services-47-47',
        permanent: true,
      },
      {
        source: '/blog/entertainers-payment-gateway-and-merchant-account',
        destination: '/blog/circus-credit-card-processing-and-payment-gateway-50',
        permanent: true,
      },
      // FIX: Add specific rule for entertainers with \u00A0
      {
        source: '/blog/entertainers-payment-gateway-and-merchant-account\u00A0',
        destination: '/blog/circus-credit-card-processing-and-payment-gateway-50',
        permanent: true,
      },
      {
        source: '/blog/football-clubs-merchant-account-and-payment-gateway1',
        destination: '/blog/football-clubs-merchant-account-and-payment-gateway',
        permanent: true,
      },
      {
        source: '/blog/footwear,-merchant-account-and-payment-gateway',
        destination: '/blog/footwear-merchant-account-and-payment-gateway-51',
        permanent: true,
      },
      {
        source: '/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks', // Root level path
        destination: '/blog/paytriot-payments-help-high-risk-businesses-receive-merchant-accounts-in-hours-instead-of-weeks-37',
        permanent: true,
      },
      // FIX: Add specific rule for radios from /blog/ (decoded path and literal \u00A0)
      {
        source: '/blog/radios, televisions & hi-fis, electronic store,-merchant-account-and-payment-acquiring',
        destination: '/blog/paytriot-payments-for-online-computer-stores-uk-europe',
        permanent: true,
      },
      {
        source: '/blog/radios,\u00A0televisions\u00A0&\u00A0hi-fis,\u00A0electronic\u00A0store,-merchant-account-and-payment-acquiring', // With literal \u00A0
        destination: '/blog/paytriot-payments-for-online-computer-stores-uk-europe',
        permanent: true,
      },

      // General page cleanups (trailing slashes, alternative names)
      {
        source: '/services-2',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/privacy-policy/', // Handles trailing slash for privacy-policy
        destination: '/privacy-policy',
        permanent: true,
      },
      // NEW/MODIFIED Redirect: /merchant-services/ to /services
      {
        source: '/merchant-services/',
        destination: '/services', // Changed destination
        permanent: true,
      },
      // FIX: Add rule for /merchant-services (no trailing slash)
      {
        source: '/merchant-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/partners/', // Handles trailing slash for partners
        destination: '/partners',
        permanent: true,
      },
      {
        source: '/404', // 404 page redirect
        destination: '/',
        permanent: true, // Consider if a 404 should be a permanent redirect to home
      },

      // Consolidating various /Home/ paths (ensure these don't conflict with more specific /home/newsdetail above)
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
        destination: '/blog/e-money-account', // Destination updated for consistency if there's a blog page for e-money
        permanent: true,
      },
      {
        source: '/home/news/category/e-money-account',
        destination: '/blog/e-money-account', // Destination updated for consistency
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


