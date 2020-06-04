// import { sellModel,buyModel } from "../model/mongooseModel";

const { buyModel, sellModel } = require('../model/mongooseModel');
const { filterSearch } = require('../logic/search');

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
		const buyProduct = await buyModel.find();
		console.log(buyProduct);
		return buyProduct;
	} catch (error) {
		console.log(error);
		return { error }
	}
};

const getSellProducts = async () => {
	try {
		const page = 1;
		const pagination = 10;
		const buyProduct = await sellModel.find();
		console.log(buyProduct);
		return buyProduct;
	} catch (error) {
		console.log(error);
		return { error }
	}
};

module.exports = {
	getBuyProduts,
	getSellProducts,
	searchProducts
};

//git add, i stopped on implementing search functionality
const searcherFunc = async (inclomingVal) => {
	const arr = inclomingVal.map((items) => items.toLocaleUpperCase());
	const singleGetter = async (val) => {
		console.log('single thing');
		const reg = new RegExp(val, 'i');
		const type = val.toLocaleUpperCase();

		const getBuy = await buyModel.find({
			$or: [
				{ phone: { $regex: reg } },
				{ memory: { $regex: reg } },
				{ condition: type }
			]
		});
		console.log('passed here');
		const getSell = await sellModel.find({
			$or: [
				{ phone: { $regex: reg } },
				{ memory: { $regex: reg } },
				{ condition: type }
			]
		});
		return { buy: getBuy, sell: getSell };
	};

	const doubleSearch = async (arr) => {
		console.log(arr);
		const reg = new RegExp(arr[0], 'i');
		const getBuy = await buyModel.find({
			phone: { $regex: reg },
			condition:type
		});
		const getSell = await sellModel.find({
			phone: { $regex: reg },
			condition:type
		});
		return { buy: getBuy, sell: getSell };
	};

	const fullSearch = async (arr) => {
		const reg = new RegExp(arr[0], 'i');
		const regSize = new RegExp(arr[2], 'i');
		const getBuy = await buyModel.find({
			phone: { $regex: reg },
			memory: { $regex: regSize },
			condition: type,
		});
		const getSell = await sellModel.find({
			phone: { $regex: reg },
			memory: { $regex: regSize },
			condition: type,
		});
		return { buy: getBuy, sell: getSell };
	};

	switch (arr.length) {
		case 1:
			return filterSearch(await singleGetter(arr[0]), arr);
		case 2:
			return filterSearch(await doubleSearch(arr), arr);
		case 3:
			return filterSearch(await fullSearch(arr), arr);
		default:
			return [];
	}
};
