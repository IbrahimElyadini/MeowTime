import './Login.css';
import { useState, useEffect } from 'react';
import { loginUser } from './services/ServeurApi.js'; // <- nouvelle importation


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

    useEffect(() => {
      // Vérifie si un token est présent dans le localStorage
      const token = window.localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await loginUser(username, password);
        if(response.status === 200) {
          const token = (await response.json()).token;
          console.log('Login successful!');
          window.localStorage.setItem('token', token); // Stocker le token dans le localStorage
          setMessage('Connexion réussie !');
          setMessageType('success');
          setTimeout(() => {
            window.location.href = '/'; // Rediriger vers la page d'accueil
          }, 1000); // Attendre 2 secondes avant de rediriger
        }
        else {
          console.error('Login failed');
          setMessage('Échec de la connexion. Veuillez vérifier vos identifiants.');
          setMessageType('error');
        }

      } catch (err) {
        console.error('Erreur lors de la tentative de connexion :', err.message);
        setMessage('Erreur réseau. Veuillez réessayer plus tard.');
        setMessageType('error');    
      }
    };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setIsLoggedIn(false);
  };


    if (isLoggedIn) {
      return (
        <div className="login-container">
          <main className="login-main">
            <h2>Vous êtes déjà connecté.</h2>
            <p>Bienvenue dans MeowTime 🐾</p>
            <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
          </main>
        </div>
      );
    }
    
    return (
      <div className="login-container">
      <main className="login-main">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </main>
    </div>  );
}

export default Login;
