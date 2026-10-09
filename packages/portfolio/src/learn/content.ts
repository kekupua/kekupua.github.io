export type Category = "letters" | "animals" | "colors";
export type Item = {
  id: string;
  name: string;
  art: string;
  letter?: string;
  color?: string;
  image?: string;
};
const objects = [
  "Apple",
  "Ball",
  "Car",
  "Duck",
  "Egg",
  "Fish",
  "Gift",
  "House",
  "Ice cream",
  "Juice",
  "Kite",
  "Lion",
  "Moon",
  "Nest",
  "Orange",
  "Pig",
  "Queen",
  "Rainbow",
  "Sun",
  "Tree",
  "Umbrella",
  "Violin",
  "Whale",
  "Xylophone",
  "Yo-yo",
  "Zebra",
];
export const letters: Item[] = objects.map((name, i) => ({
  id: String.fromCharCode(97 + i),
  letter: String.fromCharCode(65 + i),
  name,
  art: name.toLowerCase().replaceAll(" ", "-"),
}));
export const animals: Item[] = [
  "Dog",
  "Cat",
  "Cow",
  "Duck",
  "Elephant",
  "Lion",
].map((name) => ({
  id: name.toLowerCase(),
  name,
  art: name.toLowerCase(),
  image: `/learn/animals/${name.toLowerCase()}.webp`,
}));
export const colors: Item[] = [
  ["red", "Red", "#e8444a"],
  ["blue", "Blue", "#2375d8"],
  ["yellow", "Yellow", "#ffd141"],
  ["green", "Green", "#24956b"],
  ["orange", "Orange", "#ef822e"],
  ["purple", "Purple", "#9862cf"],
].map(([id, name, color]) => ({ id, name, color, art: "ball" }));
export const categories: {
  id: Category;
  title: string;
  subtitle: string;
  art: string;
}[] = [
  {
    id: "letters",
    title: "LETTERS",
    subtitle: "Little letters, big discoveries",
    art: "alphabet",
  },
  {
    id: "animals",
    title: "ANIMALS",
    subtitle: "Say hello to new friends",
    art: "animals",
  },
  {
    id: "colors",
    title: "COLORS",
    subtitle: "A rainbow of possibilities",
    art: "colors",
  },
];
export const content = { letters, animals, colors };
export const activityNames = {
  letters: ["Explore the Alphabet", "Find the Letter"],
  animals: ["Meet the Animals", "Find the Animal"],
  colors: ["Explore Colors", "Color Matching"],
};
// Deterministic rounds: every item appears, with the answer rotating between positions.
export function choicesFor(items: Item[], round: number) {
  const answer = items[round % items.length];
  const choices = [
    answer,
    items[(round + 1) % items.length],
    items[(round + 3) % items.length],
  ];
  for (let i = 0; i < round % 3; i++) choices.push(choices.shift()!);
  return { answer, choices };
}
