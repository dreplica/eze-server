const { google } = require('googleapis');

const getPhones = (arr) => {
	if (arr.find((x) => /iphone./gi.test(x))) {
		return arr[0];
	}
};

const distributeVaues = (arr = []) => {
	const itemStructure = {
		locked: false,
		memory: 0,
		price: []
	};
	const condition = [ 'NEW', 'A1', 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D' ];
	arr.forEach((item, ind) => {
		switch (ind) {
			case 0:
				itemStructure.locked = item === 'Unlocked' || !item ? false : true;
				break;

			case 1:
				itemStructure.memory = item;
				break;

			default:
				itemStructure.price.push(item);
				break;
		}
	});
	itemStructure.price = itemStructure.price.map((item, ind) => ({ [condition[ind]]: item }));
	return itemStructure;
};

async function buyProductsData(auth) {
	return new Promise((resolve, reject) => {
		const sheets = google.sheets({ version: 'v4', auth });
		sheets.spreadsheets.values.get(
			{
				spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
				range: 'IPHONES!A3:J'
			},
			(err, res) => {
				if (err) return reject({ error: 'The API returned an error: ' + err });
				const rows = res.data.values;
				if (rows.length) {
					const data = rows.reduce(
						(acc, row, ind, arr) => {
							const phone = getPhones(row);
							if (phone) {
								if (phone && acc.count >= 0) {
									acc.item.push(acc.model);
									acc.model = {};
								}
								acc.model.phone = phone;
								acc.model.spec = [];
								acc.count += 1;
							}
							if (acc.model.phone) {
								if (row.find((x) => /\$/gi.test(x))) {
									acc.model.spec.push(distributeVaues(row));
								}
							}

							if (arr.length - 1 === ind) {
								acc.item.push(acc.model);
							}

							return acc;
						},
						{ item: [], model: {}, count: -1 }
					);
					return resolve(data.item);
				} else {
					console.log('No data found.');
					return reject({ error: 'no data available' });
				}
			}
		);
	});
}

async function sellProductsData(auth) {
	console.log('selling');
	return new Promise((resolve, reject) => {
		const sheets = google.sheets({ version: 'v4', auth });
		sheets.spreadsheets.values.get(
			{
				spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
				range: 'IPHONES!L3:U'
			},
			(err, res) => {
				if (err) return reject({ error: 'The API returned an error: ' + err });
				const rows = res.data.values;
				if (rows.length) {
					const data = rows.reduce(
						(acc, row, ind, arr) => {
							const phone = getPhones(row);
							if (phone) {
								if (phone && acc.count >= 0) {
									acc.item.push(acc.model);
									acc.model = {};
								}
								acc.model.phone = phone;
								acc.model.spec = [];
								acc.count += 1;
							}

							if (acc.model.phone) {
								if (row.find((x) => /\$/gi.test(x))) {
									acc.model.spec.push(distributeVaues(row));
								}
							}

							if (arr.length - 1 === ind) {
								acc.item.push(acc.model);
							}

							return acc;
						},
						{ item: [], model: {}, count: -1 }
					);
					return resolve(data.item);
				} else {
					console.log('No data found.');
					return reject({ error: 'No data found' });
				}
			}
		);
	});
}

module.exports = {
	buyProductsData,
	sellProductsData
};
