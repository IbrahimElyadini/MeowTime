const express = require('express');
const router = express.Router();
const { dbService } = require('../services/database'); // ajuste le chemin selon ton projet

router.use(async (req, res, next) => {
  if (!dbService.db) {
    await dbService.connectToServer();
  }
  next();
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }

  const newContact = {
    name,
    email,
    message,
    date: new Date().toISOString()
  };
 try {
    const result = await dbService.db.collection('Messages').insertOne(newContact);
    console.log('Nouveau message de contact enregistré :', result.insertedId);

    res.status(201).json({ message: 'Message reçu' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du message :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
