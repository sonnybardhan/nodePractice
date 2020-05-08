const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
	static addProduct(id, price) {
		fs.readFile(filePath, (err, fileContents) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContents);
			}
			const existingProductIndex = cart.products.findIndex((product) => product.id === id);
			const existingProduct = cart.products[existingProductIndex];

			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
				cart.products = [ ...cart.products ];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id, qty: 1 };
				cart.products = [ ...cart.products, updatedProduct ];
			}
			cart.totalPrice += +price;
			fs.writeFile(filePath, JSON.stringify(cart), console.log);
		});
	}
	static delete(id, price) {
		fs.readFile(filePath, (err, fileContents) => {
			if (err) return;

			const cart = JSON.parse(fileContents);
			const product = cart.products.find((item) => item.id === id);
			if (!cart.product) return;
			const updatedCart = cart.products.filter((item) => item.id !== id);
			updatedCart.totalPrice -= product.qty * price;

			fs.writeFile(filePath, JSON.stringify(updatedCart), console.log);
		});
	}
	static getCart(cb) {
		fs.readFile(filePath, (err, fileContents) => {
			if (err) {
				cb(null);
			} else {
				const cart = JSON.parse(fileContents);
				cb(cart);
			}
		});
	}
};
