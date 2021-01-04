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
                
                <sl-gallery>
                    {data.photos.map(project => {
                        return <sl-gallery-image
                            key={project.title}
                            src={project.src}
                            title={project.title}
                            caption={project.caption}>
                        </sl-gallery-image>
                    })}
                </sl-gallery>
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