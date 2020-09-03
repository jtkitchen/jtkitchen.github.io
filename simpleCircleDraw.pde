//Idea and the base code inspiring this:
//https://cs.nyu.edu/~kapp/cs101/processing_on_the_web/


Ball [] theBalls = new Ball[1000];

int maxBalls = 1000;
int numBalls = 0;
int currentBall = 0;

void setup() 
{
  // general setup
  size (300,400);
  smooth();
}

void draw() 
{
  // clear background
  background(255);
  
  // if the user clicks we should create a ball
  if (mousePressed)
  {
    // create a ball at this position
    theBalls[ currentBall ] = new Ball(this, mouseX, mouseY);
    
    // increase to keep track of the next ball
    currentBall++;
    
    // also increase our total balls used, if necessary
    if (numBalls < theBalls.length)
    {
      numBalls++;
    }
    
    // did we just use our last slot? if so, we can reuse old slots
    if (currentBall >= theBalls.length)
    {
      currentBall = 0;
    }
  }
  
  // move and draw all balls that have been created
  for (int i = 0; i < numBalls; i++)
  {
    theBalls[i].fade();
    theBalls[i].display();
  }
}

class Ball
{
  // instance vars
  private float x;
  private float y;
  private float size;
  private float myRed;
  private float myGreen;
  private float myBlue;
  private float myAlpha;
  
  // store a reference to the canvas
  private PApplet canvas;
  
  Ball(PApplet canvas, float x, float y)
  {
    // store a ref to the canvas
    this.canvas = canvas;
  
    // store x and y
    this.x = x-50;
    this.y = y-50;
    
    // randomize our size
    size = this.canvas.random(10,25);
    
    // randomize our color
    myRed = this.canvas.random(0,170);
    myGreen = this.canvas.random(0,170);
    myBlue = this.canvas.random(0,170);
    myAlpha = 255;

  }
  
  void display() {
      this.canvas.noStroke();
      this.canvas.fill(myRed, myGreen, myBlue, myAlpha);
      this.canvas.ellipse(x, y, size, size);
  }
  
  void fade() {
    if (myAlpha > 0) {
      myAlpha -= .5;
    } else {
      myAlpha = 0;
    }
  }
}
