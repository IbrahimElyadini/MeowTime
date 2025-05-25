require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token invalide' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {console.log(err); return res.status(403).json({ error: 'Token expiré ou invalide' })};
    req.user = user;
    next();
  });
}

module.exports = verifyToken;
