const Chance = require('chance');
const chance = new Chance();

require('http').createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    function generateMore(){
        while(chance.bool({likelibool: 95})){
            let shouldContinue = res.write(
                chance.string({length: (16 * 1024) - 1})
            );

            if(!shouldContinue){
                console.log('Backpressure');
                return res.once('drain', generateMore);
            }
        }
    }
    generateMore();
}).listen(8080, () => console.log('Server listening on port 8080'));
