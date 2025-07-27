// src/container/TestStart.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import EditorCompenent from './EditorComponent';
import ShowQuiz from './ShowQuiz';
import Navbar from './Navbar';

function TestStart() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const timerRef = useRef(null);
  useEffect(() => {
    async function fetchTest() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}test/${id}`, {
          headers: { Authorization: token }
        });
        setTest(res.data);
      } catch (err) {
        setError('Impossible de charger le test.');
      } finally {
        setLoading(false);
      }
    }
    fetchTest();
  }, [id]);
 useEffect(()=>{   if(test!=null){
   if ( currentIndex + 1 < test.exercises.length) {
      setCurrentIndex(idx => idx + 1);
   
  }else{ finishTest();}}},[answers])

 

  const handleAnswer = (result) => {
     setAnswers(prev => [...prev, {
      exerciseId: test.exercises[currentIndex]._id,
      result,
      typeExercice:exercise.type
    }]);
     }

  const finishTest =  () => {
    clearInterval(timerRef.current);
    try {
      let score=0;
      for( let answer of answers){
        score+=answer.result.score

      }
        score/=answers.length
        

      const token = localStorage.getItem('token');
       axios.post(
        `${process.env.REACT_APP_API_URL}solution/${id}`,
        { answers,score },
        { headers: { Authorization: token } }
      ).then((rep)=>{
        alert("Merci d'avoir participé. Le test est terminé. Le recruteur vous communiquera vos résultats si vous êtes retenu.")
        navigate("/");},(err)=>{console.log(err)});

      
    } catch (err) {
      console.error(err);
      alert("Échec de l'envoi des résultats.");
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Chargement du test...</p>;
  if (error)   return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  const exercise = test.exercises[currentIndex];


  return (<div><Navbar/>
    <div style={{  margin: '50px auto', padding: 16 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 26 }}>{test.titre}</h1>


      {exercise.type === 'quiz' ? (
        <ShowQuiz problem={exercise} onComplete={handleAnswer} numEx={currentIndex} indexDernier={test.exercises.length-1}/>
      ) : (
        <EditorCompenent problem={exercise} onComplete={handleAnswer} numEx={currentIndex} indexDernier={test.exercises.length-1} />
      )
      }
    </div></div>
  );
}

export default TestStart;
