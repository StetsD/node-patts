const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
    const filename = req.headers.filename;
    console.log('File request received: ' + filename);

    req
        .pipe(crypto.createDecipher('aes192', 'a_shared_secret'))
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(`new-${filename}`))
        .on('finish', () => {
            res.writeHead(201, {'Content-type': 'text/plain'});
            res.end('That`s end');
            console.log(`File saved: ${filename}`);
        });
});

server.listen(3005, () => console.log("Listening"));
