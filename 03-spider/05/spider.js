const request = require('request'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    utilities = require('./utilities'),
    TaskQueue = require('./TaskQueue');
    downloadQueue = new TaskQueue(2);

function spiderLinks(currentUrl, body, nesting, cb){
    if(nesting === 0){
        return process.nextTick(cb);
    }

    const links = utilities.getPageLinks(currentUrl, body);
    if(links.length === 0){
        return process.nextTick(cb);
    }

    let completed = 0, hasErrors = false;
    links.forEach(link => {
        downloadQueue.pushTask(done => {
            spider(link, nesting - 1, err => {
                if(err){
                    hasErrors = true;
                    return cb(err);
                }
                if(++completed === links.length && !hasErrors){
                    cb();
                }
                done();
            });
        });
    });
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
    request(url, (err, response, body) => {
        if(err){
            return cb(err);
        }
        saveFile(filename, body, err => {
            if(err){
                return cb(err);
            }
            console.log(`Downloaded and saved: ${url}`);
            cb(null, body);
        });
    });
}

function saveFile(filename, contents, cb){
    mkdirp(path.dirname(filename), err => {
        if(err){
            return cb(err);
        }
        fs.writeFile(filename, contents, cb);
    });
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
