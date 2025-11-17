import React from 'react';
import { recipes } from '../../lib/recipes';
import RecipeCard from '../../components/Recipe/RecipeCard';
import { Section } from '../../components/Section';
import { Header } from '../../components/Header';

export const RecipeListPage: React.FC = () => {
  return (
    <Section className='animate-fade-in'>
      <Header>
        <h1>Our Recipe Collection</h1>
        <p className='st-text-200'>
          Discover delicious, easy-to-follow recipes handcrafted with love. From
          weeknight dinners to special occasion feasts, find your next favorite
          meal here.
        </p>
      </Header>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </Section>
  );
};
