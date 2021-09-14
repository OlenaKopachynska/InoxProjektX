module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
  FORGOT_PASS_TOKEN_SECRET: process.env.FORGOT_PASS_TOKEN_SECRET || 'forgot_secret',
  CREATE_ADMIN_TOKEN_SECRET: process.env.CREATE_ADMIN_TOKEN_SECRET || 'create_admin_secret',

  EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS || 'test@icloud.com',
  EMAIL_SENDER_PASS: process.env.EMAIL_SENDER_PASS || 'testtest',

  SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || 'admin',
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || 'test@icloud.com',
  SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS || 'testtest',

  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_REGION: process.env.AWS_S3_REGION,

  FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

};
