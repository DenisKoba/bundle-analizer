export {}

const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000
const frontendRoutes = require('../routes/frontend')
const bodyParser = require('body-parser')
const helmet = require('helmet')


let server

const initServer = () => {
  app.use(bodyParser.json())
  app.use(cors({
    origin: "*",
    allowedHeaders: "Content-type",
    methods: "GET,POST,PUT,DELETE,OPTIONS" }));
  app.use(helmet())

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use('/build', frontendRoutes)

  server = app.listen(PORT)
}

const getServer = () => {
  if (!server) {
    throw new Error('server is not initialized')
  }

  return server
}

exports.getServer = getServer
exports.initServer = initServer

