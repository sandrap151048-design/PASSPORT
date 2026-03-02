const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

// Submit partner enquiry
router.post('/', async (req, res) => {
    try {
        const partner = { ...req.body, _id: generateId(), createdAt: new Date() };
        const partners = getCollection('partners');
        partners.push(partner);
        saveCollection('partners', partners);
        res.status(201).json({ message: 'Partner enquiry sent successfully', data: partner });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all partners (admin)
router.get('/', async (req, res) => {
    try {
        const partners = getCollection('partners');
        res.json(partners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
