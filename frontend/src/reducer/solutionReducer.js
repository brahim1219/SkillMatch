const solutionReducer=(state=[],action)=>{
    
    switch (action.type) {
        
case "inisaliserS":
    return action.soutions;
    
        case "ajouterS":
            
            return [...state,action.solutions];
   
    default:
        return state
        
    }

}
export default solutionReducer