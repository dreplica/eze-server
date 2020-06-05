
const searcherFunc = require('../logic/search');

const searchProducts = async (params) => {
	try {
		return await searcherFunc(params);
	} catch (error) {
		console.log(error);
	}
};

const getProducts = async (Model,start=0,limit=0) => {
	try {
		const Product = await Model.find().skip(start).limit(limit);
		return Product;
	} catch (error) {
		console.log(error);
		return { error }
	}
};


module.exports = {
	getProducts,
	searchProducts
};
