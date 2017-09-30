module.hot && module.hot.accept();
console.log('link to ' + __filename);

const init = require('./init');
const fs = require('fs');
const hot = require('./hot')(module);

//require('aframe');

function dup(o) {
    return Object.assign({},o);
}

const onclick = hot(3, function () {
    var p = dup(this.getAttribute('position'));
    p.y -= 1.6;
    var r = dup(this.getAttribute('rotation'));
    r.x -= 90;
    var pla = document.getElementById('player');
    /*
    pla.setAttribute('animation__pos', {
        property: position, to: p,
            dur: 1000, easing: easeInOutSine, dir: normal,
    });
    */
    pla.setAttribute('animation__pos', `
        property: position; to: ${AFRAME.utils.coordinates.stringify(p)};
        dur: 4000; easing: easeInOutSine; dir: normal;
        restartEvents: restart
    `);
    pla.setAttribute('animation__rot', `
        property: rotation; to: ${AFRAME.utils.coordinates.stringify(r)};
        dur: 4000; easing: easeInOutSine;
        restartEvents: restart
    `);
    pla.emit('restart');
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
