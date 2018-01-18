const tasks = [];

let concurency = 2, running = 0, completed = 0, index = 0;

function next(){
    while(running < concurency && index < tasks.length){
        task = tasks[index++];
        task(()=>{
            if(completed === tasks.length){
                return finish();
            }
            completed++, running--;
            next();
        });
        runnig++;
    }
}

next();

function finish(){}
