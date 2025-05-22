import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>🐾 MeowTime</h1>
      <nav>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/Login">Se connecter</a></li>
          <li><a href="/Schedule">Calendrier</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
