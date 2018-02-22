/*Using midpoint algorithm, DDA Line Algorithm, Bresenham and Scan Line Algorithm to draw circle, line, and rectangle
Reference from Wikipedia: https://en.wikipedia.org/wiki/Midpoint_circle_algorithm
Reference from http://programmers-lounge-basicgraphics.blogspot.com/2007/08/rectangle-using-bresenhams-line.html

I was able to finished the basic part of the assignment. However, I get confuse on scan line algorithm and cannot finish it on time. I will finish the scan line next time and as well as the filling algorithm. 
*/


var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

function LineFunction() {
    var x1 = parseInt(document.getElementById("x1").value);
    var y1 = parseInt(document.getElementById("y1").value);
    var x2 = parseInt(document.getElementById("x2").value);
    var y2 = parseInt(document.getElementById("y2").value);
    Draw_Line(x1, y1, x2, y2);
    
}

function CircleFunction() {
    var x11 = parseInt(document.getElementById("x11").value);
    var y11 = parseInt(document.getElementById("y11").value);
    var radius = parseInt(document.getElementById("radius").value);
    Draw_Cirle(x11, y11, radius);
    
}

function RectangleFunction() {
    var x1 = parseInt(document.getElementById("r_x").value);
    var y1 = parseInt(document.getElementById("r_y").value);
    var length = parseInt(document.getElementById("r_length").value);
    var width = parseInt(document.getElementById("r_width").value);
    Draw_Rectangle(x1, y1, length, width);
    
}

function EclipseFunction() {
    var x1 = parseInt(document.getElementById("e_x").value);
    var y1 = parseInt(document.getElementById("e_y").value);
    var length = parseInt(document.getElementById("e_length").value);
    var width = parseInt(document.getElementById("e_width").value);
    Draw_Ecllipse(x1, y1, length, width);
    
}

function PolygonFunction() {
    var number_of_sides = parseInt(document.getElementById("number_of_sides").value);
    var x_coordinates = [];
    var y_coordinates = [];

    if (number_of_sides > 2)
    {
        for (i = 0; i < number_of_sides; i++){
            x_coordinates[i] = parseInt(prompt("Enter your x_coordinates"));
            typeof x_coordinates[i];
            console.log(x_coordinates[i]);
        }
        for (i = 0; i < number_of_sides; i++){
            y_coordinates[i] = parseInt(prompt("Enter your y_coordinates"));
            typeof y_coordinates[i];
            console.log(y_coordinates[i]);
        }

        for (count = 0; count < number_of_sides; count+=2){
            Draw_Polygon(x_coordinates[count], y_coordinates[count], x_coordinates[count+1], y_coordinates[count+1]);        
        }
    }else{
        window.alert("A polygon must be bigger than 2");
    }
   
};


var Draw_Point = function (x, y) {
   context.fillRect(x, y, 1, 1);
}

var Draw_Cirle = function (x0, y0, radius) {
   var x = radius;
   var y = 0;
   var radiusError = 1 - x;
   
   while (x >= y) {
       Draw_Point(x + x0, y + y0);
       Draw_Point(y + x0, x + y0);
       Draw_Point(-x + x0, y + y0);
       Draw_Point(-y + x0, x + y0);
       Draw_Point(-x + x0, -y + y0);
       Draw_Point(-y + x0, -x + y0);
       Draw_Point(x + x0, -y + y0);
       Draw_Point(y + x0, -x + y0);
       y++;
       
       if (radiusError < 0) {
           radiusError += 2 * y + 1;
       }
       else {
           x--;
           radiusError+= 2 * (y - x + 1);
       }
   }
};


var Draw_Line = function (x1, y1, x2, y2) {
   var dy = y2-y1;
   var dx = x2-x1;
   var d = dy-(dx/2);
   var x = x1;
   var y = y1;
   Draw_Point(x, y);
   while(x < x2){
       x++;
       if( d < 0){
           d = d+ dy;
       }
       else{
           d += (dy-dx);
           y++
       }

       Draw_Point(x, y);
   }
   
   
};


var Plot_Ecllipse = function (xc, yc, x, y) {
   Draw_Point(xc+x, yc + y);
   Draw_Point(xc+x, yc - y);
   Draw_Point(xc-x, yc + y);
   Draw_Point(xc-x, yc - y);

   
};

var Draw_Ecllipse = function (xc, yc, width, height) {
    var rxsq = width * width;
    var rysq = height * height;
    var rx2 = 4*rxsq;
    var ry2 = 4 * rysq;
    var x = 0;
    var y = 0;
    var P = 0;
    for (x = 0, y = height, P = 2*rysq+rxsq*(1-2*height); rysq*x <= rxsq*y; x++)
    {
        Plot_Ecllipse(xc, yc, x, y);
        if (P >= 0)
        {
            P += rx2 * (1 - y);
            y--;
        }
        P += rysq * ((4 * x) + 6);
    }
    for (x = width, y = 0, P = 2*rxsq+rysq*(1-2*width); rxsq*y <= rysq*x; y++)
    {
        Plot_Ecllipse(xc, yc, x, y);
        if (P >= 0)
        {
            P += ry2 * (1 - x);
            x--;
        }
        P += rxsq * ((4 * y) + 6);
    }

};



var Draw_Rectangle = function (x, y, length, height){
    Line_Segment(x, y, x+length, y);
    Line_Segment(x, y, x, y+height);
    Line_Segment(x+length, y, x+length, y+height);
    Line_Segment(x, y+height, x+length, y+height);

};

var Line_Segment = function (x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    var steps;
    if (Math.abs(dx) > Math.abs(dy)){
        steps = Math.abs(dx);
    }else{
        steps = Math.abs(dy);
    }
    var x_inc = dx / steps;
    var y_inc = dy / steps;
    var x = x1;
    var y = y1;
    for(i = 0; i < steps; i++){
        x += x_inc;
        y += y_inc;
        Draw_Point(x, y);
    }//end for loop

};





var Draw_Polygon = function (x_1, y_1, x_2, y_2){
    var x1 = x_1;
    var y1 = y_1;
    var x2 = x_2;
    var y12= y_2;
    if(x_1>x_2){
     x1=x_2;
     y1=y_2;

     x2=x_1;
     y2=y_1;
    }
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    

};
















