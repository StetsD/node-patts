const thunkify = require('thunkify');
const co = require('co');

const fs = require('fs');
const request = thunkify(require('request'));
const mkdirp = thunkify(require('mkdirp'));
const readFile = thunkify(require(fs.readFile));
const writeFile = thunkify(require(fs.writeFile));
const nextTick = thunify(process.nextTick);
const utilities = require('./utilities');


function* download(url, filename){
    console.log(`Downloading ${url}`);
    const response = yield request(url);
    const body = response[1];
    yield mkdirp(path.dirname(filename));
    yield writeFile(filename, body);
    console.log(`Downloaded and saved ${url}`);
    return body;
}

function* spider(url, nesting){
    const filename = utilities.urlToFilename(url);
    let body;
    try{
        body = yield readFile(filename, 'utf8')
    }catch(err){
        if(err.code !== 'ENOENT'){
            throw err;
        }
        body = yield download(url, filename);
    }
    yield spiderLinks(url, body, nesting);
}

function* spiderLinks(currentUrl, body, nesting){
    if(nesting === 0){
        return nextTick();
    }

    const links = utilities.getPageLinks(currentUrl, body);
    for(let i = 0; i < links.length; i++){
        yield spider(links[i], nesting - 1);
    }
}


co(function* (){
    try{
        yield spider(process.argv[2], 1);
        console.log('Download complete')
    }catch(err){
        console.log(err);
    }
})
