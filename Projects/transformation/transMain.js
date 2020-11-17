  'use strict';

  // Global variables that are set and used
  // across the application
  let gl, program;
  
  // Global declarations of objects that you will be drawing
  var myTeapot = null;
  var teapotColumn = null;
  var teapotBase = null;
  var teapotTop = null;

  var mySphere = null;
  var sphereColumn = null;
  var sphereBase = null;
  var sphereTop = null;

  var myCone = null;
  var coneColumn = null;
  var coneBase = null;
  var coneTop = null;

//
// A function that creates shapes to be drawn and creates a VAO for each
//
// We start you out with an example for the teapot.
//
function createShapes() {
    var pedestalRes = 10;
    var sphereRes = 20;
    var coneRes = 20;
    
    myTeapot = new Teapot();
    teapotColumn = new Cylinder(pedestalRes, pedestalRes);
    teapotBase = new Cube( pedestalRes );
    teapotTop = new Cube( pedestalRes );
    
    myTeapot.VAO = bindVAO (myTeapot);
    teapotColumn.VAO = bindVAO( teapotColumn );
    teapotTop.VAO = bindVAO( teapotTop );
    teapotBase.VAO = bindVAO( teapotBase );
    
    mySphere = new Sphere( sphereRes, sphereRes );
    sphereColumn = new Cylinder(pedestalRes, pedestalRes);
    sphereBase = new Cube( pedestalRes );
    sphereTop = new Cube( pedestalRes );
   
    mySphere.VAO = bindVAO ( mySphere );
    sphereColumn.VAO = bindVAO( sphereColumn );
    sphereTop.VAO = bindVAO( sphereTop );
    sphereBase.VAO = bindVAO( sphereBase );
    
    myCone = new Cone(coneRes, coneRes);
    coneColumn = new Cylinder(pedestalRes, pedestalRes);
    coneBase = new Cube( pedestalRes );
    coneTop = new Cube( pedestalRes );
    
    myCone.VAO = bindVAO ( myCone );
    coneColumn.VAO = bindVAO( coneColumn );
    coneTop.VAO = bindVAO( coneTop );
    coneBase.VAO = bindVAO( coneBase );
}


