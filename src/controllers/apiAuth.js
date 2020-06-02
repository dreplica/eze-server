const auth = require('../../config')
const fs = require('fs')
const TOKEN_PATH = 'token.json'

const updateToken = async (code) => {
    console.log("no breakpoint")
    const oAuth2Client = await auth
    console.log("auth", oAuth2Client)
    oAuth2Client.getToken(code, (err, token) => {
        console.log("getting token")
        if (err) {
           return  console.error('Error while trying to retrieve access token', err)
            // return reject(err)
        };
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) {
               return  console.error(err);
                // return reject(err)
            }
            console.log('Token stored to', TOKEN_PATH);
        });
        // return resolve(oAuth2Client);
    })
}

module.exports = {
    updateToken
}