const express = require('express');
const router = express.Router();
const { getShop } = require('../controllers/products');

router.get('/', getShop);

module.exports = router;
