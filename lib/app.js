#!/usr/bin/env node
const database = require('./helpers/database');
const server = require('./server/server');
const socket = require('./socket/socket');
database.connect().then(function () {
  database.setupController();
  server.initServer();
  const io = socket.init(server.getServer());
  io.on('connection', function (socket) {
    console.log('user connected');
  });
  io.emit('start', { status: 'start' });
});
//# sourceMappingURL=app.js.map