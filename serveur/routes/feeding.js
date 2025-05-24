require('dotenv').config();
const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const { triggerFeeding } = require('../utils/esp32client');

const ESP32_IP = process.env.ESP32_IP || '127.0.0.1';
const ESP32_PORT = process.env.ESP32_PORT || 80;

let idCounter = 1;
const feedings = [];
const scheduledJobs = {};

// Ajouter une tâche de repas
router.post('/schedule', (req, res) => {
  const { time } = req.body;
  if (!time) return res.status(400).json({ error: 'Champ "time" requis' });

  const date = new Date(time);
  if (isNaN(date)) return res.status(400).json({ error: 'Date invalide' });

  const newFeeding = { id: idCounter++, time: date.toISOString() };
  feedings.push(newFeeding);

  // Programmer la tâche
  const job = schedule.scheduleJob(date, () => {
    triggerFeeding(ESP32_IP, ESP32_PORT);
    delete scheduledJobs[newFeeding.id];
    console.log(`Repas déclenché pour la tâche ${newFeeding.id} à ${newFeeding.time}`);
  });
  scheduledJobs[newFeeding.id] = job;

  console.log(`Repas programmé à ${newFeeding.time}`);
  res.status(201).json(newFeeding);
});

// Modifier une tâche
router.patch('/schedule/:id', (req, res) => {
  const { id } = req.params;
  const { time } = req.body;

  const feeding = feedings.find(f => f.id === parseInt(id));
  if (!feeding) return res.status(404).json({ error: 'Tâche non trouvée' });

  if (time) {
    const date = new Date(time);
    if (isNaN(date)) return res.status(400).json({ error: 'Date invalide' });

    feeding.time = date.toISOString();

    // Annuler l’ancienne tâche planifiée
    if (scheduledJobs[id]) {
      scheduledJobs[id].cancel();
    }

    // Reprogrammer avec la nouvelle heure
    const job = schedule.scheduleJob(date, () => {
      triggerFeeding(ESP32_IP, ESP32_PORT);
      delete scheduledJobs[id];
      console.log(`Repas déclenché pour la tâche ${id} à ${feeding.time}`);
    });
    scheduledJobs[id] = job;
  }

  console.log(`Tâche ${id} modifiée → ${feeding.time}`);
  res.json(feeding);
});

// Supprimer une tâche
router.delete('/schedule/:id', (req, res) => {
  const { id } = req.params;
  const index = feedings.findIndex(f => f.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Tâche non trouvée' });

  if (scheduledJobs[id]) {
    scheduledJobs[id].cancel();
    delete scheduledJobs[id];
  }

  const deleted = feedings.splice(index, 1);
  console.log(`Tâche ${id} supprimée`);
  res.json({ message: 'Supprimé', deleted: deleted[0] });
});

// Obtenir toutes les tâches
router.get('/schedule', (req, res) => {
  console.log('Récupération de toutes les tâches de repas');
  res.json(feedings);
});

// Déclencher un repas immédiatement
router.post('/schedule/now', async (req, res) => {
  try {
    await triggerFeeding(ESP32_IP, ESP32_PORT);
    console.log('Repas déclenché immédiatement');
    res.status(200).json({ message: 'Repas déclenché immédiatement' });
  } catch (error) {
    console.error('Erreur lors du déclenchement immédiat :', error);
    res.status(500).json({ error: 'Échec du déclenchement' });
  }
});


module.exports = router;
