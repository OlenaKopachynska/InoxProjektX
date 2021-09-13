const { User } = require('../dataBase');
const { statusCodesEnum } = require('../entities');
const ErrorHandler = require('../errors/ErrorHandler');
const { userValidator } = require('../validators/index');

module.exports = {

  isRequestDataCorrect: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, error.details[0].message);
      }

      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  },
  getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbField]: value });

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },

  isEmailExist: (req, res, next) => {
    try {
      const userByEmail = req.user;

      if (userByEmail) {
        throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, 'Email does already exist');
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
        throw new ErrorHandler(statusCodesEnum.NOT_FOUND, 'User not found');
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  },

  checkUserRole: (roleArr = []) => (req, res, next) => {
    try {
      const { role } = req.currentUser;

      if (!roleArr.length) {
        return next();
      }

      if (!roleArr.includes(role)) {
        throw new ErrorHandler(statusCodesEnum.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (e) {
      next(e);
    }
  },

};
