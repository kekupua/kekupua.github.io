// One local player: rapid taps replace speech rather than overlapping it.
const player = new Audio();
player.preload = "auto";
player.volume = 0.7;
let muted = false;
let sequence = 0;
export function setMuted(value: boolean) {
  muted = value;
  stopAudio();
}
export function stopAudio() {
  sequence++;
  player.pause();
}
export function playAudio(id: string, onError?: () => void) {
  stopAudio();
  if (muted) return;
  const current = sequence;
  player.src = `/learn/audio/${id}.mp3`;
  player.play().catch(() => {
    if (sequence === current) onError?.();
  });
}
