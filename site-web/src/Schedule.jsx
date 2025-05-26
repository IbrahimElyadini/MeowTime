import './Schedule.css';
import { useState, useEffect } from 'react';
import { getFeedings, addFeeding, updateFeeding, deleteFeeding, triggerNow } from './services/ServeurApi';
import { formatFeedingTime } from './services/time';

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [newTime, setNewTime] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTime, setEditingTime] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' ou 'success'
  const token = localStorage.getItem('token');

  // Charger les tâches existantes
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getFeedings();
        if (!res.ok) {
          setMessageType('error');
          setMessage(`Erreur ${res.status}: ${res.statusText}`);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setSchedule(data.filter(item => item && item.id));
        } else {
          setSchedule([]);
        }
      } catch (error) {
        setMessageType('error');
        setMessage("Erreur lors du chargement du planning");
        console.error("Erreur lors du chargement du planning :", error);
      }
    }
    fetchData();
  }, []);

  // Ajouter une nouvelle tâche
  const handleAdd = async () => {
    if (!token) {
      setMessageType('error');
      setMessage('Vous devez être connecté pour ajouter une tâche.');
      return;
    }
    if (!newTime) {
      setMessageType('error');
      setMessage('L\'heure ne peut pas être vide.');
      return;
    }
    try {
      const res = await addFeeding(newTime, token);
      if (!res.ok) {
        setMessageType('error');
        setMessage(`Erreur ajout : ${res.statusText}`);
        return;
      }
      const data = await res.json();
      setSchedule([...schedule, data]);
      setNewTime('');
      setMessageType('success');
      setMessage('Tâche ajoutée avec succès.');
    } catch (error) {
      setMessageType('error');
      setMessage('Erreur lors de l\'ajout de la tâche.');
      console.error(error);
    }
  };

  // Supprimer une tâche
  const handleDelete = async (id) => {
    if (!token) {
      setMessageType('error');
      setMessage('Vous devez être connecté pour supprimer une tâche.');
      return;
    }
    try {
      const res = await deleteFeeding(id, token);
      if (!res.ok) {
        setMessageType('error');
        setMessage(`Erreur suppression : ${res.statusText}`);
        return;
      }
      setSchedule(schedule.filter((item) => item.id !== id));
      setMessageType('success');
      setMessage('Tâche supprimée avec succès.');
    } catch (error) {
      setMessageType('error');
      setMessage('Erreur lors de la suppression.');
      console.error(error);
    }
  };

  // Déclencher immédiatement
  const handleTriggerNow = async () => {
    if (!token) {
      setMessageType('error');
      setMessage('Vous devez être connecté pour nourrir maintenant.');
      return;
    }
    try {
      const res = await triggerNow(token);
      if (!res.ok) {
        setMessageType('error');
        setMessage(`Erreur déclenchement : ${res.statusText}`);
        return;
      }
      setMessageType('success');
      setMessage('Repas déclenché !');
    } catch (error) {
      setMessageType('error');
      setMessage('Erreur lors du déclenchement.');
      console.error(error);
    }
  };

  // Démarrer l'édition d'une tâche
  const startEditing = (id, time) => {
    setEditingId(id);
    const date = new Date(time);
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    setEditingTime(`${hh}:${mm}`);
  };

  // Annuler l'édition
  const cancelEditing = () => {
    setEditingId(null);
    setEditingTime('');
  };

  // Sauvegarder la mise à jour
  const saveEditing = async () => {
    if (!token) {
      setMessageType('error');
      setMessage('Vous devez être connecté pour modifier une tâche.');
      return;
    }
    if (!editingTime) {
      setMessageType('error');
      setMessage('L\'heure ne peut pas être vide.');
      return;
    }
    try {
      const res = await updateFeeding(editingId, editingTime, token);
      if (!res.ok) {
        setMessageType('error');
        setMessage(`Erreur mise à jour : ${res.statusText}`);
        return;
      }
      const updated = await res.json();
      setSchedule(schedule.map(item => item.id === editingId ? updated : item));
      setMessageType('success');
      setMessage('Tâche modifiée avec succès.');
      cancelEditing();
    } catch (error) {
      setMessageType('error');
      setMessage('Erreur lors de la mise à jour.');
      console.error(error);
    }
  };

  return (
    <div className="schedule-container">
      <main className="schedule-main">
        <h2>Feeding Schedule</h2>
        <div className="schedule-list">
          {schedule.map((item) =>
            item?.id ? (
              <div key={`schedule-item.${item.id}`} className="schedule-item">
                {editingId === item.id ? (
                  <>
                    <input
                      type="time"
                      value={editingTime}
                      onChange={(e) => setEditingTime(e.target.value)}
                    />
                    <div className="actions">
                      <button className="save-button" onClick={saveEditing} title="Sauvegarder">💾</button>
                      <button onClick={cancelEditing} title="Annuler">❌</button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="time">{formatFeedingTime(item.time)}</span>
                    <div className="actions">
                      <button
                        onClick={() => startEditing(item.id, item.time)}
                        title="Modifier"
                        className="edit-button"
                      >
                        ⚙️
                      </button>
                      <button onClick={() => handleDelete(item.id)} title="Supprimer">
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : null
          )}
        </div>

        <div className="schedule-actions">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
          <button onClick={handleAdd}>+ Ajouter</button>
        </div>

        <button className="trigger-now-button" onClick={handleTriggerNow}>
          Nourrir maintenant 🍖
        </button>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </main>
    </div>
  );
}

export default Schedule;
