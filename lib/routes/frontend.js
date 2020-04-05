const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontend');
router.get('/sizes', frontendController.getBundleSizes);
router.post('/analize', frontendController.analizeBundleSizes);
module.exports = router;
//# sourceMappingURL=frontend.js.map