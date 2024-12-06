const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://mern-topaz-xi.vercel.app'
  ]
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas', err));

// Schema and Model
const DataSchema = new mongoose.Schema({
  name: String,
  text: String,
});
const DataModel = mongoose.model('collection', DataSchema);

// Routes
// Root route for checking server status
app.get('/', (req, res) => {
  res.send('Server is running. Use /api/React-MongoDB to interact with the API.');
});

// GET route to fetch data
app.get('/api/React-MongoDB', async (req, res) => {
  try {
    const collection = await DataModel.find();
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add data
app.post('/api/React-MongoDB', async (req, res) => {
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

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).send('Endpoint not found.');
});

// Server configuration for local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// For Vercel serverless deployment
module.exports = app;