const server = require('./app/create-server')()
const { PORT } = require('./config')

server.listen(PORT)
