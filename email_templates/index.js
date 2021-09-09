const { WELCOME, GOODBYE } = require('../entities/emailActions.enum');

module.exports = {
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on our platform'
  },
  [GOODBYE]: {
    templateName: 'goodbye',
    subject: 'Goodbye!!!'
  }
};
