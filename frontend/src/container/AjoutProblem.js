import React, {useState} from "react"
import AjoutCoding from "./AjoutCoding"
import AjoutQuiz from "./AjoutQuiz";
import Navbar from "./Navbar";
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const AjoutProbem=(props)=> {

  const [type, setType] = useState('');
const typeOptions = [
  { key: '', text: '-- Sélectionnez le type --', value: '' },
  { key: 'coding', text: 'Coding', value: 'coding' },
  { key: 'quiz', text: 'Quiz', value: 'quiz' },
];
  return (
    <div><Navbar/>
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '16px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Ajouter un exercice
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
      <label htmlFor="typeExercice" style={{ fontWeight: 'bold', display: 'block' }}>
        Type d'exercice :
      </label>
      <Dropdown
        id="typeExercice"
        placeholder="-- Sélectionnez le type --"
        fluid
        selection
        options={typeOptions}
        value={type}
        onChange={(e, data) => setType(data.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
        direction="down"
      />
      </div>

{ (type=="coding")?<AjoutCoding/>:(type=="quiz")?<AjoutQuiz/>:<></>}
     
    </div>
    </div>)
    
} 
export default AjoutProbem;

