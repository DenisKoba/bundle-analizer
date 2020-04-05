var express = require('express');
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 3000;
var frontendRoutes = require('../routes/frontend');
var bodyParser = require('body-parser');
var server;
var initServer = function () {
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
var getServer = function () {
    if (!server) {
        throw new Error('server is not initialized');
    }
    return server;
};
exports.getServer = getServer;
exports.initServer = initServer;
//# sourceMappingURL=server.js.map