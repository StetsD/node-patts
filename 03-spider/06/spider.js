const request = require('request'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    utilities = require('./utilities'),
    TaskQueue = require('./TaskQueue');
    downloadQueue = new TaskQueue(2),
    async = require('async');

function spiderLinks(currentUrl, body, nesting, cb){
    if(nesting === 0){
        return process.nextTick(cb);
    }

    const links = utilities.getPageLinks(currentUrl, body);
    if(links.length === 0){
        return process.nextTick(cb);
    }

    const downloadQueue = async.queue((taskData, cb) => {
        spider(taskData.link, taskData.nesting - 1, cb);
    }, 2);
}

function spider(url, nesting, cb){
    const filename = utilities.urlToFilename(url);
    fs.readFile(filename, 'utf8', (err, body) => {
        if(err){
            if(err.code !== 'ENOENT'){
                return cb(err);
            }
        }

        return download(url, filename, (err, body) => {
            if(err){
                return cb(err);
            }
            spiderLinks(url, body, nesting, cb);
        });

        spiderLinks(url, body, nesting, cb);
    });
}

function download(url, filename, cb){
    console.log(`Download ${url}`);
    let body;

    async.series([
        cb => {
            request(url, (err, res, resBody) => {
                if(err){
                    return cb(err);
                }
                body = resBody;
                cb();
            });
        },
        mkdirp.bind(null, path.dirname(filename)),
        cb => {
            fs.writeFile(filename, body, cb);
        }
    ], err => {
        if(err){
            return cb(err);
        }
        console.log(`Downloaded and saved: ${url}`);
        cb(null, body);
    })
}

spider(process.argv[2], 2,  (err, filename, downloaded) => {
    if(err){
        console.log(err);
    }else if(downloaded){
        console.log(`Compiled the download of "${filename}"`);
    }else{
        console.log(`"${filename}" was already downloaded`);
    }
});
