const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/inotebook'; // 
// OR for MongoDB Atlas
// const mongoURL = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/inotebook?retryWrites=true&w=majority';

const connectToMango = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectToMango;
