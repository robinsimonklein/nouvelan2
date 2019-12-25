const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !isProd

if (!isProd) {
    nuxt.build() // Build in development mode
}

// Static config
app.use(express.static(__dirname, { dotfiles: 'allow' } ));

// HTTPS Server
const options = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
}

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  https
      .create(options, app)
      .listen(port)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
