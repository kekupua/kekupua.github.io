import '@kekupua/web-components';
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import HearthstoneRandomCard from './pages/HearthstoneRandomCard';
import { Route, Link, Routes, HashRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { RecipeDetailPage } from './pages/Recipe/RecipeDetailPage';
import { RecipeListPage } from './pages/Recipe/RecipeListPage';

export const App = () => {
  return (
    <div className='App'>
      <HashRouter>
        <div>
          <nav className='flex gap-6 justify-center py-4 st-text-100'>
            <HashLink to='/#about'>About</HashLink>
            <HashLink to='/#projects'>Projects</HashLink>
            <HashLink to='/#contact'>Contact</HashLink>
            <Link to={'/random-hearthstone'}>HRC</Link>
            <Link to={'/recipesByGpt'}>Recipes</Link>
          </nav>

          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route
              path='/random-hearthstone'
              element={<HearthstoneRandomCard />}
            />
            <Route path='/recipesByGpt' element={<RecipeListPage />} />
            <Route path='/recipesByGpt/:id' element={<RecipeDetailPage />} />
          </Routes>
        </div>
      </HashRouter>
      {/* @ts-ignore: Side-effect loaded WC */}
      <st-footer id='contact' />
    </div>
  );
};

export default App;
