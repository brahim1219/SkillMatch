import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

function MesTestFini() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistered = async () => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}test/MesTestFini`, {
          headers: { Authorization: localStorage.getItem("token") }
        });
  
        setTests(response.data);
      } catch (err) {
        setError(`Impossible de charger vos tests inscrits`);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistered();
   
  }, []);

  if (loading) return <><Navbar/><p style={{ textAlign: 'center' }}>Chargement...</p></> ;
  if (error)   return <><Navbar/><p style={{ textAlign: 'center', color: 'red' }}>{error}</p></>;
  if (tests.length === 0)
    return <><Navbar/><p style={{ textAlign: 'center' }}>Vous n'avez aucun test terminé. </p></>;

  return (
    <div><Navbar/>
    <div style={{ maxWidth: 800, margin: '50px auto', padding: 16 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Mes tests terminés </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tests.map(test => (
          <div
            key={test._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>{test.titre}</h3>
              <p style={{ margin: '4px 0' }}>
                Date & heure : {new Date(test.dateTest).toLocaleString()}
              </p>
              <p style={{ margin: '4px 0' }}>
                Durée : {test.timeLimit } min
              </p>
            </div>
            <button
              onClick={() => navigate(`/rankParticpant/${test._id}`,{state:{test:test}})}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Voir Resultat
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default MesTestFini;
