import React from 'react';
import "@kekupua/web-components"; 
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import HearthstoneRandomCard from './pages/HearthstoneRandomCard';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function App() {
  return (
    <div className="App">
      <Router>
        <st-nav>
          <HashLink to="/#about">About</HashLink>
          <HashLink to="/#projects">Projects</HashLink>
          <HashLink to="/#contact">Contact</HashLink>
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
