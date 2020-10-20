const net = require('net')

const handleConnection = socket =>{
    console.log('alguem se conectou')
}
const server = net.createServer(handleConnection)
server.listen(4000,'127.0.0.1')