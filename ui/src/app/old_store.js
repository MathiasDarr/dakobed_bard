import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { combineReducers } from 'redux'
import { throttle } from 'lodash' 
import rootReducer from 'reducers'



import {loadState, saveState} from './storage'

import metadata from '../reducers/metadata'

const persistedState = loadState();

// const rootReducer = combineReducers({
//   metadata,
// });


const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(
    thunk
  )
)

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    session: state.session,
    config: state.config
  });
}));

export default store;