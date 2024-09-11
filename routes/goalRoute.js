const express = require('express');
const Goal=require('../models/Goals')
const goalRoute = express.Router();

goalRoute.get('/getgoals', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

goalRoute.post('/api/goals', async (req, res) => {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.json(newGoal);
});

goalRoute.put('/api/goals/:id', async (req, res) => {
    await Goal.findByIdAndUpdate(req.params.id, { achieved: true });
    res.json({ success: true });
});

module.exports = goalRoute;

