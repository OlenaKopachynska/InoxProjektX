const { User, OAuth } = require('../dataBase');
const { emailActionsEnum, statusCodesEnum } = require('../entities');
const userUtil = require('../utils/user_util');
const { emailService, passwordService, s3Service } = require('../services');

module.exports = {

  createUser: async (req, res, next) => {
    try {
      const { avatar } = req.files;

      const { password } = req.body;

      const hashPassword = await passwordService.hash(password);

      let createdUser = await User.create({ ...req.body, password: hashPassword });

      if (avatar) {
        const { _id } = createdUser;

        const uploadFile = await s3Service.uploadImage(avatar, 'user', _id);

        createdUser = await User.findByIdAndUpdate(_id, { avatar: uploadFile.Location }, { new: true });
      }

      await emailService.sendMail('alurchik29@gmail.com', emailActionsEnum.WELCOME);

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
      const { params: { user_id }, currentUser } = req;

      await User.findByIdAndDelete(user_id);

      await emailService.sendMail('alurchik29@gmail.com', emailActionsEnum.GOODBYE);

      await OAuth.deleteMany({ user: currentUser });

      res.status(statusCodesEnum.NO_CONTENT).json('Deleted successfully');
    } catch (e) {
      next(e);
    }
  }

};
