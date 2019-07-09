import {
  SIGNING_USER,
  SIGNED_USER,
  LOGGED_USER,
  LOGGING_USER_OUT,
  LOGGED_USER_OUT,
  LOGGING_USER
} from "../actions/types";
const initialState = {
     users: [], 
     authd: false,
     signing_user: false,
     logging_user: false,
     logging_user_out: false
     };
export default function(state = inistialState, action) {
  switch (action.type) {
    case SIGNING_USER:
      return {
         ...state,
         signing_user: true
      }
    case SIGNED_USER:
      return{
          ...state,
          signing_user: false,
          users: action.user


      } 
    case LOGGING_USER:
      return{
          ...state,
          logging_user: true
      }
    case LOGGED_USER:
    return {
         ...state,
         logging_user: false,
         authd: true,
         users: action.payload
     }
    case LOGGING_USER_OUT:
    return {
        ...state,
        logging_user_out: true
    }
    case LOGGED_USER_OUT:
    return {
        ...state,
        authd: false,
        logging_user_out: false
    }
      return action.payload;
    default:
      return state;
  }
}
