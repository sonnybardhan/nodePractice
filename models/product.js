const fs = require('fs');
const path = require('path');

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

module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(filePath, JSON.stringify(products), console.log);
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}
};
