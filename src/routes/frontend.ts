export {}
const express = require('express')

const router = express.Router()
const frontendController = require('../controllers/frontend')

router.get('/sizes', frontendController.getBundleSizes)
router.post('/analyze', frontendController.analyzeBundleSizes)
router.post('/save', frontendController.saveBundleData)


module.exports = router
