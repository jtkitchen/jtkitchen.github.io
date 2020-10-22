//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {
    
    // fill in your code here.
    // delete the code below first.
//    addTriangle (-0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5);
//    addTriangle (-0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5);
    
    var offset = 1/subdivisions;
    //added to keep fractions (such as 1/3) of subdivisions from adding an extra side in the loops
    var roundError = offset - ((offset*9)/10);
    var i;
    var j;
    //Could probably abstract this to make the code shorter...
    
    //+x face ("Front")
    for( i = -.5; i < (.5 - roundError); i = i + offset) {
        for( j = -.5; j < (.5 - roundError); j = j + offset) {
            addTriangle(i, j, .5, i+offset, j+offset, .5, i, j+offset, .5);
            addTriangle(i, j, .5, i+offset, j, .5, i+offset, j+offset, .5);
        }
    }
    
    //-x face ("Back")
    for( i = -.5; i < (.5 - roundError); i = i + offset) {
        for( j = -.5; j < (.5 - roundError); j = j + offset) {
            addTriangle(i, j, -.5, i, j+offset, -.5, i+offset, j+offset, -.5);
            addTriangle(i, j, -.5, i+offset, j+offset, -.5, i+offset, j, -.5);
        }
    }
    
    //y?
    for( i = -.5; i < (.5 - roundError); i = i + offset) {
        for( j = -.5; j < (.5 - roundError); j = j + offset) {
            addTriangle(i, .5, j, i, .5, j+offset, i+offset, .5, j+offset);
            addTriangle(i, .5, j, i+offset, .5, j+offset, i+offset, .5, j);
        }
    }
    
    //y? ("bottom")
    for( i = -.5; i < (.5 - roundError); i = i + offset) {
        for( j = -.5; j < (.5 - roundError); j = j + offset) {
            addTriangle(i, -.5, j, i+offset, -.5, j+offset, i, -.5, j+offset);
            addTriangle(i, -.5, j, i+offset, -.5, j, i+offset, -.5, j+offset);
        }
    }
    
    
    //z? ("Right side")
    for( i = -.5; i < (.5 - roundError); i = i + offset) {
        for( j = -.5; j < (.5 - roundError); j = j + offset) {
            addTriangle(.5, i, j, .5, i+offset, j+offset, .5, i, j+offset);
            addTriangle(.5, i, j, .5, i+offset, j, .5, i+offset, j+offset);
        }
    }
    
    //z? ("Left side")
    for( i = -.5; i < (.5 - roundError); i = i + offset) {
        for( j = -.5; j < (.5 - roundError); j = j + offset) {
            addTriangle( -.5, i+offset, j+offset, -.5, i, j, -.5, i, j+offset);
            addTriangle( -.5, i+offset, j, -.5, i, j, -.5, i+offset, j+offset);
        }
    }
    
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    var pi = Math.PI;
    var rad = 360 * (pi/180); //360 in radians
    var circleOffset = rad / radialdivision;
    var heightOffset = 1 / heightdivision;
    var roundError = circleOffset - ((circleOffset*9)/10);
    var heightRoundError = heightOffset - ((heightOffset*9)/10);
    var i;
    var prevX;
    var prevY;
    var currentX;
    var currentY;
    
    for( i = 0; i <= (rad + roundError); i = i + circleOffset) {
        if( typeof prevX === 'undefined' && typeof prevY === 'undefined') {
            prevX = .5 * Math.cos( i );
            prevY = .5 * Math.sin( i );
        } else {
            currentX = .5 * Math.cos( i );
            currentY = .5 * Math.sin( i );
            //Add the top and bottom circles
            addTriangle( 0, 0, .5, currentX, currentY, .5, prevX, prevY, .5);
            addTriangle( 0, 0, -.5, prevX, prevY, -.5, currentX, currentY, -.5);
            
            //draw the sides at the point
            for( var j = -.5; j < (.5 - heightRoundError); j = j + heightOffset ) {
                addTriangle( currentX, currentY, j, prevX, prevY, j + heightOffset, currentX, currentY, j + heightOffset);
                addTriangle( currentX, currentY, j, prevX, prevY, j, prevX, prevY, j + heightOffset );
            }
            
            prevX = currentX;
            prevY = currentY;
        }
        
    }
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    var pi = Math.PI;
    var rad = 360 * (pi/180); //360 in radians
    var circleOffset = rad / radialdivision;
    var heightOffset = 1 / heightdivision;
    var roundError = circleOffset - ((circleOffset*9)/10);
    var heightRoundError = heightOffset - ((heightOffset*9)/10);
    var i;
    var prevX;
    var prevY;
    var currentX;
    var currentY;
    
    for( i = 0; i <= (rad + roundError); i = i + circleOffset) {
        if( typeof prevX === 'undefined' && typeof prevY === 'undefined') {
            prevX = .5 * Math.cos( i );
            prevY = .5 * Math.sin( i );
        } else {
            currentX = .5 * Math.cos( i );
            currentY = .5 * Math.sin( i );
            //Add the top and bottom circles
        
            addTriangle( 0, 0, -.5, prevX, prevY, -.5, currentX, currentY, -.5);
            
            //draw the sides at the point
            var count = heightdivision;
            for( var j = -.5; j < (.5 - heightRoundError); j = j + heightOffset ) {
                var helper1 = count/heightdivision;
                var helper2 = (count-1)/heightdivision;
                
                addTriangle( currentX * helper1, currentY * helper1, j,
                             prevX * helper2, prevY * helper2, j + heightOffset,
                             currentX * helper2, currentY * helper2, j + heightOffset);
                addTriangle( currentX * helper1, currentY * helper1, j,
                             prevX * helper1, prevY * helper1, j,
                             prevX * helper2, prevY * helper2, j + heightOffset );
                count--;
            }
            
            prevX = currentX;
            prevY = currentY;
        }
    }
}
                            
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    var pi = Math.PI;
    var rad = 360 * (pi/180); //360 in radians
    var points = [];
    
    var cols = slices;
    var rows = stacks;
    
    //Calculate all the points of the sphere
    var r = .5;
    for( var i = 0; i < cols+1; i++ ) {
        points[i] = [];
        var lat = map_range(i, 0, cols, 0, Math.PI);
        for( var j = 0; j < rows+1; j++ ) {
            var lon = map_range(j, 0, rows, 0, Math.PI * 2);
            
            var x = r * Math.sin( lat ) * Math.cos( lon );
            var y = r * Math.sin( lat ) * Math.sin( lon );
            var z = r * Math.cos( lat );
            var point = [x, y, z];
            
            points[i][j] = point;
        }
    }
    
    //iterate through the points, drawing a "rectangle" at a time.

    for( i = 0; i < cols; i++ ) {
        for( j = 0; j < rows; j++ ) {
            var topl = [ points[i][j][0], points[i][j][1], points[i][j][2] ];
            var botl = [ points[i+1][j][0], points[i+1][j][1], points[i+1][j][2] ];
            var topr = [ points[i][j+1][0], points[i][j+1][1], points[i][j+1][2] ];
            var botr = [ points[i+1][j+1][0], points[i+1][j+1][1], points[i+1][j+1][2] ];
            
            addTriangle(topl[0], topl[1], topl[2], 
                        botl[0], botl[1], botl[2],
                        topr[0], topr[1], topr[2]);
            
            addTriangle(topr[0], topr[1], topr[2],
                        botl[0], botl[1], botl[2],
                        botr[0], botr[1], botr[2]);
        }
    }
    //If anyone reads this, know that I came to the point of breaking on this section,
    //as I was getting a shope, but not a sphere. ~5 hours later (replicating this problem
    //in another language and trying three different methods of storing points), I found the solution.
    //I had typed my 'y' formula wrong, using cos(lat) * sin(lon) instead of two sin's. 
    //Ignore this if you must, but my pain must be recorded somewhere.
    
    //I need to get me a rubber duck.... it would've helped
    
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

