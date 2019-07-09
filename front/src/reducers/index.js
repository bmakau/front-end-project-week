import { combineReducers } from "redux";
import errorReducers from "./errorReducers";
import userReducer from "./index"


export default combineReducers({
  //add all reducers
  error: errorReducers,
  user: userReducer
 
});
