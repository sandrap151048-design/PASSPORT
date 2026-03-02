import dbConnect from '../../../lib/mongodb';
import University from '../../../models/University';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const university = await University.findByIdAndUpdate(id, req.body, { new: true });
      if (!university) return res.status(404).json({ message: 'Not found' });
      res.json(university);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await University.findByIdAndDelete(id);
      res.json({ message: 'University deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
