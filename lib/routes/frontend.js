var express = require('express');
var router = express.Router();
var FrontendController = require('../controllers/FrontendController');
router.get('/sizes', FrontendController.getBundleSizes);
router.post('/analyze', FrontendController.analyzeBundleSizes);
router.post('/save', FrontendController.saveBundleData);
module.exports = router;
//# sourceMappingURL=frontend.js.map