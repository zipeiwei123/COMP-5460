// Reference: Using Three.js libray and DAT.js to create a 3D objects. All the packages are web-based.



//all the global variables
var renderer, camera, scene, gui;
var ambiColor, pointColor, ambientLight, pointLight;
var cube, gui, axes;
var mouse, raycaster;
var contX, contY, contZ, pointGroup;
var objects = [];
var mouse_coordinate = [];
var options = {
    camera: {
        speed: 0.00008
  	},
    

};
// new updates
var line, count = 0;
var geometrycolor, geometrywireframe, geometrytexture, texture, geometryShawdow;
var pointMaterial;
var lineGeometry, lineMaterial, MAX_POINTS = 500;
var controls;
//add shape 
var shape, point, shapeGeometry, shapeMaterial, shapeMesh, extrudeSettings;
var coord_x = [];
var coord_y = [];
var modify_geometries;
var planeMaterial;




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
    this.wireframe = false;
    this.castShawdow = false;
}

//load image as 64 bits
// var image = new Image();
var image= 'data:image/jpeg;base64,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';


init();
animate();



function init(){
	renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.Enabled = true;

  texture = new THREE.ImageUtils.loadTexture( image );
  
	scene = new THREE.Scene();
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 150;
	camera.position.x = 250;
	camera.position.y = 48;
	camera.lookAt(scene.position);
	camera.updateMatrixWorld();
	controls = new THREE.OrbitControls( camera );
  controls.update();
  renderer.render(scene, camera);
	
	//add axis helper to show x, y, z
  axes = new THREE.AxesHelper(100);
  axes.position.y = - 50;
	axes.position.x = - 50;
  scene.add(axes);

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xEEEEEE, map:texture});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // console.log(plane);
  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = - 50;
  plane.position.y = -50;
  plane.position.z = 0
  plane.castShadow = true;

  // add the plane to the scene
  scene.add(plane);


  //add light resource
  ambiColor = "#edd9d9";
  ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  pointColor = "#ccffcc";
  pointLight = new THREE.PointLight(pointColor);
  pointLight.distance = 100;
  scene.add(pointLight);
    
   
	//adding a grid 
	var grid = new THREE.GridHelper(500, 100, "rgb(255, 0, 0)",  0x457dcd);
	grid.position.y = - 50;
	grid.position.x = - 50;
  scene.add(grid);

  // //////////////////////////////////////////////////////////////////////////////////////
  // add lines and points
  lineGeometry = new THREE.BufferGeometry();
  positions = new Float32Array(MAX_POINTS * 3);
  lineGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 2
    });

  line = new THREE.Line(lineGeometry, lineMaterial);
  line.name = "Line";
  scene.add(line); 

  //add point
	pointMaterial = new THREE.PointsMaterial( { color: 0x457dcd, size: 5 } );

  
  //add raycaster
  mouse = new THREE.Vector3();
  raycaster = new THREE.Raycaster();

	
	//add event listener
  // document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener( 'keydown', onKeyDown, false );
  //resize the window
  window.addEventListener( 'resize', onWindowResize, false );
  
	
  ///////////////////////////////////////////////////////////////////////////
	//diplay gui
	Control_Panel();
}


