const express = require('express');
const router = express.Router();

const ADMIN = {
  username: 'admin',
  password: 'admin',
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    console.log(`Connexion réussie pour ${username}`);
    return res.status(200).json({ message: 'Connexion réussie', token: 'fake-jwt-token' });
  }

  console.log(`Échec de connexion pour ${username}`);
  return res.status(401).json({ message: 'Identifiants invalides' });
});

module.exports = router;
