import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link,useLocation } from 'react-router-dom';
import Navbar from "./Navbar";


function RankParticipant() {
  const { id: testId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location=useLocation()
  const { test } = location.state

  useEffect(() => {
    async function fetchResults() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `http://localhost:3001/solution/test/${testId}`,
          { headers: { Authorization: token } }
        );
        console.log(res)
       
        setParticipants(res.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les résultats");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [testId]);

  if (loading)
    return <p style={{ textAlign: 'center' }}>Chargement des résultats...</p>;
  if (error)
    return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  if (!participants.length)
    return <p style={{ textAlign: 'center' }}>Aucun participant.</p>;

  return (
    <div><Navbar/>
    <div style={{ maxWidth: 800, margin: '50px auto', padding: 16 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Classement des participants dans le Test <br/> {test.titre}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: 12, textAlign: 'left' }}>Rang</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Candidat</th>
            <th style={{ padding: 12, textAlign: 'center' }}>Email</th>
            <th style={{ padding: 12, textAlign: 'center' }}>Score</th>
            <th style={{ padding: 12, textAlign: 'center' }}>Détail</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, index) => (
            <tr
              key={p.userId}
              style={{
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f3f5'
              }}
            >
              <td style={{ padding: 12 }}>{index + 1}</td>
              <td style={{ padding: 12 }}>{p.user.firstname}  {p.user.lastname}</td>
              <td style={{ padding: 12 }}>{p.user.email}</td>
              <td style={{ padding: 12, textAlign: 'center' }}>{ (p.score*100).toFixed(2)}%</td>
              <td style={{ padding: 12, textAlign: 'center' }}>
                <Link to={`/DetailParticipant`} state={{answers:p.answers,test}} style={{ color: '#007bff', textDecoration: 'none' }}>
                  Voir détails
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default RankParticipant;
