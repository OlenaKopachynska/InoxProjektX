module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'word',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'hello',
};
