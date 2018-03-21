

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





document.getElementById('Buttonclick').onclick = function(){setup()};

function setup(){
	var start = [100, 150];
	var end = [300, 150];
	fractal_array.push(start);
	fractal_array.push(end);
	
  var fraction = parseInt(document.getElementById("fractor").value);
  
  generate(start, end,  fraction);
}



function generate(A, B, fraction){
    
    var intercept = Get_point_on_line(A, B, fraction);
    
    for(var i = 1; i < fraction; i++)
    {
    	fractal_array.push([A[0]+intercept[0]*i, A[1]+intercept[1]*i]);
    }
    
    fractal_array.sort();
    

   	var rotation_points = [];
 

    for(var j = 0; j < fraction; j++){
    	rotation_points.push(Get_rotation_points(fractal_array[j], fractal_array[j+1]));
    }
    for (var i = 0; i < rotation_points.length; i++){
    	fractal_array.push(rotation_points[i]);
    }
    fractal_array.sort();
    for(var i = 0; i < fractal_array.length-1;i++){
      DrawLine(fractal_array[i], fractal_array[i+1]);
    }
   

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


