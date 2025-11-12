import Medusa from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

// During Docker build, use a mock client
const isBuildTime = process.env.NODE_ENV === "docker-build"

class MockMedusaClient {
  client = {
    fetch: async () => {
      console.log("[Build] Using mock Medusa client during build")
      return { products: [], count: 0 }
    },
  }
}

export const sdk = isBuildTime
  ? (new MockMedusaClient() as unknown as Medusa)
  : new Medusa({
      baseUrl: MEDUSA_BACKEND_URL,
      debug: process.env.NODE_ENV === "development",
      publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    })
