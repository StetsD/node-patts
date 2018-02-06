const totalSales = require('./total-sales');

const queues = {};
const cache = {};

module.exports = function totalSalesBatch(item, cb){
    const cached = cache[item];

    if(cached){
        console.log('Cache hit');
        return process.nextTick(cb.bind(null, null, cached));
    }

    if(queues[item]){
        console.log('Batching operation');
        return queues[item].push(cb);
    }

    queues[item] = [cb];
    totalSales(item, (err, res) => {
        if(!err){
            cache[item] = res;
            setTimeout(() => {
                delete cache[item];
            }, 30 * 1000);
        }

        const queue = queues[item];
        queues[item] = null;
        queue.forEach(cb => cb(err, res));
    });
};
