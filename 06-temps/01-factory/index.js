function createImage(name){
	if(name.match(/\.jpeg$/)){
		return new JpegImage(name);
	}else if(name.match(/\.gif$/)){
		return new GifImage(name);
	}else if(name.match(/.png$/)){
		return new PngImage(name);
	}else{
		throw new Exception('Unsupported format');
	}
}

const image = createImage('photo.jpeg');

//------------------------------------------------------


function createPerson(name){
	const privateProperties = {};

	const person = {
		setName: name => {
			if(!name) throw new Error('A person must have a name');
			privateProperties.name = name;
		},
		getName: () => {
			return privateProperties.name;
		}
	}
	person.setName(name);
	return person;
};
