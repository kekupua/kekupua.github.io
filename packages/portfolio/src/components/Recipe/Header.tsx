import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHatIcon } from './icons/ChefHatIcon';

const Header: React.FC = () => {
  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link
          to='/'
          className='flex items-center gap-3 text-2xl font-bold text-brand-primary hover:text-amber-600 transition-colors'
        >
          <ChefHatIcon className='h-8 w-8' />
          <span>Curated Recipes</span>
        </Link>
        <nav>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-text-secondary hover:text-text-primary transition-colors'
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
