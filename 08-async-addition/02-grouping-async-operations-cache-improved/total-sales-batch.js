const totalSales = require('./total-sales');

const queues = {};
module.exports = function totalSalesBatch(item, cb){
    if(queues[item]){
        console.log('Batching operation');
        return queues[item].push(cb);
    }

    queues[item] = [cb];
    totalSales(item, (err, res) => {
        const queue = queues[item];
        queues[item] = null;
        queue.forEach(cb => cb(err, res));
    });
};
