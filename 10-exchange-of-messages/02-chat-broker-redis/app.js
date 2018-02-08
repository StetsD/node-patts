const WebSocketServer = require('ws').Server;
const redis = require('redis');
const redisSub = redis.createClient();
const redisPub = redis.createClient();

const server = require('http').createServer(
    require('ecstatic')({root: `${__dirname}/www`})
);

const wss = new WebSocketServer({server});
wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', msg => {
        console.log(`Message: ${msg}`);
        redisPub.publish('chat_messages', msg);
    });
});

redisSub.subscribe('chat_messages');
redisSub.on('message', (channel, msg) => {
    wss.clients.forEach((client) => {
        client.send(msg);
    });
});

server.listen(process.argv[2] || 8080);
