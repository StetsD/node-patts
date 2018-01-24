const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable{
    constructor(){
        super({objectMode: true});
    }

    _write(chunk, encoding, cb){
        mkdirp(path.dirname(chunk.path), err => {
            if(err){
                return cb(err);
            }
            fs.writeFile(chunk.path, chunk.content, cb);
        });
    }
}

module.exports = ToFileStream;
