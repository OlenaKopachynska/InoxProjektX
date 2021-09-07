const { Trip } = require('../dataBase');
const { statusCodesEnum } = require('../entities');
const ErrorHandler = require('../errors/ErrorHandler');
const { tripValidator } = require('../validators');

module.exports = {

  isCountryExist: async (req, res, next) => {
    try {
      const { error, value } = tripValidator.createTripValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, error.details[0].message);
      }

      const trip = await Trip.findOne({ country: value.country.trim() });

      if (trip) {
        throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, 'Trip does already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isTripByIdExist: async (req, res, next) => {
    try {
      const { trip_id } = req.params;

      const trip = await Trip.findById(trip_id);

      if (!trip) {
        throw new ErrorHandler(statusCodesEnum.NOT_FOUND, 'Trip is not found');
      }

      req.trip = trip;

      next();
    } catch (err) {
      next(err);
    }
  },
  isRequestDataComplete: (req, res, next) => {
    try {
      const { error, value } = tripValidator.createTripValidator.validate(req.body);
      if (error) {
        throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, error.details[0].message);
      }
      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }
};
