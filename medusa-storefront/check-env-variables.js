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
      c.red.bold("\n🚫 Error: Missing required environment variables\n")
    )

    missingEnvs.forEach(function (env) {
      console.error(c.yellow(`  ${c.bold(env.key)}`))
      if (env.description) {
        console.error(c.dim(`    ${env.description}\n`))
      }
    })

    console.error(
      c.yellow(
        "\nPlease set these variables in your Dokploy environment configuration before deploying the application.\n"
      )
    )

    process.exit(1)
  }
}

module.exports = checkEnvVariables
