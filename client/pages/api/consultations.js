import dbConnect from '../../lib/mongodb';
import Consultation from '../../models/Consultation';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const consultation = new Consultation(req.body);
      await consultation.save();
      res.status(201).json({ message: 'Consultation request submitted', data: consultation });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const consultations = await Consultation.find().sort({ createdAt: -1 });
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
