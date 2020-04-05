const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8082;
const frontendRoutes = require('../routes/frontend');
const bodyParser = require('body-parser');
let server;
const initServer = function () {
  app.use(bodyParser.json());
  app.use(cors({
    origin: "*",
    allowedHeaders: "Content-type",
    methods: "GET,POST,PUT,DELETE,OPTIONS"
  }));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/build', frontendRoutes);
  server = app.listen(PORT);
};
const getServer = function () {
  if (!server) {
    throw new Error('server is not initialized');
  }
  return server;
};
exports.getServer = getServer;
exports.initServer = initServer;
//# sourceMappingURL=server.js.map