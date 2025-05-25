const express       = require('express');
const router        = express.Router();
const schedule      = require('node-schedule');
const { triggerFeeding } = require('../utils/esp32client');
const verifyToken   = require('../middlewares/verifyToken');

const ESP32_IP   = process.env.ESP32_IP   || '127.0.0.1';
const ESP32_PORT = process.env.ESP32_PORT || 80;

let idCounter    = 1;
const feedings   = [];
const scheduledJobs = {};

/**
 * Aide à créer un job node-schedule ponctuel ou récurrent
 * @param {number} id 
 * @param {string} time — soit ISO date, soit "HH:mm"
 */
function scheduleJobFor(id, time) {
  let job;
  // Format "HH:mm" → job récurrent quotidien
  const hmMatch = time.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  if (hmMatch) {
    const [ , hh, mm ] = hmMatch;
    job = schedule.scheduleJob({ hour: +hh, minute: +mm, second: 0 }, () => {
      triggerFeeding(ESP32_IP, ESP32_PORT);
      console.log(`Repas (job récurrent #${id}) déclenché à ${time}`);
    });
  } 
  // Sinon on assume une date ISO → job ponctuel
  else {
    const date = new Date(time);
    job = schedule.scheduleJob(date, () => {
      triggerFeeding(ESP32_IP, ESP32_PORT);
      console.log(`Repas (job ponctuel #${id}) déclenché à ${time}`);
      // supprimer le job ponctuel
      delete scheduledJobs[id];
    });
  }
  scheduledJobs[id] = job;
}

// — Ajouter une tâche de repas
router.post('/schedule', verifyToken, (req, res) => {
  const { time } = req.body;
  if (!time) return res.status(400).json({ error: 'Champ "time" requis' });

  // Validation basique : soit ISO, soit "HH:mm"
  if (
       isNaN(Date.parse(time))
    && !time.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
  ) {
    return res.status(400).json({ error: 'Format de time invalide (ISO ou HH:mm)' });
  }

  const newFeeding = { id: idCounter++, time };
  feedings.push(newFeeding);

  scheduleJobFor(newFeeding.id, time);

  console.log(`Tâche #${newFeeding.id} programmée à ${time}`);
  res.status(201).json(newFeeding);
});

// — Modifier une tâche
router.patch('/schedule/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { time } = req.body;
  const feeding = feedings.find(f => f.id === +id);
  if (!feeding) return res.status(404).json({ error: 'Tâche non trouvée' });

  // Cancel ancien job
  if (scheduledJobs[id]) {
    scheduledJobs[id].cancel();
    delete scheduledJobs[id];
  }

  if (
       isNaN(Date.parse(time))
    && !time.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
  ) {
    return res.status(400).json({ error: 'Format de time invalide (ISO ou HH:mm)' });
  }

  feeding.time = time;
  scheduleJobFor(feeding.id, time);

  console.log(`Tâche #${id} modifiée → ${time}`);
  res.json(feeding);
});

// — Supprimer une tâche
router.delete('/schedule/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const index = feedings.findIndex(f => f.id === +id);
  if (index === -1) return res.status(404).json({ error: 'Tâche non trouvée' });

  if (scheduledJobs[id]) {
    scheduledJobs[id].cancel();
    delete scheduledJobs[id];
  }

  const deleted = feedings.splice(index, 1)[0];
  console.log(`Tâche #${id} supprimée`);
  res.json({ message: 'Supprimé', deleted });
});

// — Lister toutes les tâches
router.get('/schedule', (req, res) => {
  res.json(feedings);
});

// — Déclencher un repas immédiatement
router.post('/schedule/now', verifyToken, async (req, res) => {
  try {
    await triggerFeeding(ESP32_IP, ESP32_PORT);
    console.log('Repas déclenché immédiatement');
    res.json({ message: 'Repas immédiat lancé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Échec du déclenchement' });
  }
});

module.exports = router;
