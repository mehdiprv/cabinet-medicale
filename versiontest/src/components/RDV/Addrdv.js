import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../RDV/Addrdv.css';
import a from './a.jpg';

const Addrdv = () => {
  const [newRendezVous, setNewRendezVous] = useState({
    dateHeure: '',
    consultationDetails: '',
    idPatient: '',
    idMedecin: '',
  });

  const [listPatients, setListPatients] = useState([]);
  const [listMedecins, setListMedecins] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://localhost:44324/api/Patients/getallpatients');
        console.log('Liste des patients récupérée avec succès:', response.data);
        setListPatients(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des patients :', error);
      }
    };

    const fetchMedecins = async () => {
      try {
        const response = await axios.get('https://localhost:44324/api/Medcins/getallMedcins');
        console.log('Liste des médecins récupérée avec succès:', response.data);
        setListMedecins(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des médecins :', error);
      }
    };

    fetchPatients();
    fetchMedecins();
  }, []);

  const handleSelectPatient = (e) => {
    const selectedPatientId = e.target.value;
    console.log('Patient sélectionné avec ID:', selectedPatientId);
    setNewRendezVous((prevRendezVous) => ({
      ...prevRendezVous,
      idPatient: selectedPatientId,
    }));
  };

  const handleSelectMedecin = (e) => {
    const selectedMedecinId = e.target.value;
    console.log('Médecin sélectionné avec ID:', selectedMedecinId);
    setNewRendezVous((prevRendezVous) => ({
      ...prevRendezVous,
      idMedecin: selectedMedecinId,
    }));
  };

  const handleAddRendezVous = async () => {
    try {
      const formattedDate = new Date(newRendezVous.dateHeure).toISOString();
      console.log('Données à envoyer pour l\'ajout du rendez-vous:', {
        idPatient: newRendezVous.idPatient,
        idMedecin: newRendezVous.idMedecin,
        consultationDetails: newRendezVous.consultationDetails,
        dateHeure: formattedDate,
      });

      const response = await axios.post('https://localhost:44324/api/RendezVous1/create', {
        idPatients: newRendezVous.idPatient,
        idDocteur: newRendezVous.idMedecin,
        consultationDetails: newRendezVous.consultationDetails,
        dateHeure: formattedDate,
      });

      console.log('Réponse de l\'ajout du rendez-vous:', response.data);
      setMessage('Rendez-vous ajouté avec succès!');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout du rendez-vous :', error);
      setMessage('Une erreur s\'est produite lors de l\'ajout du rendez-vous.');
    }
  };

  return (
    <section
  style={{
    backgroundImage: `url(${a})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',  // Utilisez 100vh pour que la section couvre toute la hauteur de la vue
    margin: 0,  // Réinitialise les marges à zéro
    padding: 0,  // Réinitialise les rembourrages à zéro
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }}
>
      <div className="add-rendezvous-form-container">
        <div className="form-group">
          <label>Date et Heure:</label>
          <input
            type="datetime-local"
            name="dateHeure"
            value={newRendezVous.dateHeure}
            onChange={(e) => setNewRendezVous({ ...newRendezVous, dateHeure: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Consultation Details:</label>
          <input
            type="text"
            name="consultationDetails"
            value={newRendezVous.consultationDetails}
            onChange={(e) => setNewRendezVous({ ...newRendezVous, consultationDetails: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Choisir un Patient:</label>
          <select
            name="idPatient"
            value={newRendezVous.idPatient}
            onChange={handleSelectPatient}
            className="form-input"
          >
            <option key="default" value="">Sélectionner un patient</option>
            {listPatients.map((patient) => (
              <option key={patient.idUsers} value={patient.idUsers}>
                {patient.nom} {patient.prenom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Choisir un Médecin:</label>
          <select
            name="idMedecin"
            value={newRendezVous.idMedecin}
            onChange={handleSelectMedecin}
            className="form-input"
          >
            <option key="default" value="">Sélectionner un médecin</option>
            {listMedecins.map((medecin) => (
              <option key={medecin.idUsers} value={medecin.idUsers}>
                {medecin.nom} {medecin.prenom}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddRendezVous} className="submit-button">
          Ajouter le rendez-vous
        </button>

        {message && <div className="message">{message}</div>}
      </div>
    </section>
  );
};

export default Addrdv;
