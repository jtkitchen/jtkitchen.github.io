


void drawNameWithLines ()
{
  // insert your code here to draw the letters of your name 
  // using only lines()
  int bottom = 125;
  int middle = 75;
  int top = 25;
  
  //J
  line(25, top, 125, top);
  line(75, top, 75, bottom);
  line(35, bottom, 75, bottom);
  line(35, bottom, 35, middle);
  
  //O
  line(135, middle, 185, middle);
  line(135, middle, 135, bottom);
  line(135, bottom, 185, bottom);
  line(185, middle, 185, bottom);
  
  //S
  int halfway = (middle+bottom)/2;
  line(195, middle, 245, middle);
  line(195, middle, 195, halfway);
  line(195, halfway, 245, halfway);
  line(245, halfway, 245, bottom);
  line(245, bottom, 195, bottom);
  
  //h
  line(255, top, 255, bottom);
  line(255, middle, 305, middle);
  line(305, middle, 305, bottom);
  
  //u
  line(315, middle, 315, bottom);
  line(315, bottom, 365, bottom);
  line(365, bottom, 365, middle);
  
  //a
  line(375, middle, 375, bottom);
  line(375, middle, 425, middle);
  line(375, bottom, 425, bottom);
  line(425, bottom, 425, middle);
  line(425, bottom, 435, bottom+5);
  
  
}

void drawNameWithTriangles ()
{
  // insert your code here to draw the letters of your name 
  // using only ltriangles()
  //triangle (34, 45, 100, 100, 12, 255);
  
  int top = 200;
  int bottom = 325;
  int middle = (bottom + top)/2;
  
  //J
  triangle( 50, top, 160, top, 105, top + 15);
  triangle( 105, top, 105, bottom, 120, middle);
  triangle( 50, (bottom + middle)/2, 105, bottom, 105, bottom - 15); 
  
  //T
  triangle( 180, top, 290, top, 235, top +  15 );
  triangle( 235, top, 242, bottom, 228, bottom);
  
  //K
  triangle( 310, top, 310, bottom, 325, middle );
  triangle( 325, middle, 365, top, 355, middle - 30);
  triangle( 325, middle, 365, bottom, 355, middle + 30);
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doLine = false;
boolean doTri = false;
color backgroundColor = color (150, 150, 150);
color lineColor = color (0, 0, 0);
color fillColor = color (255, 0, 0);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  if (doLine) stroke(lineColor); else stroke (backgroundColor);
  drawNameWithLines();
  
  if (doTri) {
     fill(fillColor);
     stroke(fillColor);
  }
  else {
    fill(backgroundColor);
    stroke(backgroundColor);
  }
  drawNameWithTriangles();
}

void keyPressed()
{
  if (key == 'l') doLine = !doLine;
  if (key == 't') doTri = !doTri;
  if (key == 'q') exit();
}