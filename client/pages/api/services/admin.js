import dbConnect from '../../../lib/mongodb';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const services = await Service.find().sort({ createdAt: -1 });
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
