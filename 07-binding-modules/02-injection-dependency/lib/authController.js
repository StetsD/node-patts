module.exports = (authService) => {
    const authController = {};

    authController.login = (req, res, next) => {
        //...
    }

    authController.checkToken = (req, res, next) => {
        //...
    }

    return authController;
};
