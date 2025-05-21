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
        source: '/ptr-merchant-api/1.0',
        has: [{ type: 'host', value: 'doc.paytriot.co.uk' }],
        destination: '/services',
        permanent: true,
      },
      {
        source: '/ptr-merchant-api/1.0/', // With trailing slash
        has: [{ type: 'host', value: 'doc.paytriot.co.uk' }],
        destination: '/services',
        permanent: true,
      },
      // Catch-all for doc.paytriot.co.uk - place after specific doc.paytriot.co.uk rules
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'doc.paytriot.co.uk' }],
        destination: '/services', // Your specified destination
        permanent: true,
      },

      // Gateway subdomain
      {
        source: '/__zenedge/c',
        has: [{ type: 'host', value: 'gateway.paytriot.co.uk' }],
        destination: 'https://gateway.paytriot.co.uk/admin/login.php', // Full external URL
        permanent: true,
      },
      // MMS subdomain
      {
        source: '/tel:0800%203687345', // Note: Ensure this source path is exactly what's being hit
        has: [{ type: 'host', value: 'mms.paytriot.co.uk' }],
        destination: 'https://mms.paytriot.co.uk/admin/login.php', // Full external URL
        permanent: true,
      },
      // Wallet subdomain
      {
        source: '/en/auth/login/',
        has: [{ type: 'host', value: 'wallet.paytriot.co.uk' }],
        destination: 'https://mms.paytriot.co.uk/admin/login.php', // Full external URL. Consider if this should be wallet login.
        permanent: true,
      },

      // Specific /home/newsdetail/ items
      {
        source: '/home/newsdetail/cable-&-other-pay-tv-services,-merchant-account-and-payment-acquiring',
        destination: '/blog/home-entertainment-merchant-account-and-payment-gateway',
        permanent: true,
      },
      {
        source: '/home/newsdetail/chiropractors,-payment-gateway-and-merchant-account',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/home/newsdetail/chiropractors,-payment-gateway-and-merchant-account1',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/home/newsdetail/circus,-credit-card-processing-and-payment-gateway.',
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

      // END: Specific /home/newsdetail/ items

      // GENERAL /home/newsdetail or similar WILDCARD/REGEX rules
      // This will catch any /home/newsdetail/... that wasn't caught by a more specific rule above.
      {
        source: '/home/newsdetail/:slug*',
        destination: '/blog/:slug*',
        permanent: false, // Kept as false as in original, consider if it should be true for unmatched ones too.
      },
      // This rule is very specific due to '//'. If it's meant for paths like yourdomain.com//newsdetail/..., it's fine.
      // If it's for standard /newsdetail/..., it should be source: '/newsdetail/:slug'.
      {
        source: '//newsdetail/:slug',
        destination: '/blog/:slug',
        permanent: false,
      },
      // Regex Path Matching
      {
        source: '/post/:slug(\\d{1,})', // Matches /post/123 but not /post/abc
        destination: '/news/:slug',
        permanent: false,
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
      {
        source: '/blog/chiropractors,-payment-gateway-and-merchant-account',
        destination: '/blog/chiropractors-payment-gateway-and-merchant-account-61',
        permanent: true,
      },
      {
        source: '/blog/competitions,-credit-card-processing-and-merchant-services.',
        destination: '/blog/competitions-credit-card-processing-and-merchant-services-47-47',
        permanent: true,
      },
      {
        source: '/blog/entertainers-payment-gateway-and-merchant-account',
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
      // If you also want /merchant-services (no trailing slash) to redirect to /services:
      // {
      //   source: '/merchant-services',
      //   destination: '/services',
      //   permanent: true,
      // },
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
      // '/home/e-money-account' is already covered by '/Home/e-money-account' if casing is ignored by server,
      // but explicit rule is fine. It correctly points to '/e-money-account'.
      // {
      //   source: '/home/e-money-account',
      //   destination: '/e-money-account',
      //   permanent: true,
      // },
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


