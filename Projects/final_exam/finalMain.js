  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // GLSL programs
  let generalProgram;

  // VAOs for the objects
  var bigMoon = null;
  var smallMoon = null;
  var sky = null;
  var water = null;
  var skyscraper = null;

  // textures

  // rotation
 
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {

    
    bigMoon = new Sphere( 40, 40);
    smallMoon = new Sphere( 40, 40);
    sky = new Cube( 30 );
    water = new Cylinder( 30, 30 );
    skyscraper = new Cube( 40 );
    
    bigMoon.VAO = bindVAO (bigMoon, generalProgram);
    smallMoon.VAO = bindVAO( smallMoon, generalProgram );
    sky.VAO = bindVAO( sky, generalProgram );
    water.VAO = bindVAO( water, generalProgram );
    skyscraper.VAO = bindVAO( skyscraper, generalProgram );
}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
    
    gl.useProgram (program);
    
    // set up your projection
    let projMatrix = glMatrix.mat4.create();
    //glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
    glMatrix.mat4.perspective(projMatrix, radians(60), 1, 5, 100);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);
    
    // set up your view
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 3, -10], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(){
    
    // flip Y for WebGL
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
    
    // get some texture space from the gpu
    
    // load the actual image
    var worldImage = document.getElementById ('')
    worldImage.crossOrigin = "";
        
    // bind the texture so we can perform operations on it
        
    // load the texture data
        
    // set texturing parameters
}

//helper function for multiplying matrices in order
function transformMatrix( matIn, matOut, type, x, y, z, rad ) {
    let transform = glMatrix.mat4.create();
    
    if( type == 's' ) {
        glMatrix.mat4.scale( matOut, matIn, [x, y, z] );
    } else if ( type == 't' ) {
        glMatrix.mat4.translate( matOut, matIn, [x, y, z]);
    } else if( type == 'rx' ) {
        glMatrix.mat4.rotateX( matOut, matIn, rad );
    } else if( type == 'ry' ) {
        glMatrix.mat4.rotateY( matOut, matIn, rad );
    } else if( type == 'rz' ) {
        glMatrix.mat4.rotateZ( matOut, matIn, rad );
    }
    return matOut;
}

//
//  This function draws all of the shapes required for your scene
//
    function drawShapes() {
        let bigMoonMatrix = glMatrix.mat4.create();
        let skyMatrix = glMatrix.mat4.create();
        let waterMatrix = glMatrix.mat4.create();
        
        // which program are we using
        var program = generalProgram;
        // set up your uniform variables for drawing
        gl.useProgram (program);
        
        //Big Moon
        var mScale = 20;
        transformMatrix(bigMoonMatrix, bigMoonMatrix, 't', -6, 1, 40, 0);
        transformMatrix(bigMoonMatrix, bigMoonMatrix, 's', mScale, mScale, 5, 0);
        //Bind the VAO and draw
        gl.uniformMatrix4fv (program.uModelT, false, bigMoonMatrix);
        gl.bindVertexArray(bigMoon.VAO);
        gl.drawElements(gl.TRIANGLES, bigMoon.indices.length, gl.UNSIGNED_SHORT, 0);
        
        //Sky background
        var mScale = 90;
        transformMatrix(skyMatrix, skyMatrix, 't', 0, 0, 60, 0);
        transformMatrix(skyMatrix, skyMatrix, 's', mScale, mScale, 2, 0);
        //Bind the VAO and draw
        gl.uniformMatrix4fv (program.uModelT, false, skyMatrix);
        gl.bindVertexArray(sky.VAO);
        gl.drawElements(gl.TRIANGLES, sky.indices.length, gl.UNSIGNED_SHORT, 0);
        
        //Water
        var mScale = 60;
        transformMatrix( waterMatrix, waterMatrix, 'rz', 0, 0, 0, radians(90) );
        transformMatrix(waterMatrix, waterMatrix, 't', -50, 0, 20, 0);
        transformMatrix(waterMatrix, waterMatrix, 's', mScale, mScale * 2, 80, 0);
        //Bind the VAO and draw
        gl.uniformMatrix4fv (program.uModelT, false, waterMatrix);
        gl.bindVertexArray(water.VAO);
        gl.drawElements(gl.TRIANGLES, water.indices.length, gl.UNSIGNED_SHORT, 0);
    }



  //
  // Use this function to create all the programs that you need
  // You can make use of the auxillary function initProgram
  // which takes the name of a vertex shader and fragment shader
  //
  // Note that after successfully obtaining a program using the initProgram
  // function, you will beed to assign locations of attribute and unifirm variable
  // based on the in variables to the shaders.   This will vary from program
  // to program.
  //
  function initPrograms() {
      generalProgram = initProgram( "vertex-shader", "fragment-shader");
      //generalProgram = initProgram( "phong-per-fragment-V", "phong-per-fragment-F");
  }


  // creates a VAO and returns its ID
  function bindVAO (shape, program) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      
      // add code for any additional vertex attribute

      // create and bind bary buffer
        let myNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, myNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(program.aNormal);
        gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
      
      // Setting up the IBO
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      // Clean
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
  }

