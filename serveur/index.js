require('dotenv').config();
const express = require('express');
const cors = require('cors');

const feedingRoutes = require('./routes/feeding');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const { dbService } = require('./services/database');     

const PORT = process.env.PORT || 5020;

const app = express();

app.use(cors({ origin: '*',  
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
 }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur MeowTime en ligne');
});

(async () => {
  try {
    await dbService.connectToServer(process.env.MONGODB_URL);

    app.use('/api/feeding', feedingRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/contact', contactRoutes);

    app.listen(PORT, () => {
      console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Connexion à la base de données échouée', err);
    process.exit(1);
  }
})();
