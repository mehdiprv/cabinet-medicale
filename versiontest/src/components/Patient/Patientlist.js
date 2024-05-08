// PatientList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Patient/Patientlist.css';
import a from './a.jpg';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://localhost:44324/api/Patients/getallpatients');
        setPatients(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des patients :", error);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:44324/api/Patients/${id}`);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.idUsers !== id));
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du patient :", error);
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
    <div className="patient-list-container" style={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
      <h2>Liste des patients</h2>
      <div className="table-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <table className="patient-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.idUsers}>
                  <td>{patient.nom}</td>
                  <td>{patient.prenom}</td>
                  <td>{patient.email}</td>
                  <td>
                    <button onClick={() => handleDelete(patient.idUsers)}>Supprimer</button>
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

export default PatientList;
