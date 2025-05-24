async function triggerFeeding(ip = '127.0.0.1', port = 80) {
  const url = `http://${ip}:${port}/feed`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'feed' }),
    });
    console.log(`Réponse ESP32 : ${response.status}`);
    const text = await response.text();
    console.log('Body:', text);
  } catch (error) {
    console.error('Erreur lors de la requête à l\'ESP32:', error);
  }
}

module.exports = { triggerFeeding };
