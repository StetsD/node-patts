const JsonConfig = require('./jsonConfig');
const jsonConfig = new JsonConfig();
jsonConfig.read('./conf.json');
jsonConfig.set('nodejs', 'design patterns');
jsonConfig.save('./conf_mod.json');
