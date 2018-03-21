
//Global variables

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var fractal_array = [];
var next = [];

function DrawLine(A, B){
   context.beginPath();
   context.moveTo(A[0], A[1]);
   context.lineTo(B[0], B[1]);
   context.stroke();
   context.closePath();
}





document.getElementById('SnowFlake').onclick = function(){generate_snowflake()};
document.getElementById('FractalTree').onclick = function(){generate_tree()};
function generate_snowflake(){
	var start = [100, 150];
	var end = [300, 150];
	fractal_array.push(start);
	fractal_array.push(end);
	var number_of_iterations = parseInt(document.getElementById("number_of_iterations").value);
  generate(start, end, number_of_iterations);
  
  
}

function generate_tree(){
  fractal_tree([350,600], 120,0);
}

function generate(A, B, number_of_iterations){
    
    if (number_of_iterations < 0){
        return null;
    }

    var C = divide(add(multiply(A, 2), B), 3);
    var D = divide(add(multiply(B, 2), A), 3);
    var F = divide(add(A, B), 2);
    
    var V1 = divide(minus(F, A), length(F, A));
    var V2 = [V1[1], -V1[0]];

    var E = add(multiply(V2, Math.sqrt(3)/6 * length(B, A)), F);

    DrawLine(A, B, "black");

    if (number_of_iterations !=0){
        for (var i=0;i<10;i++)
            DrawLine(C, D, "white");
    };
    
    generate(A, C, number_of_iterations-1);
    generate(C, E, number_of_iterations-1);
    generate(E, D, number_of_iterations-1);
    generate(D, B, number_of_iterations-1);

   

}


function fractal_tree(Center, tree_length, angle) {
  context.beginPath();
  context.save();
  
  context.translate(Center[0], Center[1]);
  context.rotate(angle * Math.PI/180);
  context.moveTo(0, 0);
  context.lineTo(0, -tree_length);
  context.stroke();
  
  if(tree_length < 10) {
    context.restore();
    return;
  }
  
  fractal_tree([0, -tree_length], tree_length*0.7, -30);
  fractal_tree([0, -tree_length], tree_length*0.7, 30);
  
  context.restore();
}



function length(a, b){
    return Math.sqrt(Math.pow(a[0] - b[0],2) + 
                     Math.pow(a[1] - b[1],2));
};

function Get_point_on_line(A, B, fraction){
	var intercept = [(B[0] - A[0])/fraction, (B[1]-A[1])/fraction];
	return intercept;
}

function Get_rotation_points(A, B){
	var F = divide(add(A, B), 2);
    var V1 = divide(minus(F, A), length(F, A));
    var V2 = [V1[1], -V1[0]];
	var E = add(multiply(V2, Math.sqrt(3)/6 * length(B, A)), F);
    return E;
}


function multiply(v, num){
    return [v[0]*num, v[1]*num];
};

function divide(v, num){
    return [v[0]/num, v[1]/num];
};
 
function add(a, b){
    return [a[0]+b[0], a[1]+b[1]];
};

function minus(a, b){
    return [a[0]-b[0], a[1]-b[1]];
};


