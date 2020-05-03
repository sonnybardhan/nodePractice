const path = require('path');

const rootDir = require('../utils/path');
const express = require('express');
const router = express.Router();
const { products } = require('./admin');

router.get('/', (req, res, next) => {
	// console.log(products);
	res.render('shop', {
		prods: products,
		pageTitle: 'Shop',
		path: '/',
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true
	});
});

module.exports = router;
