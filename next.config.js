/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const nextConfig = {
  target: 'server',
  /**
   * Ignoring ESLint on build in favor of GitLab CI.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-eslint
   */
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Accept, Accept-Version, Content-Length, Authorization',
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
