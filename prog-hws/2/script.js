var canvas,
    context,
    dragging = false,
    dragStartLocation,
    screensaver;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    var LineWidth = document.getElementById("LineWidth"); 
    var FillColor = document.getElementById("FillColor");
    var StrokeColor = document.getElementById("StrokeColor");
    context.lineWidth = LineWidth.value;
    context.fillStyle = FillColor.value;
    context.strokeStyle = StrokeColor.value;
    context.lineCap = 'round';
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseu p', dragStop, false);
    LineWidth.addEventListener("input", ChangeLineWidth, false);
    FillColor.addEventListener("input", changefillcolor, false);
    StrokeColor.addEventListener("input", changestrokecolor, false);
    
}

window.addEventListener('load', init, false);


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function recordScreen() {
    screensaver = context.getImageData(0, 0, canvas.width, canvas.height);
}

function reloadScreen() {
    context.putImageData(screensaver, 0, 0);
}

function Draw_Ecllipse(position, width, height) {
  
  context.beginPath();
  
  context.moveTo(dragStartLocation.x, dragStartLocation.y - height/2); // A1
  
  context.bezierCurveTo(
    dragStartLocation.x + width/2, dragStartLocation.y - height/2, // C1
    dragStartLocation.x + width/2, dragStartLocation.y + height/2, // C2
    dragStartLocation.x, dragStartLocation.y + height/2); // A2

  context.bezierCurveTo(
    dragStartLocation.x - width/2,  dragStartLocation.y + height/2, // C3
    dragStartLocation.x- width/2, dragStartLocation.y - height/2, // C4
    dragStartLocation.x, dragStartLocation.y - height/2); // A1
 
  
  context.stroke();
  context.closePath();
}

function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function drawCircle(position) {
    var radius = 100;
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}

function drawPolygon(position, sides, angle) {
      var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}






function draw(position) {

    var driver_score = parseInt(document.getElementById("driver_score").value);
    var fillshape = document.getElementById("FillShape");

    console.log(driver_score);
    if (driver_score === 100) {
        drawCircle(position);
       
    }
    else if (driver_score > 80) {
        var fraction = (100 - driver_score)/100;
        var height = driver_score*fraction;
        Draw_Ecllipse(position, driver_score, height);

    }

    else if (driver_score < 80) {
        var angle  = Math.PI/driver_score/2;
        drawPolygon(position, driver_score, angle);
        
    }
    if(fillshape.checked){
        context.fill();
    }else{
        context.stroke();
    }
    
    
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    recordScreen();
}

function drag(event) {
    var position;
    if (dragging === true) {
        reloadScreen();
        position = getCanvasCoordinates(event);
        draw(position);
    }
}

function dragStop(event) {
    dragging = false;
    reloadScreen();
    var position = getCanvasCoordinates(event);
    draw(position);
}

function changefillcolor(){
    context.fillStyle = this.value;
    event.stopPropagation();
}
function changestrokecolor(){
    context.strokeStyle = this.value;
    event.stopPropagation();
}


function ChangeLineWidth(){
    context.lineWidth = this.value;
    event.stopPropagation();
}





