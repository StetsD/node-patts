const svLoc = require('./lib/serviceLocator');

svLoc.register('dbName', 'example-db');
svLoc.register('tokenSecret', 'Shhh!');
svLoc.register('db', require('./lib/db'));
svLoc.register('authService', require('./lib/authService'));
svLoc.register('authController', require('./lib/authController'));

const authController = svLoc.get('authController');

app.post('/login', authController.login);
app.all('/checkToken', authController.checkToken);
