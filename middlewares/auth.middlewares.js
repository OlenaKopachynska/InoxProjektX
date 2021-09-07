const { OAuth } = require('../dataBase');
const { constants } = require('../configs');
const { statusCodesEnum, dataBaseTablesEnum } = require('../entities');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService } = require('../services');

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
  }
};
