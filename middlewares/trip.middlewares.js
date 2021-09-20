const { Trip } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { tripValidator } = require('../validators');
const { BAD_REQUEST, NOT_FOUND } = require('../configs/error');

module.exports = {

  isCountryExist: async (req, res, next) => {
    try {
      const { error, value } = tripValidator.createTripValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          BAD_REQUEST.VALIDATION_EXCEPTION.status,
          BAD_REQUEST.VALIDATION_EXCEPTION.customCode,
          'Entered data is not valid',
        );
      }

      const trip = await Trip.findOne({ country: value.country.trim() });

      if (trip) {
        throw new ErrorHandler(

          BAD_REQUEST.TRIP_EXIST.status,
          BAD_REQUEST.TRIP_EXIST.customCode,
          'Trip does already exists',
          trip

        );
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
        throw new ErrorHandler(
          NOT_FOUND.TRIP_IS_NOT_FOUND.status,
          NOT_FOUND.TRIP_EXIST.customCode,
          'Trip is not found'
        );
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
        throw new ErrorHandler(
          BAD_REQUEST.VALIDATION_EXCEPTION.status,
          BAD_REQUEST.VALIDATION_EXCEPTION.customCode,
          'Entered data is not valid',
        );
      }
      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }
};
