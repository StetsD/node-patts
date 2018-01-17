const EventEmitter = require('events').EventEmitter;
class SyncEmit extends EventEmitter {
	constructor(){
		super();
		this.emit('ready');
	}
}

const syncEmit = new SyncEmit();
syncEmit.on('ready', () => console.log('Obj is ready'));
