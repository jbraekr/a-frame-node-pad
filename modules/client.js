module.hot && module.hot.accept();
const fs = require('fs');
//require('aframe');
//document.writeln("client.js loads");
console.log('link to client.js');
console.log(__filename);
var s = fs.readFileSync(__dirname + '/client.html', 'utf8')
console.log(s);
console.log(new Date());
