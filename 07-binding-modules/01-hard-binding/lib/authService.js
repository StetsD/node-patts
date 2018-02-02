const db = require('./db');
const users = db.sublevel('user');

const tokenSecret = 'SHH!';

exports.login = (username, password, cb) => {
    users.get(username, function(err, user){
        //...
    });
};

exports.checkToken = (token, cb) => {
    //...
    users.get(userData.username, function(err, user){
        //...
    });
};
