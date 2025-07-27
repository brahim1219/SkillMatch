import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './AcceuilCondidat.css';


const AcceuilCondidat=()=> {
  const navigate = useNavigate();
  const user = useSelector(state => state.user ); 
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Bonjour, {user.firstname || 'Candidat'} !</h1>
        <p className="subheading">
          Sélectionnez un test et mettez vos compétences en avant.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon"><img src="/assets/image/calendar.png" alt="rocket" width={64} height={64} />
</div>
            <h2>Tests à venir</h2>
            <p>
              Consultez les prochains tests programmés et inscrivez-vous facilement pour participer.
            </p>
            <button onClick={() => navigate('/TestAVenir')}>Voir les tests</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon"><img src="/assets/image/rocket.png" alt="rocket" width={64} height={64} /></div>
            <h2>Mes tests en cours</h2>
            <p>
              Continuez les tests commencés pour compléter vos réponses et obtenir votre score.
            </p>
            <button onClick={() => navigate('/TestEnCours')}>Mes tests</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon"><img src="/assets/image/profile.png" alt="rocket" width={64} height={64} /></div>
            <h2>Mon profil</h2>
            <p>
              Gérez vos informations personnelles et visualisez votre historique de tests.
            </p>
            <button onClick={() => navigate('/profile')}>Voir mon profil</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AcceuilCondidat;