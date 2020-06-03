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
                        cost.price = checkPrice
                        return cost;
                    }
                })
                
				if (price.length) {
					item.spec = price;
					return item;
				}

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
