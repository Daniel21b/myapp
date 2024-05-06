const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/', async (req, res) => {
    try {

        const response = await axios.get('https://api.lunarland.com/');
        res.render('planets/index', { planets: response.data });
    } catch (error) {
        console.error('Error fetching planets:', error);
        res.status(500).send('Failed to retrieve planets');
    }
});


router.get('/:planetId', async (req, res) => {
    try {
        
        const response = await axios.get(`https://api.lunarland.com/${req.params.planetId}`);
        res.render('planets/detail', { planet: response.data });
    } catch (error) {
        console.error('Error fetching planet details:', error);
        res.status(500).send('Failed to retrieve planet details');
    }
});


router.post('/purchase', (req, res) => {
    // Process the purchase here
    // Assume a form with `planetId`, `userId`, and other necessary fields are submitted
    const { userId, planetId, purchaseDetails } = req.body;
    console.log(`User ${userId} purchased land on planet ${planetId}: ${purchaseDetails}`);
    // Here you might handle the transaction, save to the database, etc.
    res.send('Purchase successful!');
});

module.exports = router;
