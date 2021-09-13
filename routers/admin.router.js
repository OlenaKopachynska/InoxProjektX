const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middlewares');
const { adminController, authController } = require('../controllers');
const { userRolesEnum, actionTypesEnum } = require('../entities');

router.post(
  '/send_admin_reset_pass_email',
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRole(userRolesEnum.SUPER_ADMIN),
  adminController.createAdminBySuperAdmin
);

router.post(
  '/set_new_password',
  authMiddleware.validatePassword,
  authMiddleware.checkActionToken(actionTypesEnum.CREATE_ADMIN),
  authController.setNewUserPassword
);

module.exports = router;
