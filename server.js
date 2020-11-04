const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const port = process.env.PORT || 8080;
const app = express();

app.use(sslRedirect());
app.use(express.static(__dirname + '/dist'));
app.get(/.*/, function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});
app.listen(port);

console.log('Server started bro...');
