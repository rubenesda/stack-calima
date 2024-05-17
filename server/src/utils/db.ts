import mongoose from 'mongoose';
import 'dotenv/config';

const dbUrl = process.env.DB_URL;

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

export const dbDisconnect = async () => {
  try {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.drop();
    }
    mongoose.disconnect();
  } catch(err) {
    console.log('Could not disconnect to the database', err);
  }
};