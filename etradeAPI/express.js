const express = require('express')
const fetch = require('node-fetch');
const app = express()
const port = 3000
const dotenv = require('dotenv');
dotenv.config();
const token = process.env['TOKEN'];
const secret = process.env['SECRET'] 
var etrade = require('etrade');
 
var configuration = 
{
  useSandbox : true|false, // true if not provided
  key : token,
  secret : secret,
}
 
var et = new etrade(configuration);

// fetch(`https://api.etrade.com/oauth/${token}`)
//     .then(res => res.text())
//     .then(text => app.get('/', (req, res) => {
//       res.send(text)
//     }))

et.getRequestToken(
  function(authorizationUrl) { 
    // Your service requires users, who will need to visit
    // the following URL and, after logging in and 
    // authorizing your service to access their account
    // data, paste the E*TRADE provided verification
    // code back into your application.

    console.log("Please have your client visit " + 
                authorizationURL + 
                " to authorize your service"); },
  function(error) { 
    console.log("Error encountered while attempting " +
                "to retrieve a request token: " + 
                error); }
);

et.getAccessToken(verificationCode,
  function() {
    // Your app can start using other E*TRADE API now
  },
  function(error) {
    console.log("Error encountered while attempting " +
                "to exchange request token for access token: " +
                error);
  }
);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
