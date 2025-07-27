import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from "./Navbar";
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const AjoutTest = () => {
  const problems = useSelector(state => state.problemReducer);

  const [quizList, setQuizList] = useState([]);
  const [codingList, setCodingList] = useState([]);
  const [dateTest, setDateTest] = useState("");
  const [testExercises, setTestExercises] = useState([]);
  const [titre, setTitre] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const typeOptions = [
  { key: '', text: '-- Type --', value: '' },
  { key: 'coding', text: 'Coding', value: 'coding' },
  { key: 'quiz', text: 'Quiz', value: 'quiz' },
];

  useEffect(() => {
    setQuizList(problems.filter(p => p.type === 'quiz'));
    setCodingList(problems.filter(p => p.type === 'coding'));
  }, [problems]);

  useEffect(() => {
    const total = testExercises.reduce((sum, ex) => sum + (ex.temps_exercice || 0), 0);
    setTimeLimit(total);
  }, [testExercises]);

  const addExercise = () => {
    setTestExercises(prev => [
      ...prev,
      { type: '', selectedId: '', options: [], temps_exercice: 0 }
    ]);
  };

  const handleTypeChange = (index, type) => {
    const options = type === 'coding' ? codingList : quizList;
    setTestExercises(prev =>
      prev.map((ex, idx) =>
        idx === index
          ? { ...ex, type, options, selectedId: '', temps_exercice: 0 }
          : ex
      )
    );
  };

  const handleSelectionChange = (index, value) => {
    const [id, temps] = value.split('|');
    const duree = parseInt(temps, 10) || 0;
    setTestExercises(prev =>
      prev.map((ex, idx) =>
        idx === index
          ? { ...ex, selectedId: id, temps_exercice: duree }
          : ex
      )
    );
  };

  const handleSubmit = async () => {
    if (!titre.trim()) {
      alert('Veuillez saisir le titre du test');
      return;
    }
    if (!dateTest) {
      alert('Veuillez sélectionner la date et l’heure du test');
      return;
    }
    if (testExercises.length === 0) {
      alert('Ajoutez au moins un exercice au test');
      return;
    }

    try {
       await axios.post(
        `${process.env.REACT_APP_API_URL}test/`,
        {titre,timeLimit,dateTest: new Date(dateTest),exercises: testExercises.map(ex => ex.selectedId)},
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Test créé avec succès !');
      setTitre('');
      setDateTest('');
      setTestExercises([]);
    } catch (error) {
      console.error(error);
      alert('Impossible de créer le test, réessayez.');
    }
  };

  return (
    <div><Navbar/>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Créer un nouveau test</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <label htmlFor="titre" style={{ minWidth: '150px', fontWeight: 'bold' }}>Titre :</label>
        <input
          id="titre"
          placeholder="Ex. : Test Front-end React"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <label style={{ minWidth: '150px', fontWeight: 'bold' }}>Date & heure :</label>
        <input
          type="datetime-local"
          value={dateTest}
          onChange={e => setDateTest(e.target.value)}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <button
        onClick={addExercise}
        style={{ display: 'block', margin: '0 auto 16px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
      >
        + Ajouter un exercice
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {testExercises.map((exercise, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <Dropdown
        placeholder="-- Type --"
        
        selection
        options={typeOptions}
        value={exercise.type}
        onChange={(e, data) => handleTypeChange(index, data.value)}
        style={{
          padding: '8px',
          minWidth: '140px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
        direction="down"
      />

      {exercise.type && (
        <Dropdown
          placeholder={`-- Sélectionner un ${exercise.type} --`}
          selection
          value={`${exercise.selectedId}|${exercise.temps_exercice}`}
          onChange={(e, data) => handleSelectionChange(index, data.value)}
          options={exercise.options.map(opt => ({
            key: opt._id,
            text: opt.titre,
            value: `${opt._id}|${opt.tempsRes}`
          }))}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          direction="down"
        />
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'right', fontWeight: 'bold', marginBottom: '24px' }}>
        Durée totale du test : {timeLimit} min
      </div>

      <button
        onClick={handleSubmit}
        style={{ display: 'block', margin: '0 auto', padding: '12px 24px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
      >
        Créer le test
      </button>
    </div>
    </div>
  );
};

export default AjoutTest;
