// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const redirectSSL = require('redirect-ssl')
const bodyParser = require('body-parser')

// Require API routes
const categories = require('./api/categories')
const todos = require('./api/todos')

// Prepare variables
let credentials = {}
let httpsServer = null

// Create express app
const app = express();

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

if(!config.dev) {
// Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/nouvelan.ynibling.ovh/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/nouvelan.ynibling.ovh/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/nouvelan.ynibling.ovh/chain.pem', 'utf8');

    credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
}

// Static config
app.use(express.static(__dirname, { dotfiles: 'allow' } ));


// Start function
async function start() {
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

    // Redirect SSL middleware
    app.use(redirectSSL)

    // Use API Routes
    app.use('/api', categories)
    app.use('/api', todos)

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Starting both http & https servers
    const httpServer = http.createServer(app);
    if(!config.dev) {
        httpsServer = https.createServer(credentials, app);
    }

    httpServer.listen(process.env.PORT || 80, () => {
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
        })
    });

    if(!config.dev) {
        httpsServer.listen(process.env.HTTPS_PORT || 443, () => {
            consola.ready({
                message: `HTTPS Server listening on https://${host}:${port}`,
                badge: true
            })
        });
    }
}

start()
