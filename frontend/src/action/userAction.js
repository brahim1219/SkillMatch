import axios from "axios";



const InitialiserUser = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/profil`,{headers:{Authorization:localStorage.getItem("token")}})
      .then((res) => {
        
        dispatch({ type: "initilaiserUser", payload:res.data  });
      })
      .catch((err) => console.log(err));
  };
};
export default InitialiserUser;

