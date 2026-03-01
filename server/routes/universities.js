const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

// Get all universities
router.get('/', (req, res) => {
    try {
        const universities = getCollection('universities').filter(u => u.isActive !== false);
        res.json(universities.reverse());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all universities (admin)
router.get('/admin', (req, res) => {
    try {
        const universities = getCollection('universities');
        res.json(universities.reverse());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create university
router.post('/', (req, res) => {
    try {
        const university = { ...req.body, _id: generateId(), createdAt: new Date().toISOString() };
        const universities = getCollection('universities');
        universities.push(university);
        saveCollection('universities', universities);
        res.status(201).json(university);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update university
router.put('/:id', (req, res) => {
    try {
        let universities = getCollection('universities');
        const index = universities.findIndex(u => u._id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Not found' });

        universities[index] = { ...universities[index], ...req.body };
        saveCollection('universities', universities);
        res.json(universities[index]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete university
router.delete('/:id', (req, res) => {
    try {
        const universities = getCollection('universities').filter(u => u._id !== req.params.id);
        saveCollection('universities', universities);
        res.json({ message: 'University deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
