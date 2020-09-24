/* --------------------------- Server Init --------------------------- */
const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

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

// read JSON file

const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

// Import data into DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data succesfully deleted');
  } catch (err) {
    console.log(err);
  }
};
