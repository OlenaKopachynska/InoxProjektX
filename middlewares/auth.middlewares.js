const { OAuth, Action_token } = require('../dataBase');
const { constants } = require('../configs');
const { statusCodesEnum, dataBaseTablesEnum } = require('../entities');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService } = require('../services');
const { userValidator } = require('../validators');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) {
        throw new ErrorHandler(statusCodesEnum.UNA, 'No token');
      }

      await jwtService.verifyToken(token);

      const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(dataBaseTablesEnum.USER);

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodesEnum.UNA, 'Invalid token');
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
        throw new ErrorHandler(statusCodesEnum.UNA, 'No token');
      }

      await jwtService.verifyToken(token, 'refresh');

      const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(dataBaseTablesEnum.USER);

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodesEnum.UNA, 'Invalid token');
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
        throw new ErrorHandler(statusCodesEnum.UNA, 'No token');
      }

      await jwtService.verifyActionToken(actionType, token);

      const tokenFromDB = await Action_token.findOne({ token });

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodesEnum.UNA, 'Invalid token');
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
        throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, error.details[0].message);
      }

      req.body = value;

      next();
    } catch (err) {
      next(err);
    }
  },

};
