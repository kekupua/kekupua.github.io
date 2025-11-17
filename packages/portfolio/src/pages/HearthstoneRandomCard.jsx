import { useEffect, useRef, useState } from 'react';
import Metadata from '../lib/hearthstone-set-metadata.json';
import Groups from '../lib/hearthstone-set-group-metadata.json';
import Standard from '../svgs/standard.svg';
import Wild from '../svgs/wild.svg';
import '../styles/Hearthstone.css';
import { Section } from '../components/section';
import { Header } from '../components/Header';

const getRandomSet = (sets) => {
  const slug = sets[Math.floor(Math.random() * sets.length)];
  return Metadata.find((set) => set.slug === slug);
};

const getRandomCard = async (set, cache, updateCache) => {
  let setCards;
  if (updateCache) {
    const res = await fetch(`/hearthstone/${set.slug}.json`);
    setCards = await res.json();
    updateCache({ ...cache, [set.slug]: setCards });
  } else {
    setCards = cache[set.slug];
  }
  return setCards.cards[Math.floor(Math.random() * setCards.cards.length)];
};

const HearthstoneRandomCard = () => {
  const [cachedSets, updateCachedSets] = useState({});
  const [chosenSet, updateChosenSet] = useState('');
  const [chosenCard, updateChosenCard] = useState({});
  const [mode, setMode] = useState(
    window.localStorage.getItem('hrc-mode') || 'wild'
  );
  const [sets, updateSets] = useState(
    Groups.find((group) => group.slug === mode).cardSets
  );
  const cardSectionRef = useRef(null);

  const mountCard = async () => {
    const randomSet = getRandomSet(sets);
    updateChosenSet(randomSet);
    if (!cachedSets[randomSet.slug]) {
      updateChosenCard(
        await getRandomCard(randomSet, cachedSets, updateCachedSets)
      );
    } else {
      updateChosenCard(await getRandomCard(randomSet, cachedSets));
    }
  };

  const changeSet = (setName) => {
    return (e) => {
      if (setName !== mode) {
        const sets = Groups.find((group) => group.slug === setName)?.cardSets;
        updateSets(sets);
        setMode(setName);
        window.localStorage.setItem('hrc-mode', setName);
      }
    };
  };

  useEffect(() => {
    mountCard();
    document.querySelector('.App').classList.add('isHearthstone');
    return () => {
      document.querySelector('.App').classList.remove('isHearthstone');
    };
  }, []);

  useEffect(() => {
    mountCard();
  }, [mode]);

  return (
    <Section id='main-section' className='h-full w-full pt-20'>
      <div id='card-section' ref={cardSectionRef}>
        <div className='hs-controls'>
          <st-button icon='refresh' onClick={mountCard}></st-button>
          <div className='hs-sets'>
            <button onClick={changeSet('wild')}>
              <img
                src={Wild}
                className={`wild-set ${mode === 'wild' ? 'active' : ''}`}
              />
            </button>
            <button onClick={changeSet('standard')}>
              <img
                src={Standard}
                className={`standard-set ${
                  mode === 'standard' ? 'active' : ''
                }`}
              />
            </button>
          </div>
        </div>
        <img
          src={chosenCard.image}
          alt={chosenCard.name}
          style={{ maxWidth: '100%' }}
        />
        <Header layout='center'>
          <h2 className='st-text-400'>{chosenSet.name}</h2>
          <p className='st-text-200'>
            <em>{chosenCard.flavorText}</em>
          </p>
        </Header>
      </div>
    </Section>
  );
};
export default HearthstoneRandomCard;
