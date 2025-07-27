// src/container/AcceuilRecruteur.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './AcceuilRecruteur.css';

const AcceuilRecruteur=()=> {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Bienvenue sur SkillMatch</h1>
        <p className="subheading">
          Gérez vos évaluations techniques et suivez les performances de vos candidats en toute simplicité.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon"><img src="/assets/image/write.png" alt="rocket" width={64} height={64} /></div>
            <h2>Créer un exercice</h2>
            <p>
              Conception rapide d’un nouvel exercice (Quiz ou Coding). Créez du contenu que vous pourrez réutiliser dans vos tests.
            </p>
            <button onClick={() => navigate('/ajouterPrb')}>Nouveau Exercice</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon"><img src="/assets/image/test.png" alt="rocket" width={64} height={64} /></div>
            <h2>Créer un test</h2>
            <p>
              Assemblez vos quiz et problèmes de code pour bâtir un test technique complet à destination de vos candidats.
            </p>
            <button onClick={() => navigate('/ajoutTest')}>Nouveau Test</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon"><img src="/assets/image/stat.png" alt="rocket" width={64} height={64} /></div>
            <h2>Tests terminés</h2>
            <p>
              Consultez vos tests finalisés, visualisez le classement des participants et examinez les réponses détaillées pour chaque candidat.
            </p>
            <button onClick={() => navigate('/MesTestFini')}>Voir mes tests</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AcceuilRecruteur;