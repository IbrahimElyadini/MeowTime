import './Contact.css';
import { useRef, useState } from 'react';
import { sendMessage } from './services/ServeurApi.js';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
      const [feedback, setFeedback] = useState('');
      const [feedbackType, setFeedbackType] = useState('');
      const messageRef = useRef(null);
    
      // Met à jour l'état à chaque changement dans un input
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
      };
    
      // Gestion de la soumission du formulaire
      const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback('');
        setFeedbackType('');
        try {
          const response = await sendMessage(formData.name, formData.email, formData.message);
          if (response.status === 201) {
            setFeedback('Message envoyé avec succès !');
            setFeedbackType('success');
            setFormData({
              name: '',
              email: '',
              message: '',
            });
            setTimeout(() => {
              messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          } else {
            setFeedback("Échec de l'envoi du message. Veuillez réessayer.");
            setFeedbackType('error');
            setTimeout(() => {
              messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }
        }
        catch (err) {
          setFeedback('Erreur réseau. Veuillez réessayer plus tard.');
          setFeedbackType('error');
          console.error('Erreur lors de l\'envoi du message :', err.message);
        }
      };
    
  return (
    <div className="contact-wrapper">
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

        {feedback && (
          <div ref={messageRef} className={`message ${feedbackType}`}>
            {feedback}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              placeholder="Votre message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Envoyer</button>
        </form>
        </div>
    </div>

  );
}

export default Contact;
