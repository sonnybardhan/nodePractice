const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('add-product.ejs', {
		pageTitle: 'Add a product',
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	});
};

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};

exports.getShop = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true
		});
	});
};
