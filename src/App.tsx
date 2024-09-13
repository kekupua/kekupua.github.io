import '@kekupua/web-components';
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import HearthstoneRandomCard from './pages/HearthstoneRandomCard';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export const App = () => {
  return (
    <div className='App'>
      <Router>
        <div>
          {/* @ts-ignore: Side-effect loaded WC */}
          <st-nav>
            <HashLink to='/#about'>About</HashLink>
            <HashLink to='/#projects'>Projects</HashLink>
            <HashLink to='/#contact'>Contact</HashLink>
            <Link to={'/random-hearthstone'}>HRC</Link>
            {/* @ts-ignore: Side-effect loaded WC */}
          </st-nav>

          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route
              path='/random-hearthstone'
              element={<HearthstoneRandomCard />}
            />
          </Routes>
        </div>
      </Router>
      {/* @ts-ignore: Side-effect loaded WC */}
      <st-footer id='contact' />
    </div>
  );
};

export default App;
