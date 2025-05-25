function getTimePeriod(timeStr) {
  let hours;

  // Si timeStr est une chaîne "HH:mm"
  if (/^\d{2}:\d{2}$/.test(timeStr)) {
    hours = parseInt(timeStr.split(':')[0], 10);
  } else {
    // Sinon, on parse la date complète
    const date = new Date(timeStr);
    if (isNaN(date)) return 'Invalide';
    hours = date.getHours();
  }

  if (hours >= 6 && hours < 12) return 'Matin';
  if (hours >= 12 && hours < 14) return 'Midi';
  if (hours >= 14 && hours < 18) return 'Après-midi';
  if (hours >= 18 && hours < 22) return 'Soir';
  return 'Nuit';
}

function formatFeedingTime(timeStr) {
  let displayTime;

  if (/^\d{2}:\d{2}$/.test(timeStr)) {
    displayTime = timeStr;
  } else {
    const date = new Date(timeStr);
    if (isNaN(date)) return 'Invalid Date';
    displayTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const period = getTimePeriod(timeStr);
  return `${displayTime} (${period})`;
}

export { getTimePeriod, formatFeedingTime };