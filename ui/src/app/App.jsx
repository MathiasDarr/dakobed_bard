import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import Router from './Router';


import store from './store'
//import store from 'redux/store'
import Collections from '../CollectionApp'

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
