/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/* ------------------------ Middleware functions ---------------------------- */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // logging
}

app.use(express.json()); // allows for reading JSON requests

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // MUST be used at end of middleware function
});

/* ------------------------ App Routes ---------------------------- */

app.use(`/api/v1/tours`, tourRouter);
app.use(`/api/v1/users`, userRouter);

module.exports = app;
