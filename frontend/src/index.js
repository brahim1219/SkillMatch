import React from "react"
import ReactDOM from "react-dom";
import Router from "./Router"
import Reducer from "./reducer"

import thunk from "redux-thunk";

import { Provider } from "react-redux"

import { configureStore } from '@reduxjs/toolkit';
import userAction from "./action/userAction";
import testAvenir from "./action/testAvenir";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProblemsAction from "./action/ProblemsAction";



const store = configureStore({
  reducer: Reducer,
  middleware: [thunk],
});
if(localStorage.getItem("token")){
  store.dispatch(userAction())
  store.dispatch(testAvenir())
  store.dispatch(ProblemsAction.GetProblems())




}
ReactDOM.render(<Provider store={store} ><Router/></Provider>,document.getElementById("root"))