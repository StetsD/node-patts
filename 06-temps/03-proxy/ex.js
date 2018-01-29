function createProxy(subject){
    const proto = Object.getPrototypeOf(subject);

    function Proxy(subject){
        this.subject = subject;
    }

    Proxy.prototype = Object.create(proto);

    Proxy.prototype.hello = () => {
        return this.subject.hello() + ' world!';
    };

    Proxy.prototype.goodbye = () => {
        return this.subject.goodbye
            .apply(this.subject, arguments);
    };

    return new Proxy(subject);
}

// OR that var
function createProxy(subject){
    return {
        hello: () => (subject.hello() + ' world!'),
        goodbye: () => (subject.goodbye.apply(subject, arguments))
    }
}

//OR extends Object (Mutation origin examplar)
function createProxy(subject){
    const helloOrig = subject.hello;
    subject.hello = () => (helloOrig.call(this) + ' world');

    return subject;
}


module.exports = createProxy;
