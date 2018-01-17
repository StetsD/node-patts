const request = require('request'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    utilities = require('./utilities');

console.log(utilities)

function spider(url, cb){
    const filename = utilities.urlToFilename(url);
    fs.exists(filename, exists => {
        if(!exists){
            console.log(`Downloading ${url}`);
            request(url, (err, response, body) => {
                if(err){
                    cb(err);
                }else{
                    mkdirp(path.dirname(filename), err => {
                        if(err){
                            cb(err)
                        }else{
                            fs.writeFile(filename, body, err => {
                                if(err){
                                    cb(err);
                                }else{
                                    cb(null, filename, true);
                                }
                            });
                        }
                    });
                }
            });
        }else{
            cb(null, filename, false);
        }
    });
}

console.log(process.argv)

spider(process.argv[2], (err, filename, downloaded) => {
    if(err){
        console.log(err);
    }else if(downloaded){
        console.log(`Compiled the download of "${filename}"`);
    }else{
        console.log(`"${filename}" was already downloaded`);
    }
});
