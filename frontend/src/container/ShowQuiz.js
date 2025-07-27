import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Button } from "reactstrap";

const ShowQuiz = ({ problem,onComplete,numEx,indexDernier }) => {
  const [answersQuiz, setAnswersQuiz] = useState(Array(problem.questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
   const [timer,setTimer]=useState(problem.tempsRes*60)
   const timerRef=useRef()

    useEffect(() => {
        
        setTimer(problem.tempsRes * 60);
        setIsSubmitted(false)
        setAnswersQuiz(Array(problem.questions.length).fill(null))
        }, [problem]);
  useEffect(() => {
        
          if (timer <= 0) {
            handleSubmit();
            return;
          }
          timerRef.current = setInterval(() => setTimer(t => t - 1), 1000);
          return () => clearInterval(timerRef.current);
        }, [timer]);

 const handleOptionChange = (qIndex, selectedOption) => {
    setAnswersQuiz(prev => ({
      ...prev,
      [qIndex]: {answer:selectedOption,correctAnswer:problem.questions[qIndex].correctAnswer}
    }));
  };


  const handleSubmit = () => {

    let score=getScore()
    if(score!=0){
      score=getScore()/((problem.questions.length)+((problem.tempsRes*60-timer)/3600))
    }
    onComplete({answersQuiz,score,tempsRes:problem.tempsRes*60-timer})
    setIsSubmitted(true);
  };

  const getScore = () => {
    return problem.questions.reduce((score, question, index) => {
      
      return score + (question.correctAnswer === answersQuiz[index]["answer"] ? 1 : 0);
    }, 0);
  };

  const formatTime = sec => {
    const m = Math.floor(sec/60); const s = sec%60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;}

  return (
    <div className="max-w-3xl mx-auto p-4">
      
        <h4 style={{  display:"inline"}}>Exercice {numEx+1} :</h4>  <h2 style={{ display:"inline"}}> {problem.titre}</h2>
         <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <span style={{ fontWeight: 'bold', marginRight: 8 }}>Temps restant pour ce exercice:</span>
            <span style={{ fontSize: '20px' }}>{formatTime(timer)}</span>
          </div>
      

      
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {problem.questions.map((question, qIndex) => (
            <Card key={qIndex} className="p-4 mb-6">
              <CardBody>
                <h2 className="text-lg font-semibold mb-2">
                  Question {qIndex + 1} : {question.question}
                </h2>
                
                  {question.options.map((option, i) => (
                    <label key={i}  style={{display:"block"}} className="block mb-2">
              <input 
             
                type="radio"
                name={`q${qIndex}`}
                value={i}
                checked={answersQuiz[qIndex] && answersQuiz[qIndex].answer === i}
                onChange={() => handleOptionChange(qIndex, i)}
                className="mr-2"
              />
              {option}
            </label>
                  ))}
                
              </CardBody>
            </Card>
          ))}
          <div className="text-right" style={{marginTop:"7px"}}>
            <Button type="submit"  style={{

                padding: '8px 16px',
                backgroundColor:  '#28a745' ,
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
               {(numEx<indexDernier)?"Soumettre & exercice Suivant":"Test Terminer"}  </Button>
          </div>
        </form>
       
    </div>
  );
};

export default ShowQuiz;
