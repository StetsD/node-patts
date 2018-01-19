let task = [ /* ... */ ];
let promise = Promise.resolve();
tasks.forEach(task => {
    promise = promise.then(()=>{
        return task();
    });
});
promise.then(()=>{
    //all tasks completed
});


///With reduce function
let task = [ /* ... */ ];
let promise = tasks.reduce((prev, task) => {
    return prev.then(() => {
        return task();
    });
}, Promise.resolve());
promise.then(()=>{
    //all tasks completed
});


//limitation promises (fake)
next(){
    while(this.running < this.concurrency && this.queue.length){
        const task = this.queue.shift();
        task().then(()=>{
            this.running--;
            this.next();
        });
        this.running++;
    }
}


//Gibride promise + cb
function asyncDivision(dividend, divisor, cb){
    return new Promise((resolve, reject) => {
        process.nextTick(()=>{
            const result = dividend / divisor;
            if(isNaN(result) || !Number.isFinite(result)){
                const error = new Error('Invalid operand');
                if(cb) { cb(error); }
                return reject(error);
            }
            if(cb){ cb(null, result); }
            resolve(result);
        });
    });
}

asyncDivision(10, 2, (err, result) => {
    if(err){
        return console.error(err);
    }
    console.log(result);
});

asyncDivision(22, 11)
    .then(res => console.log(res))
    .catch(err => console.error(err));

//----------------------------------------------------------
