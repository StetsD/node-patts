const asyncModule = require('./async-module');
const asyncModuleWrapper = module.exports;

asyncModuleWrapper.initialized = false;
asyncModuleWrapper.initialize = () =>{
    activeState.initialize.apply(activeState, argumnets);
};

asyncModuleWrapper.tellMeSomething = () => {
    activeState.tellMeSomething.apply(activeState, arguments);
};

const pending = [];
const notInitializedState = {
    initialize: function(cb){
        asyncModule.initialize(()=>{
            asyncModuleWrapper.initialized = true;
            activeState = initializedState;

            pending.forEach(req => {
                asyncModule[req.method].apply(null, req.args);
            });

            pending = [];

            cb();
        });
    },

    tellMeSomething: cb => {
        return pending.push({
            method: 'tellMeSomething',
            args: arguments
        });
    }
};

let initializedState = asyncModule;
let activeState = notInitializedState;
