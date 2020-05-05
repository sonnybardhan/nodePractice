const express = require('express');
const router = express.Router();
const { getAddProduct, postAddProduct } = require('../controllers/products');

router.get('/add-product', getAddProduct);

router.post('/product', postAddProduct);

module.exports = router;