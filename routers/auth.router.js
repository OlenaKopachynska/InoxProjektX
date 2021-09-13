const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');
const { actionTypesEnum } = require('../entities');

router.post(
  '/login',
  userMiddleware.getUserByDynamicParam('email'), userMiddleware.isRequestDataCorrect, authController.login
);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/logout_from_all_devices', authMiddleware.checkAccessToken, authController.logoutFromAllDevices);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/change_password', authMiddleware.checkAccessToken, authController.changePassword);

router.post(
  '/forgot_password/send_reset_email',
  userMiddleware.getUserByDynamicParam('email'),
  authController.sendResetPasswordEmail
);

router.post(
  '/forgot_password/set_new_password',
  authMiddleware.validatePassword,
  authMiddleware.checkActionToken(actionTypesEnum.FORGOT_PASSWORD),
  authController.setNewUserPassword
);

module.exports = router;
