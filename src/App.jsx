import React from 'react';
import "@kekupua/web-components"; 
import "@silverlinkz/sl-gallery";
import "@fluidnext-polymer/paper-grid";
import './styles/App.css';
import LandingPage from './components/LandingPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{width: '100%'}}>
      <st-nav></st-nav>
      <Router>
        <Switch>
          <Route exact path="/" >
            <LandingPage/>
          </Route>
        </Switch>
        <st-footer></st-footer>
      </Router>
    </div>
  );
}

export default App;
