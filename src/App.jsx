import React from 'react';
import * as WebComponents from "@kekupua/web-components"; 
import "@silverlinkz/sl-gallery";
import './styles/App.css';
import LandingPage from './components/LandingPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{width: '100%'}}>
      <st-nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </st-nav>
      <Router>
        <Switch>
          <Route exact path="/" >
            <LandingPage className="st-text"/>
          </Route>
        </Switch>
      </Router>
      <st-footer id="contact"></st-footer>
    </div>
  );
}

export default App;
