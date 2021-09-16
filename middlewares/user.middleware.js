const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { userValidator } = require('../validators/index');
const { BAD_REQUEST, NOT_FOUND, FORBIDDEN } = require('../configs/error');

module.exports = {

  isRequestDataCorrect: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          BAD_REQUEST.VALIDATION_EXCEPTION.status,
          BAD_REQUEST.VALIDATION_EXCEPTION.customCode,
          'Entered data is not valid',
          value
        );
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
        throw new ErrorHandler(
          BAD_REQUEST.EMAIL_EXIST.status,
          BAD_REQUEST.EMAIL_EXIST.customCode,
          'Email does already exist',
          userByEmail
        );
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
        throw new ErrorHandler(
          NOT_FOUND.USER_IS_NOT_FOUND.status,
          NOT_FOUND.USER_IS_NOT_FOUND.customCode,
          'User is not found'
        );
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
        throw new ErrorHandler(
          FORBIDDEN.ACCESS_DENIED.status,
          FORBIDDEN.ACCESS_DENIED.customCode,
          'Role does not have access'
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  },

};
