import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../DossierM/Adddossier.css';
import a from './a.jpg';

const Adddossier = () => {
  const [newDossier, setNewDossier] = useState({
    consultationDate: '',
    prescriptions: '',
    resultatsExamens: '',
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
    setNewDossier((prevDossier) => ({
      ...prevDossier,
      idPatient: selectedPatientId,
    }));
  };

  const handleSelectMedecin = (e) => {
    const selectedMedecinId = e.target.value;
    console.log('Médecin sélectionné avec ID:', selectedMedecinId);
    setNewDossier((prevDossier) => ({
      ...prevDossier,
      idMedecin: selectedMedecinId,
    }));
  };

  const handleAddDossier = async () => {
    try {
      const formattedDate = new Date(newDossier.consultationDate).toISOString();
      console.log('Données à envoyer pour l\'ajout du dossier:', {
        consultationDate: formattedDate,
        prescriptions: newDossier.prescriptions,
        resultatsExamens: newDossier.resultatsExamens,
        patientID: newDossier.idPatient,
        idDocteur: newDossier.idMedecin,
      });
  
      const response = await axios.post('https://localhost:44324/api/DossiersMedicauxs/create', {
        consultationDate: formattedDate,
        prescriptions: newDossier.prescriptions,
        resultatsExamens: newDossier.resultatsExamens,
        patientID: newDossier.idPatient,
        idDocteur: newDossier.idMedecin,
      });
  
      console.log('Réponse de l\'ajout du dossier:', response.data);
      setMessage('Dossier ajouté avec succès!');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout du dossier :', error);
      setMessage('Une erreur s\'est produite lors de l\'ajout du dossier.');
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
      <div className="add-dossier-form-container">
        <div className="form-group">
          <label>Date et Heure de Consultation:</label>
          <input
            type="datetime-local"
            name="consultationDate"
            value={newDossier.consultationDate}
            onChange={(e) => setNewDossier({ ...newDossier, consultationDate: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Prescriptions:</label>
          <input
            type="text"
            name="prescriptions"
            value={newDossier.prescriptions}
            onChange={(e) => setNewDossier({ ...newDossier, prescriptions: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Résultats des Examens:</label>
          <input
            type="text"
            name="resultatsExamens"
            value={newDossier.resultatsExamens}
            onChange={(e) => setNewDossier({ ...newDossier, resultatsExamens: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Choisir un Patient:</label>
          <select
            name="idPatient"
            value={newDossier.idPatient}
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
            value={newDossier.idMedecin}
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
        <button onClick={handleAddDossier} className="submit-button">
          Ajouter le dossier
        </button>
        <Link to="/principale/listdossier">
          <button>Retour </button>
        </Link>
        {message && <div className="message">{message}</div>}
      </div>
    </section>
  );
};

export default Adddossier;
