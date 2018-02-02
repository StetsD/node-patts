const diContainer = require('./lib/diContainer')();
diContainer.register('dbName', 'example-db');
diContainer.register('tokenSecret', 'SHHH!');
diContainer.factory('db', require('./lib/db'));
diContainer.factory('authService', require('./lib/authService'));
diContainer.factory('authController', require('./lib/authController'));
const authController = diContainer.get('authController');
app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);
// ...
