var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainControllers')

/* GET home page. */
router.post('/create-Payment', mainController.createPayment);

module.exports = router;
