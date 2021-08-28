const router = require('express').Router();

const tripsController = require('../controllers/trip.controller');

const { isCountryExist, isTripByIdExist, isRequestDataComplete } = require('../middlewares/trip.middlewares');

router.post('/', isCountryExist, isRequestDataComplete, tripsController.createTrip);

router.get('/', tripsController.getAllTrips);

router.get('/:trip_id', isTripByIdExist, tripsController.getTripById);

router.delete('/:trip_id', isTripByIdExist, tripsController.deleteTripById);

module.exports = router;
