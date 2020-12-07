import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import Login from './components/Login/index';
import Register from './components/Register/index';
import Messages from './components/Messages/index';

function App() {

  const [token, setToken] = useState('')
  // console.log(token);

  return (
    <div className="App">
      <Link to="/message" className="ad-hoc-link" >Messages</Link>
      <Switch>

        <Route exact path="/">
          <Login setToken={ setToken } />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/message">
          <Messages token={ token }/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