function setUpPhong(program) {
    

    // Recall that you must set the program to be current using
    // the gl useProgram function
    gl.useProgram (program);
    
    //
    // set values for all your uniform variables
    // including the model transform
    // but not your view and projection transforms as
    // they are set in setUpCamera()
    //
    
    /*
        I know something is wrong with the way I've done my code,
        but I have not been able to pinpoint where I have my misunderstanding...
    */
    var lightPos = [3, 3, -5];
    var ambLight = [.9, .5, 0];
    var lightClr = [.1, .9, .9];
    var baseClr = [.1, .7, .9];
    var specHighlightClr = [.2, .2, .2];
    var Ka = .7;
    var Kd = 1;
    var Ks = 1;
    var Ke = .1;
    
    gl.uniform3fv( program.ambientLight, ambLight);
    gl.uniform3fv( program.lightPosition, lightPos );
    gl.uniform3fv( program.lightColor, lightClr );
    gl.uniform3fv( program.baseColor, baseClr );
    gl.uniform1f( program.ka, Ka);
    gl.uniform1f( program.kd, Kd);
    gl.uniform1f( program.ks, Ks);
    gl.uniform1f( program.ke, Ke);
    
    
}

/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

  // Given an id, extract the content's of a shader script
  // from the DOM and return the compiled shader
  function getShader(id) {
    const script = document.getElementById(id);
    const shaderString = script.text.trim();

    // Assign shader depending on the type of shader
    let shader;
    if (script.type === 'x-shader/x-vertex') {
      shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (script.type === 'x-shader/x-fragment') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {
      return null;
    }

    // Compile the shader using the supplied shader code
    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    // Ensure the shader is valid
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Compiling shader " + id + " " + gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }
    
    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aNormal = gl.getAttribLocation(program, 'aNormal');
      
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
    program.ambientLight = gl.getUniformLocation (program, 'ambientLight');
    program.lightPosition = gl.getUniformLocation (program, 'lightPosition');
    program.lightColor = gl.getUniformLocation (program, 'lightColor');
    program.baseColor = gl.getUniformLocation (program, 'baseColor');
    program.specHighlightColor = gl.getUniformLocation (program, 'specHighlightColor');
    program.ka = gl.getUniformLocation (program, 'ka');
    program.kd = gl.getUniformLocation (program, 'kd');
    program.ks = gl.getUniformLocation (program, 'ks');
    program.ke = gl.getUniformLocation (program, 'ke');
      
    return program;
  }


  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    initPrograms();
    // create and bind your current object
    createShapes();
      
    setUpCamera(generalProgram);
      
    // set up Phong parameters
    setUpPhong(generalProgram);
    

    
    // do a draw
    draw();
  }
