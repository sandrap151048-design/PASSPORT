import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      
      const dummyUser = {
        _id: 'admin123',
        name: email || 'Admin User',
        email: email || 'admin@worldpassport.in',
        role: 'admin'
      };

      res.json({
        message: 'Login successful',
        user: {
          id: dummyUser._id,
          name: dummyUser.name,
          email: dummyUser.email,
          role: dummyUser.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Error logging in',
        error: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
