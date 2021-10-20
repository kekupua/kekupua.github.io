import React from 'react';
import "@kekupua/web-components"; 
import "@silverlinkz/sl-gallery";
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import HearthstoneRandomCard from './pages/HearthstoneRandomCard';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <st-nav>
        <a href="/#about">About</a>
        <a href="/#projects">Projects</a>
        <a href="/#contact">Contact</a>
        <a href="/random-hearthstone">HRC</a>
      </st-nav>
      <Router>
        <Switch>
          <Route exact path="/" >
            <LandingPage/>
          </Route>
          <Route exact path="/random-hearthstone" >
            <HearthstoneRandomCard />
          </Route>
        </Switch>
      </Router>
      <st-footer id="contact"></st-footer>
    </div>
  );
}

export default App;
