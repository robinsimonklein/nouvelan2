import * as axios from 'axios'

let options = {}

// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `https://${process.env.HOST || 'localhost'}:${process.env.HTTPS_PORT || process.env.PORT || 3000}`
}

export default axios.create(options)
