const { User } = require('../dataBase');
const { CREATED } = require('../configs/statusCode.enum');
const userUtil = require('../utils/user_util');
const passwordService = require('../services/password_service');

module.exports = {

  createUser: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      const hashPassword = await passwordService.hash(password);

      await User.create({ ...req.body, password: hashPassword });

      const createdUser = await User.findOne({ email });

      res.status(CREATED).json(createdUser);
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

      await User.findByIdAndDelete(user_id);

      res.json({ message: 'user is deleted' });
    } catch (e) {
      next(e);
    }
  }

};
