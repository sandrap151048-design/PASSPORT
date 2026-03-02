const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

// Get all services
router.get('/', (req, res) => {
  try {
    const services = getCollection('services').filter(s => s.isActive !== false);
    res.json(services.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single service
router.get('/:id', (req, res) => {
  try {
    const services = getCollection('services');
    const service = services.find(s => s._id === req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all services (admin)
router.get('/admin', (req, res) => {
  try {
    const services = getCollection('services');
    res.json(services.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create service
router.post('/', (req, res) => {
  try {
    const service = { ...req.body, _id: generateId(), createdAt: new Date().toISOString() };
    const services = getCollection('services');
    services.push(service);
    saveCollection('services', services);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update service
router.put('/:id', (req, res) => {
  try {
    let services = getCollection('services');
    const index = services.findIndex(s => s._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });

    services[index] = { ...services[index], ...req.body };
    saveCollection('services', services);
    res.json(services[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete service
router.delete('/:id', (req, res) => {
  try {
    const services = getCollection('services').filter(s => s._id !== req.params.id);
    saveCollection('services', services);
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
