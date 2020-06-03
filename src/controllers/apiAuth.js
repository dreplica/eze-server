const auth = require('../../config')
const fs = require('fs')
const TOKEN_PATH = 'token.json'

const updateToken = async (code) => {
    const oAuth2Client = await auth
    console.log("auth", oAuth2Client)
    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
           return  console.error('Error while trying to retrieve access token', err)
        };
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) {
               return  console.error(err);
            }
            console.log('Token stored to', TOKEN_PATH);
        });
    })
}

module.exports = {
    updateToken
}