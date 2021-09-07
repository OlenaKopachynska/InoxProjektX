const { User, OAuth } = require('../dataBase');
const { statusCodesEnum } = require('../entities');
const passwordService = require('../services/password_service');
const userUtil = require('../utils/user_util');

module.exports = {

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashPassword = await passwordService.hash(password);

      const createdUser = await User.create({ ...req.body, password: hashPassword });

      res.status(statusCodesEnum.CREATED).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await User.find({}).select('-password -__v');

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const normalizedUser = userUtil.userNormalizator(req.user);

      res.json(normalizedUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { currentUser } = req;

      await User.findByIdAndDelete(user_id);

      await OAuth.deleteMany({ user: currentUser });

      res.status(statusCodesEnum.NO_CONTENT).json('Deleted successfully');
    } catch (e) {
      next(e);
    }
  }

};
