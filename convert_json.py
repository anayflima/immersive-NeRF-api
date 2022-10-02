# File: convert_json.py
# File Created: Saturday, 1st October 2022 10:42:43 pm
# Author: John Lee (jlee88@nd.edu)
# Last Modified: Sunday, 2nd October 2022 1:32:14 am
# Modified By: John Lee (jlee88@nd.edu>)
# 
# Description: Converts Nerf Output JSON into an array json with x, y grid represented as nested array.


import json
import os

dir = 'data'

with open("person/person.json", "r") as pfile:
    x = json.load(pfile)
    
with open("person/person_conv.json", "w") as pfile:
    json.dump(['person/test/' + frame['frame']['path'].split('/')[-1] for frame in x], pfile)
    