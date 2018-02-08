const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
    const cpus = os.cpus().length;
    console.log(`Clustering to ${cpus} CPUS`);
    for(let i = 0; i < cpus; i++){
        cluster.fork();
    }
    Object.keys(cluster.workers).forEach(id => {
        cluster.workers[id].send('Hello Cluster ' + id);
    });
}else{
    require('./app');
    process.on('message', msg => {
        console.log(process.pid, msg);
    });
}
