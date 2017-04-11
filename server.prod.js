const next = require('next')
const routes = require('./routes')
const app = next()
const handler = routes.getRequestHandler(app)

// Without express.js
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(4000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:4000')
  })
})
