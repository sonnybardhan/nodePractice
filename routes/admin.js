const express = require('express');
const router = express.Router();
const {
	getAddProduct,
	postAddProduct,
	adminProducts,
	getEditProduct,
	postEditProduct,
	deleteProduct
} = require('../controllers/admin');

router.get('/add-product', getAddProduct);
router.get('/products', adminProducts);
router.post('/product', postAddProduct);
router.get('/edit-product/:productId', getEditProduct);
router.post('/edit-product', postEditProduct);
router.post('/delete-product', deleteProduct);

module.exports = router;
