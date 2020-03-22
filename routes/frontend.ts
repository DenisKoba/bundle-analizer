export {}
const express = require('express')

const router = express.Router()
const frontendController = require('../controllers/frontend')

router.get('/sizes', frontendController.getBundleSizes)


module.exports = router
