const router = require('express').Router();
const usersController = require('../controllers/users.controller');

const {
  isUserByIdExist, isEmailExist, isRequestDataCorrect,
} = require('../middlewares/user.middleware');

router.post('/', isRequestDataCorrect, isEmailExist, usersController.createUser);

router.get('/', usersController.getAllUsers);

router.get('/:user_id', isUserByIdExist, usersController.getUserById);

router.delete('/:user_id', isUserByIdExist, isRequestDataCorrect, usersController.deleteUser);

module.exports = router;
