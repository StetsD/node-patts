const fs = require('fs');
function readJSON(filename, cb){
    fs.readFile(filename, 'utf8', (err, data) => {
        let parsed;
        if(err){
            return cb(err);
        }

        try{
            parsed = JSON.parse(data);
        }catch(err){
            return cb(err);
        }
        cb(null, parsed);
    });
}

readJSON('data.txt', err => console.log(err));
