import dbConnect from '../../../lib/mongodb';
import University from '../../../models/University';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const universities = await University.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
      res.json(universities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const university = new University(req.body);
      await university.save();
      res.status(201).json(university);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
