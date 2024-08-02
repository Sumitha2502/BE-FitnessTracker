const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true });

const sleepSchema = new mongoose.Schema({
    date: String,
    duration: Number,
    quality: String,
});

const Sleep = mongoose.model('Sleep', sleepSchema);

app.get('/api/sleep', async (req, res) => {
    const entries = await Sleep.find();
    res.json(entries);
});

app.post('/api/sleep', async (req, res) => {
    const newEntry = new Sleep(req.body);
    await newEntry.save();
    res.json(newEntry);
});

module.exports = mongoose.model('Sleep', sleepSchema, 'sleep');
