import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage'; 

function App() {
  return (
    <div className="App" style={{width: '100%'}}>
        <LandingPage sections={['one', 'two', 'three']}/>
    </div>
  );
}

export default App;
