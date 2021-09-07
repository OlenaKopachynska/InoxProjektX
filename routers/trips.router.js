const router = require('express').Router();

const tripsController = require('../controllers/trip.controller');
const { tripMiddleware } = require('../middlewares');

router.post('/', tripMiddleware.isRequestDataComplete, tripMiddleware.isCountryExist, tripsController.createTrip);

router.get('/', tripsController.getAllTrips);

router.get('/:trip_id', tripMiddleware.isTripByIdExist, tripsController.getTripById);

router.delete('/:trip_id', tripMiddleware.isTripByIdExist, tripsController.deleteTripById);

module.exports = router;
