import axios from "axios";



const InitialiserTestAV = () => {
  return (dispatch) => {

    return axios
      .get(`${process.env.REACT_APP_API_URL}test/a_venir`,{headers:{Authorization:localStorage.getItem("token")}})
      .then((res) => {
        
        dispatch({ type: "InitialiserTestAV", payload:res.data  });
      })
      .catch((err) => console.log(err));
  };
};
export default InitialiserTestAV;