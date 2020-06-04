const filterSearch = (searchResult, arr) => {
	const Buyseperate = searchResult.buy.map((item) => ({ ...item._doc, market: 'buy' }));
	const Sellseperate = searchResult.sell.map((item) => ({ ...item._doc, market: 'sell' }));
	const result = [ ...Buyseperate, ...Sellseperate ];
	switch (arr.length) {
		case 1:
			const val = new RegExp(arr[0], 'i');
			const type = arr[0].toLocaleUpperCase();
			return result.map((item) => {
				if (val.test(item.phone)) return item;

				const memory = item.spec.filter((memory) => val.test(memory.memory));
				if (memory.length) {
					item.spec = memory;
					return item;
				}

				const price = item.spec.map((cost) => {
					const checkPrice = cost.price.filter((test) => test[type]);
					if (checkPrice.length) {
						cost.price = checkPrice;
						return cost;
					}
				});

				if (price.length) {
					item.spec = price;
					return item;
				}

				return item;
			});
		case 2:
			const phone2 = new RegExp(arr[0], 'i');
			const type2 = arr[1].toLocaleUpperCase();
			return result.filter((item) => {
				if (phone2.test(item.phone)) {
					const price = item.spec.map((cost) => {
						const checkPrice = cost.price.filter((test) => test[type2]);
						if (checkPrice.length) {
							cost.price = checkPrice;
							return cost;
						}
					});

					if (price.length) {
						item.spec = price;
						return item;
					}
				}
			});

		case 3:
			const phone3 = new RegExp(arr[0], 'i');
			const type3 = arr[1].toLocaleUpperCase();
			const size = new RegExp(arr[2], 'i');
			return result.filter((item) => {
				if (phone3.test(item.phone)) {
					const price = item.spec.map((cost) => {
						const checkPrice = cost.price.filter((test) => test[type3]);
						if (checkPrice.length) {
							cost.price = checkPrice;
							return cost;
						}
					});

					if (price.length) {
                        const memorySearch = price.filter((memory) => size.test(memory.memory));
						if (memorySearch.length) {
							item.spec = memorySearch;
							return item;
						}
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
