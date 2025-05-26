import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {year} Ibrahim Elyadini. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;
