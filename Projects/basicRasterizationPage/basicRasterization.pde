
void myLine (int x1, int y1, int x2, int y2)
{
  // insert your code here to draw a line from (x1, y1) to (x2, y2) 
  // using only calls to point().
  //F(x,y) = ax + by + c = 0 (<0 is above the line, >0 is below the line)
  //a = dy, b = -dx, c = dx * B
  //dy = delta y, dx = delta x
  
  int dx = x2 - x1;
  int dy = y2 - y1;
  
  float dxFloat = float(dx);
  float dyFloat = float(dy);
  float slope;
  int d = (2 * dy) - dx;
  if( dx != 0 ) {
    slope = dyFloat/dxFloat;
  } else {
    slope = 0;
  }
  
  
  if( x1 == x2 ) {
    for( int i = min(y1, y2); i <= max(y1, y2); i++) {
      point(x1, i);
    }
  } else if( y1 == y2 ) {
    for( int i = min(x1, x2); i <= max(x1, x2); i++) {
      point( i, y1 );
    }
  } else if( slope <= 1.0 && slope > 0.0 ) {
    int y = y1;
    for( int x = x1 + 1; x <= x2; x++ ) {
      point(x, y);
      if( d < 0 ) {
        //East
        d += dy;
      } else {
        //North East
        d += (dy - dx);
        ++y;
      }
    }
  } else if( slope >= -1.0 && slope < 0 ) {
    int tempy = y1; y1 = y2; y2 = tempy;
    int tempx = x1; x1 = x2; x2 = tempx;
    dx = x2 - x1;
    dy = y2 - y1;
    
    int y = y2;
    for( int x = min(x1, x2); x <= max(x1, x2); x++ ) {
      point(x, y);
      if( d < 0 ) {
        //East
        d += dy;
      } else {
        //North East
        d += (dy + dx);
        --y;
      }
    }    
  } else if( slope > 1 ) {
    for( int y = y1 + 1; y <= y2; y++ ) {
      point(x1, y);
      if( d < 0 ) {
        //East
        d += dx;
      } else {
        //North East
        d += (dx - dy);
        ++x1;
      }
    }
  } else if( slope < -1 ) {
    for( int y = y1 + 1; y <= y2; y++ ) {
      point(x1, y);
      if( d > 0 ) {
        //East
        d += dx;
      } else {
        //North East
        d += (dx + dy);
        --x1;
      }
    }
  }
  // your code should implement the Midpoint algorithm
}

int edgeFunction( int px, int py, int v1_x, int v1_y, int v2_x, int v2_y ) {
  int sign = 0;
  sign = (px - v1_x) * (v2_y - v1_y) - (py - v1_y) * (v2_x - v1_x);

  return sign;
}

boolean isTopLeft( int x0, int y0, int x1, int y1, int x2, int y2 ) {
  boolean isTopLeft = false;
  float dx = x1 - x0;
  float dy = y1 - y0;
  float slope;
  if( dx != 0 ) {
    slope = dy/dx;
  } else {
    slope = 0;
  }
  
  if( slope != 0 ) {
    //println(edgeFunction(x2, y2, x0, y0, x1, y1));
    if( y1 < y0 ) {
       isTopLeft = true; 
    }
  } else if( slope == 0 && x0 == x1 ) {
    //println(edgeFunction(x2, y2, x0, y0, x1, y1));
    if( y1 < y0 ) {
        isTopLeft = true;
    }
  } else if( slope == 0 && y0 == y1 ) {
    //println(edgeFunction(x2, y2, x0, y0, x1, y1));
    if( x1 > x0 ) {
        isTopLeft = true;
    }
  } else {
    isTopLeft = false;
    println("You shouldn't be here...");
  }
  return isTopLeft;
}


void myTriangle (int x0, int y0, int x1, int y1, int x2, int y2)
{  
  //arranges lines so that they are "clockwise" in reference
  if( edgeFunction(x2, y2, x0, y0, x1, y1) < 0 ) {
      int tempx = x1;
      int tempy = y1;
      x1 = x2;
      y1 = y2;
      x2 = tempx;
      y2 = tempy;
  }
  
  int bias1 = isTopLeft(x0, y0, x1, y1, x2, y2) ? 0 : -1; 
  int bias2 = isTopLeft(x1, y1, x2, y2, x0, y0) ? 0 : -1;
  int bias3 = isTopLeft(x2, y2, x0, y0, x1, y1) ? 0 : -1;

  int v1;
  int v2;
  int v3;
  
  for( int i = min(x0, x1, x2); i <= max(x0, x1, x2); i++ ) {
    for( int j = min(y0, y1, y2); j <= max(y0, y1, y2); j++) {
      v1 = edgeFunction( i, j, x0, y0, x1, y1 ) + bias1;
      v2 = edgeFunction( i, j, x1, y1, x2, y2 ) + bias2;
      v3 = edgeFunction( i, j, x2, y2, x0, y0 ) + bias3;
      if(  v1 >= 0  &&
           v2 >= 0  &&
           v3 >= 0 ) {
        point( i, j );
      }
    }
  }
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doMine = true;
int scene = 1;
color backgroundColor = color (150, 150, 150);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  fill (0,0,0);
    if (doMine) text ("my solution", 20, 475);
    else text ("reference", 20, 475);
    
  if (scene == 1) doLines();
  if (scene == 2) doHouse();
  
}

void doHouse()
{
  if (!doMine) {
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (200, 300, 300, 200, 200, 200);
    triangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 255);
    stroke (0,0,255);
    triangle (200,200, 300, 200, 250, 150);
    stroke (0,255,0);
    fill (0,255,0);
    triangle (250, 300, 275, 300, 250, 250);
    triangle (275, 300, 275, 250, 250, 250);
  }
  else {
    fill (128, 0, 0);
    stroke (128,0,0);
    myTriangle (200, 300, 300, 200, 200, 200);
    myTriangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 128);
    stroke (0,0,128);
    myTriangle (200,200, 300, 200, 250, 150);
    stroke (0,128,0);
    fill (0,128,0);
    myTriangle (250, 300, 275, 300, 250, 250);
    myTriangle (275, 300, 275, 250, 250, 250);
  }
}

void doLines()
{
  if  (!doMine) {
    stroke (255, 255, 255);
    line (50, 250, 450, 250);
    line (250, 50, 250, 450);
    line (50, 450, 450, 50);
    line (50, 50, 450, 450);
  }
  else {
    stroke (0, 0, 200);
    myLine (50, 250, 450, 250);
    myLine (250, 50, 250, 450);
    myLine (50, 450, 450, 50);
    myLine (50, 50, 450, 450);
    //Added test lines to check:
    myLine( 50, 150, 450, 350); //"negative" slope
    myLine( 50, 350, 450, 150); //"positive" slope
    myLine( 150, 50, 350, 450); //"negative" large slope (>1)
    myLine( 350, 50, 150, 450); //"positive" large slope (<-1)
                                //visually contradictory due to axis chosen
  }
}

void keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
  
  if (key == 'm') 
  {
    background (backgroundColor);
    doMine = !doMine;
  }
  
  if (key == 'q') exit();
}