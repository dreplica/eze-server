// import { sellModel,buyModel } from "../model/mongooseModel";

const { buyModel, sellModel } = require('../model/mongooseModel');
const { filterSearch } = require('../logic/searcj');

const searchProducts = async (params) => {
	try {
		return await searcherFunc(params);
	} catch (error) {
		console.log(error);
	}
};

const getBuyProduts = async () => {
	try {
		const page = 1;
		const pagination = 10;
		const buyProduct = await buyModel.find().skip().limit(10);
		console.log(buyProduct);
		return buyProduct;
	} catch (error) {
		console.log(error);
	}
};

const getSellProducts = async () => {
	try {
		const page = 1;
		const pagination = 10;
		const buyProduct = await sellModel.find().skip().limit(10);
		console.log(buyProduct);
		return buyProduct;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getBuyProduts,
	getSellProducts,
	searchProducts
};

//git add, i stopped on implementing search functionality
const searcherFunc = async (arr) => {
	const singleGetter = async (val) => {
		console.log('single thing');
		const reg = new RegExp(val, 'i');
		const type = val.toLocaleUpperCase();

		const getBuy = await buyModel.find({
			$or: [
				{ phone: { $regex: reg } },
				{ 'spec.memory': { $regex: reg } },
				{ [`spec.price.${type}`]: { $exists: true } }
			]
		});
		console.log('passed here');
		const getSell = await sellModel.find({
			$or: [
				{ phone: { $regex: reg } },
				{ 'spec.memory': { $regex: reg } },
				{ [`spec.price.${type}`]: { $exists: true } }
			]
		});
		return { buy: getBuy, sell: getSell };
	};

	const doubleSearch = async (arr) => {
		console.log(arr);
		const getBuy = await buyModel.find({
			phone: arr[0],
			[`spec.price.${arr[1]}`]: { $exists: true }
		});
		const getSell = await sellModel.find({
			phone: arr[0],
			[`spec.price.${arr[1]}`]: { $exists: true }
		});
		return { buy: getBuy, sell: getSell };
	};

	const fullSearch = async (arr) => {
		const getBuy = await buyModel.find({
			phone: arr[0],
			[`spec.price.${arr[1]}`]: { $exists: true },
			'spec.memory': arr[2]
		});
		const getSell = await sellModel.find({
			phone: arr[0],
			[`spec.price.${arr[1]}`]: { $exists: true },
			'spec.memory': arr[2]
		});
		return { buy: getBuy, sell: getSell };
	};

	switch (arr.length) {
		case 1:
            // console.log(await singleGetter(arr[0]));
			return filterSearch(await singleGetter(arr[0]), arr);
		case 2:
			result = await doubleSearch(arr);
			return filterSearch(await result, arr);
		case 3:
			result = await fullSearch(arr);
			return filterSearch(result, arr);
		default:
			return [];
	}
};
