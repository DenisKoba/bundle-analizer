const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BundleDetailsSchema = new Schema({
  date: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: true,
  }
});
const DBmodel = mongoose.model('DBmodel', BundleDetailsSchema);
module.exports = /** @class */ (function () {
  function DatabaseController(size, date, repo) {
    this.repo = '';
    this.size = '';
    this.date = '';
    this.bundle = null;
    this.size = size;
    this.date = date;
    this.repo = repo;
    this.bundle = new DBmodel({
      size: size,
      date: date,
      repo: repo
    });
  }
  DatabaseController.prototype.save = function (date, newSize, repoName) {
    this.bundle = new DBmodel({
      size: newSize,
      date: date,
      repo: repoName
    });
    console.log('BUNDLE', this.bundle);
    return this.bundle
      .save()
      .then(function (data) {
        return data;
      })
      .catch(function (err) { return console.log(err); });
  };
  DatabaseController.prototype.fetchAll = function () {
    return DBmodel
      .find()
      .then(function (data) {
        return data;
      })
      .catch(function (err) { return console.log('ERROR', err); });
  };
  DatabaseController.prototype.fetch = function () {
    return DBmodel
      .find().sort({ _id: -1 }).limit(1)
      .then(function (data) {
        return data;
      })
      .catch(function (err) { return console.log('ERROR', err); });
  };
  return DatabaseController;
}());
//# sourceMappingURL=dbcontroller.js.map