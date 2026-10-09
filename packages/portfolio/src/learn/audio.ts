// Local, nonverbal feedback only. Music starts exclusively on a correct-answer tap.
export type Sound = "navigate" | "tap" | "correct";
const effect = new Audio();
const music = new Audio();
effect.preload = music.preload = "none";
effect.volume = 0.35;
music.volume = 0.18;
let muted = false;
export function stopAudio() {
  effect.pause();
  music.pause();
}
export function setMuted(value: boolean) {
  muted = value;
  stopAudio();
}
export function playSound(sound: Sound) {
  stopAudio();
  if (muted) return;
  effect.src = `/learn/audio/${sound}.mp3`;
  void effect.play().catch(() => {});
  if (sound === "correct") {
    music.src = "/learn/audio/reward-music.mp3";
    void music.play().catch(() => {});
  }
}
