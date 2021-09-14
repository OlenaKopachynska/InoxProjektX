const ErrorHandler = require('../errors/ErrorHandler');
const { constants: { MAX_AVATAR_SIZE, PHOTOS_MIMETYPES } } = require('../configs');

module.exports = {
  checkUserAvatar: (req, res, next) => {
    try {
      const { avatar } = req.files;

      if (!avatar) {
        next();
        return;
      }

      const { name, size, mimetype } = avatar;

      if (!PHOTOS_MIMETYPES.includes(mimetype)) {
        throw new ErrorHandler(400, `Wrong file format ${name}`);
      }

      if (size > MAX_AVATAR_SIZE) {
        throw new ErrorHandler(400, `File ${name} is too big`);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkTripImage: (req, res, next) => {
    try {
      const { trip_image } = req.files;

      if (!trip_image) {
        next();
        return;
      }

      const { name, size, mimetype } = trip_image;

      if (!PHOTOS_MIMETYPES.includes(mimetype)) {
        throw new ErrorHandler(400, `Wrong file format ${name}`);
      }

      if (size > MAX_AVATAR_SIZE) {
        throw new ErrorHandler(400, `File ${name} is too big`);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
