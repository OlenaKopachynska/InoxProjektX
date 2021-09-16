const { OAuth, Action_token } = require('../dataBase');
const { constants } = require('../configs');
const { dataBaseTablesEnum } = require('../entities');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService } = require('../services');
const { userValidator } = require('../validators');
const { BAD_REQUEST, UNAUTHORIZED } = require('../configs/error');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          UNAUTHORIZED.NO_TOKEN.status,
          UNAUTHORIZED.NO_TOKEN.customCode,
          'No token'
        );
      }

      await jwtService.verifyToken(token);

      const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(dataBaseTablesEnum.USER);

      if (!tokenFromDB) {
        throw new ErrorHandler(
          UNAUTHORIZED.INVALID_TOKEN.status,
          UNAUTHORIZED.INVALID_TOKEN.customCode,
          'Invalid token'
        );
      }

      req.currentUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          UNAUTHORIZED.NO_TOKEN.status,
          UNAUTHORIZED.NO_TOKEN.customCode,
          'No token'
        );
      }

      await jwtService.verifyToken(token, 'refresh');

      const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(dataBaseTablesEnum.USER);

      if (!tokenFromDB) {
        throw new ErrorHandler(
          UNAUTHORIZED.INVALID_TOKEN.status,
          UNAUTHORIZED.INVALID_TOKEN.customCode,
          'Invalid token'
        );
      }

      req.currentUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkActionToken: (actionType) => async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          UNAUTHORIZED.NO_TOKEN.status,
          UNAUTHORIZED.NO_TOKEN.customCode,
          'No token'
        );
      }

      await jwtService.verifyActionToken(actionType, token);

      const tokenFromDB = await Action_token.findOne({ token });

      if (!tokenFromDB) {
        throw new ErrorHandler(
          UNAUTHORIZED.INVALID_TOKEN.status,
          UNAUTHORIZED.INVALID_TOKEN.customCode,
          'Invalid token'
        );
      }

      req.currentUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  validatePassword: (req, res, next) => {
    try {
      const { error, value } = userValidator.passwordValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          BAD_REQUEST.VALIDATION_EXCEPTION.status,
          BAD_REQUEST.VALIDATION_EXCEPTION.customCode,
          'Entered data is not valid'
        );
      }

      req.body = value;

      next();
    } catch (err) {
      next(err);
    }
  },

};
