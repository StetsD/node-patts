const asyncModule = module.exports;
asyncModule.initialized = false;
asyncModule.initialize = cb => {
    setTimeout(function(){
        asyncModule.initialized = true;
        cb();
    }, 10000);
};

asyncModule.tellMeSomething = cb => {
    process.nextTick(()=>{
        if(!asyncModule.initialized){
            return cb(
                new Error('I dont have anything to say right now')
            );
        }
        cb(null, 'Current time is: ' + new Date());
    });
};
