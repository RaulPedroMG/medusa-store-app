'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Something went wrong</h1>

        <div className="bg-gray-100 p-6 rounded-lg mb-8 text-left">
          <p className="text-lg mb-4">
            {error.message || "An unexpected error occurred while loading this page."}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-500">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-black text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Try again
          </button>

          <Link
            href="/"
            className="border border-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            If this problem persists, please contact support or try again later.
          </p>
          <p className="mt-2">
            The storefront may be experiencing connectivity issues with the backend service.
          </p>
        </div>
      </div>
    </div>
  )
}
