/**
 * Utility to handle Medusa API errors in a more robust way
 * This version gracefully handles connection issues
 */

export default function medusaError(error: any): never {
  // Check for network errors first
  if (
    error.message?.includes("fetch failed") ||
    error.message?.includes("ENOTFOUND") ||
    error.message?.includes("ECONNREFUSED")
  ) {
    console.error("Network connection error:", error.message)

    // Provide a user-friendly error that doesn't break the app
    throw new Error(
      "Connection to the backend service failed. The service may be temporarily unavailable."
    )
  }

  // Handle standard Medusa API response errors
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const url = error.config?.url
      ? new URL(error.config.url, error.config.baseURL).toString()
      : "Unknown resource"

    console.error("Resource:", url)
    console.error("Status code:", error.response.status)

    // Log data only if it exists
    if (error.response.data) {
      console.error("Response data:", error.response.data)
    }

    // Extracting the error message from the response data
    let message = "An unknown error occurred"

    try {
      if (typeof error.response.data === "string") {
        message = error.response.data
      } else if (error.response.data?.message) {
        message = error.response.data.message
      } else if (error.response.data?.error) {
        message = error.response.data.error
      }
    } catch (e) {
      // If we can't extract the message, use a generic one
      message = `Error ${error.response.status}`
    }

    // Capitalize first letter and ensure it ends with a period
    message = message.charAt(0).toUpperCase() + message.slice(1)
    if (!message.endsWith(".")) {
      message += "."
    }

    throw new Error(message)
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received:", error.request)
    throw new Error(
      "The server did not respond to the request. Please try again later."
    )
  } else {
    // Something happened in setting up the request
    console.error("Request setup error:", error.message)
    throw new Error(
      "Error preparing the request: " + (error.message || "Unknown error")
    )
  }
}
