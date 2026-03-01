const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

router.post('/', async (req, res) => {
  try {
    const contact = { ...req.body, _id: generateId(), createdAt: new Date() };
    const contacts = getCollection('contacts');
    contacts.push(contact);
    saveCollection('contacts', contacts);
    res.status(201).json({ message: 'Contact message sent', data: contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all contacts (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = getCollection('contacts');
    res.json(contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
