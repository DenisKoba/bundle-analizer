const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const __generator = (this && this.__generator) || function (thisArg, body) {
  let _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
const __read = (this && this.__read) || function (o, n) {
  let m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  let i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    }
    finally { if (e) throw e.error; }
  }
  return ar;
};
const _this = this;
const _a = require('../helpers/bundle-size'), getBundleSize = _a.getBundleSize, isBuildSmallerThanPrevious = _a.isBuildSmallerThanPrevious;
const database = require('../helpers/database');
const socket = require('../socket/socket');
const saveIntoDatabase = function (prevSize, newSize, repoName) {
  console.log('sdfghjfddfgdhtyjukjygfhtdfjygkujyfhtdgrhtfjygkuhgyjfthdg', isBuildSmallerThanPrevious(parseInt(prevSize.size), parseInt(newSize)));
  if (isBuildSmallerThanPrevious(parseInt(prevSize.size), parseInt(newSize))) {
    const date = new Date().getTime();
    return database
      .getController()
      .save(date, newSize, repoName)
      .then(function (data) {
        socket.getIO().emit('success', { data: data });
        return true;
      })
      .catch(function (err) { return console.log(err); });
  }
  socket.getIO().emit('fail', { status: 'failed' });
  return false;
};
exports.getBundleSizes = function (req, res, next) {
  database
    .getController()
    .fetchAll()
    .then(function (data) {
      res.status(200).json({ data: data });
      socket.getIO().getIO().emit('success', data);
    })
    .catch(function (err) { throw new Error(err); });
};
exports.analizeBundleSizes = function (req, res, next) {
  database
    .getController()
    .fetch()
    .then(function (prevModel) { return __awaiter(_this, void 0, void 0, function () {
      let _a, prevSize, _b, nextSize, repo, isAnalized;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _a = __read(prevModel, 1), prevSize = _a[0];
            _b = req.body, nextSize = _b.nextSize, repo = _b.repo;
            return [4 /*yield*/, saveIntoDatabase(prevSize, nextSize, repo)];
          case 1:
            isAnalized = _c.sent();
            res.status(200).json({ status: isAnalized });
            return [2 /*return*/];
        }
      });
    }); })
    .catch(function (err) { throw new Error(err); });
};
//# sourceMappingURL=frontend.js.map