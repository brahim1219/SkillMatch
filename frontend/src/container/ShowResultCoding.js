import React from "react";

import { useState,useEffect } from "react";
import { Button } from "reactstrap";

const ShowResultCoding=({ problem, answer,nextQuestion,numEx,indexDernier })=>{
    
    
  
    const [message,setMessage]=useState("")

    
   
 
 
  
    useEffect(() => {
      
      if(answer.result.success){

      if (answer.result.nbrSucces === 0){ 
      setMessage("code comporte des erreurs de logique.");
          }else if(answer.result.err.length==0){

                 setMessage(
      `Bonne réponse !\nTemps résolution : ${Math.floor(answer.result.tempReR/60)}m ${answer.result.tempReR%60}s\nExécution `
    );

            }
            else{
              
                
               setMessage(
      `Cas manquants pas traite :\n${answer.result.err.map((e,i)=>`${i+1}. ${e}`).join('\n')}`
    );}}
    else{setMessage(answer.result.err);

    }
                
                    
          
        
     
  },[]);

  


    return <div>
        <div style={{display:"inline-block",width:"33%",verticalAlign:"top"}}>
          <h4 style={{  display:"inline"}}>Exercice {numEx+1} :</h4>  <h2 style={{ display:"inline"}}> {problem.titre}</h2>
               <div style={{ marginTop:20, padding: 16, border: '1px solid #ddd', borderRadius: 4 }}>
          <h4>Description du problème</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{problem.question}</p>
        </div>
        </div>
  
     <div style={{display:"inline-block",width:"61%",marginLeft:'40px'}}>
         <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <span style={{ fontWeight: 'bold', marginRight: 8 }}>Score obtenu pour cet Exercice:</span>
            <span style={{ fontSize: '20px' }}>{ (answer.result.score*100).toFixed(2)}%</span>
          </div>
    <textarea style={{width:"100%",marginBottom:"10px"}} rows={25} disabled='true' value={answer.result.code} ></textarea>
    
     <div   style={{  padding: '10px 20px',marginBottom:"10px",border:"2px solid black"}}>
      <h4> Resultat d'exection  Code</h4>
           <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
      
         </div>
         
  <div className="text-right" style={{marginTop:"10px"}}>
          <Button className="text-right"
            onClick={() => {nextQuestion();   }}
            style={{            
              alignSelf: 'center',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {(numEx<indexDernier)?"Exercice Suivant":" Test Terminer"}
          </Button>
 </div>
 </div>
</div>
    
}
export default ShowResultCoding