import axios from "axios";
import { ADD_POST, GET_ERRORS } from "./types";

//Add Post
export const addPost = (postData) => (dispatch) => {
  axios
    .put("http://127.0.0.1:5000/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
