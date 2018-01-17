const request = require('request'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    utilities = require('../01/utilities');

function spider(url, cb){
    const filename = utilities.urlToFilename(url);
    fs.exists(filename, exists => {
        if(exists){
            return cb(null, filename, false);
        }else{
            download(url, filename, err => {
                if(err){
                    return cb(err);
                }
                cb(null, filename, true);
            })
        }
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

spider(process.argv[2], (err, filename, downloaded) => {
    if(err){
        console.log(err);
    }else if(downloaded){
        console.log(`Compiled the download of "${filename}"`);
    }else{
        console.log(`"${filename}" was already downloaded`);
    }
});
