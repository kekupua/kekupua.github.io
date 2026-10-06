import '@kekupua/web-components';
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import HearthstoneRandomCard from './pages/HearthstoneRandomCard';
import { Route, Link, Routes, HashRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { RecipeDetailPage } from './pages/Recipe/RecipeDetailPage';
import { RecipeListPage } from './pages/Recipe/RecipeListPage';
import { Footer } from './components/Footer';
import { MealPrepPage } from './pages/Recipe/MealPrepPage';

export const App = () => {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route
            path='/random-hearthstone'
            element={<HearthstoneRandomCard />}
          />
          <Route path='/recipesByGpt' element={<RecipeListPage />} />
          <Route path='/recipesByGpt/:id' element={<RecipeDetailPage />} />
          <Route path='/meal-prep' element={<MealPrepPage />} />
        </Routes>
      </HashRouter>
      <Footer />
    </div>
  );
};

export default App;
