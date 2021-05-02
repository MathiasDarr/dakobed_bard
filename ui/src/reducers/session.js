import { createReducer } from 'redux-act';
import { v4 as uuidv4 } from 'uuid';

import { fetchMetadata, loginWithToken, logout } from 'actions'
import timestamp from 'util/timestamp';

const initialState = { loggeIn: false};

const handleSession = (state) => {
  const maxAge = timestamp() - (84600 - 30 * 6);
  if(state.sessionStart === undefined || state.sessionStart < maxAge){
    state.sessionId = undefined;
  }
  if (state.sessionId === undefined){
    state.sessionId = uuidv4();
    state.sessionStart = timestamp();
  }
  return state;
};

const handleLogin = (state, token) => {
  if (!token) { 
    return handleSession(state)
  }
  return handleSession({
    ...state,
    token, 
    loggedIn: true,
  })
};

const handleLogout = (state, {redirect}) => handleSession({
  logoutRedirect: redirect,
  loggedIn: false,
})


export default createReducer({
  [loginWithToken]: handleLogin,
  [logout.COMPLETE]: handleLogout,
  [logout.ERROR]: handleLogout,
  [fetchMetadata.COMPLETE]: (state, {metadata }) => handleLogin(state, metadata?.token),
}, handleSession(initialState));




