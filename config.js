const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [ 'https://www.googleapis.com/auth/spreadsheets.readonly' ];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const config = ()=>new Promise((resolve,reject)=>{
    fs.readFile('credentials.json', (err, content) => {
        if (err) return reject('Error loading client secret file:', err);
        const web = JSON.parse(content).web;
        console.log('this is content', web);
       return resolve(authorize(web));
    });
})

module.exports = config()

function authorize(credentials) {
	const { client_secret, client_id, redirect_uris } = credentials;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	return new Promise((resolve,reject)=>fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getNewToken(oAuth2Client, resolve,reject);
		oAuth2Client.setCredentials(JSON.parse(token));
		return resolve(oAuth2Client);
    })
    )
}


function getNewToken(oAuth2Client, resolve,reject) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.error('Error while trying to retrieve access token', err)
                return reject(err)
            };
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) {
                    console.error(err);
                    return reject(err)
                }
				console.log('Token stored to', TOKEN_PATH);
			});
			return resolve(oAuth2Client);
		});
	});
}


async function buyProductsData(auth) {
	return new Promise((resolve, reject) => {
		const sheets = google.sheets({ version: 'v4', auth });
		sheets.spreadsheets.values.get(
			{
				spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
				range: 'IPHONES!A2:J'
			},
			(err, res) => {
				if (err) return reject('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					console.log('Name, Major:');
					// Print columns A2 to J, which correspond to indices 0 and 4.
					rows.map((row, i) => {
						const model = {};
						if (row[i].length === 1 && /iphone/gi.test(row[i])) {
							model.phone = row[i];
						}
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
	SCOPES,
	buyProductsData,
	google
};
