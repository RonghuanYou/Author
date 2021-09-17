import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Main from "./components/Main"
import Update from './components/Update'
import Create from './components/Create'
import FollowStatus from './components/FollowStatus';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/new">
          <Create />
        </Route>

        <Route exact path="/edit/:id">
          <Update />
        </Route>

        <Route to={'/status/follow'}>
          <FollowStatus />
        </Route> 
      </Switch>
    </div>
  );
}

export default App;
