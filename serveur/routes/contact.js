const express = require('express');
const router = express.Router();

let contacts = [];
let idCounter = 1;

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }

  const newContact = { id: idCounter++, name, email, message, date: new Date().toISOString() };
  contacts.push(newContact);

  console.log('Nouveau message de contact:', newContact);

  res.status(201).json({ message: 'Message reçu'});
});

module.exports = router;
