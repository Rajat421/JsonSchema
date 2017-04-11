const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

// Without express.js
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(8000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:8000')
  })
})
