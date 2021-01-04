import React from 'react';
import data from '../lib/data.js';
import '../styles/LandingPage.css';


let LandingPage = () => {
    return <React.Fragment>
        <st-section id="masthead" alignment="center">
            <div id="main-text">
                <div id="CTA-header">
                    <st-header id="name-header" heading="Sean Teramae" description="Software Engineer"></st-header>
                </div>
            </div>
            <st-text class="skills" type="p">Javascript • Node • React • Web Components</st-text>
            <st-button type="secondary" icon="mail" trailing-icon label="Email Me!" href="mailto:seteramae@gmail.com?Subject=Hi!"></st-button>
        </st-section>

        <st-section id="about">
            <st-header id="category-header" hLevel="2" heading="About Me!" headingHref="#about"></st-header>
            <div className="about-grid">
                <div className="intro-text">
                    <st-text class="intro" type="p">{data.intro}</st-text>
                    <st-text class="italic" type="h3">Likes</st-text>
                    <ul>
                        <li><st-text>Hearthstone</st-text></li>
                        <li><st-text>Dogs</st-text></li>
                        <li><st-text>Kpop</st-text></li>
                    </ul>
                    <st-text class="italic" type="h3">Dislikes</st-text>
                    <ul>
                        <li><st-text>Waking up early</st-text></li>
                        <li><st-text>Loud noises</st-text></li>
                        <li><st-text>Outdoors (Sometimes)</st-text></li>
                    </ul>
                </div>
                <st-image src={data.photos[7].src} title={data.photos[7].title} caption={data.photos[7].caption} aspect-ratio="16:9" frame></st-image>
            </div>
        </st-section>
        <st-section id="projects">
            <st-header id="category-header" hLevel="2" heading="Projects" headingHref="#projects"></st-header>
            <div className="projects-list">
                {data.projects.map(project => {
                    return <st-card
                        key={project.heading}
                        image={project.image}
                        href={project.href}
                        heading={project.heading}
                        subheading={project.subheading}
                        description={project.description}
                        contain={project.contain}
                    ></st-card>
                })}
            </div>
        </st-section>
    </React.Fragment>
}

export default LandingPage