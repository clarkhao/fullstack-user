/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-syntax-highlighter', 'swagger-client', 'swagger-ui-react']
}

module.exports = nextConfig
