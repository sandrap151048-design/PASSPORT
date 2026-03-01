const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

router.get('/', (req, res) => {
  try {
    const destinations = getCollection('countries').filter(c => c.isActive !== false);
    res.json(destinations.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const destination = { ...req.body, _id: generateId(), createdAt: new Date() };
    const destinations = getCollection('countries');
    destinations.push(destination);
    saveCollection('countries', destinations);
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
