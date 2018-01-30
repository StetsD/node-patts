const path = require('path');
const fs = require('fs');

module.exports = function(db){
    const fs = {};

    fs.readFile = (filename, options, cb) => {
        if(typeof options === 'function'){
            cb = options;
            options = {};
        }else if(typeof options === 'string'){
            options = {encoding: options};
        }

        db.get(path.resolve(filename), {
            valueEncoding: options.encoding
        },
        (err, value) => {
            if(err){
                if(err.type === 'NotFoundError'){
                    err = new Error(`'ENOENT', open "${filename}"`);
                    err.code = 'ENOENT';
                    err.errno = 34;
                    err.path = filename;
                }
                return cb && cb(err);
            }
            cb && cb(null, value);
        });
    }

    fs.writeFile = (filename, contents, options, cb) => {
        if(typeof options === 'function'){
            cb = options; options = {};
        }else if(typeof options === 'string'){
            options = {encoding: options};
        }

        db.put(path.resolve(filename), contents, {
            valueEncoding: options.encoding
        }, cb);
    }
}
