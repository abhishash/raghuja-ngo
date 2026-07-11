/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    ASSET_ENDPOINT: process.env.ASSET_ENDPOINT,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
}

export default nextConfig
