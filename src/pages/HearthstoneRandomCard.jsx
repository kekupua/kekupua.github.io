/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Metadata from '../lib/hearthstone-metadata.json';
import '../styles/Hearthstone.css';

const getRandomSet = (metadata) => metadata[Math.floor(Math.random() * metadata.length)];

const getRandomCard = async (set, cache, updateCache) => {
  let setCards;
  if (updateCache) {
    const res = await fetch(process.env.PUBLIC_URL + `/hearthstone/${set.slug}.json`);
    setCards = await res.json();
    updateCache({...cache, [set.slug]: setCards});
  } else {
    setCards = cache[set.slug];
  }
  return setCards.cards[Math.floor(Math.random() * setCards.cards.length)];
}

const HearthstoneRandomCard = () => {
  const [cachedSets, updateCachedSets] = useState({});
  const [chosenSet, updateChosenSet] = useState('');
  const [chosenCard, updateChosenCard] = useState({});
  const cardSectionRef = useRef(null);
  const mountCard = async () => {
    const randomSet = getRandomSet(Metadata);
    updateChosenSet(randomSet);
    if (!cachedSets[randomSet.slug]) {
      updateChosenCard(await getRandomCard(randomSet, cachedSets, updateCachedSets));
    } else {
      updateChosenCard(await getRandomCard(randomSet, cachedSets));
    }
  }
  useEffect(() => {
    mountCard();
    document.querySelector('.App').classList.add('isHearthstone');
    return () => {
      document.querySelector('.App').classList.remove('isHearthstone');
    }
  }, []);

  return <st-section id="main-section">
    <div id="card-section" ref={cardSectionRef}>
      <st-button icon="refresh" onClick={mountCard}></st-button>
      <img src={chosenCard.image} alt={chosenCard.name} style={{maxWidth: '100%'}}/>
      <st-header layout='center' style={{margin: 'var(--size-300) auto'}}>
        <h2 className="st-text-400" slot="heading">{chosenSet.name}</h2>
        <p className="st-text-200" slot="description"><em>{chosenCard.flavorText}</em></p>
      </st-header>
    </div>
  </st-section>;
}
export default HearthstoneRandomCard;