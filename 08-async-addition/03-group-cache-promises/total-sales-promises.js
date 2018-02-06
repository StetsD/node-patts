const pify = require('pify');
const totalSales = pify(require('./total-sales'));

const cache = {};
module.exports = function totalSalesPromises(item){
    if(cache[item]){
        return cache[item];
    }

    cache[item] = totalSales(item)
        .then(res => {
            setTimeout(()=>{
                delete cache[item];
            }, 30 * 1000);
            return res;
        })
        .catch(err => {
            delete cache[item];
            throw err;
        });

    return cache[item];
};
