const fs = require('fs');
const cache = {};

function inconsistentRead(filename, cb){
    if(cache[filename]){
        cb(cache[filename]);
    }else{
        fs.readFile(filename, 'utf8', (err, data) => {
            cache[filename] = data;
            cb(data);
        });
    }
}


function createFileReader(filename){
    const listeners = [];
    inconsistentRead(filename, val => {
        listeners.forEach(listener => listener(val));
    });

    return {
        onDataReady: listener => listeners.push(listener)
    };
};

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
    console.log('First call data: ' + data);

    const reader2 = createFileReader('data.txt');
    reader2.onDataReady(data => {
        console.log('Second call data: ' + data);
    });
});
