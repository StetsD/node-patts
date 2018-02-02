module.exports = serviceLocator => {
    const db = serviceLocator('db');
    const tokenSecret = serviceLocator.get('tokenSecret');

    const users = db.sublevel('users');
    cosnt authService = {};

    authService.login = (username, password, cb) => {
        //..
    };

    authService.checkToken = (token, cb) => {
        //...
    };

    return authService;
};
