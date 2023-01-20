var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainControllers')

/* GET home page. */
router.post('/create-Payment', mainController.createPayment);
router.get('/execute-payment', mainController.executePayment);
router.get('/cancel-payment', mainController.cancelPayment);

module.exports = router;
