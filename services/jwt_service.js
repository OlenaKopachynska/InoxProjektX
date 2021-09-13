const jwt = require('jsonwebtoken');

const { configs } = require('../configs');
const { statusCodesEnum, actionTypesEnum } = require('../entities');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, configs.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, configs.REFRESH_TOKEN_SECRET, { expiresIn: '31d' });

    return {
      access_token,
      refresh_token
    };
  },

  verifyToken: (token, tokenType = 'access') => {
    try {
      const secret = tokenType === 'access' ? configs.ACCESS_TOKEN_SECRET : configs.REFRESH_TOKEN_SECRET;

      jwt.verify(token, secret);
    } catch (e) {
      throw new ErrorHandler(statusCodesEnum.UNA, 'Invalid token');
    }
  },
  generateActionToken: (actionType) => {
    let secretWord = '';

    switch (actionType) {
      case actionTypesEnum.FORGOT_PASSWORD:
        secretWord = configs.FORGOT_PASS_TOKEN_SECRET;
        break;
      default:
        throw new ErrorHandler(statusCodesEnum.SERVER_ERROR, 'Wrong actionType');
    }

    return jwt.sign({ actionType }, secretWord, { expiresIn: '7d' });
  },

  verifyActionToken: (actionType, token) => {
    let secretWord = '';

    switch (actionType) {
      case actionTypesEnum.FORGOT_PASSWORD:
        secretWord = configs.FORGOT_PASS_TOKEN_SECRET;
        break;
      default:
        throw new ErrorHandler(500, 'Wrong actionType');
    }

    return jwt.verify(token, secretWord);
  }

};
