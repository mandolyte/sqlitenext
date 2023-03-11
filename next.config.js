/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // see https://nextjs.org/docs/api-reference/next.config.js/headers
  // async headers() {
  //   return [
  //     {
  //       source: '/',
  //       headers: [
  //         {
  //           key: 'Cross-Origin-Opener-Policy',
  //           value: 'same-origin',
  //         },
  //         {
  //           key: 'Cross-Origin-Embedder-Policy',
  //           value: 'require-corp',
  //         },
  //       ],
  //     },
  //   ]
  // },
}

module.exports = nextConfig
