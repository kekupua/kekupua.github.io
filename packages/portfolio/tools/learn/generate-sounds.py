"""Create original, speech-free bell effects and a short musical reward.
Standard-library Python plus ffmpeg; generated MP3s are committed.
"""
import math
from pathlib import Path
import struct
import subprocess
import tempfile
import wave

RATE = 22050
OUTPUT = Path('public/learn/audio')
OUTPUT.mkdir(parents=True, exist_ok=True)

def render(name, duration, notes):
    samples = [0.0] * int(RATE * duration)
    for start, frequency, length, volume in notes:
        for i in range(int(RATE * length)):
            at = int(start * RATE) + i
            if at >= len(samples):
                break
            t = i / RATE
            envelope = min(1.0, t / .025) * math.exp(-t * 4.5) * min(1.0, (length-t) / .08)
            bell = math.sin(2*math.pi*frequency*t) + .18*math.sin(2*math.pi*frequency*2*t)
            samples[at] += volume * envelope * bell
    with tempfile.TemporaryDirectory() as temporary:
        wav = Path(temporary) / 'sound.wav'
        with wave.open(str(wav), 'wb') as output:
            output.setparams((1, 2, RATE, 0, 'NONE', 'not compressed'))
            output.writeframes(b''.join(struct.pack('<h', int(max(-.9, min(.9, value))*32767)) for value in samples))
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(wav), '-b:a', '48k', str(OUTPUT / f'{name}.mp3')], check=True)

render('navigate', .22, [(0, 392, .18, .32)])
render('tap', .4, [(0, 523.25, .28, .32), (.08, 783.99, .25, .1)])
render('correct', .85, [(0, 659.25, .38, .3), (.12, 783.99, .38, .28), (.25, 1046.5, .5, .24)])
# Original pentatonic melody with a quiet chord bed; eight seconds, never looped.
melody = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 880, 783.99, 659.25, 587.33, 523.25, 783.99, 659.25, 587.33, 523.25]
notes = [(.45 + i*.45, frequency, .65, .16) for i, frequency in enumerate(melody)]
notes += [(start, frequency, 1.3, .045) for start in [.45, 2.25, 4.05, 5.85] for frequency in [261.63, 329.63, 392]]
render('reward-music', 8, notes)
print('Generated three effects and an eight-second original musical reward.')
