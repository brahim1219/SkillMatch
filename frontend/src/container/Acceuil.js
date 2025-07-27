import React from 'react';
import { useSelector } from 'react-redux';
import AcceuilCondidat from './AcceuilCondidat';
import AcceuilRecruteur from './AcceuilRecruteur';
import Login from './Login';
const Acceuil=()=>{
    const user =useSelector(state=>state.user)
    return user?user.role=="candidat"?<AcceuilCondidat/>:<AcceuilRecruteur/>:<Login/>

}
export default Acceuil;