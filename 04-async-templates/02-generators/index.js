function* makeGenerator(){
    yield 'Hello World';
    console.log('Re-entered');
}

const gen = makeGenerator();
console.log(gen.next());
gen.next();


//----------------------------------------------
function* iteratorGenerator(arr){
    for(let i = 0; i < arr.length; i++){
        yield arr[i];
    }
}

const iterator = iteratorGenerator(['apple', 'orange', 'watermelon']);
let currentItem = iterator.next();
while(!currentItem.done){
    console.log(currentItem.value);
    currentItem = iterator.next();
}


//--------------------------------------------
function* twoWayGenerator(){
    const what = yield;
    console.log('Hello ' + what);
}

const twoWay = twoWayGenerator();
twoWay.next();
twoWay.next(new Error('lalal'))
