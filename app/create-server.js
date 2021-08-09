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
  log.info(`request ${req.method} ${req.url} not found`)
  res.writeHead(404)
  res.end()
}

const server = function () {
  return http.createServer(requestListener)
}

module.exports = server
