const c = require("ansi-colors")

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_BACKEND_URL",
    description:
      "The URL of your Medusa backend. Set to the public URL of your backend service.",
  },
]

function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key]
  })

  if (missingEnvs.length > 0) {
    console.error(
      c.red.bold("\n⚠️ Warning: Missing recommended environment variables\n")
    )

    missingEnvs.forEach(function (env) {
      console.error(c.yellow(`  ${c.bold(env.key)}`))
      if (env.description) {
        console.error(c.dim(`    ${env.description}\n`))
      }
    })

    console.error(
      c.yellow(
        "\nThese variables should be set in your Dokploy environment configuration before running the application.\n"
      )
    )

    // Using a default URL for build time
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL =
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://medusa-backend:9000"

    // Don't exit during build
    // process.exit(1)
  }
}

module.exports = checkEnvVariables
