/** Optional authoring tool. Generated MP3s are committed; builds do not require TTS. */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { content } from "../../src/learn/content";

const directory = "public/learn/audio";
mkdirSync(directory, { recursive: true });
const clips: Record<string, string> = {
  welcome:
    "Hello, little explorer! Tap letters, animals, or colors. Let’s play!",
  "letters-menu":
    "Let’s play with letters. Tap the alphabet to explore. Tap the smiling sun to find a letter.",
  "animals-menu":
    "Let’s meet some animals. Tap the animals to explore. Tap the smiling sun to find an animal.",
  "colors-menu":
    "Let’s discover colors. Tap the shapes to explore. Tap the smiling sun to match a color.",
  hooray: "You found it! Wonderful! Tap next to play again.",
};
// One example sound per letter, not an exhaustive phonics lesson. Q is /kw/, X is /z/ in xylophone.
const sounds = [
  "a",
  "b",
  "k",
  "d",
  "E",
  "f",
  "g",
  "h",
  "aI",
  "dZ",
  "k",
  "l",
  "m",
  "n",
  "0",
  "p",
  "kw",
  "r",
  "s",
  "t",
  "V",
  "v",
  "w",
  "z",
  "j",
  "z",
];
for (const [category, items] of Object.entries(content)) {
  items.forEach((item, index) => {
    clips[`explore-${category}-${item.id}`] =
      category === "letters"
        ? `${item.letter}. ${item.letter} is for ${item.name}. The sound is [[${sounds[index]}]]. [[${sounds[index]}]], ${item.name}.`
        : category === "animals"
          ? `${item.name}. ${item.sound}`
          : `${item.name}. This is ${item.name.toLowerCase()}.`;
    const instruction =
      category === "letters"
        ? `Find the letter ${item.letter}.`
        : category === "animals"
          ? `Find the ${item.name.toLowerCase()}.`
          : `Find ${item.name.toLowerCase()}. Tap the same color.`;
    clips[`find-${category}-${item.id}`] = instruction;
    clips[`retry-${category}-${item.id}`] = `Let’s try again! ${instruction}`;
  });
}
const temporaryDirectory = mkdtempSync(join(tmpdir(), "little-wonders-audio-"));
for (const [id, words] of Object.entries(clips)) {
  const wav = join(temporaryDirectory, "speech.wav");
  execFileSync(process.env.ESPEAK_BIN || "espeak-ng", [
    "-v",
    "en-us",
    "-s",
    "145",
    "-p",
    "58",
    "-a",
    "85",
    "-w",
    wav,
    words,
  ]);
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    wav,
    "-af",
    "afade=t=in:d=0.025,volume=0.85",
    "-codec:a",
    "libmp3lame",
    "-b:a",
    "48k",
    `${directory}/${id}.mp3`,
  ]);
}
writeFileSync(
  `${directory}/transcripts.json`,
  JSON.stringify(clips, null, 2) + "\n",
);
console.log(`Generated ${Object.keys(clips).length} local audio clips.`);
