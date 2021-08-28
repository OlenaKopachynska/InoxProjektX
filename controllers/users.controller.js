const { User } = require('../dataBase');
const { CREATED } = require('../configs/statusCode.enum');

module.exports = {

  createUser: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      await User.create({ email, password, name });

      res.status(CREATED).json('created');
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const allUsers = await User.find({});
      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await User.findByIdAndDelete(user_id);

      res.json({ message: 'user is deleted' });
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
