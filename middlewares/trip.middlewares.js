const { Trip } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../configs/statusCode.enum');

module.exports = {

  isCountryExist: async (req, res, next) => {
    try {
      const { country } = req.body;

      const trip = await Trip.findOne({ country: country.trim() });

      if (trip) {
        throw new ErrorHandler(400, 'Trip does already exist');
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
        throw new ErrorHandler(404, 'Trip is not found');
      }

      req.trip = trip;

      next();
    } catch (err) {
      next(err);
    }
  },
  isRequestDataComplete: (req, res, next) => {
    try {
      const { country } = req.body;

      if (!country) {
        throw new ErrorHandler(BAD_REQUEST, 'Bad request');
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
