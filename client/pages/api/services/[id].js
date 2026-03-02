import dbConnect from '../../../lib/mongodb';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const service = await Service.findById(id);
      if (!service) return res.status(404).json({ message: 'Service not found' });
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
      if (!service) return res.status(404).json({ message: 'Not found' });
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Service.findByIdAndDelete(id);
      res.json({ message: 'Service deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
