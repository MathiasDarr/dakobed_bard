import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./collections";
import metadata from './metadata';
import session from './session';
import entities from './entities';


const rootReducer = combineReducers({ 
  metadata,
  session,
  entities,
  todos,
  visibilityFilter
});

export default rootReducer;

