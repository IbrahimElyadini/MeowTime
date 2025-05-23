import './About.css';

function About() {
  return (
    <div className='about-wrapper'>
        <div className="about-container">
        <h2>À propos de MeowTime 🐱</h2>

        <section className="about-section">
            <h3>La vision du projet</h3>
            <p>
            MeowTime est une application conçue pour automatiser et planifier les repas de mon chat, même en mon absence.
            Grâce à une interface simple, je peux programmer des tâches planifiées qui envoient automatiquement des commandes
            à une carte ESP32 connectée, afin de déclencher un distributeur de nourriture.
            </p>
        </section>

        <section className="about-section">
            <h3>À propos de moi</h3>
            <p>
            Je m'appelle <strong>Ibrahim Elyadini</strong>, étudiant en 2<sup>e</sup> année en Génie Informatique à
            <strong> Polytechnique Montréal</strong>. Ce projet combine mes passions pour les systèmes embarqués,
            l'automatisation, et bien sûr, les chats 🐾.
            </p>
        </section>
        </div>
    </div>
    );
}

export default About;
