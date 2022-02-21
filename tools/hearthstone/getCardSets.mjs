import fs from 'fs'
import blizzard from 'blizzard.js';
import { clientId, clientSecret } from '../../secrets/hearthstone.mjs';

const createClient = async () => {
  return await blizzard.hs.createInstance({
    key: clientId,
    secret: clientSecret,
  });
}

const getCards = async () => {
  const client = await createClient();
  const { data: sets } = await client.metadata({ type: 'sets' });
  const { data: setGroups } = await client.metadata({ type: 'setGroups' });
  fs.writeFileSync('./src/lib/hearthstone-set-metadata.json', JSON.stringify(sets, null, 2) , 'utf-8');
  fs.writeFileSync('./src/lib/hearthstone-set-group-metadata.json', JSON.stringify(setGroups, null, 2) , 'utf-8');
  sets.forEach(async (set) => {
    const {data: cards} = await client.cardSearch({collectible: 1, set: set.slug});
    fs.writeFileSync(`./public/hearthstone/${set.slug}.json`, JSON.stringify(cards, null, 2) , 'utf-8');
  });
}

getCards();
