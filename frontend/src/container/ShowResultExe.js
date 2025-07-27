import React, { useState } from 'react';
import {  useNavigate,useLocation } from 'react-router-dom';

import ShowResultCoding from './ShowResultCoding';
import ShowResultQuiz from './ShowResultQuiz';
import Navbar from "./Navbar";

function ShowResultExe() {
const navigate = useNavigate();
const [currentIndex, setCurrentIndex] = useState(0);    
const location=useLocation()
const test=location.state.test
const answers=location.state.answers


 
 const nextQuestion=()=>{   
   if ( currentIndex + 1 < test.exercises.length) {
      setCurrentIndex(idx => idx + 1);
   
  }else{ navigate(`/rankParticpant/${test._id}`,{state:{test:test}})}
}
  const exercise = test.exercises[currentIndex];
  const answer=answers[currentIndex];

  return (
    <div><Navbar/>
    <div style={{  margin: '50px auto', padding: 16 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 26 }}>{test.titre}</h1>

      {exercise.type === 'quiz' ? (
        <ShowResultQuiz problem={exercise} answer={answer} nextQuestion={nextQuestion} numEx={currentIndex}  indexDernier={test.exercises.length-1}/>
      ) : (
        <ShowResultCoding problem={exercise} answer={answer} nextQuestion={nextQuestion} numEx={currentIndex} indexDernier={test.exercises.length-1} />
      )
      }
    </div>
    </div>
  );
}

export default ShowResultExe;
