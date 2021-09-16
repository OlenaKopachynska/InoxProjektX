const ErrorHandler = require('../errors/ErrorHandler');
const { constants: { MAX_TRIP_IMAGE_SIZE, MAX_AVATAR_SIZE, PHOTOS_MIMETYPES } } = require('../configs');
const { BAD_REQUEST } = require('../configs/error');

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
        throw new ErrorHandler(
          BAD_REQUEST.WRONG_FILE_FORMAT.status,
          BAD_REQUEST.WRONG_FILE_FORMAT.customCode,
          name,
          'Wrong file format'
        );
      }

      if (size > MAX_AVATAR_SIZE) {
        throw new ErrorHandler(
          BAD_REQUEST.FILE_IS_TOO_BIG.status,
          BAD_REQUEST.FILE_IS_TOO_BIG.customCode,
          size,
          'File is too big'

        );
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
        throw new ErrorHandler(
          BAD_REQUEST.WRONG_FILE_FORMAT.status,
          BAD_REQUEST.WRONG_FILE_FORMAT.customCode,
          name,
          'Wrong file format'
        );
      }

      if (size > MAX_TRIP_IMAGE_SIZE) {
        throw new ErrorHandler(
          BAD_REQUEST.FILE_IS_TOO_BIG.status,
          BAD_REQUEST.FILE_IS_TOO_BIG.customCode,
          size,
          'File is too big'
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
