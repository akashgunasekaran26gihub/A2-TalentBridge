/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    APP_TIMEZONE: process.env.APP_TIMEZONE || 'Europe/Riga',
    APP_LOCALE: process.env.APP_LOCALE || 'en-LV',
    APP_CURRENCY: process.env.APP_CURRENCY || 'EUR',
    APP_COUNTRY: process.env.APP_COUNTRY || 'Latvia',
  },
};

module.exports = nextConfig;
