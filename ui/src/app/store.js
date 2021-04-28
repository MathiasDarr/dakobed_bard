import {applyMiddleware, createStore } from "redux";
import rootReducer from "reducers";
import { throttle } from 'lodash';
import thunk from 'redux-thunk';
import { loadState, saveState } from './storage';


export default createStore(rootReducer);
