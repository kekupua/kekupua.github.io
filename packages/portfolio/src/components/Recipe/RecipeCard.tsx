import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types/Recipe';
import { ClockIcon } from './icons/ClockIcon';
import { UsersIcon } from './icons/UsersIcon';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link
      to={`/recipesByGpt/${recipe.id}`}
      className='block group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl'
    >
      <div className='relative'>
        <img
          className='w-full h-56 object-cover'
          src={recipe.imageUrl ?? 'https://picsum.photos/500/600'}
          alt={recipe.title}
        />
        <div className='absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300'></div>
      </div>
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300'>
          {recipe.title}
        </h2>
        <p className='text-text-secondary mb-4 h-20 overflow-hidden'>
          {recipe.description}
        </p>
        <div className='flex justify-between items-center text-sm text-text-secondary border-t pt-4'>
          <div className='flex items-center gap-2'>
            <ClockIcon className='h-5 w-5' />
            <span>{recipe.cookTime}</span>
          </div>
          <div className='flex items-center gap-2'>
            <UsersIcon className='h-5 w-5' />
            <span>Serves {recipe.servings}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
