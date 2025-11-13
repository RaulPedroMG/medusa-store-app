const checkEnvVariables = require("./check-env-variables")

// Skip env checks during build time
if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_ENV !== "docker-build"
) {
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
  // Add redirects to ensure users can access pages properly
  async redirects() {
    return [
      {
        source: "/",
        destination: "/us",
        permanent: false,
      },
    ]
  },
  // Experimental features to improve build
  experimental: {
    // Skip SSG for dynamic routes
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
  },
  // Environment variables for build time
  env: {
    SKIP_BUILD_STATIC_GENERATION: "true",
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
