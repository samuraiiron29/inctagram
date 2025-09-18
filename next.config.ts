import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
    unoptimized: true,
  },
  reactStrictMode: false,
  //
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'ru'],
  // }
  //
}



export default nextConfig
