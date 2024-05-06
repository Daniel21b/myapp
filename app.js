// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();  // Load environment variables
const axios = require('axios'); // Needed for API calls

// Import route modules
const planetRoutes = require('./routes/planets');

// Create an Express application
const app = express();

// Construct MongoDB URI using environment variables
const mongoUri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}` +
                 `@atlascluster.izgsohy.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));  // Serve static files from 'public' directory

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Database connection using the corrected URI variable
mongoose.connect(mongoUri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/planets', planetRoutes);

// Home route - fetches planets from an external API and renders the home page
app.get('/', async (req, res) => {
    try {
        const apiResponse = await axios.get('https://api.example.com/planets');
        const planets = apiResponse.data; // Assuming the data is directly an array of planets
        res.render('index', { planets: planets });
    } catch (error) {
        console.error('Failed to fetch planets:', error);
        res.render('index', { planets: [] }); // Render with empty array on error
    }
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
