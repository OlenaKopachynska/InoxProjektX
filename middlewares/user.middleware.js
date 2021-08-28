const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../configs/statusCode.enum');
const { validateEmail } = require('../helpers/emailValidationHelper');

module.exports = {

  isEmailExist: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email: email.trim() });

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

      const user = await User.findById(user_id);

      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  },
  isRequestDataComplete: (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        throw new ErrorHandler(BAD_REQUEST, 'Bad request');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  isEmailCorrect: (req, res, next) => {
    try {
      const { email } = req.body;

      const validatedEmail = validateEmail(email);

      if (!validatedEmail) {
        throw new ErrorHandler('Invalid format of email', BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
