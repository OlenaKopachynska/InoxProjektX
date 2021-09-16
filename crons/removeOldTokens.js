const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { OAuth, Action_token } = require('../dataBase');

module.exports = async () => {
  const previousMonth = dayjs().subtract(1, 'month');

  await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });

  await Action_token.deleteMany({ createdAt: { $lte: previousMonth } });
};
