from moviepy.editor import *

clip = VideoFileClip("medias/kiki.mov")
clip.audio.write_audiofile("medias/kiki.wav")
