const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

module.exports = (db, tokenSecret) => {
    const users = db.sublevel('users');
    const authService = {};

    authService.login = (username, password, cb) => {
        //...
    };

    authService.checkToken = (token, cb) => {
        //...
    }

    return authService;
};
