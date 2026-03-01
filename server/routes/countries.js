const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

// Get all countries
router.get('/', (req, res) => {
  try {
    const countries = getCollection('countries').filter(c => c.isActive !== false);
    res.json(countries.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all countries (admin)
router.get('/admin', (req, res) => {
  try {
    const countries = getCollection('countries');
    res.json(countries.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create country
router.post('/', (req, res) => {
  try {
    const country = { ...req.body, _id: generateId(), createdAt: new Date().toISOString() };
    const countries = getCollection('countries');
    countries.push(country);
    saveCollection('countries', countries);
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update country
router.put('/:id', (req, res) => {
  try {
    let countries = getCollection('countries');
    const index = countries.findIndex(c => c._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });

    countries[index] = { ...countries[index], ...req.body };
    saveCollection('countries', countries);
    res.json(countries[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete country
router.delete('/:id', (req, res) => {
  try {
    const countries = getCollection('countries').filter(c => c._id !== req.params.id);
    saveCollection('countries', countries);
    res.json({ message: 'Country deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
