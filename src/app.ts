#!/usr/bin/env node
export {};
const database = require('./database/database')
const server = require('./server/server')
const socket = require('./socket/socket')


database.connect()
  .then(() => {
    database.setupController()
    server.initServer()
    const io = socket.init(server.getServer())

    io.on('connection', socket => {
      console.log('user connected')
    })

    io.emit('start', { status: 'start' })
  })
