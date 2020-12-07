  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // GLSL programs
  let generalProgram;
  let textureProgram;
  
  let myTexture;

  // VAOs for the objects
  var bigMoon = null;
  var smallMoon = null;
  var sky = null;
  var water = null;
  var skyscraper = null;

  var bridgeRoad = null;
  var bridgeTowerLeft = null;
  var bridgeTowerRight = null;
  var bridgeWireLeft = null;
  var bridgeWireRight = null;
  var bridgeWireOutsideLeft = null;
  var bridgeWireOutsideRight = null;
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
    water = new Cube( 30 );
    skyscraper = new Cube( 40 );
    
    bridgeRoad = new Cube( 30 );
    bridgeTowerLeft = new Cube( 40 );
    bridgeTowerRight = new Cube( 40 );
    bridgeWireLeft = new Cylinder( 20, 20 );
    bridgeWireRight = new Cylinder( 20, 20 );
    bridgeWireOutsideRight = new Cylinder( 20, 20 );
    bridgeWireOutsideLeft = new Cylinder( 20, 20 );
    
    bigMoon.VAO = bindVAO (bigMoon, textureProgram);
    smallMoon.VAO = bindVAO( smallMoon, generalProgram );
    sky.VAO = bindVAO( sky, generalProgram );
    water.VAO = bindVAO( water, generalProgram );
    skyscraper.VAO = bindVAO( skyscraper, generalProgram );
    
    bridgeRoad.VAO = bindVAO( bridgeRoad, generalProgram );
    bridgeTowerLeft.VAO = bindVAO( bridgeTowerLeft, generalProgram );
    bridgeTowerRight.VAO = bindVAO( bridgeTowerRight, generalProgram );
    bridgeWireLeft.VAO = bindVAO( bridgeWireLeft, generalProgram );
    bridgeWireRight.VAO = bindVAO( bridgeWireRight, generalProgram );
    bridgeWireOutsideLeft.VAO = bindVAO( bridgeWireOutsideLeft, generalProgram );
    bridgeWireOutsideRight.VAO = bindVAO( bridgeWireOutsideRight, generalProgram );
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
    myTexture = gl.createTexture();
    
    // load the actual image
    var worldImage = document.getElementById ('world-texture')
    worldImage.crossOrigin = "";
        
    // bind the texture so we can perform operations on it
    gl.bindTexture(gl.TEXTURE_2D, myTexture );
    
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, worldImage.width, worldImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, worldImage);
    
    // set texturing parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
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
        
        let bridgeRoadMatrix = glMatrix.mat4.create();
        let bridgeTowerLeftMatrix = glMatrix.mat4.create();
        let bridgeTowerRightMatrix = glMatrix.mat4.create();
        let bridgeWireLeftMatrix = glMatrix.mat4.create();
        let bridgeWireRightMatrix = glMatrix.mat4.create();
        let bridgeWireOutsideRightMatrix  = glMatrix.mat4.create();
        let bridgeWireOutsideLeftMatrix = glMatrix.mat4.create();
        
        // which program are we using
        var program = generalProgram;
        // set up your uniform variables for drawing
        gl.useProgram (program);
        
        //Big Moon
