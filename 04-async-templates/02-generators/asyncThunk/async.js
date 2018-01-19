const fs = require('fs');
const path = require('path');

function asyncFlowWithThunk(generatorFunction){
    function cb(err){
        if(err){
            return generator.throw(err);
        }

        const results = [].slice.call(arguments, 1);
        const thunk = generator.next(results.length > 1 ? results : results[0]).value;
        thunk && thunk(cb);
    }

    const generator = generatorFunction();
    const thunk = generator.next().value;
    thunk && thunk(cb);
}

function readFileThunk(filename, options){
    return function(cb){
        fs.readFile(filename, options, cb);
    }
}

function writeFileThunk(filename, options){
    return function(cb){
        fs.writeFile(filename, options, cb);
    }
}

asyncFlowWithThunk(function* (cb){
    const fileName = path.basename(__filename);
    const myself = yield readFileThunk(fileName, 'utf8');
    yield writeFileThunk(`clone_of_${fileName}`, myself);
    console.log("Clone created")
});
