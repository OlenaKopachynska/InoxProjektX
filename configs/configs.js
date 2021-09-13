module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'word',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'hello',
  FORGOT_PASS_TOKEN_SECRET: process.env.FORGOT_PASS_TOKEN_SECRET || 'secret',

  EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS || 'test@icloud.com',
  EMAIL_SENDER_PASS: process.env.EMAIL_SENDER_PASS || 'testtest',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

};
