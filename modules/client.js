module.hot && module.hot.accept();
console.log('link to ' + __filename);

const init = require('./init');
const fs = require('fs');
var ud = require('ud');
//require('aframe');

var compo = {
  init: ud.defn(module, function () {
  })
};

if(!module.hot.data) AFRAME.registerComponent('do-something-once-loaded', compo);

var s = fs.readFileSync(__dirname + '/client.html', 'utf8');
var e = document.getElementById('content');
e.innerHTML = s;

