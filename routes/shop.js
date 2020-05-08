const express = require('express');
const router = express.Router();
const {
	getProducts,
	getProduct,
	getIndex,
	getCart,
	getCheckout,
	getOrders,
	postCart,
	postCartDeleteItem
} = require('../controllers/shop');

router.get('/', getProducts);
router.get('/products', getIndex);
router.get('/product/:productId', getProduct);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders);
router.post('/cart-delete-item', postCartDeleteItem);

module.exports = router;
