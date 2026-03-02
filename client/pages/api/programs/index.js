import dbConnect from '../../../lib/mongodb';
import Program from '../../../models/Program';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const programs = await Program.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const program = new Program(req.body);
      await program.save();
      res.status(201).json(program);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
