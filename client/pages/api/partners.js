import dbConnect from '../../lib/mongodb';
import Partner from '../../models/Partner';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const partner = new Partner(req.body);
      await partner.save();
      res.status(201).json({ message: 'Partner enquiry sent successfully', data: partner });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const partners = await Partner.find().sort({ createdAt: -1 });
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
