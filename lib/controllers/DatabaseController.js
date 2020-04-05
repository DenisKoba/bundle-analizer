var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BundleDetailsSchema = new Schema({
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
var DBmodel = mongoose.model('DBmodel', BundleDetailsSchema);
module.exports = /** @class */ (function () {
    function DatabaseController(size, date, repo) {
        this.size = size;
        this.date = date;
        this.repo = repo;
        this.bundle = null;
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
            repo: repoName,
        });
        return this.bundle
            .save()
            .then(function (data) { return data; })
            .catch(function (err) { return console.log('Failed to save the bundle size', err); });
    };
    DatabaseController.prototype.fetchAll = function () {
        return DBmodel
            .find()
            .then(function (data) {
            return data;
        })
            .catch(function (err) { return console.log('Failed to fetch all bundle sizes', err); });
    };
    DatabaseController.prototype.fetchLast = function (repo) {
        return DBmodel
            .find({ repo: repo }).sort({ _id: -1 }).limit(1)
            .then(function (data) {
            console.log(data);
            return data;
        })
            .catch(function (err) { return console.log('Failed to fetch the latest bundle size', err); });
    };
    return DatabaseController;
}());
//# sourceMappingURL=DatabaseController.js.map