
const searcherFunc = require('../logic/search');
const { buyModel, sellModel } = require('../model/mongooseModel');

const searchProducts = async (search, page = 0, limit = 5, filter = '1,') => {
	const [sort, size] = filter.split(",")
	const high = !size ? Infinity : size
	const low = !size ? 0 : size

	try {
		return await searcherFunc(search, page, limit, { sort, high, low });
	} catch (error) {
		console.log(error);
	}
};

const getAllProducts = async (start = 0, limit = 5, filter = '1,') => {
	
	const [sort] = filter.split(",")
	const sortBothTables = (a, b) => {
		if (sort === "1") {
			if (a.price - b.price < 0) return 1;
			return -1;
		}
		return 1;
	}
	
	try {
		const buyPhone = await getProducts(buyModel, start, limit, filter)
		const sellPhone = await getProducts(sellModel, start, limit, filter)

		const result = [...buyPhone,...sellPhone]


		switch (sort) {
			case "1"|'-1':
				return result.sort(sortBothTables)
			default:
				return result;
		}

	} catch (error) {
		return { error }
	}
}

const getProducts = async (Model, start = 0, limit = 10, filter = '1,') => {
	try {
		const [sort, size] = filter.split(",")
		const high = !size ? Infinity : size
		const low = !size ? 0 : size

		const Product = await Model.find({ 'memory': { $gte: low, $lte: high } })
			.skip(start)
			.limit(limit)
			.sort({ price: sort })

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
