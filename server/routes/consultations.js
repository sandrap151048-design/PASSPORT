const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

router.post('/', async (req, res) => {
  try {
    const consultation = { ...req.body, _id: generateId(), createdAt: new Date() };
    const consultations = getCollection('consultations');
    consultations.push(consultation);
    saveCollection('consultations', consultations);
    res.status(201).json({ message: 'Consultation request submitted', data: consultation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const consultations = getCollection('consultations');
    res.json(consultations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