//////////////////////GUI//////////////////////////////////////////
function Control_Panel(object){
	gui = new dat.GUI();
	
	
	//////////////////////Camera Switch/////////////////////
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
                    controls.update();
                } else {
                    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;

                    camera.lookAt(scene.position);
                    this.perspective = "Perspective";
                    controls.update();
                }
            };
        }
    var cam = gui.addFolder('Camera');
	cam.add(options.camera, 'speed', 0, 0.0010).listen();
	cam.add(camera.position, 'y', 0, 100).listen();
	cam.open();
	cam.add(camera_controls, 'switchCamera');
  cam.add(camera_controls, 'perspective').listen();
  cam.close();
  //////////////////////Camera Switch/////////////////////


  //////////////////////light Switch/////////////////////
  var light_controls = new function() {
            this.ambientColor = ambiColor;
            this.pointColor = pointColor;
        }
  var light_switch = gui.addFolder('Light');
  light_switch.addColor(light_controls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
    });

  light_switch.addColor(light_controls, 'pointColor').onChange(function (e) {
        pointLight.color = new THREE.Color(e);
    });
  //////////////////////light Switch/////////////////////



  //add controls for each elements
   var controls = new function() {
            
          this.NumberOfObjects = scene.children.length;

          // this.outputObjects = function() {
          //     console.log(scene.children);
          //   }

          this.Draw_2D_Shape = function() {
              document.addEventListener("mousemove", onMouseMove, false);
    			    document.addEventListener('mousedown', onMouseDown, false);
            }
          this.Elevation_3D = function(){
            	draw3DShape();
            }
          this.Select_Object = function(){
              document.addEventListener('click', onDocumentMouseDown, false);
          }
          this.Remove_Geometry = function() {
              var allChildren = scene.children;
              var lastObject = allChildren[allChildren.length-1];
              if (lastObject instanceof THREE.Mesh) {
                  scene.remove(lastObject);
                  console.log(scene.children);
                  this.numberOfObjects = scene.children.length;
                }
            }
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
                cube.position.z= 0 + Math.round((Math.random() * 20));
                // add the cube to the scene
                scene.add(cube);
                objects.push(cube);

                //console.log(scene.children);
                //console.log(objects);
                
                this.numberOfObjects = scene.children.length-4;
            };

            this.addCone = function() {

                var variables = Math.ceil((Math.random() * 10));
                var coneGeometry = new THREE.ConeGeometry( variables, variables, variables );
                var coneMaterial = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffff00} );
                var cone = new THREE.Mesh( coneGeometry, coneMaterial );
                cone.castShadow = true;
                cone.name = "cone-" + scene.children.length;
              // position the cube randomly in the scene
                cone .position.x=25 + Math.round((Math.random() * 20));
                cone .position.y= 0 + Math.round((Math.random() * 20));
                cone .position.z= 0 + Math.round((Math.random() * 20));
                // add the cube to the scene
                scene.add(cone);
                objects.push(cone);
                this.numberOfObjects = scene.children.length-4;
            };

            this.addCylinder = function() {

                var variables = Math.ceil((Math.random() * 10));
                var cylinderGeometry = new THREE.CylinderGeometry( variables, variables, variables, variables );
                var cylinderMaterial = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffff00} );
                var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
                cylinder.castShadow = true;
                cylinder.name = "cylinder-" + scene.children.length;
              // position the cube randomly in the scene
                cylinder.position.x=25 + Math.round((Math.random() * 20));
                cylinder.position.y= 0 + Math.round((Math.random() * 20));
                cylinder.position.z= 0 + Math.round((Math.random() * 20));
                // add the cube to the scene
                scene.add(cylinder);
                objects.push(cylinder);
                this.numberOfObjects = scene.children.length-4;
            };


    }

  //add controls for colors and wireframe
  parameters = {
        //Colors
        d:"#0000ff", 
        a: true, 
    }

  //2D Elevation
  var Create_2D_Elevation = gui.addFolder('Add 2D Elevation');
  // Create_2D_Elevation.add(controls, 'outputObjects');
	Create_2D_Elevation.add(controls, 'NumberOfObjects').listen();
	Create_2D_Elevation.add(controls, 'Draw_2D_Shape');
	Create_2D_Elevation.add(controls, 'Elevation_3D');
  ///////////////////////////////////////////////////////////////


  //create a folder to add 3d geometry
  var Create_3D_Geometry = gui.addFolder('Add 3D Geometry');
  Create_3D_Geometry.add(controls, 'addCube');
  Create_3D_Geometry.add(controls, 'addCone');
  Create_3D_Geometry.add(controls, 'addCylinder');

  //modifies objects
  modify_geometries = gui.addFolder('Modify 3D Geometries');
  modify_geometries.add(controls, 'Select_Object');
  modify_geometries.add(controls_objects,'scaleX',0,5);
  modify_geometries.add(controls_objects,'scaleY',0,5);
  modify_geometries.add(controls_objects,'scaleZ',0,5);
  
  contX = modify_geometries.add(controls_objects,'positionX',-10,100);
  contY = modify_geometries.add(controls_objects,'positionY',-4,200);
  contZ = modify_geometries.add(controls_objects,'positionZ',-10,100);

  modify_geometries.add(controls_objects,'rotationX',-4,4);
  modify_geometries.add(controls_objects,'rotationY',-4,4);
  modify_geometries.add(controls_objects,'rotationZ',-4,4);

  modify_geometries.add(controls_objects,'translateX',-10,10);
  modify_geometries.add(controls_objects,'translateY',-10,10);
  modify_geometries.add(controls_objects,'translateZ',-10,10);

  geometrywireframe = modify_geometries.add(controls_objects,'wireframe');
  // geometryShawdow = modify_geometries.add(controls_objects,'castShawdow');
  geometrycolor = modify_geometries.addColor(parameters, 'd').name('Color');
  
  
  gui.add(controls, 'Remove_Geometry');
}
//////////////////////GUI//////////////////////////////////////////

//////////////////////Window Resize//////////////////////////////////////////
function onWindowResize( event ) {
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        camera.aspect = 0.5 * aspect;
        camera.updateProjectionMatrix();
        controls.update();
      }




//////////////////////Window Resize//////////////////////////////////////////


