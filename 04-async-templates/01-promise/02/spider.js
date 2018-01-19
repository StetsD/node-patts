const promisify = require('./promisify');

const request = promisify(require('request')),
    fs = require('fs'),
    mkdirp = promisify(require('mkdirp')),
    readFile = promisify(fs.readFile),
    writeFile = promisify(fs.writeFile),
    path = require('path'),
    utilities = require('./utilities');





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


function spiderLinks(currentUrl, body, nesting){
    let promise = Promise.resolve();
    if(nesting === 0){
        return promise;
    }
    const links = utilities.getPageLinks(currentUrl, body);
    links.forEach(link => {
        promise = promise.then(()=>{ spider(link, nesting - 1)});
    });
    return promise;
}

//------------------------------------------------------------------------

//OR PARALLEL VERSION
function spiderLinks(currentUrl, body, nesting){
    if(nesting === 0){
        return Promise.resolve();
    }
    const links = utilities.getPageLinks(currentUrl, body);
    const promises = links.map(link => spider(link, nesting - 1));
    return Promise.all(promises);
}

//------------------------------------------------------------------------

// Promise implementation
function download(url, filename){
    console.log(`Download ${url}`);
    let body;
    return request(url)
        .then(res => {
            body = response.body;
            return mkdirp(path.dirname(filename));
        })
        .then(()=>{
            writeFile(filename, body);
        })
        .then(()=>{
            console.log(`Downloaded and saved: ${url}`);
            return body;
        });
}

//------------------------------------------------------------------------

//Limit promises
const TaskQueue = require('./taskQueue');
const downloadQueue = new TaskQueue(2);
function spiderLinks(currentUrl, body, nesting){
    if(nesting === 0){
        return Promises.resolve();
    }

    const links = utilities.getPageLinks(currentUrl, body);
    if(links.length === 0){
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        let completed = 0;
        let errored = false;
        links.forEach(link => {
            let task = () => {
                return spider(link, nesting - 1)
                    .then(()=>{
                        if(++completed === links.length){
                            resolve();
                        }
                    })
                    .catch(()=>{
                        if(!errored){
                            errored = true;
                            reject();
                        }
                    });
            }
            downloadQueue.pushTask(task);
        });
    });
}


//------------------------------------------------------------------------


spider(process.argv[2], 1)
    .then(() => console.log('Download complete'))
    .catch(err => console.log(err));
