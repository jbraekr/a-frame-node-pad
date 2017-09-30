console.log('link to ' + __filename);

const ud = require('ud');

module.exports = function (mod) {
    return function hot(k, fun) {
        //console.log(k,fun);
        return ud.defn(mod, fun, k);
    }
}