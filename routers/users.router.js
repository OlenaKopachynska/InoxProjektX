const router = require('express').Router();
const usersController = require('../controllers/users.controller');

const {
  isUserByIdExist, isEmailExist, isRequestDataComplete, isEmailCorrect
} = require('../middlewares/user.middleware');

router.post('/', isEmailCorrect, isRequestDataComplete, isEmailExist, usersController.createUser);

router.get('/', usersController.getAllUsers);

router.get('/:user_id', isUserByIdExist, usersController.getUserById);

router.delete('/:user_id', isUserByIdExist, usersController.deleteUser);

module.exports = router;
