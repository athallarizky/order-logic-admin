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
