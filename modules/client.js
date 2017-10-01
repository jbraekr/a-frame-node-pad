module.hot && module.hot.accept();
console.log(__filename);

const init = require('./init');
const fs = require('fs');
const hot = require('./hot')(module);

//require('aframe');

function dup(o) {
    return Object.assign({}, o);
}

(function place() {
    const h = "place";
    const onclick = hot(h + 3, function () {
        var p = dup(this.getAttribute('position'));
        p.y -= 1.6;
        var r = dup(this.getAttribute('rotation'));
        r.x -= 90;
        var pla = document.getElementById('player');
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
        init: hot(h + 1, function () {
            //console.log(1,this);
        }),
        update: hot(h + 2, function () {
            //console.log(2,this);
            this.el.addEventListener('click', onclick)
        })
    };

    if (!module.hot.data) AFRAME.registerComponent('place', compo);

})()

console.log(__filename + '#status');
(function status() {
    const h = 'status';
    var compo = {
        init: hot(h + 1, function () {
            //console.log(1,this);
        }),
        update: hot(h + 2, function () {
            //console.log(2, this);
        }),
        tick: hot(h + 4, function (time, timeDelta) {
            //console.log(4,this);
            var c = document.getElementsByTagName('a-camera')[0];
            var p = c.getAttribute('position');
            p = AFRAME.utils.coordinates.stringify(p);
            this.el.setAttribute('text', { value: p + ' ' + new Date().getSeconds() });
        }),
    };

    if (!module.hot.data) AFRAME.registerComponent(h, compo);

})()


var s = fs.readFileSync(__dirname + '/client.html', 'utf8');
var e = document.getElementById('content');
e.innerHTML = `
${fs.readFileSync(__dirname + '/inspector.html', 'utf8')}
${fs.readFileSync(__dirname + '/client.html', 'utf8')}
`;
