import React from 'react';
import data from '../lib/data.js';
import '../styles/LandingPage.css';


let LandingPage = () => {
  return <React.Fragment>
    <st-section id="masthead" alignment="center">
      <st-header slot="header" id="category-header" layout="center">
        <h2 class="st-text-700" slot='heading'>Sean Teramae</h2>
        <p class="st-text-200" slot='description'>Software Engineer</p>
        <p class="st-text-200" slot='description'>Javascript • Node • React • Web Components</p>
      </st-header>
      <st-button type="secondary" icon="mail" trailing-icon label="Email Me!" href="mailto:seteramae@gmail.com?Subject=Hi!"></st-button>
    </st-section>

    <st-section id="about">
      <st-header slot="header" id="category-header">
        <h2 id="about" slot='heading'>About Me!</h2>
      </st-header>
      <div className="about-grid">
        <div className="intro-text">
          <p className="intro">{data.intro}</p>
          <p className="italic">Likes</p>
          <ul>
            <li>Hearthstone</li>
            <li>Dogs</li>
            <li>Kpop</li>
          </ul>
          <p className="italic">Dislikes</p>
          <ul>
            <li>Waking up early</li>
            <li>Loud noises</li>
            <li>Outdoors (Sometimes)</li>
          </ul>
        </div>
        <img src={data.photos[7].src} title={data.photos[7].title} alt={data.photos[7].caption}/>
      </div>
    </st-section>
    <st-section id="projects">
      <st-header slot="header" id="category-header" layout="left">
        <h2 id="projects" slot='heading'>Projects</h2>
      </st-header>
      <div className="projects-list">
        {data.projects.map(project => {
          return <st-card
            key={project.heading}
            image={project.image}
            href={project.href}
            contain={project.contain}
          >
            <h3 slot="heading">{project.heading}</h3>
            <h4 slot="subheading">{project.subheading}</h4>
            <p slot="description">{project.description}</p>
          </st-card>
        })}
      </div>
    </st-section>
  </React.Fragment>
}

export default LandingPage