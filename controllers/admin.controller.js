const { User, Action_token } = require('../dataBase');
const { configs } = require('../configs');
const { actionTypesEnum, emailActionsEnum } = require('../entities');
const { emailService, jwtService, passwordService } = require('../services');
const userUtil = require('../utils/user_util');

module.exports = {

  createAdminBySuperAdmin: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashPassword = await passwordService.hash(password);

      const createdAdmin = await User.create({ ...req.body, password: hashPassword });

      const normalizedAdmin = userUtil.userNormalizator(createdAdmin);

      const actionToken = jwtService.generateActionToken(actionTypesEnum.CREATE_ADMIN);

      await Action_token.create({ action_token: actionToken, user: normalizedAdmin._id });

      await emailService.sendMail(
        'alurchik29@gmail.com',
        emailActionsEnum.CREATE_ADMIN,
        { createAdminUrl: `${configs.FRONTEND_URL}/create_admin?token=${actionToken}`, normalizedAdmin }
      );
      res.json('Create admin email was sent');
    } catch (e) {
      next(e);
    }
  }
};
