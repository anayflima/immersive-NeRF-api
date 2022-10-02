// load json
import jsonmap from "./map.json" assert {type: "json"};

// set initial points of camera from 0, 0, 0 where image is placed (hardcoded)
var x = 0; 
var y = 0; 
var z = 2; 

AFRAME.registerComponent('update-im', {
    init: function () {
        this.el.object3D.position.set(x, y, -z);
}
});

AFRAME.registerComponent('update-cam',{
    init: function () {
        this.el.object3D.position.set(x, y, z);
    },
    tick: function () {
        // retrieves positions of camera
        var rot = this.el.object3D.rotation;
        var xyz = this.el.object3D.position;
        // retrieve center position of image
        x = xyz.x
        //y += xyz.y
        z = xyz.z
       

        // compute theta and phi
        var theta = Math.atan2(-xyz.x, xyz.z) * 180 / Math.PI;
        var phi = 0;
       

        // // compute head rotations from a single spot
        // var yaw = -rot.y * 180 / Math.PI;
        // var pitch = -rot.x * 180 / Math.PI;
        // var roll = -rot.z * 180 / Math.PI
        // console.log(x,xyz.y, z, theta, phi, yaw, pitch);
        
        // document.getElementById('im').setAttribute('rotation', `${pitch} ${yaw} ${roll}`);


        if (theta > -59 && theta < -59 + 118) {
             document.getElementById('im').setAttribute('src', jsonmap[Math.round(theta + 59)]);
        }
    }
});
// init component
document.getElementById('cam').setAttribute('update-cam','');
document.getElementById('im').setAttribute('update-im','');
