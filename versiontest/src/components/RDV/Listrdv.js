import React, { useState, useEffect } from 'react';
import axios from 'axios';
import a from './a.jpg';

const RendezVousList = () => {
  const [rendezVousList, setRendezVousList] = useState([]);

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const response = await axios.get('https://localhost:44324/api/RendezVous1/getallrendezvous');
        setRendezVousList(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des rendez-vous :", error);
      }
    };

    fetchRendezVous();
  }, []);

  const handleDelete = async (rendezVousId) => {
    try {
      await axios.delete(`https://localhost:44324/api/RendezVous1/${rendezVousId}`);
      setRendezVousList((prevRendezVousList) => prevRendezVousList.filter((rendezVous) => rendezVous.rendezVousId !== rendezVousId));
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du rendez-vous :", error);
    }
  };

  const getDateFromDateTime = (dateTime) => {
    const [date] = dateTime.split('T');
    return date;
  };

  const getTimeFromDateTime = (dateTime) => {
    const time = dateTime.split('T')[1].slice(0, 5);
    return time;
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
      <div className="patient-list-container" style={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
        <h2>Liste des Rendez-vous</h2>
        <div className="table-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <table className="patient-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Heure</th>
                <th>Consultation Details</th>
                <th>Patient</th>
                <th>Médecin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rendezVousList.map((rendezVous) => (
                <tr key={rendezVous.rendezVousId}>
                  <td>{getDateFromDateTime(rendezVous.dateHeure)}</td>
                  <td>{getTimeFromDateTime(rendezVous.dateHeure)}</td>
                  <td>{rendezVous.consultationDetails}</td>
                  <td>{`${rendezVous.patient.nom} ${rendezVous.patient.prenom}`}</td>
                  <td>{`${rendezVous.doctor.nom} ${rendezVous.doctor.prenom}`}</td>
                  <td>
                    <button onClick={() => handleDelete(rendezVous.rendezVousId)}>Supprimer</button>
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

export default RendezVousList;
