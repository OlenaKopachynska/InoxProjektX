const bcrypt = require('bcrypt');

const { statusCodesEnum } = require('../entities');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  hash: (password) => bcrypt.hash(password, 4),
  compare: async (password, hashPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, 'Email or password is wrong');
    }
  }
};
