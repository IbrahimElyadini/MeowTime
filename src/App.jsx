import './App.css';
import Header from './Header';
import Homepage from './Homepage';
import Login from './Login';
import Schedule from './Schedule';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
    </Router >
    </div>
  );
}

export default App;
