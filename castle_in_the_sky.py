from moviepy.editor import *
import numpy as np
import time

C_hz = 261.63
D_hz = 293.66
E_hz = 329.63
F_hz = 349.23
G_hz = 392
A_hz = 440
B_hz = 493.88

hz_ar = [ C_hz, D_hz, E_hz, F_hz, G_hz, A_hz, B_hz ]

def get_freq(x, y):
  assert x >= 1 and x <= 7
  hz = hz_ar[x - 1]
  if y != 0:
    hz *= (2 ** y)
  return hz

def play_note(note, amplitude=1):
  x, y, el = note
  freq = get_freq(x, y)
  play_freq(freq, el, amplitude)

def make_frame(t, freq):
  # TODO understand the effect of tuning parameters for sin
  sin_res = np.sin(freq * 2 * np.pi * t)
  if isinstance(t, np.ndarray):
    return np.transpose(2 * [sin_res]).copy(order='C')
  else:
    return [sin_res, sin_res]

def play_freq(freq, el, amplitude):
  _make_frame = lambda t: make_frame(t, freq)
  clip = AudioClip(_make_frame, duration=el, fps=44100)
  b = time.time()
  # play time may be different to passin duration. buffersize can control that
  # 4410//2 seems to be a good fit.
  # TODO figure out the root cause
  clip.preview(buffersize=4410//2 + 100)
  print(f"elapse {time.time() - b}, el is {el}")

def play():
  for x in [
      (6, 0, 0.5),
      (7, 0, 0.5),
      (1, 1, 1.5),
      (7, 0, 0.5),
      (1, 1, 1),
      (3, 1, 1),
      (7, 0, 3),
  
      (3, 0, 0.5),
      (3, 0, 0.5),
      (6, 0, 1.5),
      (5, 0, 0.5),
      (6, 0, 1),
      (1, 1, 1),
      (5, 0, 3),
    ]:
    play_note(x)

if __name__ == "__main__":
  play()
