const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

// Get all programs (admin)
router.get('/admin', (req, res) => {
  try {
    const programs = getCollection('programs');
    res.json(programs.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all programs
router.get('/', (req, res) => {
  try {
    const programs = getCollection('programs').filter(p => p.isActive !== false);
    res.json(programs.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get programs by type
router.get('/type/:type', (req, res) => {
  try {
    const programs = getCollection('programs').filter(p => p.type === req.params.type && p.isActive !== false);
    res.json(programs.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create program
router.post('/', (req, res) => {
  try {
    const program = { ...req.body, _id: generateId(), createdAt: new Date().toISOString() };
    const programs = getCollection('programs');
    programs.push(program);
    saveCollection('programs', programs);
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update program
router.put('/:id', (req, res) => {
  try {
    let programs = getCollection('programs');
    const index = programs.findIndex(p => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });

    programs[index] = { ...programs[index], ...req.body };
    saveCollection('programs', programs);
    res.json(programs[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete program
router.delete('/:id', (req, res) => {
  try {
    const programs = getCollection('programs').filter(p => p._id !== req.params.id);
    saveCollection('programs', programs);
    res.json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single program
router.get('/:id', (req, res) => {
  try {
    const program = getCollection('programs').find(p => p._id === req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
