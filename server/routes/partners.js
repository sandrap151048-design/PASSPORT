const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');

// Submit partner enquiry
router.post('/', async (req, res) => {
    try {
        const partner = new Partner(req.body);
        await partner.save();
        res.status(201).json({ message: 'Partner enquiry sent successfully', data: partner });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all partners (admin)
router.get('/', async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
