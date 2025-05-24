require('dotenv').config();
const express = require('express');
const cors = require('cors');
const feedingRoutes = require('./routes/feeding');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const ESP32_IP = process.env.ESP32_IP || '127.0.0.1';
const ESP32_PORT = process.env.ESP32_PORT || 80;
const PORT = process.env.PORT || 5020;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur MeowTime en ligne');
});

app.use('/api/feeding', feedingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
