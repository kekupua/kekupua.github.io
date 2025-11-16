import React from 'react';
import data from '../lib/data';
import { Link } from 'react-router-dom';
import { Section } from '../components/section';
import { Header } from '../components/Header';
import '../styles/LandingPage.css';

let LandingPage = () => {
  return (
    <React.Fragment>
      <Section id='masthead'>
        <header id='category-header' layout='center'>
          <h2 className='st-text-700' slot='heading'>
            Sean Teramae
          </h2>
          <p className='st-text-200' slot='description'>
            Software Engineer
          </p>
          <p className='st-text-200' id='skills-list' slot='description'>
            Javascript • Web Components • Node.js • React
          </p>
        </header>
        <st-button
          type='secondary'
          icon='mail'
          trailing-icon
          label='Email Me!'
          href='mailto:seteramae@gmail.com?Subject=Hi!'
        />
      </Section>

      <Section id='about'>
        <Header slot='header' id='category-header'>
          <h2 id='about'>About Me</h2>
        </Header>
        <div className='about-grid'>
          <div className='intro-text text-left'>
            <p className='intro'>{data.intro}</p>
            <div className='flex flex-col gap-5'>
              <div>
                <p className='italic'>Likes</p>
                <ul className='list-disc list-inside space-y-2 text-text-secondary text-lg'>
                  <li>My Wife</li>
                  <li>Dogs</li>
                  <li>Kpop</li>
                </ul>
              </div>
              <div>
                <p className='italic'>Dislikes</p>
                <ul className='list-disc list-inside space-y-2 text-text-secondary text-lg'>
                  <li>Waking up early</li>
                  <li>Loud noises</li>
                  <li>Outdoors (Sometimes)</li>
                </ul>
              </div>
            </div>
          </div>
          <img
            src={data.photos[7].src}
            title={data.photos[7].title}
            alt={data.photos[7].caption}
          />
        </div>
      </Section>
      <Section id='projects'>
        <Header>
          <h2 id='projects'>Projects</h2>
        </Header>
        <div className='projects-list'>
          {data.projects.map((project) => {
            const card = (
              <st-card image={project.image} contain={project.contain}>
                <h3 slot='heading'>{project.heading}</h3>
                <h4 slot='subheading'>{project.subheading}</h4>
                <p slot='description'>{project.description}</p>
              </st-card>
            );

            if (project.routerLink) {
              return (
                <Link key={project.heading} to={project.routerLink}>
                  {card}
                </Link>
              );
            } else {
              return React.cloneElement(card, {
                key: project.heading,
                href: project.href,
              });
            }
          })}
        </div>
      </Section>
    </React.Fragment>
  );
};

export default LandingPage;
