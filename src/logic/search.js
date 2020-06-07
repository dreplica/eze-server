const { buyModel, sellModel } = require("../model/mongooseModel");

//because both tables are queried differently, need to sort them

const searcherFunc = async (arr, page, limit, filter) => {
	const sortBothTables = (a, b) => {
		if (filter.sort === "1") {
			console.log("wow")
			if (a.price - b.price < 0) return 1;
			return -1;
		}
		return 1;
	}
	
	switch (arr.length) {
		case 0:
			return [];

		case 1:
			const val = parseInt(arr[0]) 
			const size = val? { low: val, high: val,sort:filter.sort } : filter;
			const firstBuy = await singleGetter(arr[0], buyModel, page, limit, size);
			const firstSell = await singleGetter(arr[0], sellModel, page, limit, size);
			return [...firstSell, ...firstBuy].sort(sortBothTables)
		
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
	const reg = new RegExp(val, 'ig');
	console.log(filter)
	const search = await model.find({
		'memory': { $gte: filter.low, $lte: filter.high },
		$and: [
			{
				$or: [
					{ phone: { $regex: reg } },
					{memory:filter.low},
					{ condition: { $regex: reg } }
				]
			}]
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