# Run command:
# PYTHONPATH=/Users/shunting/Documents/moviepy python3.6 add_sound_to_jif.py
# View command:
# open -a vlc medias/pytha.avi
from moviepy.editor import *

base_video = VideoFileClip("medias/pytha.gif")
audio = AudioFileClip("medias/kiki.wav")

# sound clip is longer than animate clip
num_copy = int(audio.duration / base_video.duration)
left = audio.duration - num_copy * base_video.duration

video_list = [base_video] * num_copy
if left > 0:
  video_list.append(base_video.subclip(0, left))

video = concatenate_videoclips(video_list)

movie = video.with_audio(audio).resize(0.5)

# can work with vlc. Not compatible with quicktime
# can also set codec to rawvideo. In that case, vlc has sound but no image, but
# VideoFileClip.preview can work well.
movie.write_videofile("medias/pytha.avi", codec="mpeg4")
