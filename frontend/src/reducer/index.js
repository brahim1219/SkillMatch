import problemReducer from "./problemReducer" 
import {combineReducers} from "redux"
import  solutionReducer from "./solutionReducer"
import TestAVReducer from "./testAvenir"
import userReducer from "./user"
export default combineReducers({problemReducer,solutionReducer,TestAV:TestAVReducer,user:userReducer})