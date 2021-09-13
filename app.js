const express = require('express');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');

const path = require('path');

require('dotenv').config();

const { DB_URL, PORT } = require('./configs/configs');

mongoose.connect(DB_URL);

require('./utils/create_super_apmin_util');

const staticPath = path.join(__dirname, 'static');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

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
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error'
    });
}
