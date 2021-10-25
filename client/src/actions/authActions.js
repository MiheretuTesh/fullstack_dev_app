import axios from "axios";
import { GET_ERRORS } from "./types";

//Register User
export const registerUser = (userData) => (dispatch) => {
  axios
    .post("http://127.0.0.1:5000/api/users/register", userData)
    .then((res) => console.log(res.data))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
