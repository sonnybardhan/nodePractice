const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add a product',
		path: '/admin/add-product',
		editing: false
	});
};

exports.postAddProduct = (req, res, next) => {
	//the body.*** refers to the 'name' attribute in html
	const id = null;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product({ id, title, imageUrl, price, description });
	product.save();
	res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const id = req.params.productId;

	Product.findById(id, (product) => {
		if (!product) return res.redirect('/');

		res.render('admin/edit-product', {
			pageTitle: 'Edit a product',
			path: '/admin/edit-product',
			editing: editMode,
			product
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.productId;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const updatedProduct = new Product({ id, title, imageUrl, price, description });
	updatedProduct.save();
	res.redirect('/admin/products');
};

exports.deleteProduct = (req, res, next) => {
	const id = req.body.productId;
	Product.delete(id);
	res.redirect('/admin/products');
};

exports.adminProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products'
		});
	});
};
