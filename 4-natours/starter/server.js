/* --------------------------- Server Init --------------------------- */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
