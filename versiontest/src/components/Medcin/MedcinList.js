import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Medcin/Medcinlist.css';
import a from './a.jpg';

const MedcinList = ({ showDeleteButton }) => {
  const [medcins, setMedcins] = useState([]);

  useEffect(() => {
    const fetchMedcins = async () => {
      try {
        const response = await axios.get('https://localhost:44324/api/Medcins/getallMedcins');
        console.log(response.data);
        setMedcins(response.data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des médecins:', error);
      }
    };

    fetchMedcins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:44324/api/Medcins/${id}`);
      setMedcins((prevMedcins) => prevMedcins.filter((medcin) => medcin.idUsers !== id));
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression du médecin:', error);
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
      <div className="medcin-list-container" style={{ width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
        <h2>Liste des médecins</h2>
        <div className="table-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <table className="medcin-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                {showDeleteButton && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {medcins.map((medcin) => (
                <tr key={medcin.idUsers}>
                  <td>{medcin.nom}</td>
                  <td>{medcin.prenom}</td>
                  <td>{medcin.email}</td>
                  {showDeleteButton && (
                    <td>
                      <button onClick={() => handleDelete(medcin.idUsers)}>Supprimer</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MedcinList;
