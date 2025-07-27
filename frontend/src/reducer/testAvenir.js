
const TestAVReducer=(state=[],action)=>{

    switch (action.type) {
        
case "InitialiserTestAV":
    return action.payload;
case "updateTestAV":
    return action.payload;
case "participer":
    return state.map(test=>{if(test._id==action.payload.testid){return {...test,participants:[...test.participants,action.payload.userid]}}return test})
       
    default:
        return state
        
    }

}
export default TestAVReducer