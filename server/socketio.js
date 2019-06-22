const socketio = require('socket.io')

module.exports = (server, db) => {
    const io = socketio(server)

    io.on('connection', () => {})
    return io
}
