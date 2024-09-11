const express = require('express');
const Nutrition=require('../models/Nutrition')
const nutritionRoute = express.Router();


nutritionRoute.get('/api/nutrition', async (req, res) => {
    const entries = await Nutrition.find();
    res.json(entries);
});

nutritionRoute.post('/api/nutrition', async (req, res) => {
    const newEntry = new Nutrition(req.body);
    await newEntry.save();
    res.json(newEntry);
});

module.exports = nutritionRoute;