# File: add_padding.py
# File Created: Saturday, 1st October 2022 10:57:32 pm
# Author: John Lee (jlee88@nd.edu)
# Last Modified: Sunday, 2nd October 2022 3:55:22 am
# Modified By: John Lee (jlee88@nd.edu>)
# 
# Description: Adds padding to Nerf images to reach next set of 2^n


import cv2
from pathlib import Path
import os
import numpy as np
dir = Path('data/')

for im in sorted(os.listdir(dir)):
    print(str(dir / im))
    # read images
    image = cv2.imread(str(dir / im))
    image = cv2.copyMakeBorder(image, 32, 32, 242, 242, borderType=cv2.BORDER_CONSTANT, value =[170,170,170])
    blurred_img = cv2.GaussianBlur(image, (21, 21), 0)
    mask = np.zeros(image.shape, np.uint8)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 60, 255, cv2.THRESH_BINARY)[1]
    contours, hierarchy = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    cv2.drawContours(mask, contours, -1, (255,255,255),5)
    output = np.where(mask==np.array([255, 255, 255]), blurred_img, image)
    # since images are 540 x 960, padding is hard coded to 1024x1024.

    # write image
    cv2.imwrite(str(dir / im), image)
    
