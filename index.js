var server = require('./app/server')
var config = require('./config')

server.listen(config.port, function () {
  console.log(`Server listening on port ${config.port}!`)
})
