const Joi = require('joi');
const countriesEnum = require('../entities/countries.enum');

const createTripValidator = Joi.object({
  country: Joi.string().alphanum().valid(...Object.values(countriesEnum)).insensitive()
    .required(),

  price: Joi.number().positive().required(),

});

module.exports = {
  createTripValidator
};
