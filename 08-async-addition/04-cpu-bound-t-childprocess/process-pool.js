const fork = require('child_process').fork;

class ProcessPool {
	constructor(file, poolMax){
		this.file = file;
		this.poolMax = poolMax;
		this.pool = [];
		this.active = [];
		this.waiting = [];
	}

	acquire(cb){
		let worker;
		if(this.pool.length > 0){
			worker = this.pool.pop();
			this.active.push(worker);
			return process.nextTick(cb.bind(null, null, worker));
		}

		if(this.active.length >= this.poolMax){
			return this.waiting.push(cb);
		}

		worker = fork(this.file);
		this.active.push(worker);
		process.nextTick(cb.bind(null, null, worker));
	}
}
