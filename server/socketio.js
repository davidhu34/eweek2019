const socketio = require('socket.io')

module.exports = (server, db) => {
    const io = socketio(server)

    io.on('connection', (socket) => {
        console.log('connected')
        const test = (data) => {
            console.log('socket emit test', data)
            io.emit('test', data)
        }

        test('asdf')
    })

    return io
}
