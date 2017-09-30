module.hot && module.hot.accept();
console.log('link to ' + __filename);

const init = require('./init');
const fs = require('fs');
const hot = require('./hot')(module);

//require('aframe');

const onclick = hot(3, function () {
    var r = this.getAttribute('rotation');
    r = Object.assign({},r);
    r.x -= 90;
    var pla = document.getElementById('player');
    pla.setAttribute('rotation', r);
    var p = this.getAttribute('position');
    p = Object.assign({},p);
    p.y -= 1.6;
    pla.setAttribute('position', p);
});

var compo = {
    init: hot(1, function () {
        //console.log(1,this);
    }),
    update: hot(2, function () {
        //console.log(2,this);
        this.el.addEventListener('click', onclick)
    })
};

if (!module.hot.data) AFRAME.registerComponent('place', compo);


var s = fs.readFileSync(__dirname + '/client.html', 'utf8');
var e = document.getElementById('content');
e.innerHTML = `
${fs.readFileSync(__dirname + '/inspector.html', 'utf8')}
${fs.readFileSync(__dirname + '/client.html', 'utf8')}
`;
