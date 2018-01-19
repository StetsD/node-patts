const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunction){
    function cb(err){
        if(err){
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        console.log(results.length)
        generator.next(results.length > 1 ? results : results[0]);
    }
    const generator = generatorFunction(cb);
    generator.next();
}

asyncFlow(function* (cb){
    const fileName = path.basename(__filename);
    const myself = yield fs.readFile(fileName, 'utf8', cb);
    yield fs.writeFile(`clone_of_${fileName}`, myself, cb);
    console.log('Clone created');
});
