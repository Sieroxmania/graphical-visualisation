window.onload = function () {
  var canvas = document.getElementById('triangleFigure');
  var gl = canvas.getContext('webgl');


  /*======== Defining and storing the geometry ===========*/

  // START Aufgabe 3 - Vertices, Indices and Color
  var vertices = new Float32Array([
    //Symbol
    -0.5, 0, 0, //0
    0, 1, 0,    //1
    0.5, 0, 0,  //2
    1,-1,0,   //3
    0,-1,0,   //4
    -1,-1,0,  //5

    //Shield - Border
    0,3.5,0, //6
    2,2,0, //7
    2.5,1,0, //8
    2,-2,0, //9
    1.25,-3.25,0, //10
    0,-4,0, //11
    -1.25,-3.25,0, //12
    -2,-2,0, //13
    -2.5,1,0,//14
    -2,2,0,//14
  ]);

  var indices = new Uint16Array([
    0,1,2,
    0,5,4,
    0,2,4,
    4,3,2,
    
    1,6,7,
    1,7,2,
    2,8,7,
      
    2,8,9,
    2,9,3,
    3,9,10,
    3,10,11,
    3,11,4,

    4,11,5,
    5,11,12,
    5,12,13,
    5,13,0,

    0,13,14,
    0,14,15,
    0,15,1,
    1,15,6,1
  ]);

  var colors = new Float32Array([
    0.769, 0.659, 0.024,
    0.769, 0.659, 0.024,
    0.769, 0.659, 0.024,
    0.769, 0.659, 0.024,
    0.769, 0.659, 0.024,
    0.769, 0.659, 0.024,
    
    0.769, 0.659, 0.024,
    0.161, 0.357, 0.851,
    0.769, 0.659, 0.024,
    0.161, 0.357, 0.851,
    0.769, 0.659, 0.024,
    0.161, 0.357, 0.851,
    0.769, 0.659, 0.024,
    0.161, 0.357, 0.851,
    0.769, 0.659, 0.024,
    0.161, 0.357, 0.851,
  ]);
  // END Aufgabe 3 - Vertices, Indices and Color

  // Create an empty buffer object to store vertex buffer
  var vertex_buffer = gl.createBuffer();
  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  // Pass the vertex data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);


  // Create an empty buffer object to store Index buffer
  var Index_Buffer = gl.createBuffer();
  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
  // Pass the vertex data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  // Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


   // Create an empty buffer object and store color data
   var color_buffer = gl.createBuffer ();
   gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);


  /*================ Shaders ====================*/

  // START Aufgabe 3 - Vertex shader
  var vertCode = 'attribute vec3 coordinates;'+
  'attribute vec3 color;'+
  'varying vec3 vColor;'+
  'void main(void) {' +
     ' gl_Position = vec4(coordinates, 4.25);' +
     'vColor = color;'+
  '}';
  // END Aufgabe 3 - Vertex shader

  // Create a vertex shader object
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  // Attach vertex shader source code
  gl.shaderSource(vertShader, vertCode);
  // Compile the vertex shader
  gl.compileShader(vertShader);



  // START Aufgabe 3 - fragment shader
  var fragCode = 'precision mediump float;'+
  'varying vec3 vColor;'+
  'void main(void) {'+
     'gl_FragColor = vec4(vColor, 1.);'+
  '}';
  // END Aufgabe 3 - fragment shader
    
  // Create fragment shader object
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  // Attach fragment shader source code
  gl.shaderSource(fragShader, fragCode);
  // Compile the fragmentt shader
  gl.compileShader(fragShader);



  // Create a shader program object to store
  // the combined shader program
  var shaderProgram = gl.createProgram();
  // Attach a vertex shader
  gl.attachShader(shaderProgram, vertShader);
  // Attach a fragment shader
  gl.attachShader(shaderProgram, fragShader);
  // Link both the programs
  gl.linkProgram(shaderProgram);
  // Use the combined shader program object
  gl.useProgram(shaderProgram);




  /*======= Associating shaders to buffer objects =======*/

  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  // Bind index buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
  // Get the attribute location
  var coord = gl.getAttribLocation(shaderProgram, "coordinates");
  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
  // Enable the attribute
  gl.enableVertexAttribArray(coord);

  //bind the color buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  // get the attribute location
  var color = gl.getAttribLocation(shaderProgram, "color");
  //START Aufgabe 3 - point to color buffer
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
  //END Aufgabe 3 - point to color buffer

  // enable the color attribute
  gl.enableVertexAttribArray(color);

  /*=========Drawing the triangle===========*/

  // START Aufgabe 3 - Canvas Color
  // Clear the canvas
  gl.clearColor(0.063, 0.133, 0.22, 1);
  // END Aufgabe 3 - Canvas Color


  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // START Aufgabe 3 - draw Triangle
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  // END Aufgabe 3 - draw Array
}

