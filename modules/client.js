module.hot && module.hot.accept();
console.log('link to ' + __filename);

const init = require('./init');
const fs = require('fs');
//require('aframe');

var s = fs.readFileSync(__dirname + '/client.html', 'utf8');
var e = document.getElementById('content');
e.innerHTML = s;