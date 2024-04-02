try {
  const createError = require('http-errors');
  const express = require('express');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const logger = require('morgan');
  require('dotenv').config()
  const mongoose = require('mongoose');

  var port = process.env.PORT || 3000;

  const Database = "mongodb+srv://mrjeelsardhara:mrjeelsardhara@loginsignup.nadlf.mongodb.net/Render";


  mongoose.connect(Database).then(() => {
    console.log("Database Is Connected Successfully ✅");
  }).catch((err) => console.log("Database Is Not Connected"))

  const apiRouter = require('./routes/Loginregister');
  const indexRouter = require('./routes/index');

  const app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/Api', apiRouter);

  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
  });

  module.exports = app;

  app.listen(port);

  console.log("The Node.Js Server Is Started As Successfully 🗿")
} catch (error) {
  console.log("⚠️  The Error Is = ", error.message)
}
