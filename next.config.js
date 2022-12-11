/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['react-syntax-highlighter', 'swagger-client', 'swagger-ui-react'],
    allowMiddlewareResponseBody: true,
  },
  
}

module.exports = nextConfig
