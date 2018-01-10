const fs = require('fs');
const cache = {};

function consistentReadSync(filename){
    if(cache[filename]){
        return cache[filename];
    }else{
        cache[filename] = fs.readFileSync(filename, 'utf8');
        return cache[filename];
    }
}

function createFileReader(filename){
    let listeners = [];
    let val = consistentReadSync(filename);



    return {
        onDataReady: listener => {
            listeners.push(listener)
        },
        run(){
            listeners.forEach(listener => listener(val));
        }
    }
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
    console.log('1 data ' + data);


    const reader2 = createFileReader('data.txt');
    reader2.onDataReady(data => {
        console.log('2 data ' + data);
    });
    reader2.run();
});

reader1.run();
