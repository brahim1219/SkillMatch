 import React, {useState} from "react"
import axios from "axios" 
import { useDispatch } from "react-redux";
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {  Icon } from 'semantic-ui-react';

 const AjoutCoding=()=>{
     const [templateFile, setTemplateFile] = useState(null);
  const [testFile, setTestFile] = useState(null);
  const [resTime, setResTime] = useState();  
  const [difficulty, setDifficulty] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const difficultyOptions = [
  { key: '', text: '-- Sélectionner la difficulté --', value: '' },
  { key: 'facile', text: 'Facile', value: 'facile' },
  { key: 'moyenne', text: 'Moyenne', value: 'moyenne' },
  { key: 'difficile', text: 'Difficile', value: 'difficile' },
];
const dispatch=useDispatch();
  const handleSubmit = async () => {
    if (!title.trim()) return alert('Veuillez saisir le titre du problème');
    if (!description.trim()) return alert('Veuillez décrire le problème');
    if (!templateFile) return alert("Veuillez importer le fichier du template");
    if (!testFile) return alert("Veuillez importer le fichier de tests unitaires");
    if (resTime <= 0) return alert('Veuillez indiquer un temps de résolution positif');
    if (!difficulty) return alert('Veuillez sélectionner une difficulté');

    const formData = new FormData();
    formData.append('templte', templateFile);
    formData.append('test', testFile);
    formData.append('tempsRes', resTime);
    formData.append('diffculte', difficulty);
    formData.append('titre', title);
    formData.append('question', description);

    try {
      const res=await axios.post(`${process.env.REACT_APP_API_URL}coding/v1`, formData, { headers: { Authorization: localStorage.getItem('token') } });
      dispatch({ type: "ajouterP", problem:res.data.problem  });
      alert('Problème de coding ajouté avec succès');
      setTemplateFile(null); setTestFile(null);  setResTime(0); setDifficulty(''); setTitle(''); setDescription('');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du problème de coding");
    }
  };

  const marginStyle = { marginBottom: 25 };

  return (
    <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 4, marginBottom: 24 }}>
      <h3 style={{ marginBottom: 25 }}>Création d'un problème Coding</h3>

      <div style={marginStyle}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titre du problème"
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <div style={marginStyle}>
        <textarea
          rows={6}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description du problème"
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <div style={marginStyle}>
      
          <label htmlFor="templateFile" style={{ display: 'block', marginBottom: 10, fontWeight: 'bold' }}>
          Fichier template :
        </label>
        <input
          id="templateFile"
          type="file"
          style={{ display: 'none' }}
          onChange={e => setTemplateFile(e.target.files[0])}
        />
        <label htmlFor="templateFile"  style={{
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
        {templateFile && <p style={{ display:"inline-block", marginLeft: "6px" }}>{templateFile.name}</p>}
      </div>

      <div style={marginStyle}>
        <label htmlFor="testFile" style={{ display: 'block', marginBottom: 10, fontWeight: 'bold' }}>
          Fichier tests unitaires :
        </label>
        <input
          id="testFile"
          type="file"
          style={{ display: 'none' }}

          onChange={e => setTestFile(e.target.files[0])}
        />
          <label  htmlFor="testFile"  style={{
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
        {testFile && <p style={{ display: 'inline-block',marginLeft:"6px" }}>{testFile.name}</p>}
      </div>

 

      <div style={marginStyle}>
        <input
          type="number"
          value={resTime}
          onChange={e => setResTime(parseInt(e.target.value, 10))}
          placeholder="Durée de résolution maximale (min)"
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <div style={marginStyle}>

      <Dropdown
        placeholder='-- Sélectionner la difficulté --'
        fluid
        selection
        value={difficulty}
        onChange={(e, data) => setDifficulty(data.value)}
        options={difficultyOptions}
 direction="down"
    />
      </div>

      <button
        onClick={handleSubmit}
        style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        Ajouter le problème
      </button>
    </div>
  );
}

    export default AjoutCoding;