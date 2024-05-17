import mongoose from 'mongoose';

const dbUrl = 'mongodb://localhost:27017/micro_data';

export const dbConnection = () => {
  try {
    mongoose.connect(dbUrl, { family: 4 })
      .then(() => {
        console.log('Databse Connected Successfully!!');
      });
  } catch (err) {
    console.log('Could not connect to the database', err);
  }
};

export const dbDisconnect = () => {
  try {
    mongoose.disconnect();
  } catch(err) {
    console.log('Could not disconnect to the database', err);
  }
};