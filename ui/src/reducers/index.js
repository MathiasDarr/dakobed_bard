import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./collections";
import metadata from './metadata';



export default combineReducers({ todos, visibilityFilter });
