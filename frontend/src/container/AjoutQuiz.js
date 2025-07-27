 import React, {useState} from "react"
import axios from "axios" 
import { useDispatch } from "react-redux";
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {  Icon } from 'semantic-ui-react';

 const AjoutQuiz=()=>{
 const [file, setFile] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [title, setTitle] = useState('');
  const difficultyOptions = [
  { key: '', text: '-- Sélectionner la difficulté --', value: '' },
  { key: 'facile', text: 'Facile', value: 'facile' },
  { key: 'moyenne', text: 'Moyenne', value: 'moyenne' },
  { key: 'difficile', text: 'Difficile', value: 'difficile' },
];
  const dispatch=useDispatch()

  const handleSubmit = async () => {
    if (!title.trim()) return alert('Veuillez saisir le titre du quiz');
    if (!file) return alert('Veuillez importer un fichier JSON contenant les questions');
    if (timeLimit <= 0) return alert('Veuillez indiquer une durée positive');
    if (!difficulty) return alert('Veuillez sélectionner une difficulté');

    const formData = new FormData();
    formData.append('questions', file);
    formData.append('tempsRes', timeLimit);
    formData.append('diffculte', difficulty);
    formData.append('titre', title);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}quiz/ajout`,formData,{headers:{Authorization: localStorage.getItem('token')}});
      dispatch({ type: "ajouterP", problem:response.data.problem  });
      alert('Quiz ajouté avec succès');
      setTitle('');
      setFile(null);
      setTimeLimit(0);
      setDifficulty('');
    } catch (error) {
      alert('Erreur lors de l\'ajout du quiz');
    }
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3 style={{ marginBottom: '25px' }}>Création d'un quiz</h3>

      <div style={{ marginBottom: '25px' }}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titre du quiz"
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label htmlFor="fileInput" style={{ marginBottom: '10px',display: 'block', fontWeight: 'bold' }}>
          Fichier JSON des questions :
        </label>
        <input 
          id="fileInput"
          type="file"
        style={{display:"none"}}
         accept=".json"
          onChange={e => setFile(e.target.files[0])}
        />
                  <label  htmlFor="fileInput" style={{
          display: 'inline-block',
          alignItems: 'center',
          backgroundColor: '#d3d3d3', 
          borderRadius: '6px',
          padding: '8px 14px',
          cursor: 'pointer',
          width: 'fit-content',
          fontWeight: 500,
          color: '#333',
    
          userSelect: 'none'
        }}>
          <Icon name="upload" />
          Choisir un fichier
      </label>
        {file&& <p style={{ display:"inline-block", marginLeft: "6px" }}>{file.name}</p>}

      </div>

      <div style={{ marginBottom: '25px' }}>
        <input
          type="number"
          
          onChange={e => setTimeLimit(parseInt(e.target.value, 10))}
          placeholder="Durée maximale (en minutes)"
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '25px' }}>
<Dropdown
      placeholder="-- Sélectionner la difficulté --"
      fluid
      selection
      options={difficultyOptions}
      value={difficulty}
      onChange={(e, data) => setDifficulty(data.value)}
      style={{
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}
      direction="down"
    />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Ajouter le quiz
      </button>
    </div>
  );
}

    export default AjoutQuiz;

  