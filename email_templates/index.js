const {
  CREATE_ADMIN, FORGOT_PASS, GOODBYE, WELCOME
} = require('../entities/emailActions.enum');

module.exports = {
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on our platform'
  },
  [GOODBYE]: {
    templateName: 'goodbye',
    subject: 'Goodbye!!!'
  },
  [FORGOT_PASS]: {
    templateName: 'forgot_password',
    subject: 'forgot password'
  },
  [CREATE_ADMIN]: {
    templateName: 'create_admin',
    subject: 'create admin'
  }
};
