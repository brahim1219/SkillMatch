import axios from "axios";



 const GetProblems = () => {
  return (dispatch) => {

    return axios
      .get(`${process.env.REACT_APP_API_URL}problem/all`,{headers:{Authorization:localStorage.getItem("token")}})
      .then((res) => {
        
        dispatch({ type: "inisaliserP", problems:res.data.problems  });
      })
      .catch((err) => console.log(err));
  };
};

 const AjouterProbem = () => {
  return (dispatch) => {

    return axios
      .get(`${process.env.REACT_APP_API_URL}coding/v1`,{headers:{Authorization:localStorage.getItem("token")}})
      .then((res) => {
        
        dispatch({ type: "ajouterP", problem:res.data.problem  });
      })
      .catch((err) => console.log(err));
  };
};
export default {GetProblems,AjouterProbem}
