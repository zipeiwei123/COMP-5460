// Reference: Using Three.js libray and DAT.js to create a 3D objects. All the packages are web-based.



//all the global variables
var renderer, camera, scene, controls, gui;
var ambiColor, pointColor, ambientLight, pointLight;
var cube, gui, axes;
var mouse, raycaster;
var contX, contY, contZ;
var objects = [];
var options = {
    camera: {
        speed: 0.0001
  	},
};

var step=0;
var controls_objects = new function(){
	this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;

    this.positionX = 0;
    this.positionY = 4;
    this.positionZ = 0;

    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.scale = 1;

    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;
}




init();
animate();



function init(){
	renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.Enabled = true;

	scene = new THREE.Scene();
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 75;
	camera.position.x = 50;
	camera.position.y = 50;
	camera.lookAt(scene.position);
	camera.updateMatrixWorld();
	
	
	//add axis helper to show x, y, z
	axes = new THREE.AxesHelper(20);
	scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
     //plane.receiveShadow  = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    // add the plane to the scene
    scene.add(plane);



	// add subtle ambient lighting
    ambiColor = "#0c0c0c";
    ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    pointColor = "#ccffcc";
    pointLight = new THREE.PointLight(pointColor);
    pointLight.distance = 100;
    scene.add(pointLight);

    
	

	//adding a grid 
	var grid = new THREE.GridHelper(100, 10, "rgb(255, 0, 0)",  0x000000);
    scene.add(grid);

    // // create the ground plane
    // var planeGeometry = new THREE.PlaneGeometry(60, 40, 0);
    // var floorTex = THREE.TextureLoader("grass.jpg");
    // var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.material.map = floorTex;
    // scene.add(plane);


	
	
	
	renderer.render(scene, camera);


	//add raycaster
	raycaster = new THREE.Raycaster();
	mouse  = new THREE.Vector2();
	
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	
	//diplay gui
	Control_Panel();

	
}

function Control_Panel(object){
	gui = new dat.GUI();
	
	
	//change camera
	var cam = gui.addFolder('Camera');
	cam.add(options.camera, 'speed', 0, 0.0010).listen();
	cam.add(camera.position, 'y', 0, 100).listen();
	cam.open();
 

	//swtich camera between perspective and orthographics
	var camera_controls = new function() {
            this.perspective = "Perspective";
            this.switchCamera = function() {
                if (camera instanceof THREE.PerspectiveCamera) {
                    camera = new THREE.OrthographicCamera( window.innerWidth / - 16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / - 16, -200, 500 );
                    camera.position.x = 3;
                    camera.position.y = 1;
                    camera.position.z = 3;
                    camera.lookAt(scene.position);
                    this.perspective = "Orthographic";
                } else {
                    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;

                    camera.lookAt(scene.position);
                    this.perspective = "Perspective";
                }
            };
        }
	gui.add(camera_controls, 'switchCamera');
    gui.add(camera_controls, 'perspective').listen();


    var light_controls = new function() {
            this.ambientColor = ambiColor;
            this.pointColor = pointColor;
        }
    gui.addColor(light_controls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(light_controls, 'pointColor').onChange(function (e) {
        pointLight.color = new THREE.Color(e);
    });





    //add controls for each elements
   	var controls = new function() {
            
            this.numberOfObjects = scene.children.length;

            //change texture of the objects
            this.changeTexture = "brick";

            
            //remove Cube
            this.removeCube = function() {
                var allChildren = scene.children;
                var lastObject = allChildren[allChildren.length-1];
                if (lastObject instanceof THREE.Mesh) {
                    scene.remove(lastObject);
                    console.log(scene.children);
                    this.numberOfObjects = scene.children.length;
                }
            }

            //add Cube
            this.addCube = function() {

                var cubeSize = Math.ceil((Math.random() * 10));
                var cubeGeometry = new THREE.CubeGeometry(cubeSize,cubeSize,cubeSize);
                var cubeMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff });
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.name = "cube-" + scene.children.length;


                // position the cube randomly in the scene
                cube.position.x=25 + Math.round((Math.random() * 20));
                cube.position.y= 0 + Math.round((Math.random() * 20));
                cube.position.z=-20 + Math.round((Math.random() * 20));
                // add the cube to the scene
                scene.add(cube);
                objects.push(cube);

                console.log(scene.children);
                console.log(objects);
                
                this.numberOfObjects = scene.children.length-4;
            };

            this.changeTexture = function (e) {
                var texture1 = THREE.ImageUtils.loadTexture("brick.jpg");
                cube.material.map = texture1;
            }

            this.outputObjects = function() {
                console.log(scene.children);
            }
        }

    guiScale = gui.addFolder('scale');
    guiScale.add(controls_objects,'scaleX',0,5);
    guiScale.add(controls_objects,'scaleY',0,5);
    guiScale.add(controls_objects,'scaleZ',0,5);

    guiPosition = gui.addFolder('position');
    contX = guiPosition.add(controls_objects,'positionX',-10,10);
    contY = guiPosition.add(controls_objects,'positionY',-4,20);
    contZ = guiPosition.add(controls_objects,'positionZ',-10,10);


    //add add button
	gui.add(controls, 'addCube');
	gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');

    //add texture gui
    gui.add(controls, "changeTexture", ['brick', 'car', 'grass', 'roof']).onChange(controls.changeTexture);

    gui.add(controls, 'numberOfObjects').listen();


	//gui.open();
	
}



function animate(){
	

	//update camera
	var timer = Date.now() * options.camera.speed;
  	camera.position.x = Math.cos(timer) * 100;
  	camera.position.z = Math.sin(timer) * 100;
  	camera.lookAt(scene.position); 
  	camera.updateMatrixWorld();

  	//
	requestAnimationFrame(animate);
	render();
}

function render(){
	renderer.clear();
	renderer.render(scene, camera);
}


//add Mouse function
function onDocumentMouseDown(event){
	event.preventDefault();
	mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( objects );

	
	
}





