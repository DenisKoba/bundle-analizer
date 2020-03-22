#!/usr/bin/env node

import { bundleDetailsModel } from './types'

export {};
const cors = require('cors')
const database = require('./database')
const { getBundleSize, isBuildSmallerThanPrevious } = require('./bundle-size')
const express = require('express');
const app = express();
const frontendRoutes = require('./routes/frontend')

const PORT = 8084

const [,, path, repo] = process.argv
app.use(cors({
  origin: "*",
  allowedHeaders: "Content-type",
  methods: "GET,POST,PUT,DELETE,OPTIONS" }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/build', frontendRoutes)

getBundleSize(path).then(newSize => {
  database.connect().then(() => {
    const date = new Date().getTime()

    database.setupController(newSize, date, repo)

    const server = app.listen(PORT)
    const io = require('./socket/socket').init(server)

    const dbController = database.getController()

    io.on('connection', socket => {
      console.log('user connected')
    })

    dbController.fetch()
      .then((prevModel: bundleDetailsModel[]) => {
        const [prevSize] = prevModel

        if (isBuildSmallerThanPrevious(parseInt(prevSize.size), parseInt(newSize))) {
          dbController.save()
            .then(data => io.emit('success', { data }))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  })
})
