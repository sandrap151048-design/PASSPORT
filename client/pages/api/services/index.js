import dbConnect from '../../../lib/mongodb';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const services = await Service.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const service = new Service(req.body);
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
