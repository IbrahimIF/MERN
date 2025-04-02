const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', //localhost
    'https://mern-frontend-kappa-drab.vercel.app', //vercel link
    'https://mern-i8eg.onrender.com' //render.com link
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: 'false',
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
    process.exit(1);
});

// endpoints variable
const MESSAGE_ROUTE = '/api/data';

// Schema and Model
const DataSchema = new mongoose.Schema({ 
  name: String,
  text: String,
});
const DataModel = mongoose.model('Message', DataSchema, 'Add-data'); //mongodb collection name

// Routes

// Root route for checking server status
app.get('/api', (req, res) => {
  res.send('Server is running. Use /api/data to interact with the API.');
});

// GET route to fetch data
app.get(MESSAGE_ROUTE, async (req, res) => {
  try {
    const collection = await DataModel.find();
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route to add data
app.post(MESSAGE_ROUTE, async (req, res) => {
  /* Using more simplified routes
  const newData = new DataModel({
    name: req.body.name,
    text: req.body.text,
  });
  */
  try {
    const savedData = new DataModel(req.body);
    await savedData.save();
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle undefined API routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    return next();
  }
  res.status(404).send('Endpoint not found.');
});

/*
// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'src')));
  app.get('*', (req, res) => { // Catch-all handler to send React's index.html for any other route
    res.sendFile(path.join(process.cwd(), 'src', 'index.html'));
  });
}
*/

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// For Vercel serverless deployment
module.exports = app;