import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      res.json(users);
    } catch (error) {
      console.error('Fetch users error:', error);
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
