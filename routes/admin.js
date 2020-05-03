const path = require('path');

const rootDir = require('../utils/path');
const express = require('express');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
	// res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
	res.render('add-product.ejs', {
		pageTitle: 'Add a product',
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	});
});

router.post('/product', (req, res, next) => {
	products.push({ title: req.body.title });
	res.redirect('/');
});

exports.products = products;
exports.router = router;
