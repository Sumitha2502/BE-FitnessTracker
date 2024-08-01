const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true });

const nutritionSchema = new mongoose.Schema({
    date: String,
    calories: Number,
    carbs: Number,
    protein: Number,
    fat: Number,
    water: Number,
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

app.get('/api/nutrition', async (req, res) => {
    const entries = await Nutrition.find();
    res.json(entries);
});

app.post('/api/nutrition', async (req, res) => {
    const newEntry = new Nutrition(req.body);
    await newEntry.save();
    res.json(newEntry);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});


module.exports = mongoose.model('Nutrition', nutritionSchema, 'nutrition');