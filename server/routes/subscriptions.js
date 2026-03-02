const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Create new subscription
router.post('/', async (req, res) => {
    try {
        const { email, interest } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if already subscribed
        const existing = await Subscription.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: 'You are already subscribed!' });
        }

        const newSubscription = new Subscription({
            email,
            interest: interest || 'General',
            status: 'pending'
        });
        await newSubscription.save();

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
        const subscriptions = await Subscription.find().sort({ createdAt: -1 });
        res.json(subscriptions);
    } catch (error) {
        console.error('Fetch subscriptions error:', error);
        res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
    }
});

module.exports = router;
