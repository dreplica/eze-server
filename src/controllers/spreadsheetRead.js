const { google } = require('googleapis')

async function buyProductsData(auth) {
    return new Promise((resolve, reject) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get(
            {
                spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
                range: 'IPHONES!A3:J'
            },
            (err, res) => {
                if (err) return reject('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('buying, Major:');
                    // Print columns A2 to J, which correspond to indices 0 and 4.
                    rows.map((row) => {
                        const model = {
                            phone: "", spec: [{
                                memory: "",
                                price: 0,
                                quantity: 0
                            }]
                        };
                        // console.log(row);
                        if (row.length === 1 && /iphone\./i.test(row)) {
                        console.log("start "+row[0]+" end");
                        }
                    });
                } else {
                    console.log('No data found.');
                }
            }
        );
    });
}

async function sellProductsData(auth) {
    return new Promise((resolve, reject) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get(
            {
                spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
                range: 'IPHONES!L2:U'
            },
            (err, res) => {
                if (err) return reject('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('selling, Major:');
                    // Print columns A2 to J, which correspond to indices 0 and 4.
                    rows.map((row, i) => {
                        const model = {};
                        // if (row[i].length === 1 && /iphone/gi.test(row[i])) {
                        // model.phone = row[i];
                        // }
                        console.log(row);
                    });
                } else {
                    console.log('No data found.');
                }
            }
        );
    });
}

module.exports = {
    buyProductsData,
    sellProductsData
}