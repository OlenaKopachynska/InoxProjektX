const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
  cron.schedule('0 0 * * *', () => {
    removeOldTokens();
  });
};
