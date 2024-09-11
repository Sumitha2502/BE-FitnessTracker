const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('MONGO_URI', { useNewUrlParser: true, useUnifiedTopology: true });

const goalSchema = new mongoose.Schema({
    title: String,
    description: String,
    targetDate: String,
    // achieved: { type: Boolean, default: false }
});

const Goal = mongoose.model('Goal', goalSchema);


module.exports = mongoose.model('Goal', goalSchema, 'goal');
