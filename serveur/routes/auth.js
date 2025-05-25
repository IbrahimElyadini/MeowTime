require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN = {
  username: 'admin',
  password: 'admin',
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
      const token = jwt.sign(
      { username },                      // données dans le token
      process.env.JWT_SECRET,           // clé de signature
      { expiresIn: '1h' }               // validité 1h
    );
    console.log(`Connexion réussie pour ${username}`);
    return res.status(200).json({ message: 'Connexion réussie', token: token });
  }

  console.log(`Échec de connexion pour ${username}`);
  return res.status(401).json({ message: 'Identifiants invalides' });
});

module.exports = router;
