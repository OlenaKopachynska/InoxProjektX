module.exports = {

  CURRENT_YEAR: new Date().getFullYear(),

  PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),

  EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),

  AUTHORIZATION: 'Authorization',

  MAX_AVATAR_SIZE: 2000 * 2000,
  MAX_TRIP_IMAGE_SIZE: 2000 * 2000,

  PHOTOS_MIMETYPES: [
    'image/gif',
    'image/jpeg'
  ]

};
