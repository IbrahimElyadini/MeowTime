import { SERVER_URL } from '../Config.js';


/** 
 * Retourne le token d'authentification
 * @returns {string} token
*/
function getToken() {
  const token = window.localStorage.getItem('token');
  return `Bearer ${token}`;
}


/**
 * Envoie les informations de connexion au serveur ESP32
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Response>}
 */
export async function loginUser(username, password) {
  const response = await fetch(`${SERVER_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

/**
 * Envoie le message envoyé par l'utilisateur au serveur
 * @param {string} name 
 * @param {string} email 
 * @param {string} message 
 * @returns {Promise<Response>}
 */
export async function sendMessage(name, email, message) {
  const response = await fetch(`${SERVER_URL}/api/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  });

  return response;
}

/**
 * Obtient la liste des tâches de repas
 * @returns {Promise<Response>}
 */
export async function getFeedings() {
  const response = await fetch(`${SERVER_URL}/api/feeding/schedule`);
  return response;
}

/**
 * Ajoute une tâche de repas
 * @param {string} time
 * @returns {Promise<Response>}
 */
export async function addFeeding(time) {
  const response = await fetch(`${SERVER_URL}/api/feeding/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
    body: JSON.stringify({ time }),
  });
  return response;
}

/**
 * met à jour une tâche de repas 
 * @param {string} id
 * @param {string} time
 * @returns {Promise<Response>}
 */
export async function updateFeeding(id, time) {
  const response = await fetch(`${SERVER_URL}/api/feeding/schedule/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
        'Authorization': getToken(),
    },
    body: JSON.stringify({ time }),
  });
  return response;
}

/**
 * supprime une tâche de repas 
 * @param {string} id
 * @param {string} time
 * @returns {Promise<Response>}
 */
export async function deleteFeeding(id) {
  const response = await fetch(`${SERVER_URL}/api/feeding/schedule/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': getToken(),
    },	
  });
  return response;
}

/**
 * Lance une tâche de repas 
 * @param {string} id
 * @param {string} time
 * @returns {Promise<Response>}
 */
export async function triggerNow() {
  const response = await fetch(`${SERVER_URL}/api/feeding/schedule/now`, {
    method: 'POST',
    headers: {
      'Authorization': getToken(),
    },
  });
  return response;
}
