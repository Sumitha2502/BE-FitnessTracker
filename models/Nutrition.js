const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../utils/config');

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

module.exports = mongoose.model('Nutrition', nutritionSchema, 'nutrition');