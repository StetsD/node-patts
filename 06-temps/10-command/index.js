function createTask(target, args){
    return () => {
        target.apply(null, args);
    }
}
