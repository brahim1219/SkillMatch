import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function TestResultsOverview() {
  const { id: testId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchResults() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `http://localhost:3001/api/tests/${testId}/results`,
          { headers: { Authorization: token } }
        );
        setParticipants(res.data.participants);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les résultats");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [testId]);

  if (loading) return <p style={{ textAlign: 'center' }}>Chargement des résultats...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  if (!participants.length) return <p style={{ textAlign: 'center' }}>Aucun participant.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', padding: 16 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Résultats du test</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' }}>Candidat</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Score</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Temps (min)</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Détail</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(p => (
            <tr key={p.userId}>
              <td style={{ padding: 8 }}>{p.userName || p.userEmail}</td>
              <td style={{ padding: 8 }}>{p.score}%</td>
              <td style={{ padding: 8 }}>{Math.ceil(p.duration/60)}</td>
              <td style={{ padding: 8 }}>
                <Link to={`/tests/${testId}/results/${p.userId}`} style={{ color: '#007bff' }}>
                  Voir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




// src/container/TestResultDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TestResultDetail() {
  const { id: testId, userId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDetail() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `http://localhost:3001/api/tests/${testId}/results/${userId}`,
          { headers: { Authorization: token } }
        );
        setResult(res.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les détails");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [testId, userId]);

  if (loading) return <p style={{ textAlign: 'center' }}>Chargement...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  const { exercises, score, duration } = result;

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', padding: 16 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Détail des résultats</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Score global :</strong> {score}%
        <br />
        <strong>Temps total :</strong> {Math.ceil(duration/60)} min
      </div>
      {exercises.map((ex, idx) => (
        <div
          key={ex.exerciseId}
          style={{ border: '1px solid #ccc', borderRadius: 4, padding: 16, marginBottom: 16 }}
        >
          <h4 style={{ margin: '0 0 8px' }}>{idx + 1}. {ex.title}</h4>
          {ex.type === 'quiz' ? (
            <div>
              <p><strong>Votre réponse :</strong> {ex.userAnswer}</p>
              <p><strong>Réponse correcte :</strong> {ex.correctAnswer}</p>
            </div>
          ) : (
            <div>
              <p><strong>Tests réussis :</strong> {ex.nbrSuccess}/{ex.totalTests}</p>
              {ex.err && ex.err.length > 0 && (
                <div>
                  <strong>Cas manquants :</strong>
                  <ul>
                    {ex.err.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
              )}
              <p><strong>Temps résolution :</strong> {Math.floor(ex.timeRe/60)}m {ex.timeRe%60}s</p>
              <p><strong>Temps exécution max :</strong> {ex.timeExec} ms</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

module.exports=  {TestResultDetail,TestResultsOverview};
