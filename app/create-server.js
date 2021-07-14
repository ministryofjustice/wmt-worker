const http = require('http')
const getTasksInProgress = require('./services/data/get-tasks-inprogress-count')

const requestListener = function (req, res) {
  if (req.url.endsWith('/liveness')) {
    return getTasksInProgress().then(function () {
      res.writeHead(200)
      res.end('App is live')
    }).catch(function (err) {
      console.log(err)
      res.writeHead(500)
      res.end('App is not live')
    })
  }
  console.log(`request ${req.method} ${req.url}`)
  res.writeHead(404)
  res.end()
}

const server = function () {
  return http.createServer(requestListener)
}

module.exports = server
