import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Medusa Store</h1>
      <p className="text-xl mb-8">Your complete e-commerce solution</p>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <Link
          href="/us"
          className="bg-black text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
        >
          Shop US Region
        </Link>
        <Link
          href="/app"
          className="border border-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
        >
          Admin Panel
        </Link>
      </div>

      <div className="text-sm text-gray-500 max-w-md">
        <p>
          If you&apos;re seeing this page, it means your Medusa storefront is running!
          Click one of the buttons above to navigate to a region or the admin panel.
        </p>
      </div>
    </div>
  )
}