//        
//        var mScale = 40;
//        transformMatrix(bigMoonMatrix, bigMoonMatrix, 't', -20, 4, 60, 0);
//        transformMatrix(bigMoonMatrix, bigMoonMatrix, 's', mScale, mScale, 5, 0);
//        //Bind the VAO and draw
//        gl.uniformMatrix4fv (program.uModelT, false, bigMoonMatrix);
//        gl.bindVertexArray(bigMoon.VAO);
//        gl.drawElements(gl.TRIANGLES, bigMoon.indices.length, gl.UNSIGNED_SHORT, 0);
        
        
        
        //Sky background
        var mScale = 90;
        transformMatrix(skyMatrix, skyMatrix, 't', 0, 0, 60, 0);
        transformMatrix(skyMatrix, skyMatrix, 's', mScale, mScale, 2, 0);
        //Bind the VAO and draw
        gl.uniformMatrix4fv (program.uModelT, false, skyMatrix);
        gl.bindVertexArray(sky.VAO);
        gl.drawElements(gl.TRIANGLES, sky.indices.length, gl.UNSIGNED_SHORT, 0);
        
        //Water
        var mScale = 4;
        
        transformMatrix(waterMatrix, waterMatrix, 't', 0, -4.4, 0, 0);
        transformMatrix(waterMatrix, waterMatrix, 's', 120, .1, 20, 0);

        //Bind the VAO and draw
        gl.uniformMatrix4fv (program.uModelT, false, waterMatrix);
        gl.bindVertexArray(water.VAO);
        gl.drawElements(gl.TRIANGLES, water.indices.length, gl.UNSIGNED_SHORT, 0);
        
        
        
        //*************** Draw Bridge *********************************************
        var vScale = .2;
        var hScale = 20
        transformMatrix( bridgeRoadMatrix, bridgeRoadMatrix, "s", hScale, vScale, 2, 0 );
        transformMatrix( bridgeRoadMatrix, bridgeRoadMatrix, 't', 0, -12, 0, 0 );
        
        gl.uniformMatrix4fv (program.uModelT, false, bridgeRoadMatrix);
        gl.bindVertexArray(bridgeRoad.VAO);
        gl.drawElements(gl.TRIANGLES, bridgeRoad.indices.length, gl.UNSIGNED_SHORT, 0);
        
        transformMatrix( bridgeRoadMatrix, bridgeTowerLeftMatrix, 's', .07, 40, .5, 0);
        transformMatrix( bridgeTowerLeftMatrix, bridgeTowerLeftMatrix, 't', 3, 0, 0, 0);
        transformMatrix( bridgeTowerLeftMatrix, bridgeTowerLeftMatrix, 'ry', 0, 0, 0, radians(100) );
        
        gl.uniformMatrix4fv (program.uModelT, false, bridgeTowerLeftMatrix);
        gl.bindVertexArray(bridgeTowerLeft.VAO);
        gl.drawElements(gl.TRIANGLES, bridgeTowerLeft.indices.length, gl.UNSIGNED_SHORT, 0);
        
        transformMatrix( bridgeRoadMatrix, bridgeTowerRightMatrix, 's', .07, 40, .5, 0);
        transformMatrix( bridgeTowerRightMatrix, bridgeTowerRightMatrix, 't', -3, 0, 0, 0);
        transformMatrix( bridgeTowerRightMatrix, bridgeTowerRightMatrix, 'ry', 0, 0, 0, radians(80) );
        
        gl.uniformMatrix4fv (program.uModelT, false, bridgeTowerRightMatrix);
        gl.bindVertexArray(bridgeTowerRight.VAO);
        gl.drawElements(gl.TRIANGLES, bridgeTowerRight.indices.length, gl.UNSIGNED_SHORT, 0);
        
        transformMatrix( bridgeWireRightMatrix, bridgeWireRightMatrix, 't', -1.5, -.4, -.7, 0);
        transformMatrix( bridgeWireRightMatrix, bridgeWireRightMatrix, 'rz', 0, 0, 0, radians(45) );
        transformMatrix( bridgeWireRightMatrix, bridgeWireRightMatrix, 's', .1, 5, .1 )
        
        
        gl.uniformMatrix4fv (program.uModelT, false, bridgeWireRightMatrix);
        gl.bindVertexArray(bridgeWireRight.VAO);
        gl.drawElements(gl.TRIANGLES, bridgeWireRight.indices.length, gl.UNSIGNED_SHORT, 0);
        
        transformMatrix( bridgeWireLeftMatrix, bridgeWireLeftMatrix, 't', 1.5, -.4, -.7, 0);
        transformMatrix( bridgeWireLeftMatrix, bridgeWireLeftMatrix, 'rz', 0, 0, 0, radians(-45) );
        transformMatrix( bridgeWireLeftMatrix, bridgeWireLeftMatrix, 's', .1, 5, .1 )
        
        
        gl.uniformMatrix4fv (program.uModelT, false, bridgeWireLeftMatrix);
        gl.bindVertexArray(bridgeWireLeft.VAO);
        gl.drawElements(gl.TRIANGLES, bridgeWireLeft.indices.length, gl.UNSIGNED_SHORT, 0);
        
        transformMatrix( bridgeWireOutsideLeftMatrix, bridgeWireOutsideLeftMatrix, 't', 6.4, -.4, -.7, 0);
        transformMatrix( bridgeWireOutsideLeftMatrix, bridgeWireOutsideLeftMatrix, 'rz', 0, 0, 0, radians(45) );
        transformMatrix( bridgeWireOutsideLeftMatrix, bridgeWireOutsideLeftMatrix, 's', .1, 5, .1 )
        
        
        gl.uniformMatrix4fv (program.uModelT, false, bridgeWireOutsideLeftMatrix);
        gl.bindVertexArray(bridgeWireOutsideLeft.VAO);
        gl.drawElements(gl.TRIANGLES, bridgeWireOutsideLeft.indices.length, gl.UNSIGNED_SHORT, 0);
        
        transformMatrix( bridgeWireOutsideRightMatrix, bridgeWireOutsideRightMatrix, 't', -6.4, -.4, -.7, 0);
        transformMatrix( bridgeWireOutsideRightMatrix, bridgeWireOutsideRightMatrix, 'rz', 0, 0, 0, radians(-45) );
        transformMatrix( bridgeWireOutsideRightMatrix, bridgeWireOutsideRightMatrix, 's', .1, 5, .1 )
        
        
        gl.uniformMatrix4fv (program.uModelT, false, bridgeWireOutsideRightMatrix);
        gl.bindVertexArray(bridgeWireOutsideRight.VAO);
        gl.drawElements(gl.TRIANGLES, bridgeWireOutsideRight.indices.length, gl.UNSIGNED_SHORT, 0);
         //**************************************************************************
    }

  function drawMoonShape() {
        
        var program = textureProgram;
        // set up your uniform variables for drawing
        gl.useProgram (program);
        
        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, myTexture);
        gl.uniform1i (program.uTheTexture, 0);

        //Bind the VAO and draw
        gl.bindVertexArray(bigMoon.VAO);
        gl.drawElements(gl.TRIANGLES, bigMoon.indices.length, gl.UNSIGNED_SHORT, 0);
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
      textureProgram = initProgram( "vertex-shader", "texture-F" );
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
      

      
      if( program == generalProgram ) {
        // create and bind bary buffer
        let myNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, myNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(program.aNormal);
        gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
      } else if( program == textureProgram ) {
        let uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(program.aUV);
        gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
      }
      
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

function setUpPhong(program, color) {
    

    // Recall that you must set the program to be current using
    // the gl useProgram function
    gl.useProgram (program);
    
    //
    // set values for all your uniform variables
    // including the model transform
    // but not your view and projection transforms as
    // they are set in setUpCamera()
    //
    
    //var lightPos = [-20, 6, 50];
    var lightPos = [-20, 10, 48];
    var ambLight = [.1, .6, .4];
    //var lightClr = [.1, .9, .9];
    var lightClr = [color[0], color[1], color[2]];
    var baseClr = [.1, .2, .3];
    var specHighlightClr = [.2, .2, .2];
    var Ka = .7;
    var Kd = 1.3;
    var Ks = .4;
    var Ke = .4;
    
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
    program.aUV = gl.getAttribLocation( program, 'aUV');
      
      
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
    drawMoonShape();

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
      
    setUpTextures();
      
    setUpCamera(generalProgram);
//    setUpCamera(textureProgram);
      
    // set up Phong parameters
    setUpPhong(generalProgram, [.1, .9, .9]);
//    setUpPhong(textureProgram, [.7,.1,.2]);
    
    // do a draw
    draw();
  }
