// load json
import jsonmap from "./map.json" assert {type: "json"};

// set initial points of camera from 0, 0, 0 where image is placed (hardcoded)
var x = 0; 
var y = 0; 
var z = 2; 
var length = Object.keys(jsonmap).length;
var cur_pos = Math.floor(length / 2);
console.log(cur_pos);

AFRAME.registerComponent('update-im', {
    init: function () {
        this.el.object3D.position.set(x, y, -z);
}
});

AFRAME.registerComponent('thumbstick-logging',{
    init: function () {
      this.el.addEventListener('thumbstickmoved', this.moveCam);
    },
    moveCam: function (evt) {
      if (evt.detail.x < -0.95) { 
        if (cur_pos > 0) cur_pos--; }
      if (evt.detail.x > 0.95) { 
        if (cur_pos < length) cur_pos++; }
    }
  });

AFRAME.registerComponent('update-cam',{
    init: function () {
        this.el.object3D.position.set(x, y, z);
    },
    tick: function () {

        // Deprecated Code.

        // // retrieves positions of camera
        // var rot = this.el.object3D.rotation;
        
        // // retrieve center position of image
        // x = xyz.x
        // //y += xyz.y
        // z = xyz.z
       

        // // compute theta and phi
        // var theta = Math.atan2(-xyz.x, xyz.z) * 180 / Math.PI;
        // var phi = 0;
       

        // // compute head rotations from a single spot
        // var yaw = -rot.y * 180 / Math.PI;
        // var pitch = -rot.x * 180 / Math.PI;
        // var roll = -rot.z * 180 / Math.PI
        // console.log(x,xyz.y, z, theta, phi, yaw, pitch);
        
        // document.getElementById('im').setAttribute('rotation', `${pitch} ${yaw} ${roll}`);

        // Uncomment this for AD or LR movement on website
        // var xyz = this.el.object3D.position;
        // if (xyz.x - x > 0) { 
        //     if (cur_pos > 0) cur_pos--; }
        // if (xyz.x - x < 0) { 
        //     if (cur_pos < length) cur_pos++; }
        // x = xyz.x;

        if (cur_pos >= 0 && cur_pos < length) {
             document.getElementById('im').setAttribute('src', jsonmap[cur_pos]);
        }
    }
});
// init component
document.getElementById('cam').setAttribute('update-cam','');
document.getElementById('im').setAttribute('update-im','');
document.getElementById('left').setAttribute('thumbstick-logging','');
document.getElementById('right').setAttribute('thumbstick-logging','');
