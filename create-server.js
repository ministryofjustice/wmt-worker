const http = require('http')
const getTasksInProgress = require('./app/services/data/get-tasks-inprogress-count')

const requestListener = function (req, res) {

  if(req.url.endsWith('/liveness')) {
    getTasksInProgress().then(function(count){
      // if(isNaN(count)){
      //   res.writeHead(500)
      //   res.end('App is not live')
      // }
      res.writeHead(200)
      res.end('App is live')
    })

  }
  // console.log(`request ${req.method} ${req.url}`)
  // res.writeHead(404)
  // res.end('Hello, World!')
}

const server = function(){
  return http.createServer(requestListener)
}

module.exports = server