import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact</h2>
      <p>Tu veux discuter du projet, poser une question ou simplement dire bonjour ? N'hésite pas à me contacter</p>

      <div className="contact-info">
        <p><strong>Nom :</strong> Ibrahim Elyadini</p>
        <p><strong>Étudiant :</strong> 2<sup>e</sup> année en Génie Informatique, Polytechnique Montréal</p>
        <p><strong>Email :</strong> <a href="mailto:ibrahimelyadini@gmail.com">ibrahimelyadini@gmail.com</a></p>
        <p><strong>LinkedIn :</strong> <a href="https://www.linkedin.com/in/ibrahim-elyadini-a32b56267/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ibrahimelyadini</a></p>
        <p><strong>GitHub :</strong> <a href="https://github.com/IbrahimElyadini" target="_blank" rel="noopener noreferrer">github.com/IbrahimElyadini</a></p>
      </div>

      <form className="contact-form">
        <label>
          Nom
          <input type="text" name="name" placeholder="Votre nom" />
        </label>

        <label>
          Email
          <input type="email" name="email" placeholder="Votre email" />
        </label>

        <label>
          Message
          <textarea name="message" rows="5" placeholder="Votre message..." />
        </label>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Contact;
