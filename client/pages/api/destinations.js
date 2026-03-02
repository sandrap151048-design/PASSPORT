import dbConnect from '../../lib/mongodb';
import Country from '../../models/Country';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const destinations = await Country.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const destination = new Country(req.body);
      await destination.save();
      res.status(201).json(destination);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
