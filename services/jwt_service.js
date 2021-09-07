const jwt = require('jsonwebtoken');

const { configs } = require('../configs');
const { statusCodesEnum } = require('../entities');
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
  }
};
