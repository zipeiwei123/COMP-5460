// Reference: Using Three.js libray to create a 3D object
// https://www.youtube.com/watch?v=biZgx45Mzqo

var object = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});

object.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

var scene = new THREE.Scene();

//create shader

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var point_light = new THREE.PointLight(0xffffff, 0.5);
scene.add(point_light);
var geometry = new THREE.BoxGeometry(100, 100, 100);

var material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
var mesh = new THREE.Mesh(geometry, material);


mesh.position.set(0, 0, -1000);
scene.add(mesh);
object.render(scene, camera);

requestAnimationFrame(render);
function render(){
    mesh.rotation.x += 0.01;
    mesh.rotation.y +=0.01;
    object.render(scene, camera);
    requestAnimationFrame(render);
}