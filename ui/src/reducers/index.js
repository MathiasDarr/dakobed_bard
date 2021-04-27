import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./collections";

export default combineReducers({ todos, visibilityFilter });
