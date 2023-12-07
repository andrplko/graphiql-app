const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    additionalData: `@import "/src/styles/_variables.scss";`,
  },
};

module.exports = nextConfig;