//
// Set up your camera and your projection matrices
//
function setUpCamera() {
    
    // set up your projection
    // defualt is orthographic projection
    let projMatrix = glMatrix.mat4.create();
    //glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
    glMatrix.mat4.perspective(projMatrix, radians(60), 1, 5, 100);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    
    // set up your view
    // defaut is at (0,0,-5) looking at the origin
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 3, -11], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
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
// Use this function to draw all of your shapes.
// Recall that VAOs should have been set up the call to createShapes()
// You'll have to provide a Model Matrix for each shape to be drawn that
// places the object in the world.
//
// An example is shown for placing the teapot
//
function drawShapes() {
    //reference methods: http://glmatrix.net/docs/module-mat4.html
    
    let teapotModelMatrix = glMatrix.mat4.create();
    let teapotColumnModelMatrix = glMatrix.mat4.create();
    let teapotTopModelMatrix = glMatrix.mat4.create();
    let teapotBaseModelMatrix = glMatrix.mat4.create();
    
    let sphereModelMatrix = glMatrix.mat4.create();
    let sphereColumnModelMatrix = glMatrix.mat4.create();
    let sphereTopModelMatrix = glMatrix.mat4.create();
    let sphereBaseModelMatrix = glMatrix.mat4.create();
    
    let coneModelMatrix = glMatrix.mat4.create();
    let coneColumnModelMatrix = glMatrix.mat4.create();
    let coneTopModelMatrix = glMatrix.mat4.create();
    let coneBaseModelMatrix = glMatrix.mat4.create();

    
    //*************************************************************************
    //Sphere-- change this orienation to influence the rest...
    transformMatrix(sphereModelMatrix, sphereModelMatrix, 't', 4, .8, 0, 0);
    transformMatrix(sphereModelMatrix, sphereModelMatrix, 's', 2, 2, 2, 0);
    transformMatrix(sphereModelMatrix, sphereModelMatrix, 'rx', 0, 0, 0, radians(-90) );
    gl.uniformMatrix4fv (program.uModelT, false, sphereModelMatrix);
    gl.bindVertexArray(mySphere.VAO);
    gl.drawElements(gl.TRIANGLES, mySphere.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //Sphere Column
    transformMatrix( sphereModelMatrix, sphereColumnModelMatrix, 'rx', 0, 0, 0, radians(180) );
    transformMatrix( sphereColumnModelMatrix, sphereColumnModelMatrix, 't', 0, 0, 1.5, 0 );
    transformMatrix( sphereColumnModelMatrix, sphereColumnModelMatrix, 's', 1, 1, 2.05, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, sphereColumnModelMatrix);
    gl.bindVertexArray(sphereColumn.VAO);
    gl.drawElements(gl.TRIANGLES, sphereColumn.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //sphere Column Top
    transformMatrix( sphereModelMatrix, sphereTopModelMatrix, 'rx', 0, 0, 0, radians(180) );
    transformMatrix( sphereTopModelMatrix, sphereTopModelMatrix, 't', 0, 0, .5, 0 );
    transformMatrix( sphereTopModelMatrix, sphereTopModelMatrix, 's', 1.5, 1.5, .25, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, sphereTopModelMatrix);
    gl.bindVertexArray(sphereTop.VAO);
    gl.drawElements(gl.TRIANGLES, sphereTop.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //sphere Column Base
    transformMatrix( sphereModelMatrix, sphereBaseModelMatrix, 'rx', 0, 0, 0, radians(180) );
    transformMatrix( sphereBaseModelMatrix, sphereBaseModelMatrix, 't', 0, 0, 2.65, 0 );
    transformMatrix( sphereBaseModelMatrix, sphereBaseModelMatrix, 's', 1.5, 1.5, .25, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, sphereBaseModelMatrix);
    gl.bindVertexArray(sphereBase.VAO);
    gl.drawElements(gl.TRIANGLES, sphereBase.indices.length, gl.UNSIGNED_SHORT, 0);
    //*************************************************************************
    
    
    //*************************************************************************
    //Teapot-- did not do anything remotely hierarchical, just eyeballed it
    transformMatrix( teapotModelMatrix, teapotModelMatrix, 'ry', 0, 0, 0, radians(180) );
    gl.uniformMatrix4fv (program.uModelT, false, teapotModelMatrix);
    gl.bindVertexArray(myTeapot.VAO);
    gl.drawElements(gl.TRIANGLES, myTeapot.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //Teapot Column
    transformMatrix( teapotColumnModelMatrix, teapotColumnModelMatrix, 'rx', 0, 0, 0, radians(90) );
    transformMatrix( teapotColumnModelMatrix, teapotColumnModelMatrix, 't', 0, 0, 2.5, 0 );
    transformMatrix( teapotColumnModelMatrix, teapotColumnModelMatrix, 's', 2.2, 2.2, 4, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, teapotColumnModelMatrix);
    gl.bindVertexArray(teapotColumn.VAO);
    gl.drawElements(gl.TRIANGLES, teapotColumn.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //Teapot Column Base
    transformMatrix( teapotBaseModelMatrix,  teapotBaseModelMatrix, 't', 0, -4.5, 0, 0);
    transformMatrix( teapotBaseModelMatrix, teapotBaseModelMatrix, 's', 3, .5, 3, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, teapotBaseModelMatrix);
    gl.bindVertexArray(teapotBase.VAO);
    gl.drawElements(gl.TRIANGLES, teapotBase.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //Teapot Column Top
    transformMatrix( teapotTopModelMatrix,  teapotTopModelMatrix, 't', 0, -.25, 0, 0);
    transformMatrix( teapotTopModelMatrix, teapotTopModelMatrix, 's', 3, .5, 3, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, teapotTopModelMatrix);
    gl.bindVertexArray(teapotTop.VAO);
    gl.drawElements(gl.TRIANGLES, teapotTop.indices.length, gl.UNSIGNED_SHORT, 0);
    //*************************************************************************
    
    
        //*************************************************************************
    //Cone-- change this orienation to influence the rest...
    transformMatrix(coneModelMatrix, coneModelMatrix, 't', -4, .8, 0, 0);
    transformMatrix(coneModelMatrix, coneModelMatrix, 's', 2, 2, 2, 0);
    transformMatrix(coneModelMatrix, coneModelMatrix, 'rx', 0, 0, 0, radians(-90) );
    gl.uniformMatrix4fv (program.uModelT, false, coneModelMatrix);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //Cone Column
    transformMatrix( coneModelMatrix, coneColumnModelMatrix, 'rx', 0, 0, 0, radians(180) );
    transformMatrix( coneColumnModelMatrix, coneColumnModelMatrix, 't', 0, 0, 1.5, 0 );
    transformMatrix( coneColumnModelMatrix, coneColumnModelMatrix, 's', 1, 1, 2.05, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, coneColumnModelMatrix);
    gl.bindVertexArray(coneColumn.VAO);
    gl.drawElements(gl.TRIANGLES, coneColumn.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //Cone Column Top
    transformMatrix( coneModelMatrix, coneTopModelMatrix, 'rx', 0, 0, 0, radians(180) );
    transformMatrix( coneTopModelMatrix, coneTopModelMatrix, 't', 0, 0, .5, 0 );
    transformMatrix( coneTopModelMatrix, coneTopModelMatrix, 's', 1.5, 1.5, .25, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, coneTopModelMatrix);
    gl.bindVertexArray(coneTop.VAO);
    gl.drawElements(gl.TRIANGLES, coneTop.indices.length, gl.UNSIGNED_SHORT, 0);
    
    //Cone Column Base
    transformMatrix( coneModelMatrix, coneBaseModelMatrix, 'rx', 0, 0, 0, radians(180) );
    transformMatrix( coneBaseModelMatrix, coneBaseModelMatrix, 't', 0, 0, 2.65, 0 );
    transformMatrix( coneBaseModelMatrix, coneBaseModelMatrix, 's', 1.5, 1.5, .25, 0 );
    gl.uniformMatrix4fv (program.uModelT, false, coneBaseModelMatrix);
    gl.bindVertexArray(coneBase.VAO);
    gl.drawElements(gl.TRIANGLES, coneBase.indices.length, gl.UNSIGNED_SHORT, 0);
    //*************************************************************************
    
}

///////////////////////////////////////////////////////////////////
//
//   You shouldn't have to edit below this line
//
///////////////////////////////////////////////////////////////////

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
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  // Create a program with the appropriate vertex and fragment shaders
  function initProgram() {
    const vertexShader = getShader('vertex-shader');
    const fragmentShader = getShader('fragment-shader');

    // Create a program
    program = gl.createProgram();
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
    }

    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aBary = gl.getAttribLocation(program, 'bary');
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
  }

  // creates a VAO and returns its ID
  function bindVAO (shape) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 4, gl.FLOAT, false, 0, 0);
      
      // create and bind bary buffer
      let myBaryBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.bary), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aBary);
      gl.vertexAttribPointer(program.aBary, 3, gl.FLOAT, false, 0, 0);
      
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

  
  // We call draw to render to our canvas
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


    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
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
    initProgram();
    
    // create and bind your current object
    createShapes();
    
    // set up your camera
    setUpCamera();
    
    // do a draw
    draw();
  }
