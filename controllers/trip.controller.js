const { Trip } = require('../dataBase');
const { statusCodesEnum } = require('../entities');
const { s3Service } = require('../services');

module.exports = {

  createTrip: async (req, res, next) => {
    try {
      const { country, price } = req.body;

      const createdTrip = await Trip.create({ country, price });

      const { _id } = createdTrip;
      const { trip_image } = req.files;

      const uploadFile = await s3Service.uploadImage(trip_image, 'trip_image', _id);

      await Trip.findByIdAndUpdate(_id, { trip_image: uploadFile.key }, { new: true });

      res.status(statusCodesEnum.CREATED).json('created');
    } catch (e) {
      next(e);
    }
  },
  getAllTrips: async (req, res, next) => {
    try {
      const allTrips = await Trip.find({});

      res.json(allTrips);
    } catch (e) {
      next(e);
    }
  },

  getTripById: (req, res, next) => {
    try {
      const { trip } = req;

      res.json(trip);
    } catch (e) {
      next(e);
    }
  },

  deleteTripById: async (req, res, next) => {
    try {
      const { params: { trip_id }, trip } = req;

      await s3Service.deleteImage(trip.trip_image);

      await Trip.findByIdAndDelete(trip_id);

      res.json({ message: 'trip is deleted' });
    } catch (e) {
      next(e);
    }
  },

  updateTrip: async (req, res, next) => {
    try {
      const { trip } = req;

      await Trip.findByIdAndUpdate(trip, req.body);

      res.json({ message: 'trip is updated' });
    } catch (e) {
      next(e);
    }
  }

};
