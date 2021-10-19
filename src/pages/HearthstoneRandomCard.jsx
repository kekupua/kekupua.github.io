/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Metadata from '../lib/hearthstone-metadata.json';

const getRandomSet = (metadata) => metadata[Math.floor(Math.random() * metadata.length)];

const getRandomCard = async (set) => {
  const res = await fetch(process.env.PUBLIC_URL + `/hearthstone/${set.slug}.json`);
  const data = await res.json();
  return data.cards[Math.floor(Math.random() * data.cards.length)];
}

const HearthstoneRandomCard = () => {
  const [chosenCard, updateChosenCard] = useState({});
  const mountCard = async () => {
    const randomSet = getRandomSet(Metadata);
    updateChosenCard(await getRandomCard(randomSet));
  }
  useEffect(() => {
    mountCard();
  }, []);

  useEffect(() => {
    console.log(chosenCard);
  }, [chosenCard]);

  return <st-section>
    <div>
      <img src={chosenCard.image} alt={chosenCard.name}/>
    </div>
    <st-button onClick={mountCard}></st-button>
  </st-section>;
}
export default HearthstoneRandomCard;