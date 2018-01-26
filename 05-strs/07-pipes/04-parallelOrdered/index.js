const fs = require('fs');
const split = require('split');
const request = require('request');
const throughParallel = require('through2-parallel');

fs.createReadStream(process.argv[2])
    .pipe(split())
    .pipe(throughParallel.obj(function(url, enc, cb){
            if(!url) return cb();

            let that = this;

            request.head(url, (err, response) => {
                if(!err){
                    that.push(url+'\n');
                }
                cb();
            });
    }))
    .pipe(process.stdout);
