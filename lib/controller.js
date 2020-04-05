const database = require('./database');
const MobileBundle = require('./database').MobileBundle;
module.exports = /** @class */ (function () {
  function DatabaseController(size, date, repo) {
    this.repo = '';
    this.size = '';
    this.date = '';
    this.bundle = null;
    this.size = size;
    this.date = date;
    this.repo = repo;
    this.bundle = new MobileBundle({
      size: size,
      date: date,
      repo: repo
    });
  }
  DatabaseController.prototype.save = function () {
    return this.bundle
      .save()
      .then(function (data) {
        return data;
      })
      .catch(function (err) { return console.log(err); });
  };
  DatabaseController.prototype.fetch = function () {
    return MobileBundle
      .find().sort({ _id: -1 }).limit(1)
      .then(function (data) {
        return data;
      })
      .catch(function (err) { return console.log('ERROR', err); });
  };
  return DatabaseController;
}());
//# sourceMappingURL=controller.js.map