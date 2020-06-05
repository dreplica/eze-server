const { buyModel, sellModel } = require("../model/mongooseModel");

const searcherFunc = async (inclomingVal, filters = []) => {
	const arr = inclomingVal.map((items) => items.toLocaleUpperCase());

	switch (arr.length) {
		case 1:
			const firstBuy = await singleGetter(arr[0], buyModel);
			const firstSell = await singleGetter(arr[0], sellModel);
			return [...firstSell, ...firstBuy]
		case 2:
			const secBuy = await doubleSearch(arr, buyModel);
			const secSell = await doubleSearch(arr, sellModel);
			return [...secBuy, ...secSell]
		case 3:
			console.log("whatsup")
			const thirdBuy = await fullSearch(arr, buyModel);
			const thirdSell = await fullSearch(arr, sellModel);
			console.log(thirdBuy)
			return [...thirdBuy, ...thirdSell]
		default:
			return [];
	}
};

const singleGetter = async (val, model) => {
	const reg = new RegExp(val, 'i');

	const search = await model.find({
		$or: [
			{ phone: { $regex: reg } },
			{ memory: { $regex: reg } },
			{ condition: { $regex: reg } }
		]
	});
	return search;
};

const doubleSearch = async (arr, model) => {
	const reg = new RegExp(arr[0], 'i');
	const type = new RegExp(arr[1], 'i');

	const search = await model.find({
		phone: { $regex: reg },
		condition: { $regex: type }
	});
	return search;
};

const fullSearch = async (arr, model) => {
	const reg = new RegExp(arr[0], 'i');
	const regSize = new RegExp(arr[2], 'i');
	const type = new RegExp(arr[1], 'i');

	const search = await model.find({
		phone: { $regex: reg },
		memory: { $regex: regSize },
		condition: { $regex: type },
	});
	return search;
};

module.exports = searcherFunc