const cors = require('cors');
const express = require('express');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const path = require('path');

require('dotenv').config();

const app = express();

const { DB_URL, PORT, ALLOWED_ORIGIN } = require('./configs/configs');

mongoose.connect(DB_URL);
const cronJobs = require('./crons');

require('./utils/create_super_apmin_util');

const staticPath = path.join(__dirname, 'static');

app.use(cors({ origin: _configureCors }));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use(expressFileUpload());
app.use(helmet());

if (process.env.ENV === 'dev') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

const {
  adminRouter, usersRouter, tripsRouter, authRouter
} = require('./routers');

app.use('/', adminRouter);
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/auth', authRouter);

app.use(_mainErrorHandler);

app.listen(PORT, () => {
  console.log('App listen', PORT);
  cronJobs();
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.customCode,
      data: err.data
    });
}

function _configureCors(origin, callback) {
  const whiteList = ALLOWED_ORIGIN.split(';');

  if (!origin) {
    return callback(null, true);
  }

  if (!whiteList.includes(origin)) {
    return callback(new Error('Cors not allowed'), false);
  }

  return callback(null, true);
}
