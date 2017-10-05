// server.js
// where your node app starts

// init project
var browserify = require('browserify');
var watchify = require('watchify');
var express = require('express');
var app = express();
var fs = require('fs');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));
app.use(express.static('public'));
app.use(express.static('external'));
app.use(express.static('build'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log('/');
  response.redirect('index.html');
});

// Build bundle https://www.npmjs.com/package/watchify
var b = browserify({
  cache: {}, packageCache: {},
  entries: ['modules/client.js'],
});
b.plugin(watchify);
b.transform(require('brfs'));
b.plugin(require('browserify-hmr'));

b.on('update', bundle);
bundle();

function bundle() {
  b.bundle().pipe(fs.createWriteStream('build/client.js'));
}

// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
