export {}
const express = require('express')

const router = express.Router()
const FrontendController = require('../controllers/FrontendController')

router.get('/sizes', FrontendController.getBundleSizes)
router.post('/analyze', FrontendController.analyzeBundleSizes)
router.post('/save', FrontendController.saveBundleData)


module.exports = router
