import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { FocusStyleManager } from '@blueprintjs/core';
import { inRange } from 'lodash';
import Router from './Router';
import { logout } from 'actions/sessionActions';
import store from './store'
import { endpoint } from './api';


import './App.scss'


FocusStyleManager.onlyShowFocusOnTabs();

endpoint.interceptors.request.use((config) => {
  const state = store.getState();
  const { session } = state;
  if (session.loggedIn) {
    Object.assign(config.headers.common, {
      Authorization: `Token ${session.token}`,
    })
  }
  if(session.sessionId) {
    Object.assign(config.headers.common, {
      //'X-Bard-Session': "s1"
      'X-Bard-Session': session.sessionId
    })
  }
  return config;
})


// Upon 401 Unauthorized, e.g session has expire, reset the whole app
endpoint.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
)

// Use a response's error message when available
endpoint.interceptors.response.use(
  response => response,
  (error) => {
    if (
      error.response
      && inRange(error.response.status, 400, 500)
      && error.response.data && error.response.data.message
    ) {
      Object.assign(error, {
        message: error.response.data.message
      });
    }
    return Promise.reject(error)
  }
)




function App() {
  // extends blueprint icon renderer to render icons from the ftm iconRegistry

  return (
    <Provider store={store}>
      
      <BrowserRouter>
        <Route path="/" component={Router} />
      </BrowserRouter>
    </Provider>
  
  );
}

export default App;
