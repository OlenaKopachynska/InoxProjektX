const Joi = require('joi');

const userRolesEnum = require('../configs/user-roler.enum');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');

const createUserValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30)
    .trim()
    .required(),
  email: Joi.string().regex(EMAIL_REGEXP).trim().required(),

  password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),

  role: Joi.string().allow(...Object.values(userRolesEnum)),

});

module.exports = {
  createUserValidator
};
