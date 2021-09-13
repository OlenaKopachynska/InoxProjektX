const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const templatesInfo = require('../email_templates');

const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodesEnum } = require('../entities');
const { EMAIL_SENDER_ADDRESS, EMAIL_SENDER_PASS } = require('../configs/configs');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email_templates')
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_SENDER_ADDRESS,
    pass: EMAIL_SENDER_PASS
  }
});
const sendMail = async (userEmail, emailAction, context = {}) => {
  const templateToSend = templatesInfo[emailAction];

  if (!templateToSend) {
    throw new ErrorHandler(statusCodesEnum.SERVER_ERROR, 'Wrong template');
  }

  const { subject, templateName } = templateToSend;

  const html = await templateParser.render(templateName, context);

  return transporter.sendMail({
    from: 'No reply',
    to: userEmail,
    subject,
    html
  });
};

module.exports = {
  sendMail
};
