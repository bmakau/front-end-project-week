import {
  SIGNING_USER,
  SIGNED_USER,
  GET_ERROR,
  LOGGED_USER,
  LOGGING_USER,
  LOGGED_USER_OUT,
  LOGGING_USER_OUT
} from "../actions/types";

import jwt_decode from "jwt-decode";
import axios from "axios";

export const addUser = data => dispatch => {
  localStorage.clear();
  if (axios.get(`${URL}/user`).response === undefined) {
    localStorage.clear();
    dispatch({
      type: SIGNING_USER
    });
    axios
      .post(`${URL}/register`, {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password
      })
      .then(res => {
        dispatch({ type: SIGNED_USER, payload: res });
        //swal
        return "You have been registered!";
      })
      .catch(err => {
        dispatch({ type: GET_ERROR, payload: err });
        //swal
        return "There is error registering user!";
      });
  } else if (axios.get(`${URL}/user`).response.data.length > 0) {
    localStorage.clear();
    axios
      .get(`${URL}/user`)
      .then(response => {
        const allUsers = response.data;
        allUsers.map(user => {
          if (data.username === user.username) {
            //swal
            return `Sorry! The username ${
              data.username
            } is already taken! Please try again!`;
          } else {
            dispatch({ type: SIGNING_USER });
            axios
              .post(`${URL}/register`, {
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                password: data.password
              })
              .then(res => {
                dispatch({ type: SIGNED_USER, payload: res });
                return "You registered!";
              })
              .catch(err => {
                dispatch({ type: GET_ERROR, payload: err });
                return "We are sorry something wrong when registering!";
              });
          }
        });
      })
      .catch(err => {
        dispatch({ type: GET_ERROR, payload: err });
      });
  }
};

export const logIn = (user, history) => dispatch => {
  localStorage.clear();
  axios
    .post(`${URL}/login`, {
      username: user.username,
      password: user.password
    })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      const decoded_token = jwt_decode(token);
      dispatch({ type: LOGGED_USER, payload: decoded_token });
      window.location.reload(true);
    })
    .catch(err => {
      dispatch({ type: GET_ERROR, payload: err });
      //swal
      return "Looks like your not registered, can you click signup button and register!";
    });
};

export const logOut = () => dispatch => {
  dispatch({ type: LOGGING_USER_OUT });
  dispatch({ type: LOGGED_USER_OUT });
  localStorage.clear();
};
