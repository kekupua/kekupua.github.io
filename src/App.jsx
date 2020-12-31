import React from 'react';
import "@kekupua/web-components/assets/index";
import './App.css';
import Navigation from './components/ui/Navigation';
import Projects from './components/Projects';
import Essays from './components/Essays'; 
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{width: '100%', overflowX: 'hidden'}}>
      <Router>
        <Navigation/>
        <Route exact path="/" >
          <s-home></s-home>
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
