const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

// Create new subscription
router.post('/', async (req, res) => {
    try {
        const { email, interest } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const subscriptions = getCollection('subscriptions');

        // Check if already subscribed
        const existing = subscriptions.find(s => s.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            return res.status(400).json({ message: 'You are already subscribed!' });
        }

        const newSubscription = {
            _id: generateId(),
            email,
            interest: interest || 'General',
            createdAt: new Date(),
            status: 'pending' // or 'subscribed'
        };

        subscriptions.push(newSubscription);
        saveCollection('subscriptions', subscriptions);

        res.status(201).json({
            message: 'Subscribed successfully! We will keep you updated.',
            subscription: newSubscription
        });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ message: 'Error subscribing', error: error.message });
    }
});

// Get all subscriptions (admin only)
router.get('/', async (req, res) => {
    try {
        const subscriptions = getCollection('subscriptions');
        res.json(subscriptions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
        console.error('Fetch subscriptions error:', error);
        res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
    }
});

module.exports = router;
