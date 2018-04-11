// Reference: Using Three.js libray and DAT.js to create a 3D objects. All the packages are web-based.



//setup the scene camera and renderer as the global renderers
var renderer, camera, scene, controls;
var cube, gui, a_x, a_y, a_z;


var options = {
  
  camera: {
    speed: 0.0001
  },
  
  
};

init();
animate();



function init(){
	renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});
	renderer.setClearColor(0xddddd);
	renderer.setSize(window.innerWidth, window.innerHeight);

	scene = new THREE.Scene();
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 75;
	camera.position.x = 50;
	camera.position.y = 50;
	camera.lookAt(scene.position);
	camera.updateMatrixWorld();
	

	


	//create shader
	var light = new THREE.AmbientLight(0xffffff, 0.8);
	scene.add(light);

	var point_light = new THREE.PointLight(0xffffff, 0.8);
	scene.add(point_light);

	var geometry = new THREE.BoxGeometry(5, 5, 5);

	//adding a grid
	var grid = new THREE.GridHelper(50, 5, "rgb(255, 0, 0)",  0x000000);
	scene.add(grid);

	var material = new THREE.MeshLambertMaterial({color: 0xff3300});
	cube = new THREE.Mesh(geometry, material);
	//controls = new THREE.OrbitControls(camera, renderer.domElement);

	cube.position.set(0, 3, -20);
	
	scene.add(cube);
	renderer.render(scene, camera);
	

	
	
	//diplay gui
	Control_Panel();
}

function Control_Panel(){
	var gui = new dat.GUI();
	var speed = 0.1 ;
	//store  the info to be called on later
	var info;

	
	//store all the GUI's parameter
	parameters = {
		//Name
		a: "Cube", 
		//Geomey
		b: "",
		//Colors
		d:"#0000ff", 
		//Perspective
		e:"", 
		//rotation
		r_x:1, r_y:1, r_z:1,  
		//Position
		p_x:1, p_y:1, p_z:1, 
		//Dimension
		d_x:1, d_y:1, d_z:1,
		//Animation, 
		aa_x: false, aa_y: false, aa_z: false,
		//option
		o:"",
	}

	gui.add(parameters, 'a').name('Name');
	gui.add(parameters, 'b', ["Sphere", "Circle", "Cube", "Line"]).name('Geometry');
	var color = gui.addColor(parameters, 'd').name('Color');
	color.onChange(function(info){
		cube.material.color.setHex(info.replace("#", "0x"));
			}
		);
	//dimension cannot go negative
	var dimension = gui.addFolder('Scale');
	var d_x = dimension.add(parameters, 'd_x').min(1).max(20).step(speed).name('X-Axis');
	var d_y = dimension.add(parameters, 'd_y').min(1).max(20).step(speed).name('Y-Axis');
	var d_z = dimension.add(parameters, 'd_z').min(1).max(20).step(speed).name('Z-Axis');
	d_x.onChange(function(info){cube.scale.x = info;});
	d_y.onChange(function(info){cube.scale.y = info;});
	d_z.onChange(function(info){cube.scale.z = info;});

	//position
	var position = gui.addFolder('Position');
	var p_x = position.add(parameters, 'p_x').min(-20).max(20).step(speed).name('X-Axis');
	var p_y = position.add(parameters, 'p_y').min(-20).max(20).step(speed).name('Y-Axis');
	var p_z = position.add(parameters, 'p_z').min(-20).max(20).step(speed).name('Z-Axis');
	p_x.onChange(function(info){cube.position.x = info;});
	p_y.onChange(function(info){cube.position.y = info;});
	p_z.onChange(function(info){cube.position.z = info;});

	//rotation
	var rotation = gui.addFolder('Rotation & Animation');
	var r_x = rotation.add(parameters, 'r_x').min(-20).max(20).step(speed).name('X-Axis');
	var r_y = rotation.add(parameters, 'r_y').min(-20).max(20).step(speed).name('Y-Axis');
	var r_z = rotation.add(parameters, 'r_z').min(-20).max(20).step(speed).name('Z-Axis');
	r_x.onChange(function(info){cube.rotation.x = info;});
	r_y.onChange(function(info){cube.rotation.y = info;});
	r_z.onChange(function(info){cube.rotation.z = info;});

	//Animation

	var animate_x = rotation.add(parameters, 'aa_x').name('X-Axis');
	var animate_y = rotation.add(parameters, 'aa_y').name('Y-Axis');
	var animate_z = rotation.add(parameters, 'aa_z').name('Z-Axis');
	animate_x.onChange(function(info){a_x = info;});
	animate_y.onChange(function(info){a_y = info;});
	animate_z.onChange(function(info){a_z = info;});

	//change camera
	var cam = gui.addFolder('Camera');
	cam.add(options.camera, 'speed', 0, 0.0010).listen();
	cam.add(camera.position, 'y', 0, 100).listen();
	cam.open();
 

	//add control setting
	gui.add(parameters, 'o', ["Save", "Load", "Reset"]).name('Option');

	//add wireframe
	gui.add(cube.material, 'wireframe').listen();

	//add add button
	var obj = { Add:function(){ console.log("clicked") }};
	gui.add(obj,'Add');

	gui.open();
	
}

function spin(variable, x_a, y_a, z_a){
	var speed = 0.1;
	if(variable == true){
		if(x_a == true){
			cube.rotation.x += speed;
		}else if(y_a == true){
			cube.rotation.y += speed;
		}else 
			cube.rotation.z += speed;
		
	}
}


function animate(){
	//update cube
	spin(a_x, true, false, false);
	spin(a_y, false, true, false);
	spin(a_z, false, false, true);

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


//add GUI PANEL