//////////////////////Ray Caster//////////////////////////////////////////
function onDocumentMouseDown(event){
  // event.preventDefault();
  mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( objects );
  console.log("The on document mouse down is clicked");
  console.log(scene.chilren);
  

  
  if ( intersects.length > 0 ) {
    var intersect = intersects[ 0 ];
    
    if(intersect.object instanceof THREE.Mesh ){

          intersect.object.material.color=new THREE.Color(0x0000ff);
          intersect.object.material.transparent = true;
          
          contX.listen();
          contX.onChange(function(value) {
          intersect.object.position.x=controls_objects.positionX;});

          contY.listen();
          contY.onChange(function(value) {
          intersect.object.position.y=controls_objects.positionY;});

          contZ.listen();
          contZ.onChange(function(value) {
          intersect.object.position.z=controls_objects.positionZ;});

          intersect.object.scale.set(controls_objects.scaleX, controls_objects.scaleY, controls_objects.scaleZ);

          intersect.object.rotation.x=controls_objects.rotationX;
          intersect.object.rotation.y=controls_objects.rotationY;
          intersect.object.rotation.z=controls_objects.rotationZ;

          intersect.object.translateX(controls_objects.translateX);
          intersect.object.translateY(controls_objects.translateY);
          intersect.object.translateZ(controls_objects.translateZ);

          //add wireframe
          geometrywireframe.listen();
          geometrywireframe.onChange(function(value) {
          intersect.object.material.wireframe=controls_objects.wireframe;});

          geometryShawdow.listen();
          geometryShawdow.onChange(function(value) {
          intersect.object.castShadow=controls_objects.castShawdow;});
       
          //change color
          // var info;
          geometrycolor.onChange(function(info){
            intersect.object.material.color.setHex(info.replace("#", "0x"));
                });

            
            
          
        }//end if the object is Mesh
        
    }//end if intersect.length
}
//////////////////////Ray caster//////////////////////////////////////////



//////////////////////Draw Shape//////////////////////////////////////////
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 50 + 1;
  mouse.y = -(event.clientY / window.innerHeight) * 50 + 1;

  mouse.z = 25;
  
  raycaster.setFromCamera(mouse, camera);
	if( count !== 0 ){
    updateLine();
  }
}

function updateLine() {
  positions[count * 3 - 3] = mouse.x;
  positions[count * 3 - 2] = mouse.y;
  positions[count * 3 - 1] = mouse.z;
  line.geometry.attributes.position.needsUpdate = true;
}

function addPoint(event){
  // console.log("point nr " + count + ": " + mouse.x + " " + mouse.y + " " + mouse.z);
  console.log("X coords: "+ mouse.x + ", Y coords: " + mouse.y);
  coord_x.push(mouse.x);
  coord_y.push(mouse.y);
  positions[count * 3 + 0] = mouse.x;
  positions[count * 3 + 1] = mouse.y;
  positions[count * 3 + 2] = mouse.z;
  count++;
  //add point
  var pointGeometry = new THREE.Geometry();
  pointGeometry.vertices.push(mouse);
  point = new THREE.Points( pointGeometry, pointMaterial);
  point.geometry.vertices.needsUpdate = true;
  point.name = 'Points';
  scene.add(point);
  //push the point object into the array
  // points.push(point);
  line.geometry.setDrawRange(0, count);
  updateLine();
}

function onMouseDown(event) {
  // on first click add an extra point
  if( count === 0 ){
      // console.log(scene.children);
      addPoint();
  }
  	addPoint();
}

//stop the drawing function
function onKeyDown(event){
  console.log("press keycode success");
  document.removeEventListener("mousemove", onMouseMove, false);
  document.removeEventListener('mousedown', onMouseDown, false);
  //get rid of extra stuffs
  coord_x.splice(0,1);
  coord_y.splice(0,1);
  console.log(coord_x);
  console.log(coord_y);
  console.log(coord_x)
}

//////////////////////Draw Shape//////////////////////////////////////////
function draw3DShape(){
  var i;
  var allChildren = scene.children;
  console.log("In draw 3D shape function");
  console.log(allChildren);
  

  for(i=0; i < scene.children.length; i++){
    
  if(allChildren[i] == scene.getObjectByName( "Line" )){
      console.log(allChildren[i]);
      scene.remove(allChildren[i]);
    }
  }
  for(i=0; i < scene.children.length; i++){
    
    if(allChildren[i] == scene.getObjectByName( "Points" )){
        scene.remove(allChildren[i]);
      }
  }
  

	console.log("Draw 3D shape from here...");
	shape = new THREE.Shape();
	var i;

	for(i = 0; i < coord_x.length; i++){
		if(i == 0){
			console.log("first term");
			console.log(i);
			shape.moveTo(coord_x[i], coord_y[i]);

		}else if(i < (coord_x.length-1)){
			console.log("second term");
			console.log(i);
			shape.lineTo(coord_x[i], coord_y[i]);

		}else{
			console.log("third term");
			console.log(i);
			shape.lineTo(coord_x[i], coord_y[i]);
		}

	}//end for loop
		//optional
	shape.moveTo(coord_x[0], coord_y[0]);

	extrudeSettings = {
		steps: 2,
		amount: 16,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};

	var shapeGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	var shapeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var shapeMesh = new THREE.Mesh( shapeGeometry, shapeMaterial ) ;
	scene.add( shapeMesh );
  objects.push(shapeMesh);
}




//////////////////////Animate//////////////////////////////////////////
function animate(){
	//update camera
	var timer = Date.now() * options.camera.speed;
  camera.position.x = Math.cos(timer) * 100;
  camera.position.z = Math.sin(timer) * 100;
  camera.lookAt(scene.position); 
  camera.updateMatrixWorld();
  controls.update();
	requestAnimationFrame(animate);
	render();
}

function render(){
	renderer.clear();
	controls.update();
	renderer.render(scene, camera);

}

//////////////////////Draw Shape//////////////////////////////////////////


