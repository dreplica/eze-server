
const searcherFunc = require('../logic/search');
const { buyModel, sellModel } = require('../model/mongooseModel');

const searchProducts = async (params) => {
	try {
		return await searcherFunc(params);
	} catch (error) {
		console.log(error);
	}
};

const getAllProducts = async (start = 0, limit = 5, filter = '1,') => {
	console.log("%cna the filter, {color:red}",filter)
	try {
		const buyPhone = await getProducts(buyModel, start, limit, filter)
		const sellPhone = await getProducts(sellModel, start, limit, filter)

		return [...buyPhone, ...sellPhone]

	} catch (error) {
		return { error }
	}
}

const getProducts = async (Model, start = 0, limit = 10, filter = '1,') => {
	try {
		console.log(filter)
		const [sort, size] = filter.split(",")
		const high = !size ? Infinity : size
		const low = !size ? 0 : size
		console.log("what happened, sort", size)
		const Product = await Model.find({ 'memory': { $gte: low, $lte: high } })
			.skip(start)
			.limit(limit)
			.sort({ price: sort })
		console.log("weting happen", Product)
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
