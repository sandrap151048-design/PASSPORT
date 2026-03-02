const express = require('express');
const router = express.Router();
const University = require('../models/University');

// Get all universities
router.get('/', async (req, res) => {
    try {
        const universities = await University.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all universities (admin) - must be before /:id
router.get('/admin', async (req, res) => {
    try {
        const universities = await University.find().sort({ createdAt: -1 });
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create university
router.post('/', async (req, res) => {
    try {
        const university = new University(req.body);
        await university.save();
        res.status(201).json(university);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update university
router.put('/:id', async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!university) return res.status(404).json({ message: 'Not found' });
        res.json(university);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete university
router.delete('/:id', async (req, res) => {
    try {
        await University.findByIdAndDelete(req.params.id);
        res.json({ message: 'University deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
