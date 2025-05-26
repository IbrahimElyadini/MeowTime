require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { dbService } = require('../services/database'); // adapte le chemin selon ta structure

router.use(async (req, res, next) => {
  if (!dbService.db) {
    await dbService.connectToServer();
  }
  next();
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
  }

  try {
    // Recherche utilisateur dans la collection "Client"
    const user = await dbService.db.collection('Client').findOne({ username });

    if (!user) {
      console.log(`Échec de connexion pour ${username} : utilisateur non trouvé`);
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Vérifier mot de passe
    if (user.password !== password) {
      console.log(`Échec de connexion pour ${username} : mot de passe incorrect`);
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Générer token JWT
    const token = jwt.sign(
      { username },                     // données dans le token
      process.env.JWT_SECRET,           // clé de signature
      { expiresIn: '1h' }               // validité 1h
    );

    console.log(`Connexion réussie pour ${username}`);
    return res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});


module.exports = router;
