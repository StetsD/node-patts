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
