class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
} 

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
        
            var offset = 1/subdivisions;
        //added to keep fractions (such as 1/3) of subdivisions from adding an extra side in the loops
        var roundError = offset - ((offset*9)/10);
        var i;
        var j;
        //Could probably abstract this to make the code shorter...

        //+x face ("Front")
        for( i = -.5; i < (.5 - roundError); i = i + offset) {
            for( j = -.5; j < (.5 - roundError); j = j + offset) {
                this.addTriangle(i, j, .5, i+offset, j+offset, .5, i, j+offset, .5);
                this.addTriangle(i, j, .5, i+offset, j, .5, i+offset, j+offset, .5);
            }
        }

        //-x face ("Back")
        for( i = -.5; i < (.5 - roundError); i = i + offset) {
            for( j = -.5; j < (.5 - roundError); j = j + offset) {
                this.addTriangle(i, j, -.5, i, j+offset, -.5, i+offset, j+offset, -.5);
                this.addTriangle(i, j, -.5, i+offset, j+offset, -.5, i+offset, j, -.5);
            }
        }

        //y?
        for( i = -.5; i < (.5 - roundError); i = i + offset) {
            for( j = -.5; j < (.5 - roundError); j = j + offset) {
                this.addTriangle(i, .5, j, i, .5, j+offset, i+offset, .5, j+offset);
                this.addTriangle(i, .5, j, i+offset, .5, j+offset, i+offset, .5, j);
            }
        }

        //y? ("bottom")
        for( i = -.5; i < (.5 - roundError); i = i + offset) {
            for( j = -.5; j < (.5 - roundError); j = j + offset) {
                this.addTriangle(i, -.5, j, i+offset, -.5, j+offset, i, -.5, j+offset);
                this.addTriangle(i, -.5, j, i+offset, -.5, j, i+offset, -.5, j+offset);
            }
        }


        //z? ("Right side")
        for( i = -.5; i < (.5 - roundError); i = i + offset) {
            for( j = -.5; j < (.5 - roundError); j = j + offset) {
                this.addTriangle(.5, i, j, .5, i+offset, j+offset, .5, i, j+offset);
                this.addTriangle(.5, i, j, .5, i+offset, j, .5, i+offset, j+offset);
            }
        }

        //z? ("Left side")
        for( i = -.5; i < (.5 - roundError); i = i + offset) {
            for( j = -.5; j < (.5 - roundError); j = j + offset) {
                this.addTriangle( -.5, i+offset, j+offset, -.5, i, j, -.5, i, j+offset);
                this.addTriangle( -.5, i+offset, j, -.5, i, j, -.5, i+offset, j+offset);
            }
        }
    }
}



class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        
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
                this.addTriangle( 0, 0, .5, currentX, currentY, .5, prevX, prevY, .5);
                this.addTriangle( 0, 0, -.5, prevX, prevY, -.5, currentX, currentY, -.5);

                //draw the sides at the point
                for( var j = -.5; j < (.5 - heightRoundError); j = j + heightOffset ) {
                    this.addTriangle( currentX, currentY, j, prevX, prevY, j + heightOffset, currentX, currentY, j + heightOffset);
                    this.addTriangle( currentX, currentY, j, prevX, prevY, j, prevX, prevY, j + heightOffset );
                }

                prevX = currentX;
                prevY = currentY;
            }

        }
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
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

                this.addTriangle( 0, 0, -.5, prevX, prevY, -.5, currentX, currentY, -.5);

                //draw the sides at the point
                var count = heightdivision;
                for( var j = -.5; j < (.5 - heightRoundError); j = j + heightOffset ) {
                    var helper1 = count/heightdivision;
                    var helper2 = (count-1)/heightdivision;

                    this.addTriangle( currentX * helper1, currentY * helper1, j,
                                 prevX * helper2, prevY * helper2, j + heightOffset,
                                 currentX * helper2, currentY * helper2, j + heightOffset);
                    this.addTriangle( currentX * helper1, currentY * helper1, j,
                                 prevX * helper1, prevY * helper1, j,
                                 prevX * helper2, prevY * helper2, j + heightOffset );
                    count--;
                }

                prevX = currentX;
                prevY = currentY;
            }
        }
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
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

                this.addTriangle(topl[0], topl[1], topl[2], 
                            botl[0], botl[1], botl[2],
                            topr[0], topr[1], topr[2]);

                this.addTriangle(topr[0], topr[1], topr[2],
                            botl[0], botl[1], botl[2],
                            botr[0], botr[1], botr[2]);
            }
        }
    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

