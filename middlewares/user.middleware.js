const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST, NOT_FOUND } = require('../configs/statusCode.enum');
const { userValidator } = require('../validators/index');

module.exports = {

  isEmailExist: async (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
      }

      const userByEmail = await User.findOne({ email: value.email });

      if (userByEmail) {
        throw new ErrorHandler(400, 'Email does already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserByIdExist: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const user = await User.findById(user_id).lean();

      if (!user) {
        throw new ErrorHandler(NOT_FOUND, 'User not found');
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  },

  isRequestDataCorrect: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
      }

      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  },
};
