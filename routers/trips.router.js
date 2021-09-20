const router = require('express').Router();
const tripsController = require('../controllers/trip.controller');
const { tripMiddleware, fileMiddleware } = require('../middlewares');

router.post('/',
  tripMiddleware.isRequestDataComplete,
  fileMiddleware.checkTripImage,
  tripMiddleware.isCountryExist,
  tripsController.createTrip);

router.get('/', tripsController.getAllTrips);

router.get('/:trip_id', tripMiddleware.isTripByIdExist, tripsController.getTripById);

router.delete('/:trip_id', tripMiddleware.isTripByIdExist, tripsController.deleteTripById);

router.put('/:trip_id', tripMiddleware.isTripByIdExist, tripsController.updateTrip);

module.exports = router;
