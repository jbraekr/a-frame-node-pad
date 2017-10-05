console.log('link to ' + __filename);

const ud = require('ud');

module.exports = function (mod) {
    if (mod.hot) {
        var hot = function (k, fun) {
            //console.log(k,fun);
            return ud.defn(mod, fun, k);
        }
        hot.data = mod.hot.data;
    } else {
        var hot = function (k, fun) {
            //console.log(k,fun);
            return fun;
        }
        hot.data = null;
    }
   return hot;
}