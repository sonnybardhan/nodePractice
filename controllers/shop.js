const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	//getProducts in the video
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'Shop',
			path: '/'
		});
	});
};

exports.getProduct = (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id, (product) => {
		res.render('shop/product-detail', {
			prod: product,
			path: `/products`,
			pageTitle: product.title
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Products',
			path: '/products '
		});
	});
};

exports.getCart = (req, res, next) => {
	Cart.getCart((cart) => {
		Product.fetchAll((products) => {
			const cartItems = [];
			for (let product of products) {
				const cartProduct = cart.products.find((item) => item.id === product.id);
				if (cartProduct) {
					cartItems.push({ product, qty: cartProduct.qty });
				}
			}
			res.render('shop/cart', {
				pageTitle: 'Cart',
				path: '/cart',
				products: cartItems
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const id = req.body.productId;
	Product.findById(id, (product) => {
		Cart.addProduct(id, product.price);
	});
	res.redirect('/');
};

exports.postCartDeleteItem = (req, res, next) => {
	const id = req.body.productId;
	Product.findById(id, (product) => {
		Cart.delete(id, product.price);
		res.redirect('/cart');
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout'
	});
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Orders',
		path: '/orders'
	});
};
