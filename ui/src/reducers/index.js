import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./collections";
import metadata from './metadata';
import session from './session';


const rootReducer = combineReducers({ 
  metadata,
  session,
  todos,
  visibilityFilter
});

export default rootReducer;

