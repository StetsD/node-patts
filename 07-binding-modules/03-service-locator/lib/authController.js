module.exports = (serviceLocator) => {
    const authService = serviceLocator.get('authService');
    const authController = {};

    authController.login = (req, res, next) => {
        //...
    };

    authController.checkToken = (req, res, next) => {
        //...
    };

    return authController;
};
