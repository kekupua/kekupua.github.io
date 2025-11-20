import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipes } from '../../lib/recipes';
import { ClockIcon } from '../../components/Recipe/icons/ClockIcon';
import { UsersIcon } from '../../components/Recipe/icons/UsersIcon';

export const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className='text-center py-20 gap-6 flex flex-col items-center'>
        <h1 className='text-3xl font-bold mb-4'>Recipe not found!</h1>
        <p className='text-text-secondary mb-8'>
          Sorry, we couldn't find the recipe you're looking for.
        </p>
        <Link
          to='/recipesByGpt'
          className='bg-brand-primary font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors'
        >
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-4 sm:p-8'>
      <div className='flex flex-col items-center gap-4 mb-8'>
        <Link
          to='/recipesByGpt'
          className='text-brand-primary hover:underline mb-6 inline-block'
        >
          &larr; Back to all recipes
        </Link>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-text-primary mb-4'>
          {recipe.title}
        </h1>
        <p className='text-lg text-text-secondary mb-8'>{recipe.description}</p>
        <img
          src={recipe.imageUrl ?? 'https://picsum.photos/800/600'}
          alt={recipe.title}
          className='w-full h-auto max-h-[500px] object-cover rounded-xl'
        />
      </div>

      <div className='flex flex-wrap gap-6 justify-center bg-amber-50 rounded-xl p-6 mb-10 text-center'>
        <div className='flex items-center gap-2 text-lg'>
          <ClockIcon className='h-6 w-6 text-brand-primary' />
          <div>
            <span className='font-bold block'>Prep Time</span>
            <span>{recipe.prepTime}</span>
          </div>
        </div>
        {recipe.cookTime && (
          <div className='flex items-center gap-2 text-lg'>
            <ClockIcon className='h-6 w-6 text-brand-primary' />
            <div>
              <span className='font-bold block'>Cook Time</span>
              <span>{recipe.cookTime}</span>
            </div>
          </div>
        )}
        <div className='flex items-center gap-2 text-lg'>
          <UsersIcon className='h-6 w-6 text-brand-primary' />
          <div>
            <span className='font-bold block'>Servings</span>
            <span>{recipe.servings} people</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 text-left'>
        <div className='md:col-span-1'>
          <h2 className='text-3xl font-bold mb-4 border-b-4 border-brand-primary pb-2'>
            Ingredients
          </h2>
          <ul className='list-disc list-inside space-y-2 text-text-secondary text-lg whitespace-pre-wrap'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className='md:col-span-2'>
          <h2 className='text-3xl font-bold mb-4 border-b-4 border-brand-secondary pb-2'>
            Instructions
          </h2>
          <ol className='space-y-6 text-lg text-text-primary'>
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className='flex gap-4'>
                <span className='flex-shrink-0 bg-brand-secondary rounded-full h-8 w-8 flex items-center justify-center font-bold'>
                  {index + 1}
                </span>
                <span className='pt-0.5'>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
