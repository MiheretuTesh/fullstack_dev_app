import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

//Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://127.0.0.1:5000/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("http://127.0.0.1:5000/api/users/login", userData)
    .then((res) => {
      //Save to local Storage
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      //set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// set logged out users
export const logoutUser = () => (dispatch) => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");
  // remove auth header for future request
  setAuthToken(false);
  // Set current use {} whixh set isAUtheticaition to false
  dispatch(setCurrentUser({}));
};
