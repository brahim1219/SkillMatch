
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';



function Navbar() {
  const user=useSelector(state=>state.user)
  
  const navigate = useNavigate();
const dispatch=useDispatch();
 
const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({type:"logout"})
    navigate('/login');
    

  };
  const commonLinks = (
    <>
      <Link to="/" style={linkStyle}>Accueil</Link>
    </>
  );

  const recruiterLinks = (
    <>
      <Link to="/ajoutTest" style={linkStyle}>Créer un test</Link>
      <Link to="/ajouterPrb" style={linkStyle}>Créer un Exercice</Link>
      <Link to="/MesTestFini/" style={linkStyle}>voir Résultats Test</Link>
    </>
  );

  const candidateLinks = (
    <>
      <Link to="/TestAVenir" style={linkStyle}>Tests à Venir</Link>
      <Link to="/TestEnCours" style={linkStyle}>Tests En Cours</Link>
    </>
  );

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>
        <img src='/assets/image/logo-skillmatch.png' alt="SkillMatch" style={logoStyle} />
        <div>
          <div style={titleStyle}>SkillMatch</div>
          <div style={taglineStyle}>Assess • Test • Hire</div>
        </div>
      </div>
      <div style={linksContainerStyle}>
        {commonLinks}
        {user&& user.role === 'recruteur' && recruiterLinks}
        {user &&user.role === 'candidat' && candidateLinks}
             <button onClick={handleLogout} style={logoutButtonStyle}>
          Se déconnecter
        </button>
      </div>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 20px',
  background: '#fff',
  borderBottom: '1px solid #eee'
};

const brandStyle = {
  display: 'flex',
  alignItems: 'center'
};

const logoStyle = {
  height: 36,
  marginRight: 12
};

const titleStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  lineHeight: 1
};

const taglineStyle = {
  fontSize: '0.75rem',
  color: '#666'
};

const linksContainerStyle = {
  display: 'flex',
  gap: '16px'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 500,
  padding: '4px 8px'
};
const logoutButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer'
};

export default Navbar;
