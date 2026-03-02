import dbConnect from '../../../lib/mongodb';
import Program from '../../../models/Program';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const program = await Program.findById(id);
      if (!program) return res.status(404).json({ message: 'Program not found' });
      res.json(program);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const program = await Program.findByIdAndUpdate(id, req.body, { new: true });
      if (!program) return res.status(404).json({ message: 'Not found' });
      res.json(program);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Program.findByIdAndDelete(id);
      res.json({ message: 'Program deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
