const fs = require('fs');
const objectPath = require('object-path');

class ConfigTemplate{
    read(file){
        console.log(`Deserializing from ${file}`);
        this.data = this._deserialize(fs.readFileSync(file, 'utf-8'));
    }

    save(file){
        console.log(`Serializing to ${file}`);
        fs.writeFileSync(file, this._serialize(this.data));
    }

    get(path){
        return objectPath.get(this.data, path);
    }

    set(path, val){
        return objectPath.set(this.data, path, val);
    }

    _serialize(){
        throw new Error('_serialize() must be implemeted');
    }

    _deserialize(){
        throw new Error('_deserialize() must be implemeted');
    }
}

module.exports = ConfigTemplate;
