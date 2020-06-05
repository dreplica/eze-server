
const searcherFunc = require('../logic/search');
const { buyModel,sellModel } = require('../model/mongooseModel');

const searchProducts = async (params) => {
	try {
		return await searcherFunc(params);
	} catch (error) {
		console.log(error);
	}
};

const getAllProducts = async (start=0,limit=5,filter='1,64') => {
	try {
		const buyPhone = await getProducts(buyModel,start,limit,filter)
		const sellPhone = await getProducts(sellModel,start,limit,filter)
		
		return [...buyPhone,sellPhone]

	} catch (error) {
		return {error}
	}
}

const getProducts = async (Model, start = 0, limit = 10, filter='1,*') => {
	try {
		const [sort,size]= filter.split(",")
		console.log("what happened, sort",sort)
		const Product = await Model.find()
			.skip(start)
			.limit(limit)
			.sort({ price: sort })
			// .where('memory', size);
		console.log("weting happen",Product)
		return Product;
	} catch (error) {
		console.log(error);
		return { error }
	}
};


module.exports = {
	getProducts,
	getAllProducts,
	searchProducts
};
