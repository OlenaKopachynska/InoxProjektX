const { OAuth, User, Action_token } = require('../dataBase');
const { constants, configs } = require('../configs');
const { statusCodesEnum, actionTypesEnum, emailActionsEnum } = require('../entities');
const { passwordService, jwtService, emailService } = require('../services');
const { userUtil } = require('../utils');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await passwordService.compare(password, user.password);

      const tokenPair = jwtService.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: user._id });

      res.json({
        ...tokenPair,
        user: userUtil.userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);

      await OAuth.deleteOne({ access_token: token });

      res.status(statusCodesEnum.NO_CONTENT).json('Ok');
    } catch (e) {
      next(e);
    }
  },

  logoutFromAllDevices: async (req, res, next) => {
    try {
      const { currentUser } = req;

      await OAuth.deleteMany({ user: currentUser });

      res.status(statusCodesEnum.NO_CONTENT).json('Deleted successfully');
    } catch (e) {
      next(e);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);

      const { currentUser } = req;

      await OAuth.deleteOne({ refresh_token: token });

      const tokenPair = jwtService.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: currentUser._id });

      res.json({
        ...tokenPair,
        user: userUtil.userNormalizator(currentUser)
      });
    } catch (e) {
      next(e);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { currentUser, body: { oldPassword, newPassword } } = req;

      await passwordService.compare(oldPassword, currentUser.password);

      const newHashedPassword = await passwordService.hash(newPassword);

      await User.findOneAndUpdate({ email: currentUser.email }, {
        password: newHashedPassword
      });

      await OAuth.deleteMany({ email: currentUser.email });

      res
        .status(statusCodesEnum.NO_CONTENT)
        .json('Password changed');
    } catch (e) {
      next(e);
    }
  },

  sendResetPasswordEmail: async (req, res, next) => {
    try {
      const { user } = req;

      const actionToken = jwtService.generateActionToken(actionTypesEnum.FORGOT_PASSWORD);

      await Action_token.create({ action_token: actionToken, user: user._id });

      await emailService.sendMail(
        'alurchik29@gmail.com',
        emailActionsEnum.FORGOT_PASS,
        { forgotPasswordUrl: `${configs.FRONTEND_URL}/forgot?token=${actionToken}`, user }
      );

      res.json('Email was sent');
    } catch (e) {
      next(e);
    }
  },
  setNewUserPassword: async (req, res, next) => {
    try {
      const { currentUser, body } = req;

      const token = req.get(constants.AUTHORIZATION);

      const hashedPassword = await passwordService.hash(body.password);

      await User.findByIdAndUpdate(currentUser._id, { password: hashedPassword });

      await Action_token.deleteOne({ token });

      await OAuth.deleteMany({ user: currentUser._id });

      res.json('password changed');
    } catch (e) {
      next(e);
    }
  }

};
