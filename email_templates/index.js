const { WELCOME, GOODBYE, FORGOT_PASS } = require('../entities/emailActions.enum');

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
    subject: 'forgot_password'
  }
};
