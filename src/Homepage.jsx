import './Homepage.css';
import mimi1 from './assets/mimi1.jpg'; // adapte les chemins selon tes images
import mimi2 from './assets/mimi2.jpg';
import mimi3 from './assets/mimi3.jpg';

function Homepage() {
  return (
    <div className="Homepage">
      <main className="Homepage-main">
        <h1>Bienvenue sur MeowTime 🐾</h1>

        <section className="section">
          <h2>🎯 Notre objectif</h2>
          <p>
            MeowTime est une application conçue pour automatiser l'alimentation de mon chat, Mimi.
            Grâce à une interface intuitive, je peux planifier des repas à distance, qui déclenchent un dispositif contrôlé par une ESP32.
            Le but est simple : veiller à ce que Mimi soit toujours nourrie, même quand je ne suis pas à la maison.
          </p>
        </section>

        <section className="section">
          <h2>👨‍💻 Qui suis-je ?</h2>
          <p>
            Je m'appelle <strong>Ibrahim Elyadini</strong>, étudiant en 2<sup>e</sup> année en Génie Informatique à
            <strong> Polytechnique Montréal</strong>. Passionné de technologie, j'ai créé ce projet pour combiner
            mes intérêts en programmation, électronique et mon amour pour les chats.
          </p>
        </section>

        <section className="section">
          <h2>🐱 Voici Mimi</h2>
          <p>
            Mimi est une chatte adorable, joueuse et surtout très gourmande. Elle m'a inspiré ce projet pour
            automatiser son alimentation tout en m'amusant avec la technologie.
          </p>

          <div className="mimi-gallery">
            <img src={mimi1} alt="Mimi allongée" />
            <img src={mimi2} alt="Mimi en train de jouer" />
            <img src={mimi3} alt="Mimi qui mange" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Homepage;
