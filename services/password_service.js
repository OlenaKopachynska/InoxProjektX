const bcrypt = require('bcrypt');

module.exports = {
  hash: (password) => bcrypt.hash(password, 5),
};
