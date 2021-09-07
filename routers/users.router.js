const router = require('express').Router();
const usersController = require('../controllers/users.controller');

const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/',
  userMiddleware.isRequestDataCorrect,
  userMiddleware.getUserByDynamicParam('email'),
  userMiddleware.isEmailExist,
  usersController.createUser);

router.get('/', usersController.getAllUsers);

router.get('/:user_id', userMiddleware.isUserByIdExist, usersController.getUserById);

router.delete('/:user_id', userMiddleware.isUserByIdExist, authMiddleware.checkAccessToken, usersController.deleteUser);

module.exports = router;
