import dbConnect from '../../../lib/mongodb';
import Program from '../../../models/Program';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const programs = await Program.find().sort({ createdAt: -1 });
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
