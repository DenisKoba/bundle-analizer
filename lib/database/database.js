var DatabaseController = require('../controllers/DatabaseController');
var mongoose = require('mongoose');
var _db;
var dbcontroller;
// @ts-ignore
var connect = function () {
    return mongoose.connect("mongodb+srv://" + process.env.DB_USER_NAME + ":" + process.env.DB_PASSWORD + "@clusterbuildanalizer-r9lb1.mongodb.net/dbmodels")
        .then(function (client) {
        return client;
    })
        .catch(function (err) { return console.log('failed to connect'); });
};
var setupController = function (newSize, date, repo) {
    if (newSize === void 0) { newSize = 0; }
    if (date === void 0) { date = ''; }
    if (repo === void 0) { repo = ''; }
    dbcontroller = new DatabaseController(newSize, date, repo);
};
var getController = function () {
    if (!dbcontroller) {
        throw new Error('no db controller available');
    }
    return dbcontroller;
};
var mongoDB = function () {
    if (_db) {
        return _db;
    }
    return console.log('No database available');
};
exports.connect = connect;
exports.mongoDB = mongoDB;
exports.setupController = setupController;
exports.getController = getController;
//# sourceMappingURL=database.js.map