const http = require('http');
const url = require('url');
const totalSales = require('./total-sales-promises');

http.createServer((req, res)=>{
    const query = url.parse(req.url, true).query;
    totalSales(query.item).then(function(sum){
        res.writeHead(200);
        res.end(`Total sales for item ${query.item} is ${sum}`);
    });
}).listen(8000, () => console.log('Started'));
