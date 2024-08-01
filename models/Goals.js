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

app.get('/api/goals', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

app.post('/api/goals', async (req, res) => {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.json(newGoal);
});

app.put('/api/goals/:id', async (req, res) => {
    await Goal.findByIdAndUpdate(req.params.id, { achieved: true });
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});


module.exports = mongoose.model('Goal', goalSchema, 'goal');
