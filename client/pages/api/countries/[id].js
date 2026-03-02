import dbConnect from '../../../lib/mongodb';
import Country from '../../../models/Country';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const country = await Country.findByIdAndUpdate(id, req.body, { new: true });
      if (!country) return res.status(404).json({ message: 'Not found' });
      res.json(country);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Country.findByIdAndDelete(id);
      res.json({ message: 'Country deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
