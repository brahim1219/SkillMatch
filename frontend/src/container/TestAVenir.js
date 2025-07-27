import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "./Navbar";

function TestAVenir() {
  const tests=useSelector(state=>state.TestAV)
  const userId=useSelector(state=>state.user)._id
const [dispatchOne,setDispatchOne]=useState(true) 
  const [error, setError] = useState('');
  const dispatch=useDispatch()
  const participer=(userid,testid)=>{
    dispatch({type:"participer",payload:{userid,testid}});
    axios.put(`${process.env.REACT_APP_API_URL}test/participer/${testid}`,{},{headers:{Authorization:localStorage.getItem("token")}})
  }
  useEffect(()=>{if(dispatchOne){
    
    dispatch({"type":"updateTestAV",payload:tests.filter((t)=> new Date(t.dateTest)>new Date())})
    setDispatchOne(false)
  }},[tests])

 
  if (error)   return <><Navbar/><p style={{ textAlign: 'center', color: 'red' }}>{error}</p></>;
  if (tests.length === 0)
    return <><Navbar/><p style={{ textAlign: 'center' }}> aucun test a venir prochainement.</p></>;

  return (
    <div><Navbar/>
    <div style={{ maxWidth: 800, margin: '50px auto', padding: 16 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}> tests a Venir</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tests.map(test => (
          <div
            key={test._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>{test.titre}</h3>
              <p style={{ margin: '4px 0' }}>
                Date & heure : {new Date(test.dateTest).toLocaleString()}
              </p>
              <p style={{ margin: '4px 0' }}>
                Durée : {test.timeLimit } min
              </p>
              <p style={{ margin: '4px 0' }}>
                crée par : {`${test.creatorId.firstname}  ${test.creatorId.lastname}`} 
              </p>
            </div>
            {(test.participants.includes(userId))?
            <button
              disabled
              style={{
                backgroundColor: '#fd7e14',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
              >

              Déjà participé
            </button>:
            <button
              onClick={()=>{participer(userId,test._id)}}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
              >

              Particier au  test            
              </button>}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default TestAVenir;
