//Util Promisify wrapper
module.exports = function promisify(callbackBasedApi){
    return function promisified(){
        const args = [].slice.call(arguments);
        return new Promise((res, rej) => {
            args.push((err, result) => {
                if(err){
                    return rej(err);
                }
                if(arguments.length <= 2){
                    res(result);
                }else{
                    resolve([].slice.call(arguments, 1));
                }
            });
            callbackBasedApi(null, args);
        });
    }
}
