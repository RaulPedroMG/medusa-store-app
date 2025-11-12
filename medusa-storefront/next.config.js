const checkEnvVariables = require("./check-env-variables")

// Only check environment variables in production, not during build time
if (process.env.NODE_ENV !== "docker-build") {
  checkEnvVariables()
}

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip static generation during build time
  output: "standalone",
  staticPageGenerationTimeout: 1000,
  // Disable static generation for routes that need backend data
  experimental: {
    disableStaticGenerationForPaths: [
      "/[countryCode]/collections/[handle]",
      "/[countryCode]/products/[handle]",
      "/[countryCode]/(main)/collections/[handle]",
      "/[countryCode]/(main)/products/[handle]",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig
