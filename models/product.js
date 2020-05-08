const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
	fs.readFile(filePath, (err, fileContents) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContents));
		}
	});
};

const writeToFile = (products) => {
	fs.writeFile(filePath, JSON.stringify(products), console.log);
};

module.exports = class Product {
	constructor({ id, title, imageUrl, description, price }) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex((product) => product.id === this.id);
				const updatedProducts = [ ...products ];
				updatedProducts[existingProductIndex] = this;
				writeToFile(updatedProducts);
			} else {
				this.id = Math.random().toString();
				products.push(this);
				writeToFile(products);
			}
		});
	}

	static delete(id) {
		getProductsFromFile((products) => {
			const product = products.find((item) => item.id === id);
			const remainingProducts = products.filter((product) => product.id !== id);
			fs.writeFile(filePath, JSON.stringify(remainingProducts), (err) => {
				if (!err) {
					Cart.delete(id, product.price);
				}
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile((products) => {
			const product = products.find((item) => item.id === id);
			cb(product);
		});
	}
};
