import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Router from './Router';

function App() {
  // extends blueprint icon renderer to render icons from the ftm iconRegistry

  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Router} />
      </BrowserRouter>
    </div>
  );
}

export default App;
