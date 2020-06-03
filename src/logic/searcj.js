const filterSearch = (searchResult, arr) => {
    
	const Buyseperate = searchResult.buy.map((item) => ({ ...item._doc, market: 'buy' }));
	const Sellseperate = searchResult.sell.map((item) => ({ ...item._doc, market: 'sell' }));
    const result = [...Buyseperate, ...Sellseperate];
    console.log(result)
	switch (arr.length) {
		case 1:
			const val = new RegExp(arr[0], 'i');
			const type = arr[0].toLocaleUpperCase();
			return result.map((item) => {
				if (val.test(item.phone)) return item;
				console.log(item);
				item.spec = item.spec.filter((spec) => {
					console.log('first filter');
					if (val.test(spec.memory)) return spec;
					spec.price = spec.price.filter((test) => test[type]);
					console.log('second filter');
					if (spec.price) return spec;
				});
				return item;
			});
		case 2:
			phone = new RegExp(arr[0], 'i');
			type = arr[1].toLocaleUppercase();
			return result.filter((item) => {
				if (phone.test(item.phone)) {
					item.spec.price = item.spec.price.filter((test) => test[type]);
					return item;
				}
			});
		case 3:
			phone = new RegExp(arr[0], 'i');
			type = arr[1].toLocaleUppercase();
			size = new RegExp(arr[3], 'i');
			return result.filter((item) => {
				if (phone.test(item.phone)) {
					if (size.item.spec.memory) {
						item.spec.price = item.spec.price.filter((test) => test[type]);
						return item;
					}
				}
			});
		default:
			return [];
	}
};

module.exports = {
	filterSearch
};
