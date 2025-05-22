import './Homepage.css';
import mimi1 from './assets/mimi1.jpg';
import mimi2 from './assets/mimi2.jpg';
import mimi3 from './assets/mimi3.jpg';
import mimi4 from './assets/mimi4.jpg';
import mimi5 from './assets/mimi5.jpg';
import mimi6 from './assets/mimi6.jpg';
import mimi7 from './assets/mimi7.jpg';
import mimi8 from './assets/mimi8.jpg';


function Homepage() {
  return (
    <div className="Homepage-wrapper">
        <div className="Homepage">
        <main className="Homepage-main">
            <h1>Bienvenue sur MeowTime 🐾</h1>

            <section className="section">
            <h2>🎯 Mon objectif</h2>
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
            <h2>🐈‍⬛ Voici Mimi</h2>
            <p>
                Mimi est une chatte adorable, joueuse et surtout très gourmande. Elle m'a inspiré ce projet pour
                automatiser son alimentation tout en m'amusant avec le développement web et les systèmes embarqués.
            </p>

            <div className="mimi-gallery">
                <img src={mimi1} alt="Mimi dans un panier" />
                <img src={mimi2} alt="Mimi allonger" />
                <img src={mimi3} alt="Mimi est trop mimi..." />
                <img src={mimi4} alt="Mimi est pensive" />
                <img src={mimi5} alt="Mimi :/" />
                <img src={mimi6} alt="Mimi aime les plantes" />
                <img src={mimi7} alt="Mimi en train de dormir" />
                <img src={mimi8} alt="Mimi LOCKED IN" />
            </div>
            </section>
        </main>
        </div>
    </div>
  );
}

export default Homepage;
