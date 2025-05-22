import './Schedule.css';

function Schedule() {
    //on voudra get le schedule du serveur puis authentifier l'utilisateur
    // const [schedule, setSchedule] = useState([]);
    


  return (
    <div className="schedule-container">
      <main className="schedule-main">
        <h2>Feeding Schedule</h2>
        <p>This is a placeholder for your current feeding schedule.</p>

        <div className="schedule-list">
          <div className="schedule-item">
            <span className="time">08:00</span>
            <span className="description">Morning feeding</span>
          </div>
          <div className="schedule-item">
            <span className="time">18:00</span>
            <span className="description">Evening feeding</span>
          </div>
        </div>

        <button className="add-button">+ Add New Schedule</button>
      </main>
    </div>
  );
}

export default Schedule;
