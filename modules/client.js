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

    if (!hot.data) AFRAME.registerComponent('place', compo);

})();

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
            var pc = c.getAttribute('position').y;

            var f = document.getElementById('fixcam');
            var pf = f.getAttribute('position').y;

            this.el.setAttribute('text', { value: `c${pc.toPrecision(3)} f${pf.toPrecision(3)} s${new Date().getSeconds().toLocaleString(undefined,{minimumIntegerDigits:2})}` });
        }),

    };

    if (!hot.data) AFRAME.registerComponent(h, compo);

})();

(function () {
    const h = 'fixcam';
    console.log(__filename + '#' + h);
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
            this.el.setAttribute('position', { y: -p.y + 1.6 });
            /*
            var p2 = this.el.components.position;
            console.log(p2);
            p2.data.y = -p.y + 1.6;
            */
        }),
    };

    if (!hot.data) AFRAME.registerComponent(h, compo);

})();

var s = fs.readFileSync(__dirname + '/client.html', 'utf8');
var e = document.getElementById('content');
e.innerHTML = `
${fs.readFileSync(__dirname + '/inspector.html', 'utf8')}
${fs.readFileSync(__dirname + '/client.html', 'utf8')}
`;
