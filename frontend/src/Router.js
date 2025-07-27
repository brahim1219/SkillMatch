import React from "react";
import { Route ,BrowserRouter, Routes} from "react-router-dom";
import { createBrowserHistory } from "history";
import AjoutProbem from "./container/AjoutProblem"
import EditorCompenent from "./container/EditorComponent";
import SignUp from "./container/SignUp";
import UserProfile from "./container/UserProfile";
import TestAVenir from "./container/TestAVenir";
import TestEnCours from "./container/TestEnCours";
import TestStart from "./container/TestStart";
import RankParticipant from "./container/RankParticipant";
import MesTestFini from "./container/MesTestFini";
import ShowResultExe from "./container/ShowResultExe";
import Acceuil from "./container/Acceuil";
import Login from "./container/Login";
import AjoutTest from "./container/AjoutTest";
const Router=()=>{
 return (   <BrowserRouter>
    <Routes history={createBrowserHistory()}  >
        <Route Component={AjoutProbem} path="/ajouterPrb" ></Route>
            <Route Component={AjoutTest} path="/ajoutTest" ></Route>
            <Route Component={Login} path="/login" ></Route>
            <Route Component={SignUp} path="/signup" ></Route>
            <Route Component={UserProfile} path="/profile" ></Route>
            <Route Component={EditorCompenent} path="/editor"  ></Route>
            <Route Component={TestAVenir} path="/TestAVenir"  ></Route>
            <Route Component={TestEnCours} path="/TestEnCours"  ></Route>
            <Route Component={TestStart} path="/testStart/:id"  ></Route>
            
            <Route Component={RankParticipant} path="/rankParticpant/:id"  ></Route>
            <Route Component={MesTestFini} path="/MesTestFini/"  ></Route>
            <Route Component={ShowResultExe} path="/DetailParticipant/"  ></Route>
            <Route Component={Acceuil} path="/"  ></Route>

            
            
            </Routes></BrowserRouter>)
}
export default Router