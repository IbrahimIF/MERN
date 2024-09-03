
const serverless = require('serverless-http')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

const app = express();
/*const PORT = process.env.PORT*/

/*
app.use(cors({
  origin: ['http://localhost:4000', 'https://react-to-mongodb.vercel.app/']
}));
*/

// Connect to MongoDB Atlas using connection string from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

app.use(cors());
app.use(express.json());


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
app.get('/api/Reacr-MongoDB', async (req, res) => {
    try {
      const collection = await DataModel.find();
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Route to post data
app.post('/api/Reacr-MongoDB', async (req, res) => {
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


  if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }

  /*
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/

// Export the Express app as a module
module.exports = serverless(app);