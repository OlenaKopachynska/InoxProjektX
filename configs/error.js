module.exports = {
  BAD_REQUEST: {
    FILE_IS_TOO_BIG: {
      message: 'File is too big',
      customCode: '400.1',
      status: 400
    },
    WRONG_FILE_FORMAT: {
      message: 'Wrong file format',
      customCode: '400.2',
      status: 400
    },
    TRIP_EXIST: {
      message: 'Trip does already exists',
      customCode: '400.3',
      status: 400
    },
    EMAIL_EXIST: {
      message: 'Email does already exists',
      customCode: '400.4',
      status: 400
    },
    VALIDATION_EXCEPTION: {
      message: 'Entered data is not valid',
      customCode: '400.5',
      status: 400
    }
  },
  UNAUTHORIZED: {
    NO_TOKEN: {
      message: 'No token',
      customCode: '401.1',
      status: 401
    },
    INVALID_TOKEN: {
      message: 'Invalid token',
      customCode: '401.2',
      status: 401
    }
  },
  FORBIDDEN: {
    ACCESS_DENIED: {
      message: 'Role does not have access',
      customCode: '403.1',
      status: 403
    }
  },
  NOT_FOUND: {
    TRIP_IS_NOT_FOUND: {
      message: 'Trip is not found',
      customCode: '404.1',
      status: 404
    },
    USER_IS_NOT_FOUND: {
      message: 'User is not found',
      customCode: '404.1',
      status: 404
    },
  },

  SERVER_ERROR: {
    WRONG_TEMPLATE: {
      message: 'Wrong template',
      customCode: '500.1',
      status: 500
    }
  }

};
