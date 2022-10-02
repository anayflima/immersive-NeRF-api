import cv2 
import os

video = '~/HackMIT/data/raw/groupd_video.MOV'
cap = cv2.VideoCapture(video)

test = '~/HackMIT/data/group_exp/test/'
train = '~/HackMIT/data/group_exp/train/'
def frame(sec, count, i):
    vidcap.set(cv2.CAP_PROP_POS_MSEC,sec*1000)
    is_frame, image = video.read()
    if hasFrames:
        image = cv2.pyrDown(image)
        if count%3 == 0:
             cv2.imwrite(os.path.join(test, "%06d"%count+".png"), image)     # save frame as JPG file
        if count%7 == 0:
            cv2.imwrite(os.path.join(train, "%06d"%count +".png"), image)     # save frame as JPG file
    return hasFrames
sec = 0
count = 0
i = 0
frameRate = .03
success = getFrame(sec, count, i)
while isFrame:
    sec = sec + frameRate
    sec = round(sec, 2)
    success = getFrame(sec, count, i)
    count = count + 1
