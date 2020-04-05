#!/usr/bin/env node
var database = require('./database/database');
var server = require('./server/server');
var socket = require('./socket/socket');
database.connect().then(function () {
    database.setupController();
    server.initServer();
    var io = socket.init(server.getServer());
    io.on('connection', function (socket) {
        console.log('user connected');
    });
    io.emit('start', { status: 'start' });
});
//# sourceMappingURL=app.js.map