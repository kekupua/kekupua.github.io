import React from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className='bg-slate-900 text-white py-12 border-t border-slate-800'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='text-center md:text-left'>
            <h3 className='text-2xl font-bold mb-1'>Sean Teramae</h3>
            <p className='text-slate-400 text-sm'>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className='flex gap-6'>
            <a
              href='https://www.linkedin.com/in/sean-teramae-b89486123/'
              className='text-slate-400 hover:text-brand-300 transition-colors'
            >
              <Linkedin className='w-6 h-6' />
            </a>
            <a
              href='mailto:seteramae@gmail.com'
              className='text-slate-400 hover:text-brand-300 transition-colors'
            >
              <Mail className='w-6 h-6' />
            </a>
            <a
              href='https://github.com/kekupua'
              className='text-slate-400 hover:text-brand-300 transition-colors'
            >
              <Github className='w-6 h-6' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
