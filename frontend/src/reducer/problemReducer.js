
const problemReducer=(state=[],payload)=>{
    switch (payload.type) {
case "inisaliserP":
    
    return payload.problems;
        case "ajouterP":
            
            return [...state,payload.problem];
    default:
        return state
        
    }

}
export default problemReducer