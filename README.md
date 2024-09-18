# Immersive NeRF
## Welcome to our official HackMIT '22 repository!

### Host URL 🌎

- [Open output model](https://immersive-nerf-api.herokuapp.com/)

Our project is capable of creating a 3D model of a scene given a sparse set of 2D images, and then rendering that model within VR. It accomplishes this task by using a relatively new (2020) method in the computer vision/graphics community known as [NeRF](https://www.matthewtancik.com/nerf), or Neural Radiance Fields. The followig steps will provide a walkthrough of our pipeline, as well a brief description of each part...

### Dependencies
##### Before you begin, create two environments using the files colmap_env.txt and nerf_env.txt located in ./nerf_code!

### Data Collection/Preparation
1. Film a video of a given scene in such a way that many viewing directions are captured
1. Take the video and input it into our **split.py** script that separates the video into frames and reduces their resolution

### Run Colmap
##### Colmap is a software used to obtain the camera positions that are need for each of the frames. These camera positions are important because NeRF needs to know where the images are captured in relation to others. 
* Run colmap2nerf.py add the following arguments
	* --images for the data directory
	* --out depending on which images you are running through colmap (transforms_test.json or transforms_train.json)

### Train NeRF
##### The data must be stored in the following directory structure  

	<data_name>/
		train/			(contains training data)
		test/			(contains testing data)
		transforms_train.json	(generated from colmap)
		transforms_test.json	(generated from colmap)
#### [OPTIONAL] Data Caching
##### The supplied NeRF code supports data caching, this will substantially quicken the the training time!
To cache your data, run the following command...

```
 python cache__dataset.py --datapath cache/nerf_synthetic/lego/ --halfres False --savedir cache/legocache/legofull --num-random-rays 8192 --num-variations 50
```
Be sure to update the --datapath with your directory, and --savedir with your save location

#### [CONT.]
##### After the file structure above is made, edit to file own.yml to link to your structure
Edit any of the arguments you wish, but you must edit the "basdir" to the directiory of your data and "cachedir" if you used data caching.

### Render from NeRF
##### To render images from your trained mode use the following command...
```
python eval_nerf.py --config config/own.yml --checkpoint pretrained/lego-lowres/checkpoint199999.ckpt --savedir cache/rendered/lego-lowres
```

Be sure to update the --checkpoint with your ckpt file from ./logs/<experiment_name>/<ckpt>


### Transfer to Web-Based VR
###### In order to transfer our scene to the VR, you need to use both outputs from the rendering in the previous step (rendered images in --savedir, rendered_angles.json). These outputs must then be added to the ./nerf/data/ directory to view the scene in VR with A-Frame.

Then, you have to run the [add_padding.py](https://github.com/anayflima/immersive-NeRF-api/blob/main/add_padding.py) file to add padding to the images to mantain aspect ratio, and run the  [map_json.py](https://github.com/anayflima/immersive-NeRF-api/blob/main/map_json.py) file to  map the images to degree rotations. Finally, host a localhost from the index.html file located at the root repository.
* Note that the **index.html** file uses **A-Frame** – which is a framework built on top of Three.js and WebXR – to enable quick rendering of the NeRF scene with an XR rig that is HMD agnositc

### References:
* [Original NeRF](https://www.matthewtancik.com/nerf)
* [COLMAP](https://colmap.github.io)
* [Pytorch NeRF Code](https://github.com/krrish94/nerf-pytorch#readme)
