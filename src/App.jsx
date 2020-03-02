import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Projects from './components/Projects';
import Essays from './components/Essays'; 
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{width: '100%', overflowX: 'hidden'}}>
      <Router>
        <Navigation/>
        <Route exact path="/" >
          <LandingPage sections={['one', 'two', 'three']}/>
        </Route>
        <Route path="/projects" >
          <Projects/>
        </Route>
        <Route path="/essays" >
          <Essays/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
