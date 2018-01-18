module.exports = class TaskQueue{
    constructor(concurency){
        this.concurency = concurency;
        this.running = 0;
        this.queue = [];
    }

    pushTask(task){
        this.queue.push(task);
        this.next();
    }

    next(){
        while(this.running < this.concurency && this.queue.length){
            const task = this.queue.shift();
            task(()=>{
                this.running--;
                this.next();
            });
            this.running++;
        }
    }
};
