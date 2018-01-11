const fs = require('fs');
const cache = {};

function consistentReadAsync(filename, cb){
    if(cache[filename]){
        console.log('from cache');
        process.nextTick(() => cb(cache[filename]));
    }else{
        console.log('from file');
        fs.readFile(filename, 'utf8', (err, data) => {
            cache[filename] = data;
            cb(data);
        });
    }
}

function createFileReader(filename){
    let listeners = [];

    consistentReadAsync(filename, val => {
        listeners.forEach(listener => listener(val));
    });

    return {
        onDataReady: listener => {
            listeners.push(listener);
        }
    }
}

let reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
    console.log('Reader1 reads ' + data);

    let reader2 = createFileReader('data.txt');
    reader2.onDataReady(data => {
        console.log('Reader2 reads ' + data);
    });
});


//50
