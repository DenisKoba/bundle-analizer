var io;
module.exports = {
    init: function (httpsServer) {
        io = require('socket.io')(httpsServer);
        return io;
    },
    getIO: function () {
        if (!io) {
            throw new Error('socket.io is not initialized');
        }
        return io;
    }
};
//# sourceMappingURL=socket.js.map