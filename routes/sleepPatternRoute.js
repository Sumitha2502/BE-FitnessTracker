const express = require('express');
const sleepPatterns=require('../models/Goals')
const sleepPatternRoute = express.Router();

sleepPatternRoute.get('/api/sleep', async (req, res) => {
    const entries = await Sleep.find();
    res.json(entries);
});

sleepPatternRoute.post('/api/sleep', async (req, res) => {
    const newEntry = new sleepPatterns(req.body);
    await newEntry.save();
    res.json(newEntry);
});

module.exports = sleepPatternRoute;
