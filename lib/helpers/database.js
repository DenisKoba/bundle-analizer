const DatabaseController = require('../controllers/dbcontroller');
const mongoose = require('mongoose');
let _db;
let dbcontroller;
// @ts-ignore
const connect = function () {
  return mongoose.connect('mongodb+srv://socialtech:Socialtechnologies@clusterbuildanalizer-r9lb1.mongodb.net/test?retryWrites=true&w=majority')
    .then(function (client) {
      return client;
    })
    .catch(function (err) { return console.log(err); });
};
const setupController = function (newSize, date, repo) {
  if (newSize === void 0) { newSize = 0; }
  if (date === void 0) { date = ''; }
  if (repo === void 0) { repo = ''; }
  dbcontroller = new DatabaseController(newSize, date, repo);
};
const getController = function () {
  if (!dbcontroller) {
    throw new Error('no db controller available');
  }
  return dbcontroller;
};
const mongoDB = function () {
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