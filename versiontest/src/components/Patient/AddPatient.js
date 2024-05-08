import React, { useState } from 'react';
import axios from 'axios';
import '../Patient/Addpatient.css';
import { Link } from 'react-router-dom';
import a from './a.jpg';
const AddPatient = ({ onPatientAdded }) => {
  const [newPatient, setNewPatient] = useState({
    prenom: '',
    nom: '',
    email: '',
    // Supprimez le champ password ici si vous ne souhaitez pas collecter le mot de passe lors de l'ajout du patient
    userType: 'patient',
  });

  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleAddPatient = async () => {
    try {
      // Validation des champs
      if (!newPatient.prenom || !newPatient.nom || !newPatient.email) {
        setResult("Veuillez remplir tous les champs.");
        return;
      }

      // Validation simple pour l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newPatient.email)) {
        setResult("Veuillez entrer une adresse email valide.");
        return;
      }

      // Vous pouvez ajouter une validation supplémentaire pour le mot de passe ici si nécessaire

      const response = await axios.post('https://localhost:44324/api/Patients/addpatient', newPatient);

      if (onPatientAdded) {
        onPatientAdded(response.data);
      }

      setNewPatient({
        prenom: '',
        nom: '',
        email: '',
        userType: 'patient',
      });

      setResult("Patient ajouté avec succès.");
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'ajout du patient :", error);

      // Affichez l'erreur dans l'interface utilisateur
      setResult(error.response?.data || "Une erreur s'est produite lors de l'ajout du patient. Veuillez réessayer plus tard.");
    }
  };


    return (
      <section
    style={{
      backgroundImage: `url(${a})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',  // Ajuster l'alignement ici
      justifyContent: 'flex-start',  // Ajuster l'alignement ici
    }}
  >
        <div className="add-patient-form-container">
          <h2>Ajouter un nouveau patient</h2>
          <div className="form-group">
            <label>Prénom:</label>
            <input type="text" name="prenom" value={newPatient.prenom} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Nom:</label>
            <input type="text" name="nom" value={newPatient.nom} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" name="email" value={newPatient.email} onChange={handleInputChange} />
          </div>
          {/* Supprimez cette partie si vous ne souhaitez pas collecter le mot de passe */}
          <div className="form-group">
            <label>Mot de passe:</label>
            <input type="password" name="password" value={newPatient.password} onChange={handleInputChange} />
          </div>
          <div className="button-container">
            <button onClick={handleAddPatient}>Ajouter le patient</button>
            {/* Bouton de retour à la liste des patients */}
            <Link to="/principale/listpatient">
              <button>Retour </button>
            </Link>
          </div>
          <div className="result-message">{result}</div>
        </div>
      </section>
    );
  };


export default AddPatient;