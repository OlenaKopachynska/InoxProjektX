const { Trip } = require('../dataBase');
const { CREATED } = require('../configs/statusCode.enum');

module.exports = {

  createTrip: async (req, res, next) => {
    try {
      const { country, price } = req.body;

      await Trip.create({ country, price });

      res.status(CREATED).json('created');
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
      const { trip_id } = req.params;

      await Trip.findByIdAndDelete(trip_id);

      res.json({ message: 'trip is deleted' });
    } catch (e) {
      next(e);
    }
  },

  // updateUser: async (req, res, next) => {
  //     try {
  //         const {user_id} = req.params;
  //         const {...user_id} = req.body;
  //
  //         await User.findByIdAndUpdate(userId, userData);
  //
  //         res
  //             .json({message: 'Updated'});
  //     } catch (e) {
  //         next(e);
  //     }
  // }
};
