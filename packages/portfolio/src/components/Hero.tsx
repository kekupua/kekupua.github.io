import React from 'react';
import { Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { SKILLS } from '../lib/data';
import { scrollToAnchor } from '../utils/router';
import { HashLink } from 'react-router-hash-link';

export const Hero: React.FC = () => {
  return (
    <section className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-50'>
      {/* Vibrant Background Elements */}
      <div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-30 animate-pulse' />
      <div className='absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-300 rounded-full blur-3xl opacity-20' />

      <div className='container mx-auto px-6 relative z-10 text-center flex flex-col justify-center items-center gap-6'>
        <div className='inline-block px-3 py-1 mb-6 border border-brand-200 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold tracking-wide'>
          Senior Frontend Engineer
        </div>

        <h1 className='text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6'>
          Sean Teramae <br className='hidden md:block' />
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500'>
            Senior Software Engineer
          </span>
        </h1>

        <p className='text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed'>
          I craft high-performance web applications with modern technologies.
          Specializing in React ecosystem and intuitive UI/UX design.
        </p>

        {/* Skills Grid */}
        <div className='flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto'>
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-700 hover:border-brand-200 hover:shadow-md transition-all cursor-default'
            >
              <span className='text-brand-500'>{skill.icon}</span>
              <span className='font-medium text-sm'>{skill.name}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <a
            href='mailto:seteramae@gmail.com'
            className='flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 transform hover:-translate-y-1'
          >
            <Mail className='w-5 h-5' />
            Get in Touch
          </a>
          <HashLink to='/#projects'
            className='flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-semibold border border-slate-200 hover:border-brand-200 hover:bg-slate-50 transition-all'
          >
            View Projects
            <ArrowRight className='w-4 h-4' />
          </HashLink>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400'>
        <ChevronDown className='w-6 h-6' />
      </div>
    </section>
  );
};

export default Hero;
