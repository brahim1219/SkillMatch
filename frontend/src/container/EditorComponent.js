import React from "react";
import axios from "axios";
import { useState,useEffect,useRef } from "react";
import {Modal,ModalBody,ModalFooter, ModalHeader} from "reactstrap"
const EditorCompenent=({ problem, onComplete,numEx,indexDernier })=>{
    
    const [code,setCode]=useState("")
    const [modalOpen, setModalOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [timer,setTimer]=useState(problem.tempsRes*60)
    const [result,setResult]=useState(null)
    const [message,setMessage]=useState("")
    const [showNext, setShowNext] = useState(false);
 
    const timerRef=useRef()
    
   
 
    useEffect(() => {
      setTimer(problem.tempsRes * 60);
      setModalOpen(false);
      setVisible(false);
      fetch(`/upl/${problem.templte}`)
        .then(res => res.text())
        .then(text => setCode(text))
        .catch(() => setCode('// Impossible de charger le template'));  
    }, [problem]);
 
  
    useEffect(() => {
        if (timer <= 0) {
          submitCode(true);
          return;
        }
        timerRef.current = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(timerRef.current);
      }, [timer]);
       const submitCode = async (timeout = false) => {
    //clearInterval(timerRef.current);
    const elapsed = problem.tempsRes * 60 - timer;
    try {
      const token = localStorage.getItem('token');
      let { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}coding/exec`,
        { code, problem: problem._id, test: problem.test, timer: elapsed, timeout },
        { headers: { Authorization: token } }
      );
          if(data.nbrSucces==0){
          data["score"]=0
        }
        else{
          
        data["score"]=data.nbrSucces/((data.err.length+data.nbrSucces)+(problem.tempsRes*60-timer)/3600)

        }
      if(timeout){
        clearInterval(timerRef.current);
    
        

        
        onComplete(data);}
      else{
      setResult(data);
      if(data.success){

      if (data.nbrSucces === 0){ 
      setMessage("Votre code comporte des erreurs de logique.");
          }else if(data.err.length==0){

                 setMessage(
      `Bonne réponse !\nTemps résolution : ${Math.floor(data.tempReR/60)}m ${data.tempReR%60}s\nExécution `
    );

            }
            else{
              
                
               setMessage(
      `Cas manquants :\n${data.err.map((e,i)=>`${i+1}. ${e}`).join('\n')}`
    );}}
    else{setMessage(data.err);

    }
                
             setModalOpen(true);
            setVisible(true);
            
            }
            
            //alert(message)
           
          setShowNext(true);
        
    } catch(error) {
      console.log(error)
      setMessage("Erreur lors de l'exécution du code");
      setModalOpen(true);
      setShowNext(true);
    }
  };



    const formatTime = sec => {
    const m = Math.floor(sec/60); const s = sec%60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;}
  


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
            <span style={{ fontWeight: 'bold', marginRight: 8 }}>Temps restant pour ce exercice:</span>
            <span style={{ fontSize: '20px' }}>{formatTime(timer)}</span>
          </div>
    <textarea style={{width:"100%"}} onPaste={(e)=>{e.preventDefault()}} onChange={(e)=>{setCode( e.target.value)}} rows={35} onCopy={(e)=>{e.preventDefault()}} value={code} ></textarea>
     <Modal isOpen={modalOpen} fade={false}  toggle={()=>setModalOpen(false)}>
      <ModalHeader> Resultat d'exection votre Code</ModalHeader>
           <ModalBody style={{ whiteSpace: 'pre-line' }}>{message}</ModalBody>
           <ModalFooter>
             <button
               onClick={() => { setModalOpen(false);  }}
               style={{ padding: '6px 12px', cursor: 'pointer' }}
             >
                ok
             </button>
           </ModalFooter>
         </Modal>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              onClick={() => submitCode(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Soumettre
            </button>
            <button
              onClick={() => { setModalOpen(false); onComplete(result); }}
              disabled={!showNext}
              style={{
                padding: '8px 16px',
                backgroundColor: showNext ? '#28a745' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: showNext ? 'pointer' : 'not-allowed'
              }}
            >
              {numEx < indexDernier ? 'Exercice suivant' : 'test Terminer'}
            </button>
          </div>
 
 </div>
</div>
    
}
export default EditorCompenent