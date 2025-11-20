import React from 'react';
import '../styles/LandingPage.css';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';

const LandingPage = () => {
  return (
    <React.Fragment>
      <Hero />
      <About />
      <Projects />
    </React.Fragment>
  );
};

export default LandingPage;
