const express       = require('express');
const router        = express.Router();
const schedule      = require('node-schedule');
const { triggerFeeding } = require('../utils/esp32client');
const verifyToken   = require('../middlewares/verifyToken');
const { dbService } = require('../services/database');
const { ObjectId } = require('mongodb');

const ESP32_IP   = process.env.ESP32_IP   || '127.0.0.1';
const ESP32_PORT = process.env.ESP32_PORT || 80;

const scheduledJobs = {};

/**
 * Aide à créer un job node-schedule ponctuel ou récurrent
 * @param {number} id 
 * @param {string} time — soit ISO date, soit "HH:mm"
 */
async function scheduleJobFor(_id, time) {
  let job;
  const hmMatch = time.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  
  if (hmMatch) {
    const [ , hh, mm ] = hmMatch;
    job = schedule.scheduleJob({ hour: +hh, minute: +mm, second: 0 }, () => {
      triggerFeeding(ESP32_IP, ESP32_PORT);
      console.log(`Repas récurrent (#${_id}) déclenché à ${time}`);
    });
  } else {
    const date = new Date(time);
    job = schedule.scheduleJob(date, () => {
      triggerFeeding(ESP32_IP, ESP32_PORT);
      console.log(`Repas ponctuel (#${_id}) déclenché à ${time}`);
      delete scheduledJobs[_id];
    });
  }

  scheduledJobs[_id] = job;
}

// — Ajouter une tâche de repas
router.post('/schedule', verifyToken, async (req, res) => {
 const { time } = req.body;
  if (!time) return res.status(400).json({ error: 'Champ "time" requis' });

  if (isNaN(Date.parse(time)) && !time.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
    return res.status(400).json({ error: 'Format de time invalide (ISO ou HH:mm)' });
  }

  try {
    const result = await dbService.db.collection('Tasks').insertOne({ time });
    await scheduleJobFor(result.insertedId.toString(), time);
    console.log(`Tâche #${result.insertedId} programmée à ${time}`);
    res.status(201).json({ id: result.insertedId.toString(), time });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
  }
});

// — Modifier une tâche
router.patch('/schedule/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { time } = req.body;

  if (!time || (isNaN(Date.parse(time)) && !time.match(/^([01]\d|2[0-3]):([0-5]\d)$/))) {
    return res.status(400).json({ error: 'Format de time invalide (ISO ou HH:mm)' });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const existingTask = await dbService.db.collection('Tasks').findOne({ _id: new ObjectId(id) });
    if (!existingTask) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    await dbService.db.collection('Tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: { time } }
    );

    // Replanifier
    if (scheduledJobs[id]) {
      scheduledJobs[id].cancel();
      delete scheduledJobs[id];
    }
    await scheduleJobFor(id, time);

    console.log(`Tâche #${id} modifiée → ${time}`);
    res.json({ id: existingTask._id.toString(), ...existingTask, time });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la modification' });
  }
});

// — Supprimer une tâche
router.delete('/schedule/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }
  try {
    const existingTask = await dbService.db.collection('Tasks').findOne({ _id: new ObjectId(id) });
    if (!existingTask) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    await dbService.db.collection('Tasks').deleteOne({ _id: new ObjectId(id) });

    if (scheduledJobs[id]) {
      scheduledJobs[id].cancel();
      delete scheduledJobs[id];
    }
    console.log(`Tâche #${id} supprimée`);
    res.json({ message: 'Supprimée', deleted: existingTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// — Lister toutes les tâches
router.get('/schedule', async (req, res) => {
  try {
    const tasks = await dbService.db.collection('Tasks').find().toArray();
    const transformedTasks = tasks.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest
    }));
    res.json(transformedTasks);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la lecture des tâches' });
  }
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