// server.js
// where your node app starts

// init project
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));
app.use(express.static('public'));
app.use(express.static('external'));

app.get('/client.js', browserify(__dirname + '/modules/client.js', {
  plugins: [
    //{ plugin: 'brfs', options: {} }
  ]
}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log('/');
  response.redirect('index.html');
});

// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
