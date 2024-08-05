const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT; // Use the port from .env or default to 5000

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas using connection string from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

                                                                              //Schema
  const Schema = mongoose.Schema;

// Define the schema and model 
const DataSchema = new Schema({
    name: String,
    text: String,
    //price: Number,
    //Email: Email,
});
  const DataModel = mongoose.model('collection', DataSchema);


// Route to get named Collection from Database
app.get('/Reacr-MongoDB', async (req, res) => {
    try {
      const collection = await DataModel.find();
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Route to post data
app.post('/Reacr-MongoDB', async (req, res) => {
    const newData = new DataModel({
      name: req.body.name,
      text: req.body.text,
    });
  
    try {
      const savedData = await newData.save();
      res.json(savedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});