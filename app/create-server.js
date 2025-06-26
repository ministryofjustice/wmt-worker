const http = require('http')
const getTasksInProgress = require('./services/data/get-tasks-inprogress-count')
const log = require('./services/log')

const requestListener = function (req, res) {
  if (req.url.endsWith('/liveness')) {
    return getTasksInProgress().then(function () {
      res.writeHead(200)
      res.end('App is live')
    }).catch(function (err) {
      log.error(err)
      res.writeHead(500)
      res.end('App is not live')
    })
  }
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }
  log.info(`request ${req.method} ${req.url} not found`)
  res.writeHead(404)
  res.end()
}

const server = function () {
  return http.createServer(requestListener)
}

module.exports = server
