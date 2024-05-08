import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Medcin/Addmedcin.css';
import { Link } from 'react-router-dom';
import a from './a.jpg';

const AddMedcin = ({ onMedcinAdded }) => {
  const navigate = useNavigate();
  const [newMedcin, setNewMedcin] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '', // Ajout de la propriété password
    userType: 'medcin',
  });

  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedcin((prevMedcin) => ({
      ...prevMedcin,
      [name]: value,
    }));
  };

  const handleAddMedcin = async () => {
    try {
      console.log('Data to be sent:', newMedcin);

      const response = await axios.post('https://localhost:44324/api/Medcins/addmedcins', newMedcin);

      console.log('Server Response:', response.data);

      if (onMedcinAdded) {
        onMedcinAdded(response.data);
      }

      setNewMedcin({
        prenom: '',
        nom: '',
        email: '',
        password: '', // Réinitialisation du champ password
        userType: 'medcin',
      });

      setResult("Médecin ajouté avec succès.");

      // Redirect the user after successful addition
      navigate('/principale/medcinlist'); // Change the path to match your route

    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout du médecin :', error);

      if (error.response) {
        // If the server responded with an error, log the details
        console.error('Server Response Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received.');
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }

      setResult(error.response?.data || "Une erreur s'est produite lors de l'ajout du médecin. Veuillez réessayer plus tard.");
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
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
    <div className="add-medcin-form-container">
      <h2>Ajouter un nouveau médecin</h2>
      <div className="form-group">
        <label>Prenom:</label>
        <input type="text" name="prenom" value={newMedcin.prenom} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Nom:</label>
        <input type="text" name="nom" value={newMedcin.nom} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" name="email" value={newMedcin.email} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Mot de passe:</label>
        <input type="password" name="password" value={newMedcin.password} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddMedcin}>Ajouter le médecin</button>
      <div className="result-message">{result}</div>
      <Link to="/principale/medcinlist">
        <button>Retour </button>
      </Link>
    </div>
    </section>
  );
};

export default AddMedcin;
