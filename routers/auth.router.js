const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.post(
  '/login',
  userMiddleware.getUserByDynamicParam('email'), userMiddleware.isRequestDataCorrect, authController.login
);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/logout_from_all_devices', authMiddleware.checkAccessToken, authController.logoutFromAllDevices);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/change_password', authMiddleware.checkAccessToken, authController.changePassword);

module.exports = router;
