import React, { useState, useEffect } from 'react';
import axios from 'axios';
import a from './a.jpg';

const Listdossier = () => {
  const [dossierList, setDossierList] = useState([]);

  const getDateFromDateTime = (dateTime) => {
    const [date] = dateTime.split('T');
    return date;
  };

  const getTimeFromDateTime = (dateTime) => {
    const time = dateTime.split('T')[1].slice(0, 5);
    return time;
  };

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const response = await axios.get('https://localhost:44324/api/DossiersMedicauxs');
        setDossierList(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des dossiers médicaux :", error);
      }
    };

    fetchDossiers();
  }, []);

  const handleDelete = async (dossierId) => {
    try {
      await axios.delete(`https://localhost:44324/api/DossiersMedicauxs/${dossierId}`);
      setDossierList((prevDossierList) => prevDossierList.filter((dossier) => dossier.dossierId !== dossierId));
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du dossier médical :", error);
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
      <div className="dossier-list-container" style={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
        <h2>Liste des dossiers Medicale</h2>
        <div className="table-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <table className="dossier-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Nom du Patient</th>
                <th>Nom du Médecin</th>
                <th>Date de Consultation</th>
                <th>Heure de Consultation</th>
                <th>Prescriptions</th>
                <th>Résultats des Examens</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dossierList.map((dossier) => (
                <tr key={dossier.dossierId}>
                  <td>{`${dossier.patient.nom} ${dossier.patient.prenom}`}</td>
                  <td>{`${dossier.doctor.nom} ${dossier.doctor.prenom}`}</td>
                  <td>{getDateFromDateTime(dossier.consultationDate)}</td>
                  <td>{getTimeFromDateTime(dossier.consultationDate)}</td>
                  <td>{dossier.prescriptions}</td>
                  <td>{dossier.resultatsExamens}</td>
                  <td>
                    <button onClick={() => handleDelete(dossier.dossierId)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Listdossier;
