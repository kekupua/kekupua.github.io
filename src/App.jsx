import React from 'react';
import "@kekupua/web-components"; 
import "@silverlinkz/sl-gallery";
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import HearthstoneRandomCard from './pages/HearthstoneRandomCard';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <st-nav>
          <a href="/#about">About</a>
          <a href="/#projects">Projects</a>
          <a href="/#contact">Contact</a>
          <Link to={'/random-hearthstone'}>HRC</Link>
        </st-nav>
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
