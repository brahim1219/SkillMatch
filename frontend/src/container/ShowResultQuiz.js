import React from "react";
import { Card, CardBody } from "reactstrap";
import { Button } from "reactstrap";

//reger pour resut soit adequat

const ShowQuizResult = ({ problem, answer,nextQuestion,numEx,indexDernier }) => {




  return (
     <div className="max-w-3xl mx-auto p-4">
      
        <h4 style={{  display:"inline"}}>Exercice {numEx+1} :</h4>  <h2 style={{ display:"inline"}}> {problem.titre}</h2>
         <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <span style={{ fontWeight: 'bold', marginRight: 8 }}>Score obtenu pour cet Exercice:</span>
            <span style={{ fontSize: '20px' }}>{ (answer.result.score*100).toFixed(2)}%</span>
          </div>
    
        <form onSubmit={(e) => { e.preventDefault(); nextQuestion(); }}>
          {problem.questions.map((question, qIndex) =>{
            let coorectAnswer=answer.result.answersQuiz[qIndex].answer==answer.result.answersQuiz[qIndex].correctAnswer;
             return(
            <Card key={qIndex} className="p-4 mb-6">
              <CardBody>
                <h2 className="text-lg font-semibold mb-2">
                  Question {qIndex + 1} : {question.question} <img src={coorectAnswer?"/assets/image/check-mark.png":"/assets/image/wrong.png"} title={coorectAnswer?"correct":"incorrect"}/>
                </h2>
                <ul className="space-y-2">
                  {question.options.map((option, i) => {
                    

                    return (<li key={i}>
                      <button style={{color:coorectAnswer?answer.result.answersQuiz[qIndex].answer==i?"green":"black":answer.result.answersQuiz[qIndex].answer==i?"red":answer.result.answersQuiz[qIndex].correctAnswer==i?"green":"black"}}
                        type="button"
                       
                       
                      >
                        {option}
                      </button>
                    </li>
                  )})}
                </ul>
              </CardBody>
            </Card>)}
          )}
           <div className="text-right" style={{marginTop:"10px"}}>
                      <Button type="submit"  style={{            
              alignSelf: 'center',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}>  {(numEx<indexDernier)?"Exercice Suivant":" Test Terminer"}  </Button>
                    </div>
        </form>

    </div>
  );
};

export default ShowQuizResult;
