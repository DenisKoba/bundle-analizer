export {}
let io;

module.exports = {
  init: httpsServer => {
    io = require('socket.io')(httpsServer)
    return io
  },

  getIO: () => {
    if (!io) {
      throw new Error('socket.io is not initialized')
    }

    return io
  }
}
