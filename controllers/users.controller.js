const { User, OAuth } = require('../dataBase');
const { emailActionsEnum, statusCodesEnum } = require('../entities');
const userUtil = require('../utils/user_util');
const { emailService, passwordService, s3Service } = require('../services');

module.exports = {

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashPassword = await passwordService.hash(password);

      let createdUser = await User.create({ ...req.body, password: hashPassword });

      if (req.files && req.files.avatar) {
        const { avatar } = req.files;

        const { _id } = createdUser;

        const uploadFile = await s3Service.uploadImage(avatar, 'user', _id);
        // console.log(uploadFile);

        createdUser = await User.findByIdAndUpdate(_id, { avatar: uploadFile.key }, { new: true });

        // console.log(createdUser);
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

      await s3Service.deleteImage(currentUser.avatar);

      await emailService.sendMail('alurchik29@gmail.com', emailActionsEnum.GOODBYE);

      await OAuth.deleteMany({ user: currentUser });

      await User.findByIdAndDelete(user_id);

      res.status(statusCodesEnum.NO_CONTENT).json('Deleted successfully');
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { user } = req;

      const updatedUser = await User.findByIdAndUpdate(user, req.body);

      const normalizedUser = userUtil.userNormalizator(updatedUser);

      await OAuth.updateOne({ user });

      res.status(statusCodesEnum.NO_CONTENT).json(normalizedUser);
    } catch (e) {
      next(e);
    }
  }

};
