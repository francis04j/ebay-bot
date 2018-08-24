const express = require('express');
const buyController = require('../controllers/buyController');
const router = express.Router();

router.get('/', buyController.getCartItems);


module.exports = router;
