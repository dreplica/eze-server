const { buyModel, sellModel } = require("../model/mongooseModel");

const searcherFunc = async (arr, page, limit, filter) => {

	//because both tables are queried differently, need to sort them
	const sortBothTables = (a, b) => {
		if (filter.sort === "1") {
			console.log("wow")
			if (a.price - b.price < 0) return 1;
			return -1;
		}
		return 1;
	}


	switch (arr.length) {
		case 1:
			const firstBuy = await singleGetter(arr[0], buyModel, page, limit, filter);
			const firstSell = await singleGetter(arr[0], sellModel, page, limit, filter);
			return [...firstSell, ...firstBuy]
		case 2:
			const secBuy = await doubleSearch(arr, buyModel, page, limit, filter);
			const secSell = await doubleSearch(arr, sellModel, page, limit, filter);
			return [...secBuy, ...secSell].sort(sortBothTables)
		case 3:
			console.log("whatsup")
			const thirdBuy = await fullSearch(arr, buyModel, page, limit, filter);
			const thirdSell = await fullSearch(arr, sellModel, page, limit, filter);
			console.log(thirdBuy)
			return [...thirdBuy, ...thirdSell].sort(sortBothTables)
		default:
			return [];
	}
};

const singleGetter = async (val, model, page, limit, filter) => {
	const reg = new RegExp(val, 'i');

	const search = await model.find({
		'memory': { $gte: filter.low, $lte: filter.high },
		$or: [
			{ phone: { $regex: reg } },
			{ memory: parseInt(val) ? parseInt(val) : { $exists: true } },
			{ condition: { $regex: reg } }
		]
	}).skip(page).limit(limit).sort({ price: filter.sort })
	return search;
};

const doubleSearch = async (arr, model, page, limit, filter) => {
	const reg = new RegExp(arr[0], 'i');
	const type = new RegExp(arr[1], 'i');

	const search = await model.find({
		'memory': { $gte: filter.low, $lte: filter.high },
		phone: { $regex: reg },
		condition: { $regex: type }
	}).skip(page).limit(limit).sort({ price: filter.sort })
	return search;
};

const fullSearch = async (arr, model, page, limit, filter) => {
	const reg = new RegExp(arr[0], 'i');
	const regSize = parseInt(arr[2]);
	const type = new RegExp(arr[1], 'i');

	console.log("this is sort", filter.sort)

	const search = await model.find({
		phone: { $regex: reg },
		memory: regSize,
		condition: { $regex: type },
	}).skip(page).limit(limit).sort({ price: filter.sort })
	return search;
};

module.exports = searcherFunc