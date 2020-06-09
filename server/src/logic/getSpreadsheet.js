const { google } = require('googleapis');

const getPhones = (arr) => {
	if (arr.find((x) => /iphone./gi.test(x))) {
		return arr[0];
	}
};

const distributeValues = (arr = []) => {

	const condition = ['NEW', 'A1', 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D'];
	let count = 0;
	const itemStructure = {
		locked: false,
		memory: 0,
		price: {}
	};

	arr.forEach((item, ind) => {
		switch (ind) {
			case 0:
				itemStructure.locked = item === 'Unlocked' || !item ? false : true;
				break;

			case 1:
				itemStructure.memory = item.match(/\d+/)[0];
				break;

			default:
				itemStructure.price[condition[count]] = parseInt((item).replace(/\D/g, ""));
				count += 1;
				break;
		}
	});
	return itemStructure;
};

export async function setProductsData(auth, Xpath, purpose) {
	return new Promise((resolve, reject) => {
		const sheets = google.sheets({ version: 'v4', auth });
		sheets.spreadsheets.values.get(
			{
				spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
				range: Xpath
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
								acc.model.sale = purpose
								acc.model.image = phone.replace(/\s/g, "_").toLocaleLowerCase()
								acc.model.spec = [];
								acc.count += 1;
							}
							if (acc.model.phone) {
								if (row.find((x) => /\$/gi.test(x))) {
									acc.model.spec.push(distributeValues(row));
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

// module.exports = {
// 	setProductsData,
// };
