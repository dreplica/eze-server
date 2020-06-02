const { google } = require('googleapis');
const { buyModel } = require('../model/mongooseModel');

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
                    const data = rows.reduce((acc,row,ind,arr) => {

                        const phone = getPhones(row)
                        if (phone) {
                            if (phone && acc.count >= 0) {
                                acc.item.push(acc.model);
                                acc.model = {}
                            }
                            acc.model.phone = phone;
                            acc.model.spec = []
                            acc.count += 1;
                        }
                        if (acc.model.phone) {
                            if (row.find(x => /\$/ig.test(x))) {
                                acc.model.spec.push(distributeVaues(row))
                            }
                        }

                        if (arr.length - 1 === ind) {
                            acc.item.push(acc.model);
                        }

                        return acc;
                    },{item:[],model:{},count:-1});

                    console.log(data.item)
                    return resolve(data.item)
                } else {
                    console.log('No data found.');
                }
            }
        );
    });
}

const sellProductsData = ()=>{}

module.exports = {
    buyProductsData,
    sellProductsData
}


const getPhones = (arr) => {
    if (arr.find(x => /iphone./ig.test(x))) {
        return arr[0]
    }
}

const distributeVaues = (arr = []) => {
    const itemStructure = {
        locked: true,
        memory: 0,
        price: []
    }

    arr.forEach((item, ind) => {
        switch (ind) {
            case 0:
                if (/unlocked|\S/i.test(item)) itemStructure.locked = false;
                break;

            case 1:
                itemStructure.memory = item;
                break;

            default:
                itemStructure.price.push(item)
                break;
        }
    })
    return itemStructure
}