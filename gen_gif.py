import imageio
import os

def main():
    path = os.environ.get('dir', None)
    assert path is not None
    cnt = os.environ.get('cnt', None)
    assert cnt is not None
    out = os.environ.get('out', None)
    assert out is not None
    cnt = int(cnt)
    fps = int(os.environ.get('fps', "10"))

    imlist = []
    for i in range(cnt):
        imlist.append(imageio.imread(os.path.join(path, f"{i}.jpg")))
    imageio.mimwrite(out, imlist, fps=fps) 

if __name__ == "__main__":
    main()
