// server.js
// where your node app starts

// init project
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

var mode = process.argv[2] || "live";//keep it "live" in git
console.log(process.argv, mode, new Date());
switch (mode) {
  case "frozen": useBrowserify(); break;
  case "live": useBrowserify(true); break;
  default: process.exit(1);
}
//useBrowserifyMiddleware();

// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// browserify- variants

function useBrowserifyMiddleware() {
  const browserify = require('browserify-middleware');
  app.get('/client.js', browserify(__dirname + '/modules/client.js', {
    plugins: [
      { plugin: 'browserify-hmr', options: {} }
    ],
    transform: ['brfs']
  }));
}

function useBrowserify(live) {
  console.log('useBrowserify', live);
  const browserify = require('browserify');

  var b = browserify({
    cache: {}, packageCache: {},
    entries: ['modules/client.js'],
    debug: !!live
  });

  b.plugin(require('watchify'));
  b.on('update', bundle);

  if (live) {
    b.plugin(require('browserify-hmr'));
  } else {
    b.require('ud/noop', { expose: 'ud' });
  }

  b.transform(require('brfs'));

  bundle();

  function bundle() {
    b.bundle().pipe(fs.createWriteStream('build/client.js'));
  }

}
