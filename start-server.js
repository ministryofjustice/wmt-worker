const http = require('http')

const requestListener = function (req, res) {
    console.log(`request ${req.method} ${req.url}`)
    res.writeHead(200)
    res.end('Hello, World!')
  }
  
const server = http.createServer(requestListener)
server.listen(3000)
