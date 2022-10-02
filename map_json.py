import json
import os
import numpy as np

frames = sorted(os.listdir('data'), reverse=True)

im_map = ['data/' + frames[j] for j,i in enumerate(np.linspace(0, 90, len(frames)))]

with open("map.json", 'w') as f:
    json.dump(im_map,f, sort_keys=True)