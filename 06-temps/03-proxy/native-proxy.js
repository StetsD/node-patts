const scientist = {
    name: 'nikola',
    surname: 'tesla'
};

const uppercaseScientist = new Proxy(scientist, {
    get: (target, property) => target[property].toUpperCase()
});

console.log(uppercaseScientist.name, uppercaseScientist.surname);


//-----------------------------------------------------------------

const evenNumber = new Proxy([], {
    get: (target, index) => index * 2,
    has: (target, number) => number % 2 === 0
});

console.log(2 in evenNumber);
console.log(5 in evenNumber);
console.log(evenNumber[7]);
