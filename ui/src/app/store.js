import {applyMiddleware, createStore } from "redux";
import rootReducer from "reducers";
import { throttle } from 'lodash';
import thunk from 'redux-thunk';
import { loadState, saveState } from './storage';
import errorToastMiddleware from './error-toast-middleware'

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(
    thunk,
    errorToastMiddleware  
  )
);

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    config: state.config,
    session: state.session
  })
}));


export default store

// export default createStore(rootReducer);
