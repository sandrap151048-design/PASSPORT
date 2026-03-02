const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

// Get all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all countries (admin) - must be before /:id
router.get('/admin', async (req, res) => {
  try {
    const countries = await Country.find().sort({ createdAt: -1 });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create country
router.post('/', async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update country
router.put('/:id', async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!country) return res.status(404).json({ message: 'Not found' });
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete country
router.delete('/:id', async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);
    res.json({ message: 'Country deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
