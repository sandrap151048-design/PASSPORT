const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Local File Database setup is handled within routes using ../utils/db.js

// Routes
app.use('/api/consultations', require('./routes/consultations'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/services', require('./routes/services'));
app.use('/api/countries', require('./routes/countries'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/universities', require('./routes/universities'));
app.use('/api/partners', require('./routes/partners'));

app.get('/', (req, res) => {
  res.json({ message: 'World Passport API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
