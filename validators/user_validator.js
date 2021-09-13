const Joi = require('joi');

const userRolesEnum = require('../entities/user-roler.enum');
const { constants } = require('../configs');

const createUserValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30)
    .trim()
    .required(),
  email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),

  password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),

  role: Joi.string().allow(...Object.values(userRolesEnum)),

});

const passwordValidator = Joi.object({
  password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),
});

module.exports = {
  createUserValidator,
  passwordValidator
};
