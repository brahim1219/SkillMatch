
const userReducer=(state=null,action)=>{
    switch (action.type) {
        
case "initilaiserUser":

    return action.payload;
        case "login":
            
            return action.payload;
    case "logout":
        return null;
    default:
        return state
        
    }

}
export default userReducer