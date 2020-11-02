from moviepy.editor import *
clip = VideoFileClip("medias/kiki.mov").subclip(27, 32).resize(0.25)
clip.write_gif("medias/kiki.gif")
