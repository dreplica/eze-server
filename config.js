const fs = require('fs');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly' ];
const TOKEN_PATH = 'token.json';

const config = ()=>new Promise((resolve,reject)=>{
    fs.readFile('credentials.json', async (err, content) => {
        if (err) return reject('Error loading client secret file:', err);
        const web = JSON.parse(content).web;
        console.log('this is content', web);
       return resolve(await authorize(web));
    });
})

function authorize(credentials) {
	const { client_secret, client_id, redirect_uris } = credentials;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	return new Promise((resolve,reject)=>fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return resolve(getNewToken(oAuth2Client))
		oAuth2Client.setCredentials(JSON.parse(token));
		return resolve(oAuth2Client);
    })
    )
}

function getNewToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES
	});
    console.log('Authorize this app by visiting this url:', authUrl);
   
    return oAuth2Client
}

module.exports = config()
